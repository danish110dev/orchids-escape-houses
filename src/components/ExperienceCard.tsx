"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, UsersRound } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  duration: string;
  priceFrom: number;
  image: string;
  groupSize: string;
  slug: string;
}

export default function ExperienceCard({
  title,
  duration,
  priceFrom,
  image,
  groupSize,
  slug,
}: ExperienceCardProps) {
  return (
    <Link href={`/experiences/${slug}`}>
      <div className="group relative rounded-2xl overflow-hidden h-96 shadow-md hover:shadow-2xl transition-all duration-300">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <h3
            className="text-2xl font-semibold mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>
          
          <div className="flex items-center gap-6 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersRound className="w-4 h-4" />
              <span>{groupSize}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">From</p>
              <p className="text-2xl font-bold">£{priceFrom}</p>
              <p className="text-xs opacity-90">per person</p>
            </div>
            
            <div
              className="px-6 py-2 rounded-xl font-medium text-sm group-hover:scale-105 transition-transform"
              style={{ background: "var(--color-accent-sage)", color: "white" }}
            >
              View Experience
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}