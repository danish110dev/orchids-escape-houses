"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "447123456789"; // Replace with your WhatsApp Business number
  const defaultMessage = encodeURIComponent(
    "Hi! I'm interested in booking a luxury hen party house. Can you help me?"
  );

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${defaultMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#25D366]" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-4 py-2 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Chat with us on WhatsApp
            </p>
            <p className="text-xs text-[var(--color-neutral-dark)]">
              Ask about properties, experiences & bookings
            </p>
            <div
              className="absolute top-1/2 -right-2 w-0 h-0 -translate-y-1/2"
              style={{
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: "8px solid white",
              }}
            />
          </div>
        </button>
      </div>
    </>
  );
}