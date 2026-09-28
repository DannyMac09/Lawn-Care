# Lawn Doctor 🌿

A Gemini-powered chat salesperson for the Groundskeeper Secrets storefront.
Visitors ask lawn questions in plain English; the Lawn Doctor answers like a
friendly 30-year groundskeeper and recommends the right digital product when it
genuinely fits. Faceless brand — it discloses that it's an AI assistant.

## Files

| File | What it is |
|---|---|
| `lib/lawn-doctor-prompt.ts` | System prompt + `PRODUCTS` catalog (single source of truth for what may be sold) |
| `app/api/lawn-doctor/route.ts` | Next.js App Router API route: `POST /api/lawn-doctor` → Gemini |
| `components/LawnDoctor.tsx` | Floating chat widget (Tailwind only, no UI framework) |

## Wiring it into the Next.js storefront

1. **Copy the files** into your Next.js app, keeping the same relative layout:
   - `app/api/lawn-doctor/route.ts` → your app's `app/api/lawn-doctor/route.ts`
   - `components/LawnDoctor.tsx` → your app's `components/LawnDoctor.tsx`
   - `lib/lawn-doctor-prompt.ts` → your app's `lib/lawn-doctor-prompt.ts`
   - The route imports the prompt lib via a relative path, so keep that layout.

2. **Set the API key** (server-side only — never expose it to the browser):
   ```bash
   # .env.local (local dev)
   GEMINI_API_KEY=your-gemini-api-key-here
   ```
   On Vercel: Project Settings → Environment Variables → add `GEMINI_API_KEY`
   (all environments), then redeploy.

3. **Mount the widget** so it appears on every page — e.g. in
   `app/layout.tsx`:
   ```tsx
   import LawnDoctor from './components/LawnDoctor';

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>
           {children}
           <LawnDoctor />
         </body>
       </html>
     );
   }
   ```

4. **Point products at your real store pages.** Edit the `url` fields in
   `PRODUCTS` inside `lib/lawn-doctor-prompt.ts`. The widget auto-links
   product names in the AI's replies to those URLs.

## Environment variables

| Name | Required | Notes |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key. Read only via `process.env` in the API route — never sent to the client. |

## Behavior notes

- **Model:** pinned to `gemini-3.8-flash` in the route. Change `GEMINI_URL` if you ever want a different model.
- **Rate limiting:** 20 requests/minute per IP, in-memory. Resets on redeploy and isn't shared across instances — fine for launch; swap in Redis or Vercel's rate limiting when traffic grows. Tunables are at the top of `route.ts`.
- **Timeouts:** the Gemini call aborts after 25s and returns a friendly error.
- **Sales rules** (enforced in the system prompt): only recommends from the `PRODUCTS` catalog (never invents products), max one product per answer unless asked to compare, answers are 2–4 sentences unless detail is requested, discloses it's AI when asked.
- **History:** the widget sends recent conversation history with each request (capped at 20 turns server-side) so follow-up questions work.

## Quick test

```bash
curl -X POST http://localhost:3000/api/lawn-doctor \
  -H 'Content-Type: application/json' \
  -d '{"message":"My lawn has brown patchy spots in October, what should I do?"}'
# → {"reply":"..."}
```

## No credentials in this repo

There are no API keys, tokens, or secrets anywhere in these files. The only
secret is `GEMINI_API_KEY`, which lives in your environment, not in code.
