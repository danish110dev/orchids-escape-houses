"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fade out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 1500);

    // Remove loading screen after fade completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500"
      style={{
        background: "linear-gradient(135deg, #F5F3F0 0%, #E5D8C5 100%)",
        opacity,
      }}
    >
      <div className="text-center">
        {/* Logo */}
        <div className="mb-6 animate-pulse">
          <h1
            className="text-5xl md:text-6xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-accent-gold)",
            }}
          >
            Group Escape Houses
          </h1>
        </div>

        {/* Loading spinner */}
        <div className="flex justify-center">
          <div
            className="w-12 h-12 border-4 rounded-full animate-spin"
            style={{
              borderColor: "var(--color-accent-gold)",
              borderTopColor: "transparent",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}