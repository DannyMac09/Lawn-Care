import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return {
    title: product
      ? `Thank you — ${product.name} | Bucket Golf HQ`
      : "Thank you — Bucket Golf HQ",
  };
}

export default function ProductThankYouPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

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
        Your copy of <strong>{product.name}</strong> is ready. Hit the button
        below to download your PDF — print it, pin it to the cooler, and go
        play.
      </p>
      <a
        href={product.download}
        download
        className="mt-8 inline-block w-full rounded-lg bg-lime-400 px-8 py-3.5 font-semibold text-green-950 transition hover:bg-lime-300 sm:w-auto"
      >
        Download {product.name} (PDF)
      </a>
      <p className="mt-4 text-xs text-stone-500">
        Save the file somewhere safe — this page is your download link.
      </p>
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
