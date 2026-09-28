import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm transition hover:shadow-md hover:border-zinc-700">
      <h3 className="text-lg font-bold text-white">{product.name}</h3>
      <p className="mt-1 text-sm text-zinc-400">{product.tagline}</p>
      <p className="mt-2 text-2xl font-extrabold text-cyan-400">
        {formatPrice(product.price)}
      </p>
      <div className="mt-4 flex flex-1 flex-col justify-end gap-2">
        <Link
          href={`/products/${product.slug}`}
          className="rounded-lg bg-cyan-400 px-4 py-2.5 text-center font-semibold text-zinc-950 transition hover:bg-cyan-300"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
