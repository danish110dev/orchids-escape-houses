import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Guest Houses UK | Exclusive Group Accommodation",
  description: "Exclusive wedding party houses. Sleep wedding groups together with space for getting ready, celebrations & brunches. Full venue hire.",
  keywords: ["wedding accommodation UK", "wedding party houses", "exclusive use wedding venues", "wedding guest accommodation"],
  openGraph: {
    title: "Wedding Party Accommodation | Group Escape Houses",
    description: "Exclusive houses for wedding parties and guests. Getting ready space, celebrations and brunches.",
    url: "https://groupescapehouses.co.uk/weddings",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/weddings",
  },
};

export default function WeddingsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}