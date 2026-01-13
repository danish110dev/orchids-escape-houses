"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { PLANS, PlanId } from "@/lib/plans";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentForm({ clientSecret, planId }: { clientSecret: string; planId: PlanId }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const plan = PLANS[planId];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe failed to load");
      return;
    }

    setLoading(true);

    try {
      // Confirm payment with bank transfer support
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        // Important: Allow bank transfers which may redirect
        redirect: "if_required",
      });

      // Handle successful payment
      if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        router.push("/payment/success");
      } else if (result.paymentIntent?.status === "processing") {
        // Bank transfer or other async payment
        toast.success("Payment processing! We'll confirm once it completes.");
        router.push(`/payment/processing?intent=${result.paymentIntent.id}`);
      } else if (result.error) {
        setErrorMessage(result.error.message || "Payment failed");
        toast.error(result.error.message || "Payment failed");
      }
    } catch (error: any) {
      const message = error.message || "An unexpected error occurred";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Bank transfers take 1-3 business days</p>
          <p>For instant payment, use card or Apple/Google Pay instead</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg">{plan.name}</h3>
        <div className="flex justify-between items-baseline">
          <span className="text-gray-600">Amount:</span>
          <span className="text-2xl font-bold">£{plan.price}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-6 text-base font-semibold"
        style={{
          background: loading ? "#ccc" : "var(--color-accent-sage)",
          color: "white",
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay £${plan.price}`
        )}
      </Button>
    </form>
  );
}

function BankTransferPaymentPageComponent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") as PlanId;
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            planId, 
            interval: "yearly",
            paymentMethod: "bank_transfer"
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        toast.error(error.message || "Failed to initialize payment");
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchPaymentIntent();
    }
  }, [planId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!clientSecret || !planId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid Request</h1>
          <p className="text-gray-600">Please select a plan first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Bank Transfer Payment
        </h1>
        <p className="text-gray-600 mb-8">
          Select your payment method below
        </p>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} planId={planId} />
        </Elements>

        <div className="mt-8 pt-6 border-t">
          <a
            href={`/payment?plan=${planId}`}
            className="text-center block text-sm text-blue-600 hover:underline"
          >
            ← Back to payment options
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BankTransferPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <BankTransferPaymentPageComponent />
    </Suspense>
  );
}
