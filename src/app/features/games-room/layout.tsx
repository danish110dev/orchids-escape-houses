import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Houses with Games Rooms UK | Party Entertainment",
  description: "Properties with dedicated games rooms. Pool tables, table tennis, arcade games and entertainment spaces. Perfect for group celebrations and hen weekends.",
  keywords: ["houses with games rooms UK", "party houses with pool tables", "entertainment rooms", "group houses with games"],
  openGraph: {
    title: "Houses with Games Rooms & Entertainment | Group Escape Houses",
    description: "Pool tables, table tennis and entertainment facilities. Perfect for competitive hen party fun.",
    url: "https://groupescapehouses.co.uk/features/games-room",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/features/games-room",
  },
};

export default function GamesRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}