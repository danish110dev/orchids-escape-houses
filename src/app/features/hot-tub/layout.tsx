import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Houses with Hot Tubs UK | Party Homes",
  description: "Luxury group houses with private hot tubs. Perfect for hen parties and celebrations. Sleeps 8-30+ guests. Weekend and midweek availability across the UK.",
  keywords: ["houses with hot tubs UK", "party houses hot tub", "group accommodation hot tub", "hen party houses with hot tubs"],
  openGraph: {
    title: "Group Houses with Private Hot Tubs | Group Escape Houses",
    description: "Properties with wood-fired and electric hot tubs. Scenic views, privacy and perfect hen party relaxation.",
    url: "https://groupescapehouses.co.uk/features/hot-tub",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/features/hot-tub",
  },
};

export default function HotTubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}