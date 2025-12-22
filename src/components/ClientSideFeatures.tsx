"use client";

import dynamic from "next/dynamic";

const WhatsAppChat = dynamic(() => import("@/components/WhatsAppChat"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });
const VisualEditsMessenger = dynamic(() => import("../visual-edits/VisualEditsMessenger"), { ssr: false });
const ToasterForClient = dynamic(() => import("@/components/ui/sonner").then(mod => mod.Toaster), { ssr: false });

export default function ClientSideFeatures() {
  return (
    <>
      <WhatsAppChat />
      <CookieConsent />
      <ToasterForClient />
      <VisualEditsMessenger />
    </>
  );
}
