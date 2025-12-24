import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Group Escape Houses",
  description: "Get in touch with Group Escape Houses for guest enquiries, property advertising, or group experience packages. Our UK team is here to help.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
