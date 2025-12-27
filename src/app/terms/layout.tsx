import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Booking Terms, Cancellations & House Rules",
  description: "Terms of use and booking information for our advertising platform. Clarity on how we connect guests with property owners across the UK.",
  keywords: ["terms and conditions", "booking terms", "cancellation policy", "house rules"],
  openGraph: {
    title: "Terms & Conditions | Group Escape Houses",
    description: "Booking terms, cancellation policy and house rules explained clearly.",
    url: "https://groupescapehouses.co.uk/terms",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}