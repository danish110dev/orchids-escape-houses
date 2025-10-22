import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Party Houses UK | High-End Group Accommodation for Celebrations",
  description: "Browse our collection of luxury party houses with premium facilities. 5-star amenities, hot tubs, pools & exceptional service for groups of 8-30+ across the UK. Perfect for special celebrations.",
  keywords: ["luxury party houses UK", "high-end group accommodation", "5-star party houses", "premium celebration venues"],
  openGraph: {
    title: "Luxury Party Houses UK | Group Escape Houses",
    description: "5-star luxury party houses with premium facilities for groups of 8-30+.",
    url: "https://groupescapehouses.co.uk/house-styles/luxury-houses",
  },
};

export default function LuxuryHousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
