"use client";

import { useState } from "react";

// Email gate for the free scorecard pack: drop an email, get the download.
// Reads ?src= from the page URL so QR variants (e.g. ?src=chipmas2026 from
// the party sign) are tagged on the signup. Party-proof: if the connection
// eats the signup request, the download is still revealed.
export default function ScorecardGate() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [offline, setOffline] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const src =
      new URLSearchParams(window.location.search).get("src") ?? "web";
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, src }),
      });
      if (!res.ok) throw new Error("subscribe failed");
    } catch {
      setOffline(true);
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div>
        <p className="text-lg font-semibold text-lime-300">
          You&apos;re in! Here&apos;s your pack:
        </p>
        <a
          href="/downloads/free-scorecard-pack.pdf"
          download
          className="mt-4 inline-block rounded-lg bg-lime-400 px-10 py-4 text-lg font-bold text-green-950 transition hover:bg-lime-300"
        >
          ⬇ Download the free pack (PDF)
        </a>
        <p className="mx-auto mt-3 max-w-md text-sm text-green-200">
          {offline
            ? "The connection hiccuped — if you don't get a confirmation later, add your name to the paper signup sheet at the food table so we don't lose you."
            : "You're on the Crew list — first to get new scorecards, tournament invites, and the Chipmas video."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="w-full flex-1 rounded-lg border border-green-700 bg-white px-4 py-3.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-lime-400 px-8 py-3.5 text-lg font-bold text-green-950 transition hover:bg-lime-300 disabled:opacity-60"
        >
          {status === "sending" ? "One sec…" : "Send me the free pack"}
        </button>
      </div>
      <p className="mt-3 text-sm text-green-200">
        6 pages · Print on letter paper, scorecards in landscape · Free
        forever — we just need to know where to send it. No spam, Crew news
        only.
      </p>
    </form>
  );
}
