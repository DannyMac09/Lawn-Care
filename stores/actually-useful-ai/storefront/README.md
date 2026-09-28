# Actually Useful AI — Storefront

Next.js 14 (App Router) + TypeScript + Tailwind CSS storefront for
Actually Useful AI's plain-English AI guides for regular people.
Vercel-ready (no custom server).

Tagline: "AI in plain English. No tech degree required."

## Products

| Product | Price | What it is |
|---|---|---|
| AI for Regular People (`/products/ai-for-regular-people`) | $19 | Plain-English starter guide: what AI is, how to ask good questions, 10 everyday uses, safety basics |
| 100 Everyday AI Prompts (`/products/everyday-ai-prompts`) | $12 | 100 copy-paste prompts organized by home, money, health, work, and fun — each with a "when to use this" note |

## Pages

| Route | What it does |
|---|---|
| `/` | Hero, featured downloads, email capture, testimonials (placeholder), footer |
| `/products` | Product grid |
| `/products/[slug]` | Product detail + Buy button → `/checkout?slug=…` |
| `/checkout` | Order summary → Stripe Checkout (TEST MODE ONLY) |
| `/thank-you` | Post-purchase confirmation (reads `?session_id=`) |

## API routes

- `POST /api/subscribe` — `{name, email}` → validates, logs to console (wire to an email provider later).
- `POST /api/checkout` — `{slug}` → creates a Stripe Checkout Session and returns `{url}`. TEST MODE ONLY — refuses unless `STRIPE_SECRET_KEY` starts with `sk_test_`.
- `POST /api/ai-buddy` — `{message, history}` → AI Buddy chat salesperson (Gemini `gemini-3.8-flash`, server-side `GEMINI_API_KEY`, in-memory per-IP rate limit of ~20 req/min, 25s timeout). Source: `lib/ai-buddy-prompt.ts`.

## Setup

1. Copy `.env.example` to `.env.local` and fill in:
   - **TEST** Stripe keys from https://dashboard.stripe.com/test/apikeys
     (test mode must be on).
   - `GEMINI_API_KEY` for the AI Buddy chat (server-side only).
2. `npm install`
3. `npm run build` (must pass clean) then `npm start`, or deploy to Vercel
   with the same env vars set.

## Stripe rules (hot zone)

- TEST MODE ONLY. `/api/checkout` refuses to run unless `STRIPE_SECRET_KEY`
  starts with `sk_test_`.
- Keys come from env vars only (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `STRIPE_SECRET_KEY`). Never hardcode keys.
- `.env*` files are git-ignored; only `.env.example` (placeholders) is committed.

## AI Buddy (chat salesperson)

- `<AIBuddy />` is rendered in `app/layout.tsx` from `components/AIBuddy.tsx`
  — floating button, bottom-right, mobile-friendly panel, typing indicator,
  error state, auto-links product names to `/products/<slug>`.
- The standalone module lives in `../chat/` (`README.md`,
  `lib/ai-buddy-prompt.ts`, `components/AIBuddy.tsx`,
  `app/api/ai-buddy/route.ts`) for reuse across stores.
