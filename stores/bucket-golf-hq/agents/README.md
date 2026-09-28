# Bucket Golf HQ Agent Crew

Scheduled Python agents that keep the store working 24/7 via GitHub Actions
(free cron). No server to babysit — the crew runs on a schedule, writes its
output as markdown files, and commits them back to this repo.

## The crew

| Agent | Schedule | What it does | Output |
|---|---|---|---|
| `trend_agent.py` | Daily 07:00 ET | Asks Gemini for the 5 most timely bucket-golf and yard-game topics right now | `agents/output/trends.md` |
| `content_agent.py` | Daily 07:00 ET | Writes 3 YouTube Shorts scripts (hook + 25–35s voiceover + caption cues) — trick shots, chipping tips, course setups, funny moments, league hype. Reads `trends.md` for ideas and skips topics covered in the last 14 days | `agents/output/shorts/YYYY-MM-DD.md` |
| `seo_agent.py` | Monday 08:00 ET | Writes one 800–1200 word SEO blog post targeting a rotating bucket-golf search query, with one natural product mention | `agents/output/blog/YYYY-MM-DD-slug.md` |
| `email_agent.py` | Monday 08:00 ET | Drafts one seasonal marketing email (subject + body) pitching the season's product | `agents/output/email/YYYY-MM-DD.md` |

All agents call the Gemini API (model `gemini-3.8-flash`). The key comes from
the `GEMINI_API_KEY` environment variable — it is never hardcoded.
`agents/gemini_client.py` holds the shared API helper, the product catalog
(The Bucket Golf Rulebook $15, Backyard League Starter Kit $29), and the
seasonal mapping (league kit for league-formation season Mar–Jun, rulebook
the rest of the year).

## Required repo secret

The workflow needs your Gemini API key (from Google AI Studio):

1. In GitHub, open the repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Name: `GEMINI_API_KEY`. Value: paste the key.
3. Save. The workflow reads it as `${{ secrets.GEMINI_API_KEY }}`.

Without it, every agent exits with a clean
`Error: GEMINI_API_KEY is not set...` message (no traceback).

## Schedule

Defined in `.github/workflows/agents.yml` (cron is in UTC):

- Daily: `0 11 * * *` → 07:00 ET during daylight time (06:00 ET in standard time)
- Weekly Monday: `0 12 * * 1` → 08:00 ET during daylight time (07:00 ET in standard time)

After running, the workflow commits any new files under
`stores/bucket-golf-hq/agents/output/` and pushes them back to the repo, so
the latest scripts, posts, and emails are always here waiting for review.

## Run manually

Actions tab → **Bucket Golf HQ Agents** → **Run workflow**. The daily agents
(trend scan + Shorts scripts) run by default; tick **run_weekly** to also run
the SEO post + email agents.

## Run locally

Python 3.11+ with stdlib only — no pip installs needed.

```bash
export GEMINI_API_KEY=your-key-here
python3 stores/bucket-golf-hq/agents/trend_agent.py
python3 stores/bucket-golf-hq/agents/content_agent.py
python3 stores/bucket-golf-hq/agents/seo_agent.py
python3 stores/bucket-golf-hq/agents/email_agent.py
```

Run from the repo root so the agents find
`stores/bucket-golf-hq/agents/output/` for their files.
