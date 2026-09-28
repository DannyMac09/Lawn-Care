# AI Buddy — chat salesperson module for Actually Useful AI

A friendly, beginner-focused chat salesperson for the **Actually Useful AI**
storefront. It answers AI questions in plain English (zero unexplained jargon)
and only recommends products when genuinely relevant — never inventing
products, prices, or discounts.

## Files

| File | What it is |
|---|---|
| `lib/ai-buddy-prompt.ts` | The single source of truth: `PRODUCTS` catalog (exact names, prices, buy URLs) and the `SYSTEM_PROMPT` sent to Gemini. To add a product, add it to `PRODUCTS` — the prompt, widget auto-links, and catalog context update automatically. |
| `components/AIBuddy.tsx` | Floating chat widget (bottom-right, mobile-friendly). Includes typing indicator, error state, and auto-linking of product names to `/products/<slug>`. Uses `**bold**` rendering from model replies. |
| `app/api/ai-buddy/route.ts` | Server-side API: validates input, rate-limits per IP (~20 req/min, in-memory), calls Gemini `gemini-3.8-flash` with a 25s timeout. The `GEMINI_API_KEY` lives only on the server and is sent via the `x-goog-api-key` header — never in the browser, never in a URL param. |

## Wiring it into the storefront

Copy the files into a Next.js App Router project:

- `lib/ai-buddy-prompt.ts` → `<project>/lib/ai-buddy-prompt.ts`
- `components/AIBuddy.tsx` → `<project>/components/AIBuddy.tsx`
- `app/api/ai-buddy/route.ts` → `<project>/app/api/ai-buddy/route.ts` —
  fix the import depth back to `../../../lib/ai-buddy-prompt`

Then render it once in the root layout:

```tsx
import AIBuddy from "@/components/AIBuddy";
// inside <body>: <AIBuddy />
```

## Env vars

- `GEMINI_API_KEY` (server only) — the Gemini API key. Without it the API
  route returns a 500 "Chat is not configured yet." Never expose it as a
  `NEXT_PUBLIC_*` variable.

## Persona rules (baked into SYSTEM_PROMPT)

- Friendly AI guide for **total beginners**; plain English, zero unexplained jargon.
- Catalog = the products in `PRODUCTS` above. Never invent products.
- Recommends only when genuinely relevant, max one product per answer
  (unless the user asks to compare), with exact name + price.
- 2–4 sentence answers unless the user asks for detail or a step-by-step.
- Discloses it is an AI assistant when asked. Never pretends to be a person.
- Stays on AI-beginner topics; politely redirects anything far outside.
