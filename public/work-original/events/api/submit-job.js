const LEGACY_STORE_KEY = "leaderboard/submissions-v2.json";
const STORE_PREFIX = "leaderboard/submissions-v2/";
const JOB_PATTERN = /^https:\/\/hub\.harborframework\.com\/jobs\/([a-f0-9-]{36})\/?$/i;
const DUPLICATE_JOB_ERROR = "This Harbor job has already been submitted.";
const { head, put } = require("@vercel/blob");
const { execFile } = require("child_process");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const HARBOR_SUPABASE_URL = "https://ofhuhcpkvzjlejydnvyd.supabase.co";
const HARBOR_SUPABASE_KEY = "sb_publishable_Z-vuQbpvpG-PStjbh4yE0Q_e-d3MTIH";
const ALLOWED_DATASETS = new Set([
  "NovitaAI/tb21-code-debug",
  "NovitaAI/tb21-systems-security",
  "NovitaAI/tb21-data-science",
  "NovitaAI/tb21-file-recovery"
]);

const TRACKS_BY_DATASET = {
  "NovitaAI/tb21-code-debug": "Code & Debug",
  "NovitaAI/tb21-systems-security": "Systems & Security",
  "NovitaAI/tb21-data-science": "Data & Science",
  "NovitaAI/tb21-file-recovery": "File & Recovery"
};

function isMissingBlobError(error) {
  const message = String(error?.message || "").toLowerCase();
  return error?.status === 404 || message.includes("not found") || message.includes("does not exist");
}

async function readLegacySubmissions() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  try {
    const blob = await head(LEGACY_STORE_KEY);
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Blob read failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (isMissingBlobError(error)) {
      return [];
    }
    throw error;
  }
}

async function ensureJobNotSubmitted(jobId, jobUrl) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  const legacyRows = await readLegacySubmissions();
  if (legacyRows.some((row) => row.id === jobId || row.jobUrl === jobUrl)) {
    throw new Error(DUPLICATE_JOB_ERROR);
  }

  try {
    await head(`${STORE_PREFIX}${jobId}.json`);
    throw new Error(DUPLICATE_JOB_ERROR);
  } catch (error) {
    if (isMissingBlobError(error)) {
      return;
    }
    throw error;
  }
}

async function writeSubmission(row) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  await put(`${STORE_PREFIX}${row.id}.json`, JSON.stringify(row, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json"
  });
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8192) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

function extractJobPayload(rscText) {
  const marker = '"job":';
  const start = rscText.indexOf(marker);
  if (start === -1) {
    throw new Error("Unable to inspect Harbor job metadata.");
  }

  const objectStart = rscText.indexOf("{", start + marker.length);
  if (objectStart === -1) {
    throw new Error("Unable to inspect Harbor job metadata.");
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = objectStart; index < rscText.length; index += 1) {
    const char = rscText[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return JSON.parse(rscText.slice(objectStart, index + 1));
      }
    }
  }

  throw new Error("Unable to inspect Harbor job metadata.");
}

function getJobDataset(job) {
  const configDatasets = Array.isArray(job?.config?.datasets) ? job.config.datasets : [];
  const dataset = configDatasets.find((item) => ALLOWED_DATASETS.has(item?.name));
  if (dataset?.name) {
    return dataset.name;
  }

  const runTargets = Array.isArray(job?.run_targets) ? job.run_targets : [];
  const runTarget = runTargets.find((item) => ALLOWED_DATASETS.has(item?.value));
  return runTarget?.value || "";
}

