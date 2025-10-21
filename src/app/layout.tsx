import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Group Escape Houses | Luxury Hen Party Houses UK with Hot Tubs & Pools",
  description: "Book luxury hen party houses across the UK. Large group accommodation with hot tubs, pools, games rooms. Perfect for hen weekends, birthdays & celebrations. Instant enquiry available.",
  keywords: [
    "hen party houses UK",
    "hen do accommodation",
    "party houses for groups",
    "large group cottages",
    "hen weekend houses",
    "houses with hot tubs UK",
    "luxury party houses",
    "group accommodation UK",
    "large holiday homes",
    "celebration accommodation",
    "birthday party houses",
    "houses with pools UK",
    "party houses with games rooms"
  ],
  authors: [{ name: "Group Escape Houses" }],
  creator: "Group Escape Houses",
  publisher: "Group Escape Houses",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://groupescapehouses.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Group Escape Houses | Luxury Hen Party Houses UK",
    description: "Book luxury hen party houses and large group accommodation across the UK. Hot tubs, pools, games rooms. Perfect for celebrations.",
    url: "https://groupescapehouses.co.uk",
    siteName: "Group Escape Houses",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://groupescapehouses.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Group Escape Houses - Luxury Party Houses UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Escape Houses | Luxury Hen Party Houses UK",
    description: "Book luxury hen party houses across the UK with hot tubs, pools & games rooms.",
    images: ["https://groupescapehouses.co.uk/twitter-image.jpg"],
    creator: "@groupescapehouses",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <LoadingScreen />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <WhatsAppChatbot />
        <CookieConsent />
      </body>
    </html>
  );
}
