import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScorecardGate from "@/components/ScorecardGate";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Free Bucket Golf Scorecard Pack — Bucket Golf HQ",
  description:
    "Free printable bucket golf scorecards for big groups: 9-hole, 18-hole, and skins cards with room for up to 24 players. Print them and play.",
};

const inside = [
  {
    title: "9-hole scorecards × 2 sheets",
    blurb:
      "Room for 12 players per sheet — 24 across both. Par and handicap-rank rows included, plus space for date, course, and format.",
  },
  {
    title: "18-hole championship card",
    blurb:
      "Front nine, back nine, Out / In / Total columns for 8 players. Print extra copies for bigger championship fields.",
  },
  {
    title: "Skins game card",
    blurb:
      "All 18 holes with skin-worth, winner, and running-total columns — built for carryovers that make the last holes very serious.",
  },
  {
    title: "Quick house rules",
    blurb:
      "The short version on the back page: finishing a hole, the hole-in-0, bounce-outs, max score, and lost balls — settled before the first argument starts.",
  },
];

export default function FreeScorecardsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-16 text-center sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime-300">
          Free download
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
          The Free Bucket Golf Scorecard Pack
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-green-100">
          The game ships with three little paper cards. Your group is bigger
          than that. Print a stack of these — 9-hole, 18-hole, and skins
          cards sized for real groups — and keep score like you mean it.
        </p>
        <div className="mt-8" id="get-the-pack">
          <ScorecardGate />
        </div>
      </section>

      {/* What's inside */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-green-950 sm:text-3xl">
          What&apos;s inside
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {inside.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-green-950">
                {item.title}
              </h3>
              <p className="mt-2 text-stone-600">{item.blurb}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#get-the-pack"
            className="inline-block rounded-lg bg-green-800 px-8 py-3 font-semibold text-white transition hover:bg-green-900"
          >
            Get the free scorecards
          </a>
        </div>
      </section>

      {/* Paid products */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-green-950 sm:text-3xl">
          Outgrowing the free cards?
        </h2>
        <p className="mt-2 text-stone-600">
          When your group is ready for brackets, handicaps, and a full
          season, the playbooks run the whole show.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-stone-500">
          Prefer to browse first?{" "}
          <Link href="/products" className="font-semibold text-green-800 underline">
            See all products
          </Link>
        </p>
      </section>
    </div>
  );
}
