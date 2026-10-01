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
    name: "GoSports Classic Cornhole Set",
    asin: "B07S1PYYTV",
    price: "~$80",
    blurb: "The #1 cornhole set on Amazon — perfect crossover for backyard game nights.",
    url: `https://www.amazon.com/dp/B07S1PYYTV?tag=${TAG}`,
  },
  {
    name: "Spikeball 3-Ball Original Kit",
    asin: "B002V7A7MQ",
    price: "",
    blurb: "The original viral yard game — same energy as bucket golf.",
    url: `https://www.amazon.com/dp/B002V7A7MQ?tag=${TAG}`,
  },
  {
    name: "GoSports Ladder Toss Classic",
    asin: "B00K8ANYWS",
    price: "",
    blurb: "Classic ladder toss — easy to learn, fun for all ages.",
    url: `https://www.amazon.com/dp/B00K8ANYWS?tag=${TAG}`,
  },
  {
    name: "GoSports BattleChip Versus Golf Game",
    asin: "B07K9BTSNZ",
    price: "",
    blurb: "Golf meets cornhole — the closest thing to bucket golf on Amazon.",
    url: `https://www.amazon.com/dp/B07K9BTSNZ?tag=${TAG}`,
  },
];
