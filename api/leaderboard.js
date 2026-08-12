const STORE_KEY = "leaderboard/submissions-v2.json";
const { head } = require("@vercel/blob");

const seededRows = [
  {
    id: "seed-code-debug",
    rank: "01",
    track: "Code & Debug",
    agent: "OpenCode",
    model: "Kimi K2.5",
    reward: "86.4",
    runtime: "3m 12s",
    jobUrl: "https://hub.harborframework.com/jobs/2b32f9ad-a948-473d-8c76-dde10e90cb2d",
    label: "View job"
  },
  {
    id: "seed-systems-security",
    rank: "02",
    track: "Systems & Security",
    agent: "Baseline Agent",
    model: "GPT-5.1",
    reward: "74.1",
    runtime: "24m 18s",
    jobUrl: "",
    label: "Pending"
  },
  {
    id: "seed-data-science",
    rank: "03",
    track: "Data & Science",
    agent: "Terminal Pro",
    model: "Claude Sonnet",
    reward: "69.8",
    runtime: "22m 05s",
    jobUrl: "",
    label: "Pending"
  },
  {
    id: "seed-file-recovery",
    rank: "04",
    track: "File & Recovery",
    agent: "FileOps Agent",
    model: "Qwen Coder",
    reward: "62.5",
    runtime: "15m 07s",
    jobUrl: "",
    label: "Pending"
  },
  {
    id: "official-overall",
    rank: "Official",
    track: "Overall",
    agent: "Codex CLI",
    model: "GPT-5.5",
    reward: "83.4%",
    runtime: "TB2.1",
    jobUrl: "https://www.tbench.ai/leaderboard/terminal-bench/2.1",
    label: "Official"
  }
];

async function readSubmissions() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
    }
    const blob = await head(STORE_KEY);
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Blob read failed: ${response.status}`);
    }
    return await response.json();
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
    response.status(200).json({
      rows: [...submissions, ...seededRows],
      storage: "vercel-blob"
    });
  } catch (error) {
    response.status(200).json({
      rows: seededRows,
      storage: "seed-only",
      warning: error.message
    });
  }
};
