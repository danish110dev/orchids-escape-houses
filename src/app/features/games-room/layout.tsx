import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Houses with Games Rooms UK | Entertainment Facilities for Large Groups",
  description: "Browse luxury party houses with dedicated games rooms. Pool tables, table tennis, board games & entertainment for groups of 8-30+. Perfect for competitive hen parties and celebrations.",
  keywords: ["houses with games rooms UK", "party houses games room", "houses with pool table", "entertainment facilities"],
  openGraph: {
    title: "Party Houses with Games Rooms UK | Group Escape Houses",
    description: "Luxury houses with games rooms, pool tables & entertainment for groups of 8-30+.",
    url: "https://groupescapehouses.co.uk/features/games-room",
  },
};

export default function GamesRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
