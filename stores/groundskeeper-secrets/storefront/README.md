# Groundskeeper Secrets — Storefront

Next.js 14 (App Router) + TypeScript + Tailwind CSS storefront for
Groundskeeper Secrets digital lawn-care guides. Vercel-ready (no custom server).

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
- `POST /api/checkout` — `{slug}` → creates a Stripe Checkout Session and returns `{url}`.

## Setup

1. Copy `.env.example` to `.env.local` and fill in **TEST** keys from
   https://dashboard.stripe.com/test/apikeys (test mode must be on).
2. `npm install`
3. `npm run build` (must pass clean) then `npm start`, or deploy to Vercel
   with the same two env vars set.

## Stripe rules (hot zone)

- TEST MODE ONLY. `/api/checkout` refuses to run unless `STRIPE_SECRET_KEY`
  starts with `sk_test_`.
- Keys come from env vars only (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `STRIPE_SECRET_KEY`). Never hardcode keys.
- `.env*` files are git-ignored; only `.env.example` (placeholders) is committed.

## Integration slots

- `<LawnDoctor />` is rendered in `app/layout.tsx` from
  `components/LawnDoctor.tsx`. That file is currently a **STUB** — the real
  chat component is being built by another agent and will replace it.
- Product content in `lib/products.ts` uses placeholder descriptions; real
  guide copy lands separately.
