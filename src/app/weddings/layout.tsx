import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Guest Accommodation UK | Group Escape Houses",
  description: "Beautiful luxury houses for wedding guests, pre-wedding gatherings, and post-wedding celebrations. Keep your loved ones close on your special day.",
  alternates: {
    canonical: "/weddings",
  },
};

export default function WeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
