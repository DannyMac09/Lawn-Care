"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-6 text-center">
        <p className="text-lg font-semibold text-white">
          You&apos;re on the list!
        </p>
        <p className="mt-1 text-zinc-300">
          Watch your inbox for gadget test results worth knowing.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        Get free gadget test results in your inbox
      </h2>
      <p className="mt-2 text-zinc-400">
        One short email a week. No spam, no hype — just what&apos;s actually
        worth your money.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:w-1/3"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300 disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Join free"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-300">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
