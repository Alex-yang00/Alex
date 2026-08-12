const LEGACY_STORE_KEY = "leaderboard/submissions-v2.json";
const STORE_PREFIX = "leaderboard/submissions-v2/";
const { head, list } = require("@vercel/blob");
const JOB_PATTERN = /^https:\/\/hub\.harborframework\.com\/jobs\/([a-f0-9-]{36})\/?$/i;

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

async function getRuntime(jobUrl) {
  const match = String(jobUrl || "").match(JOB_PATTERN);
  if (!match) {
    return "-";
  }

  const harborResponse = await fetch(`https://hub.harborframework.com/jobs/${match[1]}`, {
    headers: { rsc: "1" }
  });
  if (!harborResponse.ok) {
    return "-";
  }

  return formatRuntime(extractJobPayload(await harborResponse.text()));
}

async function normalizeRows(rows) {
  return Promise.all(rows.map(async (row) => {
    const normalizedRow = {
      ...row,
      model: formatModelName(row.model),
      environment: row.environment || "Novita Sandbox"
    };

    if (normalizedRow.runtime && normalizedRow.runtime !== "pending") {
      return normalizedRow;
    }

    try {
      return {
        ...normalizedRow,
        runtime: await getRuntime(normalizedRow.jobUrl)
      };
    } catch {
      return {
        ...normalizedRow,
        runtime: "-"
      };
    }
  }));
}

function rankRows(rows) {
  const trackCounts = new Map();

  return [...rows]
    .sort((left, right) => {
      const rewardDelta = Number(right.reward) - Number(left.reward);
      if (Number.isFinite(rewardDelta) && rewardDelta !== 0) {
        return rewardDelta;
      }
      return new Date(left.createdAt || 0) - new Date(right.createdAt || 0);
    })
    .map((row) => {
      const track = row.track || "Review";
      const rank = (trackCounts.get(track) || 0) + 1;
      trackCounts.set(track, rank);
      return {
        ...row,
        rank: String(rank).padStart(2, "0")
      };
    });
}

function isMissingBlobError(error) {
  const message = String(error?.message || "").toLowerCase();
  return error?.status === 404 || message.includes("not found") || message.includes("does not exist");
}

async function readJsonBlob(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Blob read failed: ${response.status}`);
  }
  return response.json();
}

async function readLegacySubmissions() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
    }
    const blob = await head(LEGACY_STORE_KEY);
    return await readJsonBlob(blob.url);
  } catch (error) {
    if (error.message.includes("BLOB_READ_WRITE_TOKEN")) {
      throw error;
    }
    if (isMissingBlobError(error)) {
      return [];
    }
    throw error;
  }
}

async function readPerJobSubmissions() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  const rows = [];
  let cursor;

  do {
    const page = await list({ prefix: STORE_PREFIX, cursor });
    const blobs = page.blobs.filter((blob) => blob.pathname.endsWith(".json"));
    const pageRows = await Promise.all(blobs.map((blob) => readJsonBlob(blob.url)));
    rows.push(...pageRows);
    cursor = page.cursor;
  } while (cursor);

  return rows;
}

async function readSubmissions() {
  try {
    const [legacyRows, perJobRows] = await Promise.all([
      readLegacySubmissions(),
      readPerJobSubmissions()
    ]);

    const rowsById = new Map();
    for (const row of [...legacyRows, ...perJobRows]) {
      if (row?.id) {
        rowsById.set(row.id, row);
      }
    }
    return [...rowsById.values()];
  } catch (error) {
    if (error.message.includes("BLOB_READ_WRITE_TOKEN")) {
      throw error;
    }
    return [];
  }
}

module.exports = async function handler(request, response) {
  response.setHeader("cache-control", "no-store");

  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const submissions = await readSubmissions();
    const rows = await normalizeRows(submissions);
    response.status(200).json({
      rows: rankRows(rows),
      storage: "vercel-blob"
    });
  } catch (error) {
    response.status(200).json({
      rows: [],
      storage: "unavailable",
      warning: error.message
    });
  }
};
