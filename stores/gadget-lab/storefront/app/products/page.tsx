import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "All Guides — The Gadget Lab",
  description: "Every Gadget Lab tech guide in one place.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
        All guides
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Every guide is tested by us and written in plain English. Pick the one
        your setup needs.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
