# Agent Notes

## Current Scope

The root page is now the Novita Events hub.

The current production surface is:

- `/` - Novita Events index for live and upcoming activities
- `/kilo-code-hackathon` - Novita x Kilo Code Hackathon landing page
- `/harbor-agent-benchmark` - Harbor Agent Benchmark event page
- `/api/leaderboard` - reads Harbor leaderboard rows from Vercel Blob with
  seeded fallback rows
- `/api/submit-job` - writes submitted Harbor Hub job links to Vercel Blob

## Deployment Notes

- Vercel project: `events.novita.ai` (`events-novita-ai`)
- Current working scope used by CLI: `alexyang-novitas-projects`
- `BLOB_READ_WRITE_TOKEN` is already configured in Vercel for Production,
  Preview, and Development.
- `.env.local` and `.vercel/` are local-only and must stay ignored.

## Notes

- Keep Kilo participant CTAs stable at `/kilo-code-hackathon` while the event is live.
- Keep Harbor result workflows stable at `/harbor-agent-benchmark`.
- Keep `/api/*` compatible with the Harbor page unless a future event-specific
  API split is requested.
- When more activities are added, expand the event cards on `/` and consider
  data-driving the event index.
