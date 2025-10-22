import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Houses UK | Large Group Accommodation for Hen Weekends & Celebrations",
  description: "Book the perfect hen party house from our handpicked collection. Luxury properties sleeping 8-30+ guests with hot tubs, pools & games rooms. Perfect for unforgettable hen celebrations.",
  keywords: ["hen party houses", "hen weekend accommodation UK", "hen do houses", "large group hen party venues"],
  openGraph: {
    title: "Hen Party Houses UK | Group Escape Houses",
    description: "Luxury hen party houses sleeping 8-30+ guests. Hot tubs, pools, games rooms & more.",
    url: "https://groupescapehouses.co.uk/hen-party-houses",
  },
};

export default function HenPartyHousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
