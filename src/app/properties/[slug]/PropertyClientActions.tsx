"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

interface PropertyClientActionsProps {
  propertyTitle: string;
}

export default function PropertyClientActions({ propertyTitle }: PropertyClientActionsProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        className="rounded-xl min-h-[48px] min-w-[48px]"
        onClick={() => setIsSaved(!isSaved)}
        aria-label={isSaved ? "Remove from saved" : "Save property"}
      >
        <Heart
          className={`w-4 h-4 mr-2 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
        />
        {isSaved ? "Saved" : "Save"}
      </Button>
      <Button 
        variant="outline" 
        className="rounded-xl min-h-[48px] min-w-[48px]"
        onClick={handleShare}
        aria-label="Share property"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
}
