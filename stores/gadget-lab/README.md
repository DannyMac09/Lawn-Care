# The Gadget Lab ⚡

Store #3 of the digital product empire — "We test viral gadgets so you don't waste money."

## What's in here

| Folder | What it is |
|---|---|
| `storefront/` | Next.js 14 + Tailwind storefront, dark theme with electric cyan accents. Home, guides, Stripe checkout (**test mode**), thank-you, email capture, Gadget Guru chat widget. |
| `chat/` | The "Gadget Guru" AI salesperson module: system prompt + catalog, API route, chat widget (also wired into the storefront). |
| `agents/` | The always-on crew, retuned for gadgets: daily Shorts scripts (gadget-test hooks), weekly SEO posts (gadget + gift keywords), weekly seasonal emails (holiday push for the gift guide), daily viral-product trend scans. |
| `.github/workflows/` | Actions workflow that runs the crew and commits output back. |
| `products/` | The actual digital products: 2026 Christmas Gadget Gift Guide, Everyday Tech Upgrades Guide. |

## Products

| Guide | Price | Slug |
|---|---|---|
| 2026 Christmas Gadget Gift Guide | $9 | `christmas-gadget-guide` |
| Everyday Tech Upgrades Guide | $12 | `tech-upgrades-guide` |

## The money loop

Shorts (honest gadget tests) + SEO articles pull traffic → visitors land on the store → the **Gadget Guru** chat answers gadget questions and recommends the right guide → **Stripe** collects → buyers join the email list → the **email agent** pushes seasonal picks (heavy Christmas run Oct–Dec). Every piece feeds the next one.

## Setup checklist

1. **Stripe** — TEST MODE until DannyMac approves going live. Live keys go in Vercel env vars.
2. **Gemini API key** — repo secret `GEMINI_API_KEY` for the agent crew (Settings → Secrets → Actions).
3. **Vercel** — import, set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `GEMINI_API_KEY`, deploy.
4. **Affiliate links** — products contain `[AFFILIATE: description]` placeholders; swap in real Amazon Associates links (tracking ID `groundskeep09-20`).

## Standing rules

- Stripe stays in **test mode** until DannyMac explicitly approves going live.
- Gadget Guru only recommends products from its catalog — never invents products, brands, or endorsements.
- No credentials in code, ever. Env vars only.
