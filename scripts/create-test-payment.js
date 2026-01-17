/**
 * Create a test payment for yasirmahar1511@gmail.com
 * Simulates what Stripe webhook would do
 */

require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function createPayment() {
  console.log("🧪 Creating NEW test payment for Ali Yasir...\n");
  
  try {
    const user = await client.execute({
      sql: "SELECT id, name, email FROM user WHERE email = ?",
      args: ["yasirmahar1511@gmail.com"]
    });
    
    if (user.rows.length === 0) {
      console.error("❌ User not found");
      process.exit(1);
    }
    
    const userId = user.rows[0].id;
    const now = new Date().toISOString();
    const amount = 850.00;
    
    // Get existing subscription
    const sub = await client.execute({
      sql: "SELECT id FROM subscriptions WHERE user_id = ? AND plan_type = 'gold' ORDER BY id DESC LIMIT 1",
      args: [userId]
    });
    
    const subscriptionId = sub.rows[0]?.id;
    
    if (!subscriptionId) {
      console.error("❌ No gold subscription found");
      process.exit(1);
    }
    
    // Create new payment
    await client.execute({
      sql: `INSERT INTO payments (
        user_id, subscription_id, amount, currency,
        payment_status, payment_method, payment_method_brand,
        payment_method_last4, description, billing_reason,
        stripe_subscription_id, stripe_payment_intent_id,
        stripe_customer_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        userId,
        subscriptionId,
        amount,
        'GBP',
        'succeeded',
        'card',
        'visa',
        '4242',
        'Gold Listing - Test Payment (Manual)',
        'subscription_create',
        `sub_test_manual_${Date.now()}`,
        `pi_test_manual_${Date.now()}`,
        `cus_test_manual_${Date.now()}`,
        now,
        now
      ]
    });
    
    console.log("✅ NEW payment created!");
    console.log(`   User: ${user.rows[0].name}`);
    console.log(`   Amount: £${amount}`);
    console.log(`   Plan: Gold Listing`);
    console.log(`   Date: ${new Date().toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`);
    console.log("\n🔄 Hard refresh admin dashboard to see it!");
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

createPayment();
