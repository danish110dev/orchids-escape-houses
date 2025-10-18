import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Group Escape Houses | Luxury Hen Party Houses UK with Hot Tubs & Pools",
  description: "Book luxury hen party houses across the UK. Large group accommodation with hot tubs, pools, games rooms. Perfect for hen weekends, birthdays & celebrations. Instant enquiry available.",
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
        <VisualEditsMessenger />
      </body>
    </html>
  );
}