import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://groupescapehouses.co.uk/house-styles/stately-houses",
  },
};

export default function StatelyHousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
