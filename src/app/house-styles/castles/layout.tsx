import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Castles for Hire UK | Historic Castle Accommodation for Group Celebrations",
  description: "Rent spectacular castles for your celebration. Unique historic properties sleeping large groups with grand halls, grounds & luxury facilities. Unforgettable hen parties & special occasions.",
  keywords: ["castles for hire UK", "castle rental groups", "historic castles accommodation", "castle hen parties"],
  openGraph: {
    title: "Castles for Hire UK | Group Escape Houses",
    description: "Historic castles for rent. Grand accommodation for unforgettable group celebrations.",
    url: "https://groupescapehouses.co.uk/house-styles/castles",
  },
};

export default function CastlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
