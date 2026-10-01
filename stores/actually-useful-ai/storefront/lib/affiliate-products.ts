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
    name: "Co-Intelligence by Ethan Mollick (Hardcover)",
    asin: "059371671X",
    price: "$23",
    blurb: "The definitive 'how to work with AI' playbook by a Wharton professor.",
    url: `https://www.amazon.com/dp/059371671X?tag=${TAG}`,
  },
  {
    name: "Logitech C920s HD Pro Webcam",
    asin: "B07K986YLL",
    price: "~$70",
    blurb: "The workhorse 1080p webcam — privacy shutter, autofocus.",
    url: `https://www.amazon.com/dp/B07K986YLL?tag=${TAG}`,
  },
  {
    name: "Logitech Blue Yeti USB Microphone",
    asin: "B01LY6Z2M6",
    price: "~$85",
    blurb: "The #1 USB mic for podcasting and streaming — plug and play.",
    url: `https://www.amazon.com/dp/B01LY6Z2M6?tag=${TAG}`,
  },
  {
    name: "ICE COOREL Portable Laptop Stand",
    asin: "B0GGHNYQD8",
    price: "",
    blurb: "Foldable aluminum stand, 6 heights — fixes neck strain.",
    url: `https://www.amazon.com/dp/B0GGHNYQD8?tag=${TAG}`,
  },
];
