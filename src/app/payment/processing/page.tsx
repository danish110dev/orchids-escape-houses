"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function ProcessingContent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-[600px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Payment Processing
              </h1>
              <p className="text-xl text-[var(--color-neutral-dark)]">
                Your bank transfer is being processed
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-blue-900 mb-1">Expected Timeline</h3>
                  <p className="text-sm text-blue-800">
                    Bank transfers typically complete within 1-3 business days
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-green-900 mb-1">What Happens Next</h3>
                  <p className="text-sm text-green-800">
                    We'll send you an email confirmation once your payment is completed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-amber-900 mb-1">Limited Access</h3>
                  <p className="text-sm text-amber-800">
                    Your listing will be activated once payment is confirmed
                  </p>
                </div>
              </div>
            </div>

            {intent && (
              <div className="text-xs text-gray-500 break-all px-4 py-2 bg-gray-50 rounded">
                Payment Intent ID: {intent}
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button
                asChild
                size="lg"
                className="w-full rounded-2xl py-6 text-lg font-semibold"
                style={{ background: "var(--color-accent-sage)", color: "white" }}
              >
                <Link href="/owner-dashboard">Go to Dashboard</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-2xl py-6 text-lg font-semibold"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            <div className="text-sm text-[var(--color-neutral-dark)] pt-6 border-t border-gray-200">
              <p className="mb-2">Have questions?</p>
              <a href="/contact" className="text-[var(--color-accent-sage)] font-semibold hover:underline">
                Contact our support team
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent-sage)]" />
      </div>
    }>
      <ProcessingContent />
    </Suspense>
  );
}
