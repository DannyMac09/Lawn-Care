import { redirect } from "next/navigation";
import { getProduct } from "@/lib/products";

// Checkout now happens on PayPal via per-product payment links
// (see paypalUrl in lib/products.ts). This page exists so old links
// to /checkout?slug=... still land buyers on the right PayPal page.
// The old Stripe checkout route (app/api/checkout) is dormant and
// intentionally left untouched.
export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
  const product = searchParams?.slug ? getProduct(searchParams.slug) : undefined;
  if (product) {
    redirect(product.paypalUrl);
  }
  redirect("/products");
}
