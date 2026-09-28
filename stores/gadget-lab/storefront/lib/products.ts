// Product catalog for The Gadget Lab storefront.
// Hands-on gadget guides — we test it so you don't waste money.

export interface Product {
  slug: string;
  name: string;
  price: number; // USD, whole dollars
  tagline: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    slug: "christmas-gadget-guide",
    name: "2026 Christmas Gadget Gift Guide",
    price: 9,
    tagline: "The right gadget for everyone on your list — no duds.",
    description:
      "We bought, unboxed, and stress-tested the gadgets everyone's talking about — so your holiday shopping isn't a gamble. Picks are sorted into under-$25 stocking-stuffer winners, under-$50 upgrades worth the money, and splurge picks that are genuinely worth it, each matched to who it's perfect for (the gadget-obsessed teen, the tech-skeptic dad, the always-traveling sister, and more). And because half the internet's gift lists are paid placements, there's a straight-talking \"what to avoid\" section: the viral junk that looks amazing on TikTok and ends up in a drawer by January.",
    features: [
      "Under-$25 winners that don't feel cheap",
      "Under-$50 upgrades worth the money",
      "Splurge picks that are actually worth it",
      "What to avoid: the viral junk not worth buying",
    ],
  },
  {
    slug: "tech-upgrades-guide",
    name: "Everyday Tech Upgrades Guide",
    price: 12,
    tagline: "Small upgrades, big difference — ranked by effort.",
    description:
      "The highest-impact little tech improvements you can make around your home — better lighting, a charging station that ends cable chaos, audio that doesn't sound like a tin can, and a smart-home starter path for when you're ready. Every upgrade is tested by us and each one is rated by setup difficulty, from five-minute plug-and-play wins to full weekend projects — so you always know exactly what you're signing up for before you spend a dollar.",
    features: [
      "Lighting upgrades that change the whole room",
      "Charging station setups that end cable chaos",
      "Audio improvements worth hearing",
      "Smart-home starter path, each step rated by setup difficulty",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}
