import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Party Houses UK | Large Group Accommodation for Wedding Guests",
  description: "Book luxury houses for wedding guests and celebrations. Accommodation sleeping 8-30+ with hot tubs, gardens & entertainment. Perfect for pre-wedding parties and guest accommodation.",
  keywords: ["wedding party houses UK", "wedding guest accommodation", "houses for wedding parties", "large group wedding venues"],
  openGraph: {
    title: "Wedding Party Houses UK | Group Escape Houses",
    description: "Luxury accommodation for wedding parties and guests. Hot tubs, gardens & space for groups of 8-30+.",
    url: "https://groupescapehouses.co.uk/occasions/weddings",
  },
};

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
