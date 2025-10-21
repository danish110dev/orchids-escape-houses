"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  property?: string;
  image?: string;
}

interface ReviewSliderProps {
  reviews: Review[];
}

export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2); // Tablet: 2 cards
      } else {
        setSlidesToShow(3); // Desktop: 3 cards
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - slidesToShow);

  useEffect(() => {
    if (!isAutoPlaying || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const cardWidth = 100 / slidesToShow;

  return (
    <div className="relative px-2 sm:px-4">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${cardWidth}%` }}
            >
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md h-full">
                {/* Quote Icon */}
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 opacity-20"
                  fill="var(--color-accent-gold)"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>

                {/* Stars */}
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < review.rating
                          ? "fill-[var(--color-accent-gold)] text-[var(--color-accent-gold)]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[var(--color-neutral-dark)] mb-4 sm:mb-6 line-clamp-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Reviewer Info */}
                <div className="pt-3 sm:pt-4 border-t border-[var(--color-bg-secondary)] flex items-center gap-3 sm:gap-4">
                  {review.image && (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-[var(--color-text-primary)]">{review.name}</p>
                    {review.property && (
                      <p className="text-xs sm:text-sm text-[var(--color-neutral-dark)]">{review.property}</p>
                    )}
                    <p className="text-xs text-[var(--color-neutral-dark)] mt-1">{review.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {maxIndex > 0 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[var(--color-accent-sage)] hover:text-white transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[var(--color-accent-sage)] hover:text-white transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-[var(--color-accent-sage)]"
                  : "w-2 bg-[var(--color-bg-secondary)]"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}