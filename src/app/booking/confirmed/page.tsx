"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GEH_API } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Home, Mail, Calendar } from "lucide-react";
import Link from "next/link";

interface BookingDetails {
  booking_id: string;
  property_title: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  total: number;
  status: string;
  customer_name: string;
  customer_email: string;
}

export default function BookingConfirmedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bid");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided");
      setLoading(false);
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const data = await GEH_API.get<BookingDetails>(
          `/bookings/${bookingId}`,
          false // No auth required for confirmation page
        );
        setBooking(data);
      } catch (error: any) {
        console.error("Failed to fetch booking details:", error);
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--color-accent-sage)] mx-auto mb-4" />
          <p className="text-gray-600">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't find your booking details"}
          </p>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--color-accent-sage)] to-[var(--color-accent-gold)] p-8 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-lg opacity-90">
              Your payment was successful
            </p>
          </div>

          {/* Booking Details */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Booking Details
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-mono font-medium">{booking.booking_id}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium text-right">{booking.property_title}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">{booking.check_in_date}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">{booking.check_out_date}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">{booking.guests}</span>
                </div>

                <div className="flex justify-between items-start pt-4 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">Total Paid:</span>
                  <span className="text-2xl font-bold text-[var(--color-accent-sage)]">
                    £{booking.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              
              <div className="bg-blue-50 rounded-lg p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{booking.customer_email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{booking.customer_name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                What's Next?
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>✓ A confirmation email has been sent to {booking.customer_email}</li>
                <li>✓ You'll receive property details and check-in instructions 48 hours before arrival</li>
                <li>✓ Our team will contact you within 24 hours to confirm all details</li>
                <li>✓ For any questions, reply to the confirmation email</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                asChild
                className="flex-1"
                style={{
                  background: "var(--color-accent-sage)",
                  color: "white",
                }}
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Homepage
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="flex-1"
              >
                <Link href="/properties">
                  Browse More Properties
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:hello@groupescapehouses.co.uk"
              className="text-[var(--color-accent-sage)] hover:underline"
            >
              hello@groupescapehouses.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
