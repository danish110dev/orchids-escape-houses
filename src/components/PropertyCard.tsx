"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, UsersRound, MapPinned } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("@/components/BookingModal"), {
  ssr: false,
  loading: () => null,
});

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  sleeps: number;
  bedrooms: number;
  priceFrom: number;
  image: string;
  features: string[];
  slug: string;
}

const PLACEHOLDER_IMAGE = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8330e9be-5e47-4f2b-bda0-4162d899b6d9/generated_images/elegant-luxury-property-placeholder-imag-83731ee8-20251207154036.jpg';

function validateImageUrl(url: string): string {
  if (!url || url === '/placeholder-property.jpg') {
    return PLACEHOLDER_IMAGE;
  }
  
  if (url.includes('gstatic.com') || url.includes('google.com/images') || url.includes('googleusercontent.com')) {
    return PLACEHOLDER_IMAGE;
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

function PropertyCard({
  id,
  title,
  location,
  sleeps,
  bedrooms,
  priceFrom,
  image,
  features,
  slug,
}: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const validatedImage = useMemo(() => validateImageUrl(image), [image]);
  const displayImage = imageError ? PLACEHOLDER_IMAGE : validatedImage;

  const handleImageError = useCallback(() => setImageError(true), []);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  const getDestinationSlug = useCallback((loc: string) => {
    const city = loc.split(',')[0].trim().toLowerCase();
    return city.replace(/\s+/g, '-');
  }, []);

  const destinationSlug = getDestinationSlug(location);

  return (
    <>
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
        <Link href={`/properties/${slug}`}>
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={displayImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
              className={`object-cover object-center transition-all duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
            
            {/* Feature Tags */}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {features.slice(0, 2).map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {feature}
                </span>
              ))}
            </div>

              {/* Save Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsSaved(!isSaved);
                }}
                className="absolute top-4 right-4 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                aria-label={isSaved ? "Remove from saved" : "Save property"}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isSaved ? "fill-red-500 text-red-500" : "text-[var(--color-text-primary)]"
                  }`}
                  aria-hidden="true"
                />
              </button>

          </div>
        </Link>

        <div className="p-6">
          <Link href={`/properties/${slug}`}>
            <h3
              className="text-xl font-semibold mb-2 group-hover:text-[var(--color-accent-sage)] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {title}
            </h3>
          </Link>

          <Link 
            href={`/destinations/${destinationSlug}`}
            className="flex items-center gap-2 text-sm text-[var(--color-neutral-dark)] mb-4 hover:text-[var(--color-accent-sage)] transition-colors w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPinned className="w-4 h-4" />
            <span>{location}</span>
          </Link>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <UsersRound className="w-4 h-4 text-[var(--color-accent-sage)]" />
              <span>Sleeps {sleeps}</span>
            </div>
            <span className="text-[var(--color-neutral-dark)]">•</span>
            <span>{bedrooms} bedrooms</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-bg-secondary)]">
            <div>
              <p className="text-sm text-[var(--color-neutral-dark)]">From</p>
              <p className="text-2xl font-semibold" style={{ color: "var(--color-accent-sage)" }}>
                £{priceFrom}
              </p>
              <p className="text-xs text-[var(--color-neutral-dark)]">per night</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/properties/${slug}`}
                className="px-4 py-2 rounded-xl border-2 font-medium text-sm transition-all duration-200 hover:bg-[var(--color-accent-sage)] hover:text-white hover:border-[var(--color-accent-sage)]"
                style={{
                  borderColor: "var(--color-accent-sage)",
                  color: "var(--color-text-primary)",
                }}
              >
                View
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setBookingModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-lg"
                style={{
                  background: "var(--color-accent-sage)",
                  color: "white",
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {bookingModalOpen && (
        <BookingModal
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
          propertyId={id}
          propertyTitle={title}
          priceFrom={priceFrom}
        />
      )}
    </>
  );
}

export default memo(PropertyCard);