import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://groupescapehouses.co.uk/features/ground-floor-bedroom",
  },
};

export default function GroundFloorBedroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
