// Product catalog for the Groundskeeper Secrets storefront.
// Plain-English lawn guides written from 30+ years of real groundskeeping.

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
    slug: "fall-overseeding-playbook",
    name: "Fall Overseeding Playbook",
    price: 29,
    tagline: "Thick, green grass by spring — step by step.",
    description:
      "A plain-English, step-by-step playbook for overseeding your lawn in the fall: when to seed, how much to put down, and how to water it in. Written from 30+ years of real groundskeeping experience.",
    features: [
      "Exactly when to seed, down to the week",
      "Seed rates that actually work",
      "A watering schedule for new seed",
      "The mistakes that waste your seed",
    ],
    download: "",
    paypalUrl: "",
  },
  {
    slug: "lawn-calendar",
    name: "Year-Round Lawn Calendar",
    price: 19,
    tagline: "Know exactly what to do, every single month.",
    description:
      "The right job, in the right month — never buy the wrong bag again. This 19-page calendar walks your lawn through all twelve months: what to do, what to skip, and the soil temperatures that tell you it's actually time (not just what the bag says). Built around simple monthly checklists, a mowing-height cheat sheet, and a one-page Year at a Glance you can pin in the shed. Written by a groundskeeper with 30+ years on real turf, in plain English.",
    features: [
      "12 months of tasks in plain English, each with a checklist",
      "Soil-temperature triggers — seed and feed by the thermometer, not the date",
      "What NOT to do each season (the expensive mistakes)",
      "Mowing-height cheat sheet and a printable Year at a Glance",
    ],
    download: "/downloads/lawn-calendar.pdf",
    paypalUrl: "https://www.paypal.com/ncp/payment/TTMYEQP8EDMKA",
  },
  {
    slug: "weed-guide",
    name: "Weed ID & Kill Guide",
    price: 24,
    tagline: "Name the weed, then kill it — without killing the grass.",
    description:
      "Identify the 25 most common lawn weeds by photo and plain description, then get the exact treatment that kills the weed and spares your grass.",
    features: [
      "25 common weeds, pictured and described",
      "The right treatment for each one",
      "Pet- and kid-safe notes",
      "Prevention tips so they don't come back",
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
