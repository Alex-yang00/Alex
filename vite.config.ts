import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error Vite config runs in Node; this project does not ship Node typings.
import fs from "node:fs";
// @ts-expect-error Vite config runs in Node; this project does not ship Node typings.
import path from "node:path";

const originalWorkPages: Record<string, string> = {
  "/work/hermes": "hermes",
  "/work/harbor": "harbor",
  "/work/actionlayer": "actionlayer",
  "/work/kilo-workshop": "kilo-workshop",
  "/work/startup": "startup",
  "/work/events": "events",
  "/work/events/kilo-code-hackathon": "events/kilo-code-hackathon.html",
  "/work/events/harbor-agent-benchmark": "events/harbor-agent-benchmark.html",
  "/work/events/hy3-build-challenge": "events/hy3-build-challenge.html",
};

const originalWorkAssetPrefixes: Record<string, string> = {
  "/work/hermes/images/": "public/work-original/hermes/images/",
  "/work/hermes/assets/": "public/work-original/hermes/assets/",
  "/work/kilo-workshop/assets/": "public/work-original/kilo-workshop/assets/",
  "/work/startup/assets/": "public/work-original/startup/assets/",
  "/work/events/brand/": "public/work-original/events/brand/",
  "/work/events/logo/": "public/work-original/events/logo/",
  "/work/events/footer/": "public/work-original/events/footer/",
};

function serveOriginalWorkPages() {
  return {
    name: "serve-original-work-pages",
    configureServer(server: { middlewares: { use: (handler: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?", 1)[0]?.replace(/\/$/, "") || "";
        for (const prefix in originalWorkAssetPrefixes) {
          const directory = originalWorkAssetPrefixes[prefix];
          if (req.url?.startsWith(prefix)) {
            const relative = req.url.slice(prefix.length).split("?", 1)[0];
            const file = path.resolve(directory, relative);
            if (fs.existsSync(file)) {
              res.statusCode = 200;
              res.setHeader("Content-Type", relative.endsWith(".png") ? "image/png" : "application/octet-stream");
              res.end(fs.readFileSync(file));
              return;
            }
          }
        }
        const slug = originalWorkPages[pathname];
        if (!slug)
          return next();

        const file = path.resolve("public/work-original", slug, "index.html");
        const pageFile = slug.indexOf("/") !== -1
          ? path.resolve("public/work-original", slug)
          : file;
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(fs.readFileSync(pageFile));
      });
    },
  };
}

export default defineConfig({
  plugins: [serveOriginalWorkPages(), react()],
});