function formatRuntime(job) {
  const durationMs = job?.initialTasks?.items?.[0]?.avg_duration_ms;
  const startedAt = job?.started_at ? new Date(job.started_at).getTime() : NaN;
  const finishedAt = job?.finished_at ? new Date(job.finished_at).getTime() : NaN;
  const milliseconds = Number.isFinite(durationMs) ? durationMs : finishedAt - startedAt;

  if (!Number.isFinite(milliseconds) || milliseconds <= 0) {
    return "-";
  }

  const totalSeconds = Math.round(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function formatModelName(modelName) {
  return String(modelName || "pending").replace(/^novita\//, "");
}

function execFileWithTimeout(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = execFile(command, args, {
      timeout: 25000,
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

    child.on("error", reject);
  });
}

async function readJsonFile(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function findDownloadedJobDir(outputDir, jobId) {
  const entries = await fs.readdir(outputDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const candidate = path.join(outputDir, entry.name);
    try {
      const result = await readJsonFile(path.join(candidate, "result.json"));
      if (result?.id === jobId) {
        return candidate;
      }
    } catch {
      // Ignore partial or unrelated download directories.
    }
  }

  throw new Error("Downloaded Harbor job did not include result metadata.");
}

async function fetchPublicHarborJob(jobId) {
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
    throw new Error("Unable to read this public Harbor job archive.");
  }
  return job;
}

async function downloadHarborArchive(archivePath, outputDir) {
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

  const archivePathLocal = path.join(outputDir, "job.tar.gz");
  await fs.writeFile(archivePathLocal, Buffer.from(await response.arrayBuffer()));
  await execFileWithTimeout("tar", ["-xzf", archivePathLocal, "-C", outputDir]);
}

async function collectTrialRewards(jobDir) {
  const entries = await fs.readdir(jobDir, { withFileTypes: true });
  const rewards = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    try {
      const result = await readJsonFile(path.join(jobDir, entry.name, "result.json"));
      const reward = Number(result?.verifier_result?.rewards?.reward);
      if (result?.exception_info || !Number.isFinite(reward)) {
        continue;
      }

      rewards.push(reward);
    } catch {
      // Ignore incomplete trial folders.
    }
  }

  return { rewards };
}

async function validateHarborJobFromArchive(jobId) {
  const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), "harbor-job-"));

  try {
    const job = await fetchPublicHarborJob(jobId);
    await downloadHarborArchive(job.archive_path, outputDir);

    const jobDir = await findDownloadedJobDir(outputDir, jobId);
    const config = await readJsonFile(path.join(jobDir, "config.json"));
    const result = await readJsonFile(path.join(jobDir, "result.json"));
    const dataset = config?.datasets?.find((item) => ALLOWED_DATASETS.has(item?.name))?.name || "";

    if (config?.environment?.type !== "novita") {
      throw new Error("This Harbor job must run in Novita Agent Sandbox.");
    }

    if (!dataset) {
      throw new Error("This Harbor job must use one of the Novita TB2.1 track datasets.");
    }

    if (Array.isArray(config?.extra_instruction_paths) && config.extra_instruction_paths.length > 0) {
      throw new Error("Jobs with extra instruction files are not eligible.");
    }

    if (!result?.finished_at) {
      throw new Error("This Harbor job is not complete yet. Please submit it after the run finishes.");
    }

    const { rewards } = await collectTrialRewards(jobDir);
    if (rewards.length === 0) {
      throw new Error("This Harbor job does not include completed scored trials.");
    }

    const reward = rewards.reduce((sum, value) => sum + value, 0) / rewards.length;
    const runtime = formatRuntime({
      started_at: result.started_at,
      finished_at: result.finished_at
    });

    return {
      dataset,
      track: TRACKS_BY_DATASET[dataset],
      agent: config?.agents?.[0]?.name || "Submitted agent",
      model: formatModelName(config?.agents?.[0]?.model_name),
      environment: "Novita Sandbox",
      reward: String(reward),
      runtime
    };
  } finally {
    await fs.rm(outputDir, { recursive: true, force: true }).catch(() => {});
  }
}

function buildReviewJobMeta() {
  return {
    dataset: "",
    track: "Review",
    agent: "Pending review",
    model: "Pending review",
    environment: "Novita Sandbox",
    reward: "pending",
    runtime: "-"
  };
}

async function validateHarborJob(jobId) {
  const harborResponse = await fetch(`https://hub.harborframework.com/jobs/${jobId}`, {
    headers: { rsc: "1" }
  });

  if (!harborResponse.ok) {
    throw new Error("Unable to read this Harbor job. Please confirm the job is public.");
  }

  const job = extractJobPayload(await harborResponse.text());
  const dataset = getJobDataset(job);

  if (job.visibility !== "public") {
    throw new Error("This Harbor job must be public.");
  }

  if (job?.config?.environment?.type !== "novita") {
    throw new Error("This Harbor job must run in Novita Agent Sandbox.");
  }

  if (!dataset) {
    throw new Error("This Harbor job must use one of the Novita TB2.1 track datasets.");
  }

  if (Array.isArray(job?.config?.extra_instruction_paths) && job.config.extra_instruction_paths.length > 0) {
    throw new Error("Jobs with extra instruction files are not eligible.");
  }

  if (!job.finished_at || !Number.isFinite(Number(job?.stats?.avg_reward))) {
    throw new Error("This Harbor job is not complete yet. Please submit it after the run finishes.");
  }

  const reward = Number(job.stats.avg_reward);

  return {
    dataset,
    track: TRACKS_BY_DATASET[dataset],
    agent: job?.config?.agents?.[0]?.name || "Submitted agent",
    model: formatModelName(job?.config?.agents?.[0]?.model_name),
    environment: "Novita Sandbox",
    reward: String(reward),
    runtime: formatRuntime(job)
  };
}

module.exports = async function handler(request, response) {
  response.setHeader("cache-control", "no-store");

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = await readJson(request);
    const url = String(payload.jobUrl || "").trim();
    const match = url.match(JOB_PATTERN);

    if (!match) {
      response.status(400).json({ error: "Please submit a public Harbor Hub job link." });
      return;
    }

    try {
      await ensureJobNotSubmitted(match[1], url);
    } catch (error) {
      if (error.message === DUPLICATE_JOB_ERROR) {
        response.status(409).json({ error: DUPLICATE_JOB_ERROR });
        return;
      }
      throw error;
    }

    let jobMeta;
    try {
      jobMeta = await validateHarborJob(match[1]);
    } catch (error) {
      try {
        jobMeta = await validateHarborJobFromArchive(match[1]);
      } catch {
        jobMeta = buildReviewJobMeta();
      }
    }

    const row = {
      id: match[1],
      rank: "",
      track: jobMeta.track,
      agent: jobMeta.agent,
      model: jobMeta.model,
      environment: jobMeta.environment,
      reward: jobMeta.reward,
      runtime: jobMeta.runtime,
      jobUrl: url,
      label: "View job",
      dataset: jobMeta.dataset,
      createdAt: new Date().toISOString()
    };

    await writeSubmission(row);
    response.status(201).json({ row });
  } catch (error) {
    const status = error.message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    response.status(status).json({ error: error.message });
  }
};
