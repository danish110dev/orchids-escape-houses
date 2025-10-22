import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Group Escape Houses | Booking Terms for Party Houses",
  description: "Read our terms and conditions for booking luxury party houses. Clear booking terms, cancellation policy, house rules and payment terms for group accommodation.",
  openGraph: {
    title: "Terms & Conditions | Group Escape Houses",
    description: "Booking terms, cancellation policy and house rules for party house rentals.",
    url: "https://groupescapehouses.co.uk/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
