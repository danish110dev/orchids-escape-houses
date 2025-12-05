import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://groupescapehouses.co.uk/advertise",
  },
};

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
