import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House Styles & Features | Find Your Perfect Party House Type | Group Escape Houses",
  description: "Explore party houses by style and feature. Manor houses, castles, luxury cottages, houses with hot tubs, pools, cinema rooms & more. Find your ideal celebration venue.",
  keywords: ["luxury manor houses UK", "party houses with hot tubs", "houses with pools", "castles for hire UK", "luxury cottages"],
  openGraph: {
    title: "House Styles & Features | Group Escape Houses",
    description: "Browse party houses by style. Manor houses, castles, cottages with hot tubs, pools & more.",
    url: "https://groupescapehouses.co.uk/house-styles-and-features",
  },
};

export default function HouseStylesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
