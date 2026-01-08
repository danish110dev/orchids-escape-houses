export const PLANS = {
  bronze: {
    id: 'bronze',
    name: 'Bronze Listing',
    price: 450,
    priceId: 'price_1Sn3LzIakKHMdeEkSVAVUXSN',
    features: [
      "Full property listing page",
      "Unlimited direct enquiries",
      "iCal calendar sync",
      "Direct website link",
      "Standard SEO optimization"
    ],
  },
  silver: {
    id: 'silver',
    name: 'Silver Listing',
    price: 650,
    priceId: 'price_1Sn3M0IakKHMdeEkgNv0io1d',
    features: [
      "Everything in Bronze",
      "Professional page build & support",
      "Social media promotion (inc Late Deals)",
      "Enhanced search visibility",
      "Priority support"
    ],
  },
  gold: {
    id: 'gold',
    name: 'Gold Listing',
    price: 850,
    priceId: 'price_1Sn3M0IakKHMdeEkzWarFzy8',
    features: [
      "Everything in Silver",
      "Themed blog feature",
      "3 x Holiday Focus page inclusion",
      "Homepage featured placement",
      "Specialist page (Weddings/Corporate/etc)"
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;
