// Product catalog for the Campfire Secrets storefront.
// Real product content is being written separately — descriptions below are
// placeholders and will be replaced with the finished guides.

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
    slug: "camp-cooking-playbook",
    name: "Campground Cooking Playbook",
    price: 19,
    tagline: "Campfire and camp-stove meals that actually work outdoors.",
    description:
      "A plain-English playbook for feeding your crew at camp: campfire and camp-stove meals that actually turn out right outdoors, with no fussy equipment and no burned dinners. (Full guide content in progress — placeholder description.)",
    features: [
      "3-day camp meal plans that feed a crowd",
      "Cast iron basics for the campfire",
      "Food safety rules for cooking outdoors",
      "Complete camp-kitchen packing list",
    ],
  },
  {
    slug: "fishing-checklists",
    name: "Fishing Trip Checklist Pack",
    price: 12,
    tagline: "Never forget a single piece of gear again.",
    description:
      "The pre-trip checklists that make sure everything — tackle, gear, license, and safety — is packed and legal before you pull out of the driveway. (Full guide content in progress — placeholder description.)",
    features: [
      "Pre-trip checklists for every outing",
      "Tackle and gear lists that leave nothing behind",
      "License and safety reminders by state",
      "Species quick-reference card",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}
