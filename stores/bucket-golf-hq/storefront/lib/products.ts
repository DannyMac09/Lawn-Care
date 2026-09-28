// Product catalog for the Bucket Golf HQ storefront.
//
// Full guide content for these products is being written separately by
// another worker; the descriptions and features below are real, finished
// marketing copy for the finished products.

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
    slug: "bucket-golf-rulebook",
    name: "The Bucket Golf Rulebook",
    price: 15,
    tagline: "Learn it in 10 minutes, argue about it for years.",
    description:
      "Bucket golf is simple — a bucket, a ball, a club, and a group of friends — but every great backyard argument starts with someone claiming 'that's not how we play it.' This is the rulebook that settles it. It lays out clear, common-sense rules for how to play, how to score, and how to settle disputes, plus the most popular variations so your crew can pick the flavor that fits your vibe. Print it, pin it to the cooler, and never argue about the rules mid-round again.",
    features: [
      "How to play: setup, turns, and winning in plain English",
      "The official-ish rules that settle every backyard dispute",
      "Simple scoring explained with real examples",
      "The most popular variations and house rules worth stealing",
    ],
  },
  {
    slug: "league-starter-kit",
    name: "Backyard League Starter Kit",
    price: 29,
    tagline: "Run your crew's season like a pro.",
    description:
      "One-off games are fun, but a league is a lifestyle. This kit gives you everything you need to run your crew's bucket golf season like a commissioner: a season format that keeps everyone coming back, printable scorecards, a handicap system so new players stay competitive, and a tournament-day runbook that covers brackets, timing, and payouts. Built for tailgates, campgrounds, and backyards everywhere.",
    features: [
      "A full season format with points, playoffs, and a champion",
      "Bracket and matchup templates for tournament day",
      "Printable scorecards ready for the clipboard",
      "A handicap system that keeps games close for everyone",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}
