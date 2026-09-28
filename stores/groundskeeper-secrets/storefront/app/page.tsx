import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-green-950 px-6 py-16 text-center sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
          Groundskeeper Secrets
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
          A great lawn isn&apos;t luck. It&apos;s know-how.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-green-100">
          Plain-English lawn guides written from 30+ years of real
          groundskeeping experience. No jargon, no guesswork — just what works.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="rounded-lg bg-amber-400 px-8 py-3 font-semibold text-green-950 transition hover:bg-amber-300"
          >
            Browse the guides
          </Link>
          <Link
            href="#email"
            className="rounded-lg border border-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-900"
          >
            Get free tips
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-green-950 sm:text-3xl">
          Featured guides
        </h2>
        <p className="mt-2 text-stone-600">
          Short, practical, and written in plain English.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Email capture */}
      <section id="email" className="mx-auto max-w-3xl px-6 py-10">
        <EmailCapture />
      </section>

      {/* Testimonials (placeholder) */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-green-950 sm:text-3xl">
          What readers say
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "Placeholder testimonial — real reader reviews coming soon.",
              name: "— Happy reader",
            },
            {
              quote: "Placeholder testimonial — real reader reviews coming soon.",
              name: "— Happy reader",
            },
            {
              quote: "Placeholder testimonial — real reader reviews coming soon.",
              name: "— Happy reader",
            },
          ].map((t, i) => (
            <figure
              key={i}
              className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-stone-700">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-green-900">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
