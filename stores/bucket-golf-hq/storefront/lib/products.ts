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
  download: string; // path under /public where the deliverable file lives
  paypalUrl: string; // PayPal payment link buyers use to purchase this product
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
    download: "/downloads/bucket-golf-rulebook.pdf",
    paypalUrl: "https://www.paypal.com/ncp/payment/5P4Q8SMXLCHN4",
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
    download: "/downloads/league-starter-kit.pdf",
    paypalUrl: "https://www.paypal.com/ncp/payment/EB3NUHQ3MWQCJ",
  },
  {
    slug: "tournament-organizer-kit",
    name: "Tournament & League Organizer Kit",
    price: 24,
    tagline: "Brackets, handicaps, and a champion — handled.",
    description:
      "Playing the game is easy. Running the event is the hard part — until now. This 27-page organizer kit gives you print-ready brackets for 4, 8, and 16 players, double-elimination and round-robin formats, a simple handicap system that keeps every match close, a full league season pack with points and playoffs, and an official house rules sheet that settles the 'in the bucket vs. hit the bucket' debate for good. It even includes printable champion, runner-up, and Bucket Ace certificates, so somebody leaves with proof. Print it, pin it to the cooler, and crown a champion.",
    features: [
      "Print-ready brackets: single-elimination (4/8/16), double-elimination, and round-robin",
      "Six game formats explained: stroke play, match play, scramble, best ball, skins, and shootout",
      "A simple handicap system with a worked example and printable handicap cards",
      "Full league season pack: 8-week schedule, points system, standings, and playoffs",
      "Official house rules sheet plus printable scorecards — including the hole-in-0",
      "Champion, runner-up, and Bucket Ace certificates ready to print and sign",
    ],
    download: "/downloads/bucket_golf_tournament_kit_v1_1.pdf",
    paypalUrl: "https://www.paypal.com/ncp/payment/AUTN52JASLXZ2",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}
