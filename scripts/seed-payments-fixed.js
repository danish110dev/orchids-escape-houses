/**
 * Seed Payment Records Script
 * Creates payment records for existing bookings and owner subscriptions
 */

require("dotenv").config();
const { drizzle } = require("drizzle-orm/libsql");
const { createClient } = require("@libsql/client");

// Initialize database connection
const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function seedGuestBookingPayments() {
  console.log("🏠 Seeding Guest Booking Payments...");
  
  // Fetch all bookings using raw client execute
  const allBookings = await client.execute("SELECT * FROM bookings");
  
  let depositCount = 0;
  let balanceCount = 0;
  
  for (const booking of allBookings.rows) {
    // Find user by email
    const guestUserResult = await client.execute({
      sql: "SELECT * FROM user WHERE email = ? LIMIT 1",
      args: [booking.guest_email]
    });
    
    const userId = guestUserResult.rows.length > 0 
      ? guestUserResult.rows[0].id 
      : "guest-unknown";
    
    // Create deposit payment if marked as paid
    if (booking.deposit_paid === 1 && booking.deposit_amount) {
      await client.execute({
        sql: `INSERT INTO payments (
          user_id, booking_id, amount, currency, payment_status, payment_method,
          description, billing_reason, stripe_payment_intent_id, stripe_charge_id,
          stripe_customer_id, receipt_email, metadata, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          userId,
          booking.id,
          booking.deposit_amount,
          "GBP",
          "succeeded",
          "card",
          `Deposit for ${booking.property_name} - ${booking.guest_name}`,
          "booking_deposit",
          booking.stripe_deposit_payment_intent_id || `seed_dep_${booking.id}_${Date.now()}`,
          booking.stripe_deposit_charge_id || `ch_seed_dep_${booking.id}`,
          booking.stripe_customer_id || `cus_seed_${userId}`,
          booking.guest_email,
          JSON.stringify({
            bookingId: booking.id,
            propertyName: booking.property_name,
            guestName: booking.guest_name,
            paymentType: "deposit",
            checkIn: booking.check_in_date,
            checkOut: booking.check_out_date,
          }),
          booking.created_at,
          booking.updated_at,
        ]
      });
      
      depositCount++;
      console.log(`  ✅ Created deposit payment for booking #${booking.id}`);
    }
    
    // Create balance payment if marked as paid
    if (booking.balance_paid === 1 && booking.balance_amount) {
      await client.execute({
        sql: `INSERT INTO payments (
          user_id, booking_id, amount, currency, payment_status, payment_method,
          description, billing_reason, stripe_payment_intent_id, stripe_charge_id,
          stripe_customer_id, receipt_email, metadata, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          userId,
          booking.id,
          booking.balance_amount,
          "GBP",
          "succeeded",
          "card",
          `Balance for ${booking.property_name} - ${booking.guest_name}`,
          "booking_balance",
          booking.stripe_balance_payment_intent_id || `seed_bal_${booking.id}_${Date.now()}`,
          booking.stripe_balance_charge_id || `ch_seed_bal_${booking.id}`,
          booking.stripe_customer_id || `cus_seed_${userId}`,
          booking.guest_email,
          JSON.stringify({
            bookingId: booking.id,
            propertyName: booking.property_name,
            guestName: booking.guest_name,
            paymentType: "balance",
            checkIn: booking.check_in_date,
            checkOut: booking.check_out_date,
          }),
          booking.updated_at,
          booking.updated_at,
        ]
      });
      
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
  const allSubscriptions = await client.execute("SELECT * FROM subscriptions");
  
  let subscriptionPaymentCount = 0;
  
  for (const subscription of allSubscriptions.rows) {
    // Create initial subscription payment
    await client.execute({
      sql: `INSERT INTO payments (
        user_id, subscription_id, amount, currency, payment_status, payment_method,
        description, billing_reason, stripe_subscription_id, stripe_payment_intent_id,
        stripe_customer_id, metadata, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        subscription.user_id,
        subscription.id,
        subscription.amount,
        subscription.currency,
        "succeeded",
        "card",
        `${subscription.plan_name} - ${subscription.plan_type}`,
        "subscription_create",
        subscription.stripe_subscription_id || `sub_seed_${subscription.id}_${Date.now()}`,
        `pi_seed_sub_${subscription.id}_${Date.now()}`,
        subscription.stripe_customer_id || `cus_seed_${subscription.user_id}`,
        JSON.stringify({
          subscriptionId: subscription.id,
          planName: subscription.plan_name,
          planType: subscription.plan_type,
          interval: subscription.interval,
          periodStart: subscription.current_period_start,
          periodEnd: subscription.current_period_end,
        }),
        subscription.created_at,
        subscription.updated_at,
      ]
    });
    
    subscriptionPaymentCount++;
    console.log(`  ✅ Created subscription payment for ${subscription.plan_name} (User: ${subscription.user_id})`);
    
    // If subscription is older than 1 month, create a recurring payment
    const createdDate = new Date(subscription.created_at);
    const now = new Date();
    const monthsActive = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    if (monthsActive > 0 && subscription.status === "active") {
      const recurringDate = new Date(createdDate);
      recurringDate.setMonth(recurringDate.getMonth() + 1);
      const recurringDateStr = recurringDate.toISOString();
      
      await client.execute({
        sql: `INSERT INTO payments (
          user_id, subscription_id, amount, currency, payment_status, payment_method,
          description, billing_reason, stripe_subscription_id, stripe_payment_intent_id,
          stripe_customer_id, metadata, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          subscription.user_id,
          subscription.id,
          subscription.amount,
          subscription.currency,
          "succeeded",
          "card",
          `${subscription.plan_name} - Monthly Renewal`,
          "subscription_cycle",
          subscription.stripe_subscription_id,
          `pi_seed_sub_${subscription.id}_renewal_${Date.now()}`,
          subscription.stripe_customer_id || `cus_seed_${subscription.user_id}`,
          JSON.stringify({
            subscriptionId: subscription.id,
            planName: subscription.plan_name,
            planType: subscription.plan_type,
            interval: subscription.interval,
            cycleNumber: 2,
          }),
          recurringDateStr,
          recurringDateStr,
        ]
      });
      
      subscriptionPaymentCount++;
      console.log(`  ✅ Created renewal payment for ${subscription.plan_name}`);
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
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
