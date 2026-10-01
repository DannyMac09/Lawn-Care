import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { affiliateProducts } from "@/lib/affiliate-products";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-indigo-950 px-6 py-16 text-center sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
          Actually Useful AI
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">
          AI in plain English. No tech degree required.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
          Friendly guides that show you what AI really is, how to talk to it,
          and how to use it every single day — written for regular people, not
          programmers.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="rounded-lg bg-violet-400 px-8 py-3 font-semibold text-indigo-950 transition hover:bg-violet-300"
          >
            Browse the downloads
          </Link>
          <Link
            href="#email"
            className="rounded-lg border border-indigo-700 px-8 py-3 font-semibold text-white transition hover:bg-indigo-900"
          >
            Get free tips
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-indigo-950 sm:text-3xl">
          Featured downloads
        </h2>
        <p className="mt-2 text-slate-600">
          Short, practical, and written in plain English.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

            {/* Recommended gear */}
      <section className="mx-auto max-w-6xl px-6 py-14 bg-indigo-50 rounded-2xl my-8">
        <h2 className="text-2xl font-bold text-indigo-950 sm:text-3xl">
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
              className="rounded-xl border border-indigo-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-bold text-indigo-950">{item.name}</h3>
              {item.price && (
                <p className="mt-1 text-lg font-semibold text-indigo-700">{item.price}</p>
              )}
              <p className="mt-2 text-sm text-slate-600">{item.blurb}</p>
              <span className="mt-4 inline-block rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white">
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
        <h2 className="text-2xl font-bold text-indigo-950 sm:text-3xl">
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
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-indigo-900">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
