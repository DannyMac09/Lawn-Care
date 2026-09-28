import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "All Playbooks — Bucket Golf HQ",
  description: "The bucket golf rulebook and the backyard league starter kit, all in one place.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-3xl font-extrabold text-green-950 sm:text-4xl">
        All playbooks
      </h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        Everything your crew needs to learn the game and run a season — in
        plain English, no fluff. Instant download after checkout.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
