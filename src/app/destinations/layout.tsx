import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Destinations UK | Best Cities for Group Celebrations & Hen Weekends",
  description: "Discover the best UK destinations for hen parties. From Brighton beaches to Manchester nightlife. Find luxury party houses in top cities including Bath, York, Liverpool & London.",
  keywords: ["hen party destinations UK", "best cities for hen weekends", "Brighton hen parties", "Bath hen do", "Manchester hen weekend"],
  openGraph: {
    title: "Best UK Hen Party Destinations | Group Escape Houses",
    description: "Discover luxury party houses in the UK's top hen party destinations. Brighton, Bath, Manchester & more.",
    url: "https://groupescapehouses.co.uk/destinations",
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
