import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekend Break Houses UK | Luxury Group Getaways & Short Breaks for Groups",
  description: "Book luxury weekend breaks for groups of 8-30+. Short breaks in stunning houses with hot tubs, pools & entertainment. Perfect for friends reunions and group getaways across the UK.",
  keywords: ["weekend breaks for groups UK", "short breaks large groups", "group weekend getaways", "luxury weekend houses"],
  openGraph: {
    title: "Weekend Break Houses UK | Group Escape Houses",
    description: "Luxury weekend breaks for groups. Hot tubs, pools & entertainment in stunning locations.",
    url: "https://groupescapehouses.co.uk/occasions/weekend-breaks",
  },
};

export default function WeekendBreaksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
