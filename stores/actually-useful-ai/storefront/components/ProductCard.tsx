import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-bold text-indigo-950">{product.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{product.tagline}</p>
      <p className="mt-2 text-2xl font-extrabold text-indigo-900">
        {formatPrice(product.price)}
      </p>
      <div className="mt-4 flex flex-1 flex-col justify-end gap-2">
        <Link
          href={`/products/${product.slug}`}
          className="rounded-lg bg-indigo-700 px-4 py-2.5 text-center font-semibold text-white transition hover:bg-indigo-900"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
