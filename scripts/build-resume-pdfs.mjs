import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
];

const chrome = chromeCandidates.find((candidate) => {
  if (!candidate) return false;
  return spawnSync(candidate, ["--version"], { stdio: "ignore" }).status === 0;
});

if (!chrome) {
  throw new Error("Chrome or Chromium was not found. Set CHROME_PATH and try again.");
}

const root = resolve(import.meta.dirname, "..");
const port = 4174;
const origin = `http://127.0.0.1:${port}`;
const preview = spawn("npm", ["run", "preview", "--", "--port", String(port)], {
  cwd: root,
  stdio: "ignore",
  detached: true,
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`${origin}/resume`);
      if (response.ok) return;
    } catch {
      // The preview server is still starting.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 200));
  }
  throw new Error("Timed out waiting for the preview server.");
};

const stopProcessGroup = (child) => {
  if (!child.pid) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    // The process already exited.
  }
};

const printPdf = async (path, output) => {
  const profileDir = mkdtempSync(join(tmpdir(), "alex-resume-"));
  if (existsSync(output)) unlinkSync(output);

  const renderer = spawn(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--disable-background-mode",
      "--disable-background-networking",
      "--disable-extensions",
      "--disable-sync",
      "--no-default-browser-check",
      "--no-first-run",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=1500",
      `--user-data-dir=${profileDir}`,
      `--print-to-pdf=${output}`,
      `${origin}${path}`,
    ],
    { stdio: "ignore", detached: true },
  );

  try {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      if (existsSync(output) && statSync(output).size > 0) return;
      if (renderer.exitCode !== null) break;
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 100));
    }
    throw new Error(`Failed to generate ${filename}.`);
  } finally {
    stopProcessGroup(renderer);
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 200));
    rmSync(profileDir, { recursive: true, force: true });
  }
};

try {
  await waitForServer();
  const mergeDir = mkdtempSync(join(tmpdir(), "alex-resume-pages-"));
  const englishPage = join(mergeDir, "resume-en.pdf");
  const chinesePage = join(mergeDir, "resume-zh.pdf");
  const output = resolve(root, "public", "resume.pdf");

  try {
    await printPdf("/resume?lang=en", englishPage);
    await printPdf("/resume?lang=zh", chinesePage);
    if (existsSync(output)) unlinkSync(output);

    const merger = "/System/Library/Automator/Combine PDF Pages.action/Contents/MacOS/join";
    const result = spawnSync(merger, ["-o", output, englishPage, chinesePage], { stdio: "inherit" });
    if (result.status !== 0 || !existsSync(output) || statSync(output).size === 0) {
      throw new Error("Failed to combine the English and Chinese resume pages.");
    }
  } finally {
    rmSync(mergeDir, { recursive: true, force: true });
  }
} finally {
  stopProcessGroup(preview);
}
