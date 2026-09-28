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
      <div className="rounded-xl bg-indigo-900 p-6 text-center">
        <p className="text-lg font-semibold text-white">
          You&apos;re on the list!
        </p>
        <p className="mt-1 text-indigo-100">
          Watch your inbox for AI tips in plain English.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-indigo-900 p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        Get free AI tips in your inbox
      </h2>
      <p className="mt-2 text-indigo-100">
        One short email a week. No jargon, no spam — just AI made simple.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-indigo-600 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 sm:w-1/3"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-indigo-600 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg bg-violet-400 px-6 py-3 font-semibold text-indigo-950 transition hover:bg-violet-300 disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Join free"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-200">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
