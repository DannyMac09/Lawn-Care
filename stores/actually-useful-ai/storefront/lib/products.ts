// Product catalog for the Actually Useful AI storefront.
// Digital AI guides for regular people — plain English, zero jargon.

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
    slug: "ai-for-regular-people",
    name: "AI for Regular People",
    price: 19,
    tagline: "Finally understand AI — and actually use it every day.",
    description:
      "A plain-English starter guide for total beginners: what AI actually is (no hype, no tech talk), how to talk to it so you get good answers, and 10 real everyday uses — writing emails, planning trips, cooking from what you have, budgeting, and more. Plus the safety basics: what you should never share with an AI chatbot.",
    features: [
      "What AI is, explained like you're five",
      "How to ask it questions that get good answers",
      "10 everyday uses: emails, trips, recipes, budgeting & more",
      "Safety basics: what never to share",
    ],
  },
  {
    slug: "everyday-ai-prompts",
    name: "100 Everyday AI Prompts",
    price: 12,
    tagline: "Copy, paste, done — 100 prompts for real life.",
    description:
      "100 copy-paste prompts you can use with any AI chatbot today — no learning curve, no setup. They're organized by life area: home, money, health, work, and fun. Each prompt comes with a one-line note saying exactly when to use it, so you always know which one to grab.",
    features: [
      "100 copy-paste prompts, zero learning curve",
      "Organized by life area: home, money, health, work, fun",
      "Each prompt says exactly when to use it",
      "Works with any AI chatbot",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}
