import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Houses with Hot Tubs UK | Luxury Group Accommodation with Hot Tub Facilities",
  description: "Browse luxury party houses with private hot tubs. Large group accommodation sleeping 8-30+ guests. Perfect for hen parties, celebrations & relaxing weekends across the UK.",
  keywords: ["houses with hot tubs UK", "party houses hot tub", "group accommodation hot tub", "hen party houses with hot tubs"],
  openGraph: {
    title: "Party Houses with Hot Tubs UK | Group Escape Houses",
    description: "Luxury party houses with private hot tubs for groups of 8-30+. Perfect for celebrations.",
    url: "https://groupescapehouses.co.uk/features/hot-tub",
  },
};

export default function HotTubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
