import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | About Group Escape Houses | Brighton-Based Hen Party Specialists",
  description: "Meet the Group Escape Houses team. Brighton-based specialists in luxury hen party accommodation since 2018. Passionate about creating unforgettable group celebrations across the UK.",
  keywords: ["about group escape houses", "hen party specialists UK", "Brighton accommodation team"],
  openGraph: {
    title: "Our Story | Group Escape Houses",
    description: "Brighton-based hen party specialists creating unforgettable celebrations since 2018.",
    url: "https://groupescapehouses.co.uk/our-story",
  },
};

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
