import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Houses UK | Purpose-Built Celebration Venues with Entertainment Facilities",
  description: "Party houses designed for celebrations. Hot tubs, games rooms, sound systems & entertainment facilities for groups of 8-30+. Perfect for hen parties, birthdays & reunions across the UK.",
  keywords: ["party houses UK", "celebration venues", "entertainment houses", "group party accommodation"],
  openGraph: {
    title: "Party Houses UK | Group Escape Houses",
    description: "Purpose-built party houses with entertainment facilities for groups of 8-30+.",
    url: "https://groupescapehouses.co.uk/house-styles/party-houses",
  },
};

export default function PartyHousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
