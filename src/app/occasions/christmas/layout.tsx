import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christmas Party Houses UK | Luxury Group Accommodation for Festive Celebrations",
  description: "Book luxury party houses for Christmas celebrations. Large group accommodation sleeping 8-30+ with hot tubs, open fires & festive features. Perfect for family gatherings and friend reunions.",
  keywords: ["Christmas party houses UK", "festive group accommodation", "Christmas cottages large groups", "holiday party houses"],
  openGraph: {
    title: "Christmas Party Houses UK | Group Escape Houses",
    description: "Luxury party houses for Christmas. Hot tubs, open fires & festive charm for groups of 8-30+.",
    url: "https://groupescapehouses.co.uk/occasions/christmas",
  },
};

export default function ChristmasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
