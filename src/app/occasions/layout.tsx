import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Houses by Occasion | Weddings, Birthdays & Special Celebrations",
  description: "Find luxury party houses for every occasion. Hen weekends, birthday celebrations, Christmas parties, New Year breaks & weddings. Large group accommodation across the UK.",
  keywords: ["hen party houses", "birthday party houses UK", "wedding accommodation", "celebration venues", "Christmas party houses"],
  openGraph: {
    title: "Party Houses by Occasion | Group Escape Houses",
    description: "Luxury party houses for hen weekends, birthdays, weddings & celebrations across the UK.",
    url: "https://groupescapehouses.co.uk/occasions",
  },
};

export default function OccasionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
