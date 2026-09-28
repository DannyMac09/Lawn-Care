"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice, getProduct } from "@/lib/products";

function CheckoutInner() {
  const params = useSearchParams();
  const slug = params.get("slug") ?? "";
  const product = getProduct(slug);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-indigo-950">No product selected</h1>
        <p className="mt-2 text-slate-600">
          Pick a guide first, then head to checkout.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-indigo-700 px-6 py-3 font-semibold text-white hover:bg-indigo-900"
        >
          Browse guides
        </Link>
      </div>
    );
  }

  async function pay() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product!.slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Checkout failed.");
      if (!data.url) throw new Error("No checkout URL returned.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-14">
      <p className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-900">
        Test mode — no real charge
      </p>
      <h1 className="mt-4 text-3xl font-extrabold text-indigo-950">Checkout</h1>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-bold text-indigo-950">{product.name}</p>
            <p className="mt-1 text-sm text-slate-600">{product.tagline}</p>
          </div>
          <p className="text-xl font-extrabold text-indigo-900">
            {formatPrice(product.price)}
          </p>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-slate-700">Total</span>
            <span className="text-indigo-950">{formatPrice(product.price)}</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </p>
      )}

      <button
        onClick={pay}
        disabled={busy}
        className="mt-6 w-full rounded-lg bg-indigo-700 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-900 disabled:opacity-60"
      >
        {busy ? "Redirecting to Stripe…" : `Pay ${formatPrice(product.price)} (test)`}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        You&apos;ll complete payment securely on Stripe&apos;s test checkout page.
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-xl px-6 py-16 text-center text-slate-600">
          Loading checkout…
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}
