import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact The Hen Fairy | Get Your Free Hen Party Quote | UK",
  description: "Get a free, no-obligation quote for your hen party. Fast response from our UK-based team. Book accommodation and activities for groups of 6-30+. Call 01273 569301.",
  keywords: ["hen party contact", "hen do enquiry", "group booking UK", "hen party quote", "hen weekend planning"],
  openGraph: {
    title: "Contact The Hen Fairy - Hen Party Activities UK",
    description: "Get a free, no-obligation quote for your hen party. Fast response from our UK-based team. Book accommodation and activities for groups of 6-30+.",
    url: "https://www.thehenfairy.co.uk/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://www.thehenfairy.co.uk/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
