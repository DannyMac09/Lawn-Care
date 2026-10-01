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
    name: "MySoil Soil Test Kit",
    asin: "B084TSNR79",
    price: "$30",
    blurb: "Lab-grade mail-in test that tells you exactly what your lawn needs.",
    url: `https://www.amazon.com/dp/B084TSNR79?tag=${TAG}`,
  },
  {
    name: "Scotts Turf Builder EdgeGuard Mini Spreader",
    asin: "B002YPS1KK",
    price: "~$50",
    blurb: "The default spreader for seed and fertilizer — every lawn needs one.",
    url: `https://www.amazon.com/dp/B002YPS1KK?tag=${TAG}`,
  },
  {
    name: "Scotts Turf Builder Grass Seed Sun & Shade Mix, 16 lb",
    asin: "B0B9PWY4YN",
    price: "~$55",
    blurb: "The iconic overseeding bag — pairs with our Fall Overseeding Playbook.",
    url: `https://www.amazon.com/dp/B0B9PWY4YN?tag=${TAG}`,
  },
  {
    name: "WORX WG163 GT 3.0 Cordless String Trimmer & Edger",
    asin: "B018S68U40",
    price: "~$90",
    blurb: "Trimmer-to-edger in seconds, 2 batteries included.",
    url: `https://www.amazon.com/dp/B018S68U40?tag=${TAG}`,
  },
];
