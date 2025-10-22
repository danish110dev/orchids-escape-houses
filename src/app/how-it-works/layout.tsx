import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Book a Hen Party House | Booking Process & Payment Guide",
  description: "Learn how to book your perfect hen party house in 4 simple steps. From choosing your property to paying deposits and final balance. Clear pricing, secure payments, flexible booking.",
  keywords: ["how to book hen party house", "hen weekend booking process", "party house payment guide", "booking deposit"],
  openGraph: {
    title: "How to Book Your Hen Party House | Group Escape Houses",
    description: "Simple 4-step booking process. Choose house, add experiences, pay deposit, enjoy your celebration.",
    url: "https://groupescapehouses.co.uk/how-it-works",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
