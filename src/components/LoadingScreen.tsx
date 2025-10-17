"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Start fade out after loading completes
    const fadeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ${
        progress >= 100 ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #F5F3F0 0%, #E5D8C5 100%)",
      }}
    >
      <div className="text-center">
        {/* Logo with smooth fade-in */}
        <div 
          className="mb-12 transition-all duration-1000"
          style={{
            opacity: Math.min(progress / 30, 1),
            transform: `translateY(${Math.max(20 - progress / 3, 0)}px)`,
          }}
        >
          <Image
            src="https://v3b.fal.media/files/b/kangaroo/Mst13pbVZIG2-LoyTdF0I_output.png"
            alt="Group Escape Houses"
            width={240}
            height={96}
            className="mx-auto"
            priority
          />
        </div>

        {/* Modern progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, var(--color-accent-sage) 0%, var(--color-accent-gold) 100%)",
              }}
            />
          </div>
          
          {/* Loading text */}
          <p 
            className="mt-4 text-sm font-medium tracking-wider"
            style={{ 
              color: "var(--color-neutral-dark)",
              opacity: Math.min(progress / 40, 0.7),
            }}
          >
            Loading your escape...
          </p>
        </div>
      </div>
    </div>
  );
}