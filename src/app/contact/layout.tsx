import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Instant Enquiry & UK Support",
  description: "Get instant quotes for hen party houses. UK support team, enquiry form or Brighton office visit. Fast response guaranteed.",
  keywords: ["contact group escape houses", "hen party booking enquiry", "quote hen weekend", "book party house UK"],
  openGraph: {
    title: "Contact Us for Free Quote | Group Escape Houses",
    description: "Brighton-based booking team ready to help. Same-day quotes, no fees. Call 01273 569301 or enquire online.",
    url: "https://groupescapehouses.co.uk/contact",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}