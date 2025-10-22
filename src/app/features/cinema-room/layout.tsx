import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Houses with Cinema Rooms UK | Home Theatre & Movie Night Facilities",
  description: "Luxury party houses with private cinema rooms and home theatres. Perfect for cosy movie nights during your group celebration. Houses sleeping 8-30+ guests across the UK.",
  keywords: ["houses with cinema rooms UK", "party houses home theatre", "houses with movie room", "cinema facilities"],
  openGraph: {
    title: "Party Houses with Cinema Rooms UK | Group Escape Houses",
    description: "Luxury houses with private cinema rooms for movie nights. Groups of 8-30+.",
    url: "https://groupescapehouses.co.uk/features/cinema-room",
  },
};

export default function CinemaRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
