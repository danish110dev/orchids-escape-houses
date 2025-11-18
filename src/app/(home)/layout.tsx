import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Hen Party Houses UK | Large Group Accommodation with Hot Tubs | Group Escape Houses",
  description: "Book luxury hen party houses across the UK. Stunning large group accommodation with hot tubs, pools, games rooms. Perfect for celebrations. 3,000+ 5-star reviews. Brighton-based team.",
  keywords: [
    "hen party houses UK",
    "luxury hen do accommodation",
    "large group accommodation UK",
    "party houses with hot tubs",
    "houses with swimming pools UK",
    "group celebration houses",
    "hen weekend houses",
    "large holiday homes UK",
    "luxury party houses",
    "group getaway accommodation"
  ],
  openGraph: {
    title: "Luxury Hen Party Houses UK | Group Escape Houses",
    description: "Book luxury hen party houses across the UK. Stunning large group accommodation with hot tubs, pools, games rooms. Perfect for celebrations.",
    url: "https://groupescapehouses.co.uk",
    siteName: "Group Escape Houses",
    images: [
      {
        url: "https://groupescapehouses.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury UK hen party houses with hot tubs and swimming pools",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Hen Party Houses UK | Group Escape Houses",
    description: "Book luxury hen party houses across the UK. Stunning large group accommodation with hot tubs, pools, games rooms.",
    images: ["https://groupescapehouses.co.uk/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
