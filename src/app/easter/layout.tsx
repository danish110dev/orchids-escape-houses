import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easter Breaks UK | Group Holiday Houses",
  description: "Easter holiday houses for 8-30 guests. Perfect for family gatherings & spring celebrations. Hot tubs, pools & countryside locations.",
  keywords: ["Easter houses", "spring break accommodation", "Easter holiday rental", "family Easter breaks"],
  openGraph: {
    title: "Easter Holiday Houses | Group Escape Houses",
    description: "Celebrate Easter in luxury group accommodation. Perfect for families and friends.",
    url: "https://groupescapehouses.co.uk/easter",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/easter",
  },
};

export default function EasterRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}