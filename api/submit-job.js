const STORE_KEY = "leaderboard/submissions-v2.json";
const JOB_PATTERN = /^https:\/\/hub\.harborframework\.com\/jobs\/([a-f0-9-]{36})\/?$/i;
const { head, put } = require("@vercel/blob");

async function readSubmissions() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  try {
    const blob = await head(STORE_KEY);
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Blob read failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (error.status === 404 || error.message.includes("not found")) {
      return [];
    }
    throw error;
  }
}

async function writeSubmissions(rows) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  await put(STORE_KEY, JSON.stringify(rows, null, 2), {
    access: "public",
    allowOverwrite: true,
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

    const rows = await readSubmissions();
    if (rows.some((row) => row.jobUrl === url)) {
      response.status(409).json({ error: "This Harbor job has already been submitted." });
      return;
    }

    const row = {
      id: match[1],
      rank: "NEW",
      track: "Review",
      agent: "Submitted agent",
      model: "pending",
      reward: "parse",
      runtime: "pending",
      jobUrl: url,
      label: "View job",
      createdAt: new Date().toISOString()
    };

    await writeSubmissions([row, ...rows]);
    response.status(201).json({ row });
  } catch (error) {
    const status = error.message.includes("BLOB_READ_WRITE_TOKEN") ? 503 : 500;
    response.status(status).json({ error: error.message });
  }
};
