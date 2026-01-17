/**
 * Seed Payment Records Script
 * Creates payment records for existing bookings and owner subscriptions
 */

import { db } from "@/db";
import { payments, bookings, subscriptions, user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

async function seedGuestBookingPayments() {
  console.log("🏠 Seeding Guest Booking Payments...");
  
  // Fetch all bookings
  const allBookings = await db.select().from(bookings);
  
  let depositCount = 0;
  let balanceCount = 0;
  
  for (const booking of allBookings) {
    // Find user by email
    const guestUsers = await db
      .select()
      .from(user)
      .where(eq(user.email, booking.guestEmail))
      .limit(1);
    
    const userId = guestUsers.length > 0 
      ? guestUsers[0].id 
      : "guest-unknown"; // Fallback for non-registered guests
    
    // Create deposit payment if marked as paid
    if (booking.depositPaid === 1 && booking.depositAmount) {
      const depositPayment = await db.insert(payments).values({
        userId,
        bookingId: booking.id,
        amount: booking.depositAmount,
        currency: "GBP",
        paymentStatus: "succeeded",
        paymentMethod: "card",
        description: `Deposit for ${booking.propertyName} - ${booking.guestName}`,
        billingReason: "booking_deposit",
        stripePaymentIntentId: booking.stripeDepositPaymentIntentId || `seed_dep_${booking.id}_${Date.now()}`,
        stripeChargeId: booking.stripeDepositChargeId || `ch_seed_dep_${booking.id}`,
        stripeCustomerId: booking.stripeCustomerId || `cus_seed_${userId}`,
        receiptEmail: booking.guestEmail,
        metadata: JSON.stringify({
          bookingId: booking.id,
          propertyName: booking.propertyName,
          guestName: booking.guestName,
          paymentType: "deposit",
          checkIn: booking.checkInDate,
          checkOut: booking.checkOutDate,
        }),
        date: booking.createdAt,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      }).returning();
      
      depositCount++;
      console.log(`  ✅ Created deposit payment for booking #${booking.id}`);
    }
    
    // Create balance payment if marked as paid
    if (booking.balancePaid === 1 && booking.balanceAmount) {
      const balancePayment = await db.insert(payments).values({
        userId,
        bookingId: booking.id,
        amount: booking.balanceAmount,
        currency: "GBP",
        paymentStatus: "succeeded",
        paymentMethod: "card",
        description: `Balance for ${booking.propertyName} - ${booking.guestName}`,
        billingReason: "booking_balance",
        stripePaymentIntentId: booking.stripeBalancePaymentIntentId || `seed_bal_${booking.id}_${Date.now()}`,
        stripeChargeId: booking.stripeBalanceChargeId || `ch_seed_bal_${booking.id}`,
        stripeCustomerId: booking.stripeCustomerId || `cus_seed_${userId}`,
        receiptEmail: booking.guestEmail,
        metadata: JSON.stringify({
          bookingId: booking.id,
          propertyName: booking.propertyName,
          guestName: booking.guestName,
          paymentType: "balance",
          checkIn: booking.checkInDate,
          checkOut: booking.checkOutDate,
        }),
        date: booking.updatedAt, // Balance typically paid later
        createdAt: booking.updatedAt,
        updatedAt: booking.updatedAt,
      }).returning();
      
      balanceCount++;
      console.log(`  ✅ Created balance payment for booking #${booking.id}`);
    }
  }
  
  console.log(`✅ Guest Payments Created: ${depositCount} deposits, ${balanceCount} balances\n`);
  return { depositCount, balanceCount };
}

async function seedOwnerSubscriptionPayments() {
  console.log("💼 Seeding Owner Subscription Payments...");
  
  // Fetch all active subscriptions
  const allSubscriptions = await db.select().from(subscriptions);
  
  let subscriptionPaymentCount = 0;
  
  for (const subscription of allSubscriptions) {
    // Create initial subscription payment
    const subPayment = await db.insert(payments).values({
      userId: subscription.userId,
      subscriptionId: subscription.id,
      amount: subscription.amount,
      currency: subscription.currency,
      paymentStatus: "succeeded",
      paymentMethod: "card",
      description: `${subscription.planName} - ${subscription.planType}`,
      billingReason: "subscription_create",
      stripeSubscriptionId: subscription.stripeSubscriptionId || `sub_seed_${subscription.id}_${Date.now()}`,
      stripePaymentIntentId: `pi_seed_sub_${subscription.id}_${Date.now()}`,
      stripeCustomerId: subscription.stripeCustomerId || `cus_seed_${subscription.userId}`,
      metadata: JSON.stringify({
        subscriptionId: subscription.id,
        planName: subscription.planName,
        planType: subscription.planType,
        interval: subscription.interval,
        periodStart: subscription.currentPeriodStart,
        periodEnd: subscription.currentPeriodEnd,
      }),
      date: subscription.createdAt,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    }).returning();
    
    subscriptionPaymentCount++;
    console.log(`  ✅ Created subscription payment for ${subscription.planName} (User: ${subscription.userId})`);
    
    // If subscription is older than 1 month, create a recurring payment
    const createdDate = new Date(subscription.createdAt);
    const now = new Date();
    const monthsActive = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    if (monthsActive > 0 && subscription.status === "active") {
      // Create one recurring payment
      const recurringDate = new Date(createdDate);
      recurringDate.setMonth(recurringDate.getMonth() + 1);
      
      await db.insert(payments).values({
        userId: subscription.userId,
        subscriptionId: subscription.id,
        amount: subscription.amount,
        currency: subscription.currency,
        paymentStatus: "succeeded",
        paymentMethod: "card",
        description: `${subscription.planName} - Monthly Renewal`,
        billingReason: "subscription_cycle",
        stripeSubscriptionId: subscription.stripeSubscriptionId,
        stripePaymentIntentId: `pi_seed_sub_${subscription.id}_renewal_${Date.now()}`,
        stripeCustomerId: subscription.stripeCustomerId || `cus_seed_${subscription.userId}`,
        metadata: JSON.stringify({
          subscriptionId: subscription.id,
          planName: subscription.planName,
          planType: subscription.planType,
          interval: subscription.interval,
          cycleNumber: 2,
        }),
        date: recurringDate.toISOString(),
        createdAt: recurringDate.toISOString(),
        updatedAt: recurringDate.toISOString(),
      });
      
      subscriptionPaymentCount++;
      console.log(`  ✅ Created renewal payment for ${subscription.planName}`);
    }
  }
  
  console.log(`✅ Owner Subscription Payments Created: ${subscriptionPaymentCount}\n`);
  return { subscriptionPaymentCount };
}

async function main() {
  console.log("🌱 Starting Payment Seeding Process...\n");
  console.log("=" .repeat(50));
  
  try {
    const guestStats = await seedGuestBookingPayments();
    const ownerStats = await seedOwnerSubscriptionPayments();
    
    console.log("=" .repeat(50));
    console.log("🎉 SEEDING COMPLETE!");
    console.log(`\n📊 Summary:`);
    console.log(`  Guest Bookings: ${guestStats.depositCount + guestStats.balanceCount} payments`);
    console.log(`    - Deposits: ${guestStats.depositCount}`);
    console.log(`    - Balances: ${guestStats.balanceCount}`);
    console.log(`  Owner Subscriptions: ${ownerStats.subscriptionPaymentCount} payments`);
    console.log(`\n✅ Total Payments Created: ${guestStats.depositCount + guestStats.balanceCount + ownerStats.subscriptionPaymentCount}`);
    
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
