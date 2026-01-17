/**
 * Check specific payment details (ID: 22)
 */

require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function checkPaymentDetails() {
  console.log("🔍 Checking payment ID 22 details...\n");
  
  try {
    const result = await client.execute({
      sql: `SELECT 
              p.*,
              u.name as user_name,
              u.email as user_email,
              s.id as sub_id,
              s.plan_type,
              s.status as sub_status
            FROM payments p
            LEFT JOIN user u ON p.user_id = u.id
            LEFT JOIN subscriptions s ON p.subscription_id = s.id
            WHERE p.id = 22`,
      args: []
    });
    
    if (result.rows.length > 0) {
      const payment = result.rows[0];
      console.log("💳 Payment Details:");
      console.log(`   ID: ${payment.id}`);
      console.log(`   Amount: £${payment.amount}`);
      console.log(`   Status: ${payment.payment_status}`);
      console.log(`   User: ${payment.user_name} (${payment.user_email})`);
      console.log(`   Subscription ID: ${payment.subscription_id || '❌ NULL - THIS IS THE PROBLEM!'}`);
      console.log(`   Booking ID: ${payment.booking_id || 'NULL'}`);
      console.log(`   Created: ${payment.created_at}`);
      console.log(`   Billing Reason: ${payment.billing_reason}`);
      console.log(`   Stripe Sub ID: ${payment.stripe_subscription_id}`);
      console.log("");
      console.log("📋 Linked Subscription:");
      if (payment.subscription_id) {
        console.log(`   ✅ ID: ${payment.sub_id}, Plan: ${payment.plan_type}, Status: ${payment.sub_status}`);
      } else {
        console.log(`   ❌ NO SUBSCRIPTION LINKED - Payment won't show in admin dashboard!`);
      }
    } else {
      console.log("❌ Payment ID 22 not found");
    }
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkPaymentDetails();
