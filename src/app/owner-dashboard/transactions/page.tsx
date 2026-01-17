"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { OwnerPropertyTransactions } from "@/components/owner/OwnerPropertyTransactions";

export default function OwnerTransactionsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/owner-login");
      } else if (session.user.role !== "owner" && session.user.role !== "admin") {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [session, isPending, router]);

  if (loading || isPending) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent-sage)] mx-auto"></div>
          <p className="mt-4 text-[var(--color-neutral-dark)]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/owner-dashboard")}
            className="mb-6 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Transactions Component */}
          <OwnerPropertyTransactions />
        </div>
      </main>

      <Footer />
    </div>
  );
}
