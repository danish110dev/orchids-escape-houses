import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { payments, user } from "../../../../../drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });
    
    if (!session?.user || (session.user as any).role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "100");

    // Build query for real transaction data
    let whereConditions = [];
    
    if (status !== "all") {
      whereConditions.push(eq(payments.paymentStatus, status));
    }

    // Fetch payments with user info
    const allPayments = await db
      .select({
        id: payments.id,
        stripePaymentIntentId: payments.stripePaymentIntentId,
        stripeChargeId: payments.stripeChargeId,
        userId: payments.userId,
        amount: payments.amount,
        currency: payments.currency,
        paymentStatus: payments.paymentStatus,
        paymentMethod: payments.paymentMethod,
        paymentMethodBrand: payments.paymentMethodBrand,
        paymentMethodLast4: payments.paymentMethodLast4,
        description: payments.description,
        receiptEmail: payments.receiptEmail,
        processedAt: payments.processedAt,
        createdAt: payments.createdAt,
        userName: user.name,
        userEmail: user.email,
      })
      .from(payments)
      .leftJoin(user, eq(payments.userId, user.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    // Filter by search
    let filtered = allPayments;
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(t =>
        (t.userName?.toLowerCase().includes(searchLower)) ||
        (t.userEmail?.toLowerCase().includes(searchLower)) ||
        (t.description?.toLowerCase().includes(searchLower)) ||
        (t.stripePaymentIntentId?.toLowerCase().includes(searchLower))
      );
    }

    // Transform to component format
    const transactions = filtered.slice(0, limit).map(t => ({
      id: t.id?.toString(),
      customer: {
        name: t.userName || "Unknown",
        email: t.userEmail || t.receiptEmail || "N/A",
      },
      amount: t.amount,
      currency: t.currency || "GBP",
      status: t.paymentStatus,
      date: t.processedAt || t.createdAt,
      stripeId: t.stripePaymentIntentId || t.stripeChargeId || "N/A",
      description: t.description || "Payment",
      propertyName: "N/A",
      paymentMethodBrand: t.paymentMethodBrand || "unknown",
      paymentMethodLast4: t.paymentMethodLast4 || "0000",
    }));

    // Calculate stats from real data
    const stats = {
      totalRevenue: allPayments
        .filter(t => t.paymentStatus === "succeeded")
        .reduce((sum, t) => sum + (t.amount || 0), 0),
      successful: allPayments.filter(t => t.paymentStatus === "succeeded").length,
      pending: allPayments.filter(t => t.paymentStatus === "pending").length,
      failed: allPayments.filter(t => t.paymentStatus === "failed").length,
      refunded: allPayments.filter(t => t.paymentStatus === "refunded").length,
      cancelled: allPayments.filter(t => t.paymentStatus === "cancelled").length,
    };

    return Response.json({
      transactions,
      stats,
      total: filtered.length,
      limit,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return Response.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
