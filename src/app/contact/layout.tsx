import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get a Quote for Your Hen Party House | Group Escape Houses",
  description: "Contact Group Escape Houses for instant enquiries and free quotes. Brighton-based UK team ready to help plan your perfect hen weekend. Fast response guaranteed within 24 hours.",
  keywords: ["contact group escape houses", "hen party booking enquiry", "quote hen weekend", "book party house UK"],
  openGraph: {
    title: "Contact Group Escape Houses | Instant Enquiry",
    description: "Get a free quote for your hen party. Brighton-based team, fast response, instant enquiry available.",
    url: "https://groupescapehouses.co.uk/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
