# Campfire Secrets — Storefront 🔥

Next.js 14 (App Router) + TypeScript + Tailwind CSS storefront for
Campfire Secrets digital camping & fishing guides. Vercel-ready (no custom
server). Store #4 of the 5-store digital product empire; cloned from the
Groundskeeper Secrets template and rebranded.

## Pages

| Route | What it does |
|---|---|
| `/` | Hero, featured products, email capture, testimonials (placeholder), footer |
| `/products` | Product grid |
| `/products/[slug]` | Product detail + Buy button → `/checkout?slug=…` |
| `/checkout` | Order summary → Stripe Checkout (TEST MODE ONLY) |
| `/thank-you` | Post-purchase confirmation (reads `?session_id=`) |

## API routes

- `POST /api/subscribe` — `{name, email}` → validates, logs to console (wire to an email provider later).
- `POST /api/checkout` — `{slug}` → creates a Stripe Checkout Session and returns `{url}` (test mode only).
- `POST /api/trail-guide` — `{message, history}` → Gemini-powered Trail Guide chat replies (rate-limited, server-side `GEMINI_API_KEY`).

## Setup

1. Copy `.env.example` to `.env.local` and fill in values:
   - **TEST** Stripe keys from https://dashboard.stripe.com/test/apikeys
     (test mode must be on).
   - `GEMINI_API_KEY` from https://aistudio.google.com/apikey (for the
     Trail Guide chat widget).
2. `npm install`
3. `npm run build` (must pass clean) then `npm start`, or deploy to Vercel
   with the same env vars set.

## Stripe rules (hot zone)

- TEST MODE ONLY. `/api/checkout` refuses to run unless `STRIPE_SECRET_KEY`
  starts with `sk_test_`.
- Keys come from env vars only (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `STRIPE_SECRET_KEY`). Never hardcode keys.
- `.env*` files are git-ignored; only `.env.example` (placeholders) is committed.

## Trail Guide chat

`<TrailGuide />` is rendered in `app/layout.tsx` from
`components/TrailGuide.tsx`. The chat salesperson is wired up and working —
it answers camping/fishing questions and recommends only from the
`PRODUCTS` catalog in `lib/trail-guide-prompt.ts`. A standalone copy of the
module (drop-in for other stores) lives at
`~/workspace/projects/lawn-empire/stores/campfire-secrets/chat/`.

## Products

`lib/products.ts` — the store sells exactly two guides:

- **Campground Cooking Playbook** ($19, `camp-cooking-playbook`)
- **Fishing Trip Checklist Pack** ($12, `fishing-checklists`)

Product copy in `lib/products.ts` uses placeholder descriptions; real guide
copy lands separately.
