import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3,000+ 5-Star Reviews | Hen Party House Reviews & Guest Testimonials",
  description: "Read 3,000+ verified 5-star reviews from happy hen party guests. Real experiences from groups who stayed at our luxury party houses across the UK. Trusted by thousands.",
  keywords: ["hen party house reviews", "group escape houses reviews", "party house testimonials UK", "5 star hen accommodation"],
  openGraph: {
    title: "3,000+ 5-Star Reviews | Group Escape Houses",
    description: "Read verified reviews from happy hen party guests. Trusted by thousands across the UK.",
    url: "https://groupescapehouses.co.uk/reviews",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
