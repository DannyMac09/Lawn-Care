# Gadget Guru ⚡

A Gemini-powered chat salesperson for The Gadget Lab storefront.
Visitors ask gadget questions in plain English; the Gadget Guru answers like a
sharp gadget-tester friend who calls out overhyped junk honestly — and
recommends the right digital guide when it genuinely fits. Faceless brand — it
discloses that it's an AI assistant.

## Files

| File | What it is |
|---|---|
| `lib/gadget-guru-prompt.ts` | System prompt + `PRODUCTS` catalog (single source of truth for what may be sold) |
| `app/api/gadget-guru/route.ts` | Next.js App Router API route: `POST /api/gadget-guru` → Gemini |
| `components/GadgetGuru.tsx` | Floating chat widget (Tailwind only, no UI framework) |

## Wiring it into the Next.js storefront

1. **Copy the files** into your Next.js app, keeping the same relative layout:
   - `app/api/gadget-guru/route.ts` → your app's `app/api/gadget-guru/route.ts`
   - `components/GadgetGuru.tsx` → your app's `components/GadgetGuru.tsx`
   - `lib/gadget-guru-prompt.ts` → your app's `lib/gadget-guru-prompt.ts`
   - The route imports the prompt lib via a relative path, so keep that layout.

2. **Set the API key** (server-side only — never expose it to the browser):
   ```bash
   # .env.local (local dev)
GEMINI_API_KEY=<redacted>
   ```
   On Vercel: Project Settings → Environment Variables → add `GEMINI_API_KEY`
   (all environments), then redeploy.

3. **Mount the widget** so it appears on every page — e.g. in
   `app/layout.tsx`:
   ```tsx
   import GadgetGuru from '@/components/GadgetGuru';

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>
           {children}
           <GadgetGuru />
         </body>
       </html>
     );
   }
   ```

4. **Point products at your real store pages.** Edit the `url` fields in
   `PRODUCTS` inside `lib/gadget-guru-prompt.ts`. The widget auto-links
   product names in the AI's replies to those URLs.

## Environment variables

| Name | Required | Notes |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key. Read only via `process.env` in the API route — never sent to the client. |

## Behavior notes

- In-memory per-IP rate limit: 20 requests/minute.
- 25s timeout on the Gemini call.
- Messages capped at 1000 chars; last 20 history items sent as context.
- The AI may recommend only the products in `PRODUCTS` — one per answer
  unless the user asks to compare. It never invents prices, products, or
  discounts, and it discloses it's an AI assistant when asked.
