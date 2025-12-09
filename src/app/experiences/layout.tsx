import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Activities | Chef, Cocktails & Spa",
  description: "Private chefs from £55pp, cocktail masterclasses, mobile spa treatments & wellness. Book experiences with your hen party house.",
  keywords: ["hen party activities UK", "cocktail masterclass", "private chef hen party", "spa treatments", "hen do experiences"],
  openGraph: {
    title: "Hen Weekend Experiences & Activities | Group Escape Houses",
    description: "Private chefs, cocktail classes, spa days & wellness. Prices from £40pp.",
    url: "https://groupescapehouses.co.uk/experiences",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/experiences",
  },
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}