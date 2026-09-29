# The Empire 🏡⛳⚡🔥✨

Five faceless digital-product stores, one shared engine. AI agents do the work 24/7; DannyMac just fact-checks.

## The stores (`stores/`)

| Store | Niche | Products | Chat personality |
|---|---|---|---|
| `groundskeeper-secrets` | Lawn care | Fall Overseeding Playbook ($29), Year-Round Lawn Calendar ($19), Weed ID & Kill Guide ($24) | Lawn Doctor |
| `bucket-golf-hq` | Bucket golf | Bucket Golf Rulebook ($15), Backyard League Starter Kit ($29) | Caddy |
| `gadget-lab` | Viral gadgets | 2026 Christmas Gadget Gift Guide ($9), Everyday Tech Upgrades Guide ($12) | Gadget Guru |
| `campfire-secrets` | Camping + fishing | Campground Cooking Playbook ($19), Fishing Trip Checklist Pack ($12) | Trail Guide |
| `actually-useful-ai` | Plain-English AI | AI for Regular People ($19), 100 Everyday AI Prompts ($12) | AI Buddy |

Each store has the same layout: `storefront/` (Next.js 14 + Tailwind, Vercel-ready), `chat/` (Gemini-powered AI salesperson module), `agents/` (the always-on crew), `products/` (the actual digital products as markdown).

`.github/workflows/agents.yml` (repo root) runs **all five** crews on one schedule — GitHub only executes workflows from the repo root.

## The money loop (per store)

Shorts + blog articles pull traffic → visitors land on the store → the **chat** answers questions and recommends the right guide → **Stripe** collects → buyers join the email list → the **email agent** sells them the next seasonal guide. Every piece feeds the next one.

## Setup (DannyMac's checklist)

1. **Stripe** — every checkout runs in TEST MODE until you say otherwise. To go live: get your live keys from the Stripe dashboard and set them in Vercel. Say the word before this happens — flipping to live is your call, per store.
2. **Gemini API key** — add it as a repo secret so the agent crews can run: repo → Settings → Secrets and variables → Actions → New repository secret, name `GEMINI_API_KEY`. Also set it as a Vercel env var per storefront (powers the chat).
3. **Vercel** — import this repo five times (one project per store), setting each project's Root Directory to `stores/<slug>/storefront`. Env vars per project: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `GEMINI_API_KEY`.
4. **Email** — `/api/subscribe` currently logs signups. Hook it to your email provider (or n8n) when ready.
5. **Affiliate links** — products contain `[AFFILIATE: description]` placeholders. Swap in real Amazon Associates links (tracking ID `groundskeep09-20`) before launch.

## Standing rules

- Stripe stays in **test mode** until DannyMac explicitly approves going live.
- Each chat only recommends products from its own catalog — it never invents products.
- No credentials in code, ever. Env vars only.
<!-- deploy-trigger 2026-09-29 06:54 -->
