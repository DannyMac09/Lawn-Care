// Product catalog for the Groundskeeper Secrets storefront.
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
    slug: "fall-overseeding-playbook",
    name: "Fall Overseeding Playbook",
    price: 29,
    tagline: "Thick, green grass by spring — step by step.",
    description:
      "A plain-English, step-by-step playbook for overseeding your lawn in the fall: when to seed, how much to put down, and how to water it in. Written from 30+ years of real groundskeeping experience. (Full guide content in progress — placeholder description.)",
    features: [
      "Exactly when to seed, down to the week",
      "Seed rates that actually work",
      "A watering schedule for new seed",
      "The mistakes that waste your seed",
    ],
  },
  {
    slug: "lawn-calendar",
    name: "Year-Round Lawn Calendar",
    price: 19,
    tagline: "Know exactly what to do, every single month.",
    description:
      "A month-by-month calendar that tells you exactly what your lawn needs and when — mowing heights, feeding, seeding windows, and what to skip entirely. (Full guide content in progress — placeholder description.)",
    features: [
      "12 months of tasks in plain English",
      "Mowing-height cheat sheet",
      "What NOT to do each season",
      "Printable one-page version",
    ],
  },
  {
    slug: "weed-guide",
    name: "Weed ID & Kill Guide",
    price: 24,
    tagline: "Name the weed, then kill it — without killing the grass.",
    description:
      "Identify the 25 most common lawn weeds by photo and plain description, then get the exact treatment that kills the weed and spares your grass. (Full guide content in progress — placeholder description.)",
    features: [
      "25 common weeds, pictured and described",
      "The right treatment for each one",
      "Pet- and kid-safe notes",
      "Prevention tips so they don't come back",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(dollars: number): string {
  return `$${dollars.toFixed(2)}`;
}
