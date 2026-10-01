import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { affiliateProducts } from "@/lib/affiliate-products";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-zinc-950 px-6 py-16 text-center sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_65%)]"
        />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            ⚡ The Gadget Lab
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
            We test viral gadgets so you don&apos;t waste money.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Hands-on tests, honest verdicts, practical tech guides. We buy it,
            break it in, and tell you straight whether it&apos;s worth your
            cash — no hype, no paid placements.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="rounded-lg bg-cyan-400 px-8 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
            >
              Browse the guides
            </Link>
            <Link
              href="#email"
              className="rounded-lg border border-zinc-700 px-8 py-3 font-semibold text-white transition hover:bg-zinc-900"
            >
              Get free test results
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Featured guides
        </h2>
        <p className="mt-2 text-zinc-400">
          Tested by us, written in plain English, priced for real budgets.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

            {/* Recommended gear */}
      <section className="mx-auto max-w-6xl px-6 py-14 bg-zinc-900 rounded-2xl my-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Recommended gear
        </h2>
        <p className="mt-2 text-slate-600">
          Hand-picked products we actually recommend. As an Amazon Associate we earn from qualifying purchases.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {affiliateProducts.map((item) => (
            <a
              key={item.asin}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="rounded-xl border border-zinc-700 bg-zinc-800 p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-bold text-white">{item.name}</h3>
              {item.price && (
                <p className="mt-1 text-lg font-semibold text-cyan-400">{item.price}</p>
              )}
              <p className="mt-2 text-sm text-slate-600">{item.blurb}</p>
              <span className="mt-4 inline-block rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-zinc-950">
                View on Amazon
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Email capture */}
      <section id="email" className="mx-auto max-w-3xl px-6 py-10">
        <EmailCapture />
      </section>

      {/* Testimonials (placeholder) */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          What testers say
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
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm"
            >
              <blockquote className="text-zinc-300">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-cyan-400">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
