# Novita Events

This repository powers the Novita Events hub and Novita event landing pages.

Production deployment is managed by Vercel. The current surface is:

- `/` - Novita Events index
- `/kilo-code-hackathon` - Novita x Kilo Code Hackathon landing page
- `/harbor-agent-benchmark` - Harbor Agent Benchmark on Novita Agent Sandbox
- `api/leaderboard.js` - Harbor leaderboard API
- `api/submit-job.js` - Harbor job submission API

The project uses Vercel Blob for leaderboard submissions.

## Development

Install dependencies:

```bash
npm install
```

Run the build check:

```bash
npm run build
```

Run locally with Vercel routing and serverless functions:

```bash
vercel dev --listen 0.0.0.0:3000
```

The site is static HTML with Vercel serverless functions in `api/`.

## Environment

The leaderboard write path requires:

```bash
BLOB_READ_WRITE_TOKEN
```

This token is configured in Vercel for Production, Preview, and Development. Do
not commit `.env.local` or `.vercel/`.

## TODO

- Add more event cards when Novita hosts additional hackathons, benchmarks,
  startup programs, or workshops.
- Consider data-driving event cards and banners once there is more than one live
  event.
- If Harbor needs independent APIs later, split `/api/*` into event-specific
  routes while preserving existing submissions.
