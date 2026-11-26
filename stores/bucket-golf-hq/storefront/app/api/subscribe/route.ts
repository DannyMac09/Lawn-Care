import { NextResponse } from "next/server";

// Email capture endpoint.
// Every signup is written to the function log as a single-line JSON record
// (search the Vercel project logs for "[subscribe]"). If the
// SUBSCRIBE_WEBHOOK_URL env var is set on the Vercel project, the same
// record is also forwarded there — that is the hook for the n8n signup
// router (W3) and the MailerLite Day 0/2/7 sequence.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const email =
    typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const rawSrc =
    typeof body.src === "string" ? body.src.trim().toLowerCase() : "";
  const src = /^[a-z0-9_-]{1,40}$/.test(rawSrc) ? rawSrc : "web";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const record = {
    ts: new Date().toISOString(),
    name,
    email,
    src,
    ua: req.headers.get("user-agent") ?? "",
  };
  console.log(`[subscribe] ${JSON.stringify(record)}`);

  const hook = process.env.SUBSCRIBE_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(3000),
      });
    } catch {
      // Best-effort only — the log line above is the record of truth.
    }
  }

  return NextResponse.json({ ok: true });
}
