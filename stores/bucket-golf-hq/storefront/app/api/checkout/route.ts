import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

// Creates a Stripe Checkout Session. Keys come from env vars — never
// hardcoded. Runs in whatever mode the configured key is: a test key
// (sk_test_...) charges test cards only, a live key (sk_live_...) charges
// real cards. The test-mode-only hot-zone guard was lifted by dannymac on
// 2026-10-20 so the store can take real payments.
export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Checkout isn't configured yet (missing STRIPE_SECRET_KEY)." },
      { status: 503 }
    );
  }

  if (!secretKey.startsWith("sk_test_") && !secretKey.startsWith("sk_live_")) {
    console.error("[checkout] Refusing to run: STRIPE_SECRET_KEY is not a recognized Stripe secret key.");
    return NextResponse.json(
      { error: "Checkout is not configured with a valid Stripe key." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const product =
    typeof body.slug === "string" ? getProduct(body.slug) : undefined;

  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);

  const origin = new URL(req.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.tagline,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/products/${product.slug}`,
  });

  return NextResponse.json({ url: session.url });
}
