import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manor Houses for Hire UK | Historic Luxury Group Accommodation for Celebrations",
  description: "Rent stunning manor houses for your celebration. Historic properties with modern luxury, sleeping 8-30+ guests. Hot tubs, grounds & elegant interiors. Perfect for memorable hen weekends.",
  keywords: ["manor houses for hire UK", "historic manor houses", "luxury manor house rental", "manor house parties"],
  openGraph: {
    title: "Manor Houses for Hire UK | Group Escape Houses",
    description: "Historic manor houses with modern luxury for groups of 8-30+. Perfect for celebrations.",
    url: "https://groupescapehouses.co.uk/house-styles/manor-houses",
  },
};

export default function ManorHousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
