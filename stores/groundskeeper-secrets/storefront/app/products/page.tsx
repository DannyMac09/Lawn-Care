import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "All Guides — Groundskeeper Secrets",
  description: "Every Groundskeeper Secrets lawn guide in one place.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-extrabold text-green-950 sm:text-4xl">
        All guides
      </h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        Every guide is written in plain English and based on decades of real
        groundskeeping work. Pick the one your lawn needs.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
