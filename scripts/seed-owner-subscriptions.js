require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Plan pricing
const PLAN_PRICES = {
  bronze: 450.00,
  silver: 650.00,
  gold: 850.00
};

async function createOwnerSubscriptions() {
  console.log("🏗️  Creating subscriptions and payments for owners...\n");
  
  try {
    // Get all owners with pending payments
    const owners = await client.execute(`
      SELECT id, name, email, plan_id FROM user WHERE role = 'owner' AND plan_id IS NOT NULL
    `);
    
    let createdSubscriptions = 0;
    let createdPayments = 0;
    
    for (const owner of owners.rows) {
      const planId = owner.plan_id;
      const amount = PLAN_PRICES[planId];
      const now = new Date().toISOString();
      const oneYearLater = new Date();
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      
      console.log(`\n👤 Processing: ${owner.name} (${planId})`);
      
      // Create subscription
      const subResult = await client.execute({
        sql: `INSERT INTO subscriptions (
          user_id, plan_name, plan_type, status, 
          current_period_start, current_period_end,
          amount, currency, interval, interval_count,
          stripe_subscription_id, stripe_customer_id,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          owner.id,
          `${planId.charAt(0).toUpperCase() + planId.slice(1)} Listing`,
          planId,
          'active',
          now,
          oneYearLater.toISOString(),
          amount,
          'GBP',
          'year',
          1,
          `sub_test_${owner.id}_${Date.now()}`,
          `cus_test_${owner.id}`,
          now,
          now
        ]
      });
      
      // Get the subscription ID
      const subId = await client.execute({
        sql: "SELECT id FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1",
        args: [owner.id]
      });
      
      const subscriptionId = subId.rows[0].id;
      createdSubscriptions++;
      console.log(`  ✅ Subscription created (ID: ${subscriptionId})`);
      
      // Create payment for subscription
      await client.execute({
        sql: `INSERT INTO payments (
          user_id, subscription_id, amount, currency, 
          payment_status, payment_method, description, 
          billing_reason, stripe_subscription_id, 
          stripe_payment_intent_id, stripe_customer_id,
          metadata, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          owner.id,
          subscriptionId,
          amount,
          'GBP',
          'succeeded',
          'card',
          `${planId.charAt(0).toUpperCase() + planId.slice(1)} Listing - Annual Payment`,
          'subscription_create',
          `sub_test_${owner.id}_${Date.now()}`,
          `pi_test_${owner.id}_${Date.now()}`,
          `cus_test_${owner.id}`,
          JSON.stringify({
            subscriptionId,
            planName: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Listing`,
            planType: planId,
            interval: 'year'
          }),
          now,
          now
        ]
      });
      
      createdPayments++;
      console.log(`  ✅ Payment created (£${amount})`);
      
      // Update user payment status
      await client.execute({
        sql: "UPDATE user SET payment_status = 'paid' WHERE id = ?",
        args: [owner.id]
      });
      console.log(`  ✅ User payment status updated`);
    }
    
    console.log("\n" + "=".repeat(50));
    console.log("🎉 COMPLETE!");
    console.log(`✅ Created ${createdSubscriptions} subscriptions`);
    console.log(`✅ Created ${createdPayments} payments`);
    console.log(`💰 Total Revenue: £${Object.values(PLAN_PRICES).slice(0, owners.rows.length).reduce((a, b, i) => a + PLAN_PRICES[owners.rows[i].plan_id], 0)}`);
    console.log("\n🔄 Refresh your admin dashboard to see Owner Transactions!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createOwnerSubscriptions();
