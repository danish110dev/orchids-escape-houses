import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Houses UK | Luxury Group Accommodation with Hot Tubs & Pools",
  description: "Browse luxury hen party houses across the UK. Large group accommodation sleeping 8-30+ guests with hot tubs, swimming pools, games rooms & cinema rooms. Instant enquiry available.",
  keywords: ["hen party houses UK", "luxury group accommodation", "party houses with hot tubs", "large holiday homes", "houses sleeping 20 guests UK"],
  openGraph: {
    title: "Hen Party Houses UK | Group Escape Houses",
    description: "Browse luxury hen party houses sleeping 8-30+ guests. Hot tubs, pools & games rooms. Perfect for celebrations.",
    url: "https://groupescapehouses.co.uk/properties",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
