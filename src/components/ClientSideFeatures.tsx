"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WhatsAppChat = dynamic(() => import("@/components/WhatsAppChat"), { 
  ssr: false,
  loading: () => null,
});
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { 
  ssr: false,
  loading: () => null,
});
const VisualEditsMessenger = dynamic(() => import("../visual-edits/VisualEditsMessenger"), { 
  ssr: false,
  loading: () => null,
});
const ToasterForClient = dynamic(() => import("@/components/ui/sonner").then(mod => mod.Toaster), { 
  ssr: false,
  loading: () => null,
});

export default function ClientSideFeatures() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <WhatsAppChat />
      <CookieConsent />
      <ToasterForClient />
      <VisualEditsMessenger />
    </>
  );
}
