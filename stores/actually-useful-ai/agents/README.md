# Actually Useful AI Agent Crew

"AI in plain English. No tech degree required." — the always-on crew behind
store #5, scheduled Python agents that keep the business working 24/7 via
GitHub Actions (free cron). No server to babysit — the crew runs on a
schedule, writes its output as markdown files, and commits them back to
this repo.

## The crew

| Agent | Schedule | What it does | Output |
|---|---|---|---|
| `trend_agent.py` | Daily 07:00 ET | Asks Gemini for the 5 most timely AI topics that matter to NORMAL people (new free tools, AI news explained simply, viral everyday uses) — explicitly not developer/enterprise news | `agents/output/trends.md` |
| `content_agent.py` | Daily 07:00 ET | Writes 3 YouTube Shorts scripts (hook + 25–35s voiceover + caption cues) for the Actually Useful AI channel, one beginner-friendly AI tip each. Reads `trends.md` for ideas and skips topics covered in the last 14 days | `agents/output/shorts/YYYY-MM-DD.md` |
| `seo_agent.py` | Monday 08:00 ET | Writes one 800–1200 word SEO blog post targeting a rotating beginner AI search query, with one natural product mention | `agents/output/blog/YYYY-MM-DD-slug.md` |
| `email_agent.py` | Monday 08:00 ET | Drafts one plain-English marketing email (subject + body) pitching the week's product, signed off as "Your AI Buddy" | `agents/output/email/YYYY-MM-DD.md` |

All agents call the Gemini API (model `gemini-3.8-flash`). The key comes from
the `GEMINI_API_KEY` environment variable — it is never hardcoded.
`agents/gemini_client.py` holds the shared API helper, the product catalog
("AI for Regular People" $19 and "100 Everyday AI Prompts" $12), and
`product_for_week()`, which alternates between the two products by ISO week
number — AI products have no season, so there is no monthly seasonal mapping.
Shorts tip categories rotate daily and email angles rotate weekly, also off
the calendar.

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

After running, the workflow commits any new files under `agents/output/` and
pushes them back to the repo, so the latest scripts, posts, and emails are
always here waiting for review.

## Run manually

Actions tab → **Actually Useful AI Agents** → **Run workflow**. The daily
agents (trend scan + Shorts scripts) run by default; tick **run_weekly** to
also run the SEO post + email agents.

## Run locally

Python 3.11+ with stdlib only — no pip installs needed.

```bash
export GEMINI_API_KEY=your-key-here
python3 agents/trend_agent.py
python3 agents/content_agent.py
python3 agents/seo_agent.py
python3 agents/email_agent.py
```

Run from the repo root so the agents find `agents/output/` for their files.
