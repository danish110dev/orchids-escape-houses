import type { Metadata } from "next";
import UKServiceSchema from "@/components/UKServiceSchema";

export const metadata: Metadata = {
  title: "Hen Party Destinations UK | Brighton, Bath & 25+ Cities",
  description: "25+ UK destinations with party houses. Coastal cities, vibrant nightlife & countryside. Brighton, Bath, Manchester, York, Liverpool.",
  keywords: ["hen party destinations UK", "best cities for hen weekends", "Brighton hen parties", "Bath hen do", "Manchester hen weekend"],
  openGraph: {
    title: "Top UK Hen Party Destinations | The Hen Fairy",
    description: "Explore 25+ cities with luxury party houses. Beach towns, nightlife hotspots & country escapes.",
    url: "https://www.groupescapehouses.co.uk/destinations",
  },
  alternates: {
    canonical: "https://www.groupescapehouses.co.uk/destinations",
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UKServiceSchema 
        type="breadcrumb" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Destinations", url: "/destinations" }
          ]
        }}
      />
      {children}
    </>
  );
}