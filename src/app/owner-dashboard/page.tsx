"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  MessageSquare, 
  Eye, 
  Plus, 
  Calendar, 
  Settings, 
  LogOut,
  CreditCard,
  ChevronRight,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function OwnerDashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/owner-login");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    setLoading(true);
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (isPending) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[var(--color-accent-sage)]" /></div>;
  if (!session) return null;

  const user = session.user as any;
  const isPaymentActive = user.paymentStatus === "active";

  const getPlanName = (planId: string) => {
    switch (planId) {
      case "bronze": return "Bronze Listing";
      case "silver": return "Silver Listing";
      case "gold": return "Gold Listing";
      case "essential": return "Bronze Listing"; // Legacy
      case "featured": return "Silver Listing"; // Legacy
      default: return planId || "None";
    }
  };

  const handlePayNow = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: user.planId || 'bronze' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Welcome, {user.name.split(' ')[0]}
              </h1>
              <p className="text-[var(--color-neutral-dark)]">Manage your property and track performance from your dashboard.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-xl border-gray-200" onClick={handleLogout} disabled={loading}>
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
              <Button className="rounded-xl bg-[var(--color-accent-sage)] hover:bg-[var(--color-accent-sage)]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Stats & Listing */}
            <div className="lg:col-span-2 space-y-8">
              {/* Status Banner */}
              <div className={`p-6 rounded-3xl border flex items-center gap-4 ${isPaymentActive ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPaymentActive ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                  {isPaymentActive ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg">Listing Status: {isPaymentActive ? "Active" : "Payment Pending"}</h3>
                  <p className="text-sm opacity-80">
                    {isPaymentActive 
                      ? "Your property listing is live and receiving enquiries." 
                      : "Complete your payment to activate your property listing."}
                  </p>
                </div>
                  {!isPaymentActive && (
                    <Button 
                      onClick={handlePayNow}
                      disabled={loading}
                      className="ml-auto bg-amber-600 hover:bg-amber-700 text-white rounded-xl"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Pay Now
                    </Button>
                  )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Views this month", value: "0", icon: Eye, color: "blue" },
                  { label: "Enquiries this month", value: "0", icon: MessageSquare, color: "green" },
                  { label: "Listing impressions", value: "0", icon: BarChart3, color: "purple" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-[var(--color-neutral-dark)]">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-bold text-xl">Quick Actions</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  <button className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-[var(--color-bg-primary)]">
                        <Settings className="w-5 h-5 text-[var(--color-accent-sage)]" />
                      </div>
                      <div>
                        <div className="font-bold">Edit Listing Details</div>
                        <div className="text-sm text-[var(--color-neutral-dark)]">Update photos, description, and pricing.</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </button>
                  <button className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-[var(--color-bg-primary)]">
                        <Calendar className="w-5 h-5 text-[var(--color-accent-sage)]" />
                      </div>
                      <div>
                        <div className="font-bold">Connect Calendar</div>
                        <div className="text-sm text-[var(--color-neutral-dark)]">Sync availability with iCal (Airbnb, Booking.com, etc).</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Billing & Account */}
            <div className="space-y-8">
              {/* Plan Details */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-xl mb-6">Billing & Plan</h3>
                <div className="mb-6">
                  <div className="text-sm text-[var(--color-neutral-dark)] mb-1">Current Plan</div>
                  <div className="text-2xl font-bold">{getPlanName(user.planId)}</div>
                </div>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full rounded-xl border-gray-200" disabled>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Billing
                  </Button>
                  {user.planId !== "gold" && (
                    <Button 
                      asChild
                      className="w-full rounded-xl bg-[var(--color-accent-sage)] text-white"
                    >
                      <Link href="/register-your-property#plans">
                        Upgrade Plan
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Property Support */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-xl mb-4">Property Support</h3>
                <p className="text-sm text-[var(--color-neutral-dark)] mb-6">Need help with your listing or account? Our expert team is on hand to assist.</p>
                <div className="space-y-2">
                  <p className="text-sm font-bold">Email us:</p>
                  <a href="mailto:hello@groupescapehouses.co.uk" className="text-[var(--color-accent-sage)] hover:underline">
                    hello@groupescapehouses.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
