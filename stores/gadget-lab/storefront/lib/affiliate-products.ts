// Recommended affiliate products for the storefront.
// Amazon Associates tracking ID: groundskeep09-20

export interface AffiliateProduct {
  name: string;
  asin: string;
  price: string;
  blurb: string;
  url: string;
}

const TAG = "groundskeep09-20";

export const affiliateProducts: AffiliateProduct[] = [
  {
    name: "XINJI Sunset Lamp Projector",
    asin: "B09M8J6TWH",
    price: "",
    blurb: "The viral sunset lamp — 16 colors, remote included. Featured in our Short!",
    url: `https://www.amazon.com/dp/B09M8J6TWH?tag=${TAG}`,
  },
  {
    name: "Astronaut Galaxy Projector",
    asin: "B0DBVJRNJC",
    price: "",
    blurb: "Viral TikTok projector — turns any room into a galaxy.",
    url: `https://www.amazon.com/dp/B0DBVJRNJC?tag=${TAG}`,
  },
  {
    name: "WowCatch Upgraded LED Bug Zapper",
    asin: "B0GJBT1127",
    price: "",
    blurb: "Electric bug zapper with long-life LED — does it actually work?",
    url: `https://www.amazon.com/dp/B0GJBT1127?tag=${TAG}`,
  },
  {
    name: "Govee RGB LED Strip Lights",
    asin: "B093C3PB47",
    price: "",
    blurb: "The iconic RGB strip — perfect for bias lighting or room glow.",
    url: `https://www.amazon.com/dp/B093C3PB47?tag=${TAG}`,
  },
];
