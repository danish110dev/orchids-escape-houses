import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christmas Party Houses UK | Group Escape Houses",
  description: "Celebrate the festive season in style with our selection of Christmas party houses. Large luxury properties perfect for family gatherings and festive celebrations.",
  alternates: {
    canonical: "/christmas",
  },
};

export default function ChristmasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
