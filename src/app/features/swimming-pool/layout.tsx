import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Houses with Swimming Pools UK | Large Group Accommodation with Pool Facilities",
  description: "Discover luxury party houses with swimming pools. Indoor and outdoor pools for groups of 8-30+ guests. Perfect for active hen parties and summer celebrations across the UK.",
  keywords: ["houses with pools UK", "party houses with swimming pool", "group accommodation pool", "houses with indoor pool"],
  openGraph: {
    title: "Party Houses with Swimming Pools UK | Group Escape Houses",
    description: "Luxury party houses with indoor & outdoor pools for groups of 8-30+. Perfect for celebrations.",
    url: "https://groupescapehouses.co.uk/features/swimming-pool",
  },
};

export default function SwimmingPoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
