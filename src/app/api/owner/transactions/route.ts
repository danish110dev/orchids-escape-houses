/**
 * API Route: Owner's Property Booking Transactions
 * GET /api/owner/transactions
 * Returns booking payments for properties owned by the authenticated owner
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { payments, bookings, properties, user } from "../../../../../drizzle/schema";
import { eq, desc, and, isNotNull } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Auth check
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Verify user is an owner
    if (session.user.role !== "owner" && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied - Owner role required" },
        { status: 403 }
      );
    }

    const userId = session.user.id;

    // Get all properties owned by this user
    const ownerProperties = await db
      .select({ id: properties.id })
      .from(properties)
      .where(eq(properties.ownerId, userId));

    const propertyIds = ownerProperties.map((p) => p.id);

    if (propertyIds.length === 0) {
      return NextResponse.json({
        success: true,
        transactions: [],
        stats: {
          totalTransactions: 0,
          totalRevenue: 0,
          totalBookings: 0,
          pendingPayments: 0,
        },
        message: "No properties found for this owner",
      });
    }

    // Fetch all booking payments for this owner's properties
    const ownerTransactions = await db
      .select({
        id: payments.id,
        amount: payments.amount,
        currency: payments.currency,
        status: payments.paymentStatus,
        paymentMethod: payments.paymentMethod,
        paymentMethodBrand: payments.paymentMethodBrand,
        paymentMethodLast4: payments.paymentMethodLast4,
        description: payments.description,
        billingReason: payments.billingReason,
        createdAt: payments.createdAt,
        receiptUrl: payments.receiptUrl,
        // Booking details
        bookingId: bookings.id,
        propertyName: bookings.propertyName,
        propertyLocation: bookings.propertyLocation,
        guestName: bookings.guestName,
        guestEmail: bookings.guestEmail,
        guestPhone: bookings.guestPhone,
        checkInDate: bookings.checkInDate,
        checkOutDate: bookings.checkOutDate,
        numberOfGuests: bookings.numberOfGuests,
        bookingStatus: bookings.bookingStatus,
        totalPrice: bookings.totalPrice,
        depositAmount: bookings.depositAmount,
        balanceAmount: bookings.balanceAmount,
        occasion: bookings.occasion,
        // Property details
        propertyId: properties.id,
      })
      .from(payments)
      .leftJoin(bookings, eq(payments.bookingId, bookings.id))
      .leftJoin(properties, eq(bookings.propertyId, properties.id))
      .where(and(isNotNull(payments.bookingId)))
      .orderBy(desc(payments.createdAt));

    // Filter to only include this owner's properties
    const filteredTransactions = ownerTransactions.filter((t) =>
      propertyIds.includes(t.propertyId!)
    );

    console.log("📊 Owner Transactions API Response:", {
      ownerId: userId,
      propertyCount: propertyIds.length,
      transactionCount: filteredTransactions.length,
    });

    // Calculate statistics
    const stats = {
      totalTransactions: filteredTransactions.length,
      totalRevenue: filteredTransactions
        .filter((t) => t.status === "succeeded")
        .reduce((sum, t) => sum + (t.amount || 0), 0),
      totalBookings: new Set(filteredTransactions.map((t) => t.bookingId)).size,
      pendingPayments: filteredTransactions.filter(
        (t) => t.status === "pending" || t.status === "processing"
      ).length,
      depositPayments: filteredTransactions.filter(
        (t) => t.billingReason === "booking_deposit"
      ).length,
      balancePayments: filteredTransactions.filter(
        (t) => t.billingReason === "booking_balance"
      ).length,
    };

    return NextResponse.json({
      success: true,
      transactions: filteredTransactions,
      stats,
      propertyCount: propertyIds.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Owner Transactions API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch owner transactions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
