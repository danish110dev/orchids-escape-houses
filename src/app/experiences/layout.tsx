import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Experiences & Activities | Cocktail Classes, Spa Treatments & More",
  description: "Add unforgettable experiences to your hen weekend. Private chefs, cocktail masterclasses, spa treatments, yoga classes & murder mystery nights. Book experiences with your party house.",
  keywords: ["hen party activities UK", "cocktail masterclass", "private chef hen party", "spa treatments", "hen do experiences"],
  openGraph: {
    title: "Hen Party Experiences | Group Escape Houses",
    description: "Cocktail classes, private chefs, spa treatments & more. Make your hen weekend unforgettable.",
    url: "https://groupescapehouses.co.uk/experiences",
  },
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
