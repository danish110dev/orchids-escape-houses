import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Year Houses UK | NYE Group Accommodation",
  description: "Celebrate New Year in luxury party houses. Hot tubs, champagne & celebrations from £99pp. NYE & full week breaks available.",
  keywords: ["New Year party houses UK", "NYE group accommodation", "New Year's Eve houses", "Hogmanay group houses"],
  openGraph: {
    title: "New Year's Eve Party Houses | Group Escape Houses",
    description: "Celebrate NYE in private houses. Hot tubs, celebrations and champagne from £99pp.",
    url: "https://groupescapehouses.co.uk/new-year",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/new-year",
  },
};

export default function NewYearRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}