import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return {
    title: product ? `${product.name} — Groundskeeper Secrets` : "Not found",
    description: product?.tagline ?? "",
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Link
        href="/products"
        className="text-sm font-medium text-green-800 underline"
      >
        ← All guides
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold text-green-950 sm:text-4xl">
        {product.name}
      </h1>
      <p className="mt-2 text-lg text-stone-600">{product.tagline}</p>

      <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-stone-700">{product.description}</p>
        <h2 className="mt-6 font-bold text-green-950">What&apos;s inside</h2>
        <ul className="mt-3 space-y-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-stone-700">
              <span className="mt-0.5 font-bold text-green-700">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-green-950 p-6 sm:flex-row">
        <div>
          <p className="text-sm text-green-200">One-time purchase</p>
          <p className="text-3xl font-extrabold text-white">
            {formatPrice(product.price)}
          </p>
        </div>
        <Link
          href={`/checkout?slug=${product.slug}`}
          className="w-full rounded-lg bg-amber-400 px-8 py-3 text-center font-semibold text-green-950 transition hover:bg-amber-300 sm:w-auto"
        >
          Buy now
        </Link>
      </div>
      <p className="mt-3 text-center text-xs text-stone-500">
        Secure checkout via Stripe (test mode).
      </p>
    </div>
  );
}
