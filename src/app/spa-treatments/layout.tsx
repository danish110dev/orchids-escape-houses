import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa Treatments at Orchids | Hen Party Pamper Packages & Mobile Spa",
  description: "Book luxury spa treatments for your hen weekend at Orchids. Choose from massages, facials, and pamper packages — with express options and the bride going FREE on bookings of 10 or more.",
};

export default function SpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}