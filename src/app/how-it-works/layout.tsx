import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Book | Deposits, Payments & House Rules",
  description: "Simple 4-step booking process. Deposits, payment schedules, cancellation policy & house rules. Transparent pricing, no hidden fees.",
  keywords: ["how to book hen party house", "hen weekend booking process", "party house payment guide", "booking deposit"],
  openGraph: {
    title: "How Our Booking Process Works | Group Escape Houses",
    description: "Easy 4-step process. Deposits, payment terms and cancellation policy explained clearly.",
    url: "https://groupescapehouses.co.uk/how-it-works",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/how-it-works",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}