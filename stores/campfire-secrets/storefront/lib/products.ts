// Product catalog for the Campfire Secrets storefront.
// Plain-English campground guides from decades of real campground life.

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
    slug: "camp-cooking-playbook",
    name: "Campground Cooking Playbook",
    price: 19,
    tagline: "Campfire and camp-stove meals that actually work outdoors.",
    description:
      "Not just recipes — a whole-trip meal system. This playbook plans your camp food the way real campground cooks do: prep at home, a day-by-day meal plan, and a shopping and packing list that matches it, so nothing gets forgotten and nothing spoils. Inside: cast-iron and Dutch-oven basics with the coal counts that actually work, food-safety rules for cooking outdoors, and meals that feed a crowd without a fuss. Written in plain English from decades of campground life.",
    features: [
      "Whole-trip meal system: prep at home + day-by-day plan + matching shopping list",
      "Cast iron and Dutch-oven basics, with coal counts that work",
      "Food safety rules for cooking outdoors",
      "Complete camp-kitchen packing list",
    ],
    download: "/downloads/camp-cooking-playbook.pdf",
    paypalUrl: "https://www.paypal.com/ncp/payment/NU3HKWWRK5UPS",
  },
  {
    slug: "fishing-checklists",
    name: "Fishing Trip Checklist Pack",
    price: 12,
    tagline: "Never forget a single piece of gear again.",
    description:
      "The pre-trip checklists that make sure everything — tackle, gear, license, and safety — is packed and legal before you pull out of the driveway.",
    features: [
      "Pre-trip checklists for every outing",
      "Tackle and gear lists that leave nothing behind",
      "License and safety reminders by state",
      "Species quick-reference card",
    ],
    download: "",
    paypalUrl: "",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}

// PayPal wiring for Campground Cooking Playbook verified 2026-11-25.
