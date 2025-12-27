"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

const PLACEHOLDER_IMAGE = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/elegant-luxury-property-placeholder-imag-83731ee8-20251207154036.jpg';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2" | "1/1" | "3/4";
  quality?: number;
  onLoad?: () => void;
}

function validateImageUrl(url: string): string {
  if (!url || url === '/placeholder-property.jpg') {
    return PLACEHOLDER_IMAGE;
  }
  
  if (url.includes('gstatic.com') || url.includes('google.com/images') || url.includes('googleusercontent.com')) {
    return PLACEHOLDER_IMAGE;
  }
  
  // Fix Supabase URLs with trailing query parameters
  if (url.includes('supabase.co/storage')) {
    // Remove trailing '?' if present
    url = url.replace(/\?$/, '');
    // Ensure it doesn't have duplicate query params
    if (!url.includes('?')) {
      url = url + '?t=' + Date.now();
    }
  }
  
  const hasImageExtension = /\.(jpg|jpeg|png|webp|avif|gif)(\?.*)?$/i.test(url);
  const isImageCDN = 
    url.includes('supabase.co/storage') ||
    url.includes('unsplash.com') ||
    url.includes('fal.media');
  
  if (!hasImageExtension && !isImageCDN) {
    return PLACEHOLDER_IMAGE;
  }
  
  return url;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  aspectRatio,
  quality = 80,
  onLoad,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const validatedSrc = validateImageUrl(src);
  const displaySrc = imageError ? PLACEHOLDER_IMAGE : validatedSrc;

  const handleError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const aspectRatioClass = aspectRatio ? `aspect-[${aspectRatio}]` : "";

  if (fill) {
    return (
      <div className={`relative overflow-hidden bg-gray-100 ${aspectRatioClass}`}>
        <Image
          src={displaySrc}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={`object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onError={handleError}
          onLoad={handleLoad}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <Image
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
