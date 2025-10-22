import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Group Escape Houses | How We Protect Your Data",
  description: "Read our privacy policy to understand how Group Escape Houses collects, uses and protects your personal data. GDPR compliant data protection practices.",
  openGraph: {
    title: "Privacy Policy | Group Escape Houses",
    description: "Our commitment to protecting your personal data and privacy.",
    url: "https://groupescapehouses.co.uk/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
