import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hen Party Planning Blog | Tips, Ideas & City Guides | Group Escape Houses",
  description: "Expert hen party planning advice, city guides, house spotlights and celebration ideas. Everything you need to plan the perfect UK hen weekend from our experienced team.",
  keywords: ["hen party planning tips", "hen weekend ideas", "UK hen party blog", "celebration planning guide"],
  openGraph: {
    title: "Hen Party Planning Blog | Group Escape Houses",
    description: "Expert tips, city guides and planning advice for your perfect hen weekend.",
    url: "https://groupescapehouses.co.uk/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
