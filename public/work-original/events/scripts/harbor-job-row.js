#!/usr/bin/env node

const { execFile } = require("child_process");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");

const JOB_PATTERN = /(?:https:\/\/hub\.harborframework\.com\/jobs\/)?([a-f0-9-]{36})\/?$/i;
const HARBOR_SUPABASE_URL = "https://ofhuhcpkvzjlejydnvyd.supabase.co";
const HARBOR_SUPABASE_KEY = "sb_publishable_Z-vuQbpvpG-PStjbh4yE0Q_e-d3MTIH";
const TRACKS_BY_DATASET = {
  "NovitaAI/tb21-code-debug": "Code & Debug",
  "NovitaAI/tb21-systems-security": "Systems & Security",
  "NovitaAI/tb21-data-science": "Data & Science",
  "NovitaAI/tb21-file-recovery": "File & Recovery"
};
const ALLOWED_DATASETS = new Set(Object.keys(TRACKS_BY_DATASET));

function execFileWithTimeout(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(command, args, {
      timeout: 30000,
      maxBuffer: 1024 * 1024,
      ...options
    }, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function findJobDir(outputDir, jobId) {
  const entries = await fs.readdir(outputDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const candidate = path.join(outputDir, entry.name);
    try {
      const result = await readJson(path.join(candidate, "result.json"));
      if (result.id === jobId) {
        return candidate;
      }
    } catch {
      // Ignore non-job directories.
    }
  }
  throw new Error("Downloaded job directory not found.");
}

async function fetchPublicJob(jobId) {
  const params = new URLSearchParams({
    select: "id,job_name,archive_path,visibility",
    id: `eq.${jobId}`
  });
  const response = await fetch(`${HARBOR_SUPABASE_URL}/rest/v1/job?${params}`, {
    headers: {
      apikey: HARBOR_SUPABASE_KEY,
      authorization: `Bearer ${HARBOR_SUPABASE_KEY}`
    },
    cache: "no-store"
  });
  if (!response.ok) {
    throw new Error(`Harbor job lookup failed: ${response.status}`);
  }

  const rows = await response.json();
  const job = rows?.[0];
  if (!job || job.visibility !== "public" || !job.archive_path) {
    throw new Error("Public Harbor job archive not found.");
  }
  return job;
}

async function downloadArchive(archivePath, outputDir) {
  const encodedPath = archivePath.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${HARBOR_SUPABASE_URL}/storage/v1/object/results/${encodedPath}`, {
    headers: {
      apikey: HARBOR_SUPABASE_KEY,
      authorization: `Bearer ${HARBOR_SUPABASE_KEY}`
    },
    cache: "no-store"
  });
  if (!response.ok) {
    throw new Error(`Harbor archive download failed: ${response.status}`);
  }

  const archiveFile = path.join(outputDir, "job.tar.gz");
  await fs.writeFile(archiveFile, Buffer.from(await response.arrayBuffer()));
  await execFileWithTimeout("tar", ["-xzf", archiveFile, "-C", outputDir]);
}

function formatRuntime(milliseconds) {
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) {
    return "-";
  }
  const totalSeconds = Math.round(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function formatModel(modelName) {
  return String(modelName || "pending").replace(/^novita\//, "");
}

async function collectScoredTrials(jobDir) {
  const entries = await fs.readdir(jobDir, { withFileTypes: true });
  const rewards = [];
  const runtimes = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    try {
      const result = await readJson(path.join(jobDir, entry.name, "result.json"));
      const reward = Number(result?.verifier_result?.rewards?.reward);
      if (result?.exception_info || !Number.isFinite(reward)) {
        continue;
      }
      rewards.push(reward);

      const startedAt = result?.started_at ? new Date(result.started_at).getTime() : NaN;
      const finishedAt = result?.finished_at ? new Date(result.finished_at).getTime() : NaN;
      const runtime = finishedAt - startedAt;
      if (Number.isFinite(runtime) && runtime > 0) {
        runtimes.push(runtime);
      }
    } catch {
      // Ignore incomplete trial directories.
    }
  }

  return { rewards, runtimes };
}

async function main() {
  const input = process.argv[2];
  const match = String(input || "").trim().match(JOB_PATTERN);
  if (!match) {
    throw new Error("Usage: node scripts/harbor-job-row.js <harbor-job-url-or-id>");
  }

  const jobId = match[1];
  const jobUrl = `https://hub.harborframework.com/jobs/${jobId}`;
  const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), "harbor-row-"));

  try {
    const job = await fetchPublicJob(jobId);
    await downloadArchive(job.archive_path, outputDir);
    const jobDir = await findJobDir(outputDir, jobId);
    const config = await readJson(path.join(jobDir, "config.json"));
    const result = await readJson(path.join(jobDir, "result.json"));
    const dataset = config?.datasets?.find((item) => ALLOWED_DATASETS.has(item?.name))?.name || "";

    if (!dataset) {
      throw new Error("Job does not use an allowed Novita TB2.1 dataset.");
    }
    if (config?.environment?.type !== "novita") {
      throw new Error("Job did not run in Novita Agent Sandbox.");
    }
    if (Array.isArray(config?.extra_instruction_paths) && config.extra_instruction_paths.length > 0) {
      throw new Error("Job uses extra instruction files.");
    }
    if (!result?.finished_at) {
      throw new Error("Job is not complete.");
    }

    const { rewards } = await collectScoredTrials(jobDir);
    if (rewards.length === 0) {
      throw new Error("No scored non-exception trials found.");
    }

    const startedAt = result?.started_at ? new Date(result.started_at).getTime() : NaN;
    const finishedAt = result?.finished_at ? new Date(result.finished_at).getTime() : NaN;

    const row = {
      id: jobId,
      rank: "",
      track: TRACKS_BY_DATASET[dataset],
      agent: config?.agents?.[0]?.name || "Submitted agent",
      model: formatModel(config?.agents?.[0]?.model_name),
      environment: "Novita Sandbox",
      reward: String(rewards.reduce((sum, value) => sum + value, 0) / rewards.length),
      runtime: formatRuntime(finishedAt - startedAt),
      jobUrl,
      label: "View job",
      dataset,
      createdAt: new Date().toISOString()
    };

    console.log(JSON.stringify(row, null, 2));
  } finally {
    await fs.rm(outputDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
