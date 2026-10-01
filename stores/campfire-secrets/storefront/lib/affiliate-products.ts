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
    name: "UCO Stormproof Match Kit",
    asin: "B004PIBWW8",
    price: "~$10",
    blurb: "Windproof and waterproof matches that relight after submersion.",
    url: `https://www.amazon.com/dp/B004PIBWW8?tag=${TAG}`,
  },
  {
    name: "Coleman Classic Propane Stove",
    asin: "B00005OU9D",
    price: "~$100",
    blurb: "The definitive 2-burner camp stove — 20,000 BTUs, lasts decades.",
    url: `https://www.amazon.com/dp/B00005OU9D?tag=${TAG}`,
  },
  {
    name: "Glocusent 106 LED Camping Lantern",
    asin: "B0DGQDBR2J",
    price: "",
    blurb: "1200LM rechargeable lantern, waterproof, doubles as a phone power bank.",
    url: `https://www.amazon.com/dp/B0DGQDBR2J?tag=${TAG}`,
  },
  {
    name: "Stanley Adventure Camp Cook Set",
    asin: "B005188T90",
    price: "~$26",
    blurb: "Stainless pot + 2 nesting cups — the classic camp kitchen.",
    url: `https://www.amazon.com/dp/B005188T90?tag=${TAG}`,
  },
];
