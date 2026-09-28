"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ThankYouInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="h-8 w-8 text-green-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-green-950">
        Thank you — order confirmed!
      </h1>
      <p className="mt-3 text-stone-600">
        Your payment went through (test mode). Your playbook download link is on
        its way — check your inbox in a few minutes.
      </p>
      {sessionId && (
        <p className="mt-4 break-all text-xs text-stone-400">
          Order reference: {sessionId}
        </p>
      )}
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/products"
          className="rounded-lg bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-900"
        >
          Browse more playbooks
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-stone-300 px-6 py-3 font-semibold text-green-950 transition hover:bg-stone-100"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-xl px-6 py-16 text-center text-stone-600">
          Loading…
        </div>
      }
    >
      <ThankYouInner />
    </Suspense>
  );
}
