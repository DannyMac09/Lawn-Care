# The Gadget Lab — Storefront

Next.js 14 (App Router) + TypeScript + Tailwind CSS storefront for
The Gadget Lab's hands-on gadget guides. Vercel-ready (no custom server).
Dark theme (zinc-950) with electric cyan accents.

Tagline: "We test viral gadgets so you don't waste money."

## Products

| Product | Price | What it is |
|---|---|---|
| 2026 Christmas Gadget Gift Guide (`/products/christmas-gadget-guide`) | $9 | Curated, lab-tested gift picks: under $25 / under $50 / splurge, matched to who's getting them, plus a "what to avoid" list of viral junk |
| Everyday Tech Upgrades Guide (`/products/tech-upgrades-guide`) | $12 | Highest-impact home tech upgrades — lighting, charging, audio, smart-home starter — each rated by setup difficulty |

## Pages

| Route | What it does |
|---|---|
| `/` | Hero, featured guides, email capture, testimonials (placeholder), footer |
| `/products` | Product grid |
| `/products/[slug]` | Product detail + Buy button → `/checkout?slug=…` |
| `/checkout` | Order summary → Stripe Checkout (TEST MODE ONLY) |
| `/thank-you` | Post-purchase confirmation (reads `?session_id=`) |

## API routes

- `POST /api/subscribe` — `{name, email}` → validates, logs to console (wire to an email provider later).
- `POST /api/checkout` — `{slug}` → creates a Stripe Checkout Session and returns `{url}`. TEST MODE ONLY — refuses unless `STRIPE_SECRET_KEY` starts with `sk_test_`.
- `POST /api/gadget-guru` — `{message, history}` → Gadget Guru chat salesperson (Gemini `gemini-3.8-flash`, server-side `GEMINI_API_KEY`, in-memory per-IP rate limit of ~20 req/min, 25s timeout). Source: `lib/gadget-guru-prompt.ts`.

## Setup

1. Copy `.env.example` to `.env.local` and fill in:
   - **TEST** Stripe keys from https://dashboard.stripe.com/test/apikeys
     (test mode must be on).
   - `GEMINI_API_KEY` for the Gadget Guru chat (server-side only).
2. `npm install`
3. `npm run build` (must pass clean) then `npm start`, or deploy to Vercel
   with the same env vars set.

## Stripe rules (hot zone)

- TEST MODE ONLY. `/api/checkout` refuses to run unless `STRIPE_SECRET_KEY`
  starts with `sk_test_`.
- Keys come from env vars only (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `STRIPE_SECRET_KEY`). Never hardcode keys.
- `.env*` files are git-ignored; only `.env.example` (placeholders) is committed.

## Gadget Guru (chat salesperson)

- `<GadgetGuru />` is rendered in `app/layout.tsx` from `components/GadgetGuru.tsx`
  — floating button, bottom-right, mobile-friendly panel, typing indicator,
  error state, auto-links product names to `/products/<slug>`.
- The standalone module lives in `../chat/` (`README.md`,
  `lib/gadget-guru-prompt.ts`, `components/GadgetGuru.tsx`,
  `app/api/gadget-guru/route.ts`) for reuse across stores. The storefront
  copies are kept byte-identical to the `chat/` sources.
