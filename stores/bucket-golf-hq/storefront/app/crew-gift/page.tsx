import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Your Crew Gift — Bucket Golf HQ",
  description:
    "Bought the official BucketGolf set through the Cryptic BucketGolf Crew? Claim your free gift: the Free Scorecard Pack plus the Crew Tournament Bracket Sheet.",
};

const inside = [
  {
    title: "Free Scorecard Pack",
    blurb:
      "9-hole and 18-hole scorecards with room for the whole crew, a skins game card, and the quick house rules on the back page. The same pack we hand out at the campground.",
    href: "/downloads/free-scorecard-pack.pdf",
    cta: "⬇ Download the scorecard pack",
  },
  {
    title: "BONUS: Crew Tournament Bracket Sheet",
    blurb:
      "Buyers-only bonus: a printable 8-player single-elimination bracket — quarterfinals, semifinals, final, and a champion line worth signing. Print it and run a knockout tonight.",
    href: "/downloads/crew-bracket-sheet.pdf",
    cta: "⬇ Download the bracket sheet",
  },
];

const steps = [
  {
    n: "1",
    title: "Grab the official set",
    blurb:
      "Use the Crew link in our video descriptions on YouTube and TikTok to get the official BucketGolf set.",
  },
  {
    n: "2",
    title: "Come back here",
    blurb:
      "This page is your gift claim. No codes, no forms, no email needed — if you came through the Crew, you're in.",
  },
  {
    n: "3",
    title: "Download and play",
    blurb:
      "Print the scorecards and the bracket sheet, round up your crew, and crown a champion.",
  },
];

export default function CrewGiftPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-16 text-center sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime-300">
          Free gift
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
          You Got the Set — Here&apos;s Your Gift from the Crew 🎁
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-green-100">
          Bought the official BucketGolf set through the Crew&apos;s link?
          These downloads are yours — free, on us. Thanks for coming through
          the Cryptic BucketGolf Crew.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/downloads/free-scorecard-pack.pdf"
            download
            className="inline-block rounded-lg bg-lime-400 px-8 py-4 text-lg font-bold text-green-950 transition hover:bg-lime-300"
          >
            ⬇ Free Scorecard Pack
          </a>
          <a
            href="/downloads/crew-bracket-sheet.pdf"
            download
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-bold text-green-950 transition hover:bg-green-100"
          >
            ⬇ Bonus Bracket Sheet
          </a>
        </div>
        <p className="mt-3 text-sm text-green-200">
          Print on letter paper · No email needed, no catch
        </p>
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
              <a
                href={item.href}
                download
                className="mt-4 inline-block rounded-lg bg-green-800 px-6 py-3 font-semibold text-white transition hover:bg-green-900"
              >
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="text-2xl font-bold text-green-950 sm:text-3xl">
          How it works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <p className="text-3xl font-extrabold text-lime-500">{s.n}</p>
              <h3 className="mt-2 text-lg font-bold text-green-950">
                {s.title}
              </h3>
              <p className="mt-2 text-stone-600">{s.blurb}</p>
            </div>
          ))}
        </div>

        {/* Don't have the set yet */}
        <div className="mt-12 rounded-xl bg-green-950 px-6 py-10 text-center">
          <h3 className="text-2xl font-bold text-white">
            Don&apos;t have the set yet?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-green-100">
            The gift is for Crew buyers — grab the official set first, then
            come back and claim it.
          </p>
          {/* TODO: swap to creator link when approved */}
          <a
            href="https://www.bucketgolfgame.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-lime-400 px-8 py-3 font-bold text-green-950 transition hover:bg-lime-300"
          >
            See the Official Set
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
