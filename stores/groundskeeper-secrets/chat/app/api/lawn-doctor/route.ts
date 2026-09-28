import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '../../../lib/lawn-doctor-prompt';

/**
 * POST /api/lawn-doctor
 * Body: { message: string, history?: { role: 'user' | 'assistant', text: string }[] }
 * Returns: { reply: string } or { error: string }
 *
 * The Gemini API key lives ONLY on the server (process.env.GEMINI_API_KEY)
 * and is never sent to the browser.
 */

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent';

// ---- Tunables -------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // max requests per IP per window
const GEMINI_TIMEOUT_MS = 25_000; // give up on Gemini after 25s
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_ITEMS = 20;

// ---- In-memory per-IP rate limiter ----------------------------------------
// NOTE: state lives in this server instance only — it resets on redeploy and
// is not shared across multiple instances. For production scale, swap this
// for Redis or your hosting platform's rate limiting.
const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  // Guard against unbounded memory growth from unique IPs
  if (requestLog.size > 10_000) {
    const oldest = requestLog.keys().next().value;
    if (oldest !== undefined) requestLog.delete(oldest);
  }
  return false;
}

// ---- Types ----------------------------------------------------------------
interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

function toGeminiContents(history: ChatMessage[], message: string) {
  const contents = history.slice(-MAX_HISTORY_ITEMS).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.text }],
  }));
  contents.push({ role: 'user', parts: [{ text: message }] });
  return contents;
}

/** Pull the reply text out of a Gemini generateContent response, defensively. */
function extractReply(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null;
  const candidates = (data as { candidates?: unknown }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const parts = (
    candidates[0] as { content?: { parts?: { text?: string }[] } }
  ).content?.parts;
  if (!Array.isArray(parts)) return null;
  const text = parts
    .map((p) => p.text ?? '')
    .join('')
    .trim();
  return text.length > 0 ? text : null;
}

// ---- Handler ---------------------------------------------------------------
export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[lawn-doctor] GEMINI_API_KEY is not set');
    return NextResponse.json(
      { error: 'Chat is not configured yet.' },
      { status: 500 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages — please wait a minute and try again.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { message, history } = (body as { message?: unknown; history?: unknown }) ?? {};

  if (typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const chatHistory: ChatMessage[] = Array.isArray(history)
    ? history
        .filter(
          (h): h is ChatMessage =>
            typeof h === 'object' &&
            h !== null &&
            ((h as ChatMessage).role === 'user' ||
              (h as ChatMessage).role === 'assistant') &&
            typeof (h as ChatMessage).text === 'string',
        )
        .slice(-MAX_HISTORY_ITEMS)
    : [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Header (not URL param) so the key never lands in access logs
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: toGeminiContents(chatHistory, message.trim()),
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
      }),
      signal: controller.signal,
    });

    if (!geminiRes.ok) {
      console.error(`[lawn-doctor] Gemini API error: ${geminiRes.status}`);
      return NextResponse.json(
        { error: 'The Lawn Doctor is taking a break. Try again in a moment.' },
        { status: 502 },
      );
    }

    const data: unknown = await geminiRes.json();
    const reply = extractReply(data);
    if (!reply) {
      // e.g. the response was blocked or came back empty
      return NextResponse.json(
        { error: 'The Lawn Doctor is taking a break. Try again in a moment.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json(
        { error: 'That took too long — try asking again.' },
        { status: 504 },
      );
    }
    console.error('[lawn-doctor] request failed', err);
    return NextResponse.json(
      { error: 'Something went wrong. Try again in a moment.' },
      { status: 500 },
    );
  } finally {
    clearTimeout(timer);
  }
}
