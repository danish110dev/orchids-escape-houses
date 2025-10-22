import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Year Party Houses UK | Large Group Accommodation for NYE Celebrations",
  description: "Ring in the New Year in style with luxury party houses sleeping 8-30+ guests. Hot tubs, entertainment facilities & spectacular locations. Perfect for unforgettable NYE celebrations.",
  keywords: ["New Year party houses UK", "NYE group accommodation", "New Year's Eve houses", "party houses New Year"],
  openGraph: {
    title: "New Year Party Houses UK | Group Escape Houses",
    description: "Celebrate New Year in luxury party houses with hot tubs & entertainment for groups of 8-30+.",
    url: "https://groupescapehouses.co.uk/occasions/new-year",
  },
};

export default function NewYearLayout({
  children,
}: {
  children: React.NodeNode;
}) {
  return children;
}
