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
      ? `Thank you — ${product.name} | The Gadget Lab`
      : "Thank you — The Gadget Lab",
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
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="h-8 w-8 text-cyan-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-white">
        Thank you — order confirmed!
      </h1>
      <p className="mt-3 text-zinc-400">
        Your copy of <strong className="text-zinc-200">{product.name}</strong>{" "}
        is ready. Hit the button below to download your PDF — and go give a
        gift that won&apos;t end up in a drawer.
      </p>
      <a
        href={product.download}
        download
        className="mt-8 inline-block w-full rounded-lg bg-cyan-400 px-8 py-3.5 font-semibold text-zinc-950 transition hover:bg-cyan-300 sm:w-auto"
      >
        Download {product.name} (PDF)
      </a>
      <p className="mt-4 text-xs text-zinc-500">
        Save the file somewhere safe — this page is your download link.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/products"
          className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
        >
          Browse more guides
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:bg-zinc-900"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
