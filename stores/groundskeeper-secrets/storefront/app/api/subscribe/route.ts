import { NextResponse } from "next/server";

// Email capture endpoint. For now it just logs the signup — wire this to a
// real email provider (ConvertKit, Mailchimp, etc.) when ready.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  console.log(
    `[subscribe] ${new Date().toISOString()} name="${name}" email="${email}"`
  );

  return NextResponse.json({ ok: true });
}
