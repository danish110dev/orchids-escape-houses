import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Houses for Special Celebrations | Milestone Birthdays & Events",
  description: "Celebrate milestones in style. Party houses perfect for birthdays, anniversaries, reunions and special occasions. Hot tubs, entertainment spaces and catering options.",
  keywords: ["special celebration houses", "milestone birthday venues", "anniversary accommodation", "party houses UK celebrations"],
  openGraph: {
    title: "Special Celebration Party Houses | The Hen Fairy",
    description: "Milestone birthdays, anniversaries and special occasions. Luxury houses with entertainment.",
    url: "https://groupescapehouses.co.uk/special-celebrations",
  },
  alternates: {
    canonical: "https://groupescapehouses.co.uk/special-celebrations",
  },
};

export default function SpecialCelebrationsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
