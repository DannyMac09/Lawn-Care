# Gadget Lab Agent Crew

Scheduled Python agents that keep store #3 working 24/7 via GitHub Actions
(free cron). No server to babysit — the crew runs on a schedule, writes its
output as markdown files, and commits them back to this repo.

Brand: **The Gadget Lab** — *"We test viral gadgets so you don't waste money."*

## The crew

| Agent | Schedule | What it does | Output |
|---|---|---|---|
| `trend_agent.py` | Daily 07:00 ET | Asks Gemini for the 5 most timely viral-gadget topics right now, each with a gadget-TEST content angle | `agents/output/trends.md` |
| `content_agent.py` | Daily 07:00 ET | Writes 3 YouTube Shorts scripts (TEST hook + 25–35s voiceover + caption cues) for The Gadget Lab. Reads `trends.md` for ideas, skips gadgets covered in the last 14 days, ends every video with a verdict: buy it or skip it | `agents/output/shorts/YYYY-MM-DD.md` |
| `seo_agent.py` | Monday 08:00 ET | Writes one 800–1200 word SEO blog post targeting a rotating gadget search query (evergreen upgrades + gift keywords), with one natural product mention | `agents/output/blog/YYYY-MM-DD-slug.md` |
| `email_agent.py` | Monday 08:00 ET | Drafts one seasonal marketing email (subject + preheader + body): heavy gift-guide push Oct–Dec, upgrades guide the rest of the year. Signed "The Gadget Lab" | `agents/output/email/YYYY-MM-DD.md` |

All agents call the Gemini API (model `gemini-3.8-flash`). The key comes from
the `GEMINI_API_KEY` environment variable — it is never hardcoded.
`agents/gemini_client.py` holds the shared API helper, the product catalog,
and the seasonal mapping.

## Products

| Product | Price | When it's pitched |
|---|---|---|
| 2026 Christmas Gadget Gift Guide | $9 | October – December (heavy holiday push) |
| Everyday Tech Upgrades Guide | $12 | January – September |

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
`stores/gadget-lab/agents/output/` and pushes them back to the repo, so the
latest scripts, posts, and emails are always here waiting for review.

## Run manually

Actions tab → **Gadget Lab Agents** → **Run workflow**. The daily agents
(trend scan + Shorts scripts) run by default; tick **run_weekly** to also run
the SEO post + email agents.

## Run locally

Python 3.11+ with stdlib only — no pip installs needed.

```bash
export GEMINI_API_KEY=your-key-here
python3 stores/gadget-lab/agents/trend_agent.py
python3 stores/gadget-lab/agents/content_agent.py
python3 stores/gadget-lab/agents/seo_agent.py
python3 stores/gadget-lab/agents/email_agent.py
```

Run from the repo root so the paths above resolve.

## Ground rules

- Never invent brand endorsements, statistics, or review scores.
- Every Short ends with a clear verdict: worth buying or skip.
- One natural product mention per blog post and email — no hard sell.
