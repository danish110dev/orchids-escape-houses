"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Calendar } from "lucide-react";

interface EnquiryFormProps {
  propertyTitle?: string;
  propertySlug?: string;
}

export default function EnquiryForm({ propertyTitle, propertySlug }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Enquiry Sent!
        </h3>
        <p className="text-[var(--color-neutral-dark)]">
          Thank you for your enquiry. Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
      <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Check dates and enquire
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-2 block">
            Your name
          </Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Jane Smith"
            className="rounded-xl"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium mb-2 block">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="rounded-xl"
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
            Phone number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="07123 456789"
            className="rounded-xl"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkin" className="text-sm font-medium mb-2 block">
              Check-in
            </Label>
            <div className="relative">
              <Input
                id="checkin"
                name="checkin"
                type="date"
                required
                className="rounded-xl"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[var(--color-neutral-dark)]" />
            </div>
          </div>
          <div>
            <Label htmlFor="checkout" className="text-sm font-medium mb-2 block">
              Check-out
            </Label>
            <div className="relative">
              <Input
                id="checkout"
                name="checkout"
                type="date"
                required
                className="rounded-xl"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[var(--color-neutral-dark)]" />
            </div>
          </div>
        </div>

        {/* Group Size */}
        <div>
          <Label htmlFor="groupSize" className="text-sm font-medium mb-2 block">
            Group size
          </Label>
          <Input
            id="groupSize"
            name="groupSize"
            type="number"
            min="1"
            required
            placeholder="12"
            className="rounded-xl"
          />
        </div>

        {/* Occasion */}
        <div>
          <Label htmlFor="occasion" className="text-sm font-medium mb-2 block">
            Occasion
          </Label>
          <Input
            id="occasion"
            name="occasion"
            placeholder="Hen party"
            className="rounded-xl"
          />
        </div>

        {/* Add-ons */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Add experiences (optional)</Label>
          <div className="space-y-2">
            {[
              "Cocktail Masterclass",
              "Butlers in the Buff",
              "Life Drawing",
              "Private Chef",
              "Spa Treatments",
            ].map((addon) => (
              <label key={addon} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="addons"
                  value={addon}
                  className="w-4 h-4 rounded accent-[var(--color-accent-pink)]"
                />
                <span className="text-sm">{addon}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-sm font-medium mb-2 block">
            Additional requests
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us more about your celebration..."
            className="rounded-xl"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl py-6 text-base font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          style={{
            background: isSubmitting ? "var(--color-bg-secondary)" : "var(--color-accent-pink)",
            color: "var(--color-text-primary)",
          }}
        >
          {isSubmitting ? "Sending..." : "Send Enquiry"}
        </Button>

        <p className="text-xs text-center text-[var(--color-neutral-dark)]">
          Fast response from our UK team. We'll get back to you within 24 hours.
        </p>
      </form>
    </div>
  );
}