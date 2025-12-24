import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stag Do Houses | Group Escape Houses",
  description: "Discover the best stag do houses across the UK. Epic group accommodation with games rooms, hot tubs, and plenty of space for the ultimate stag weekend celebration.",
  alternates: {
    canonical: "/stag-do-houses",
  },
};

export default function StagDoHousesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
