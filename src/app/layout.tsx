import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import Script from "next/script";

import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
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
  icons: {
    icon: [
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/simple-clean-favicon-icon-design-with-ge-3ce8a169-20251025163612.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/simple-clean-favicon-icon-design-with-ge-3ce8a169-20251025163612.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/apple-touch-icon-design-with-geh-elegant-1ad874b8-20251025163612.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
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
      <head>
        <link rel="preconnect" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://slelguoygbfzlpylpxfs.supabase.co" />
      </head>
      <body className="antialiased">
        <ErrorReporter />
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
      
        <VisualEditsMessenger />
      </body>
    </html>
  );
}