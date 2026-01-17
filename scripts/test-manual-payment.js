/**
 * Manual Test: Simulate Stripe Webhook Payment
 * This creates a payment as if it came from Stripe
 */

require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function testPayment() {
  console.log("🧪 Creating test payment (simulating Stripe webhook)...\n");
  
  try {
    // Get a user
    const users = await client.execute("SELECT id, name, email FROM user WHERE role = 'owner' LIMIT 1");
    
    if (users.rows.length === 0) {
      console.error("❌ No users found");
      process.exit(1);
    }
    
    const user = users.rows[0];
    const now = new Date().toISOString();
    const amount = 650.00; // Silver plan
    
    console.log(`👤 Creating payment for: ${user.name} (${user.email})`);
    
    // Create subscription first
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    
    await client.execute({
      sql: `INSERT INTO subscriptions (
        user_id, plan_name, plan_type, status,
        current_period_start, current_period_end,
        amount, currency, interval, interval_count,
        stripe_subscription_id, stripe_customer_id,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        user.id,
        'Silver Listing',
        'silver',
        'active',
        now,
        oneYearLater.toISOString(),
        amount,
        'GBP',
        'year',
        1,
        `sub_test_manual_${Date.now()}`,
        `cus_test_manual_${Date.now()}`,
        now,
        now
      ]
    });
    
    // Get subscription ID
    const subResult = await client.execute({
      sql: "SELECT id FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1",
      args: [user.id]
    });
    
    const subscriptionId = subResult.rows[0].id;
    
    // Create payment
    await client.execute({
      sql: `INSERT INTO payments (
        user_id, subscription_id, amount, currency,
        payment_status, payment_method, payment_method_brand,
        payment_method_last4, description, billing_reason,
        stripe_subscription_id, stripe_payment_intent_id,
        stripe_customer_id, receipt_url, metadata,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        user.id,
        subscriptionId,
        amount,
        'GBP',
        'succeeded',
        'card',
        'visa',
        '4242',
        'Silver Listing - Annual Payment (Test)',
        'subscription_create',
        `sub_test_manual_${Date.now()}`,
        `pi_test_manual_${Date.now()}`,
        `cus_test_manual_${Date.now()}`,
        'https://stripe.com/receipt/test',
        JSON.stringify({
          subscriptionId,
          planName: 'Silver Listing',
          planType: 'silver',
          testPayment: true
        }),
        now,
        now
      ]
    });
    
    console.log("\n✅ Test payment created successfully!");
    console.log("\n📊 Payment Details:");
    console.log(`   Amount: £${amount}`);
    console.log(`   Plan: Silver Listing`);
    console.log(`   Status: succeeded`);
    console.log(`   Date: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`);
    console.log("\n🔄 Refresh your admin dashboard to see this payment!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

testPayment();
