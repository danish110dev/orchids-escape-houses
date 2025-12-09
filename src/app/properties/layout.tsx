import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Houses | Sleeps 8-30+ | Hot Tubs & Pools",
  description: "Filter 100+ party houses by location and features. Hot tubs, pools, games rooms. Sleeping 8-30+ guests. Free instant quotes.",
  keywords: ["hen party houses UK", "luxury group accommodation", "party houses with hot tubs", "large holiday homes", "houses sleeping 20 guests UK"],
  openGraph: {
    title: "Browse Hen Party Houses UK | Group Escape Houses",
    description: "Filter 100+ properties by location, size and features. Hot tubs, pools & games rooms from £69pp.",
    url: "https://groupescapehouses.co.uk/properties",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/properties",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}