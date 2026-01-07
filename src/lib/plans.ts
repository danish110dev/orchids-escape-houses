export const PLANS = {
  bronze: {
    id: 'bronze',
    name: 'Bronze Listing',
    price: 450,
    priceId: 'price_1SlwgjIakKHMdeEkEH6ni0Cj', // Using essential price ID
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
    priceId: 'price_1SlwgkIakKHMdeEkM5Jy2zFW', // Using featured price ID
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
    priceId: 'price_gold_placeholder', // Placeholder for gold
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
