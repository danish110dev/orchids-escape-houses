require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function checkSubscriptions() {
  console.log("🔍 Checking database for subscriptions...\n");
  
  try {
    // Check subscriptions
    const subscriptions = await client.execute("SELECT * FROM subscriptions");
    console.log(`📊 Subscriptions found: ${subscriptions.rows.length}`);
    
    if (subscriptions.rows.length > 0) {
      console.log("\n✅ Subscriptions exist:");
      subscriptions.rows.forEach((sub, i) => {
        console.log(`  ${i + 1}. ${sub.plan_name} (${sub.plan_type}) - User: ${sub.user_id} - Status: ${sub.status}`);
      });
    } else {
      console.log("\n⚠️  No subscriptions found in database!");
      console.log("   Owners need to purchase a plan first.");
    }
    
    // Check existing subscription payments
    const subPayments = await client.execute(`
      SELECT * FROM payments WHERE subscription_id IS NOT NULL
    `);
    console.log(`\n💳 Subscription payments found: ${subPayments.rows.length}`);
    
    if (subPayments.rows.length > 0) {
      console.log("\n✅ Existing subscription payments:");
      subPayments.rows.forEach((pay, i) => {
        console.log(`  ${i + 1}. ${pay.description} - £${pay.amount} - ${pay.payment_status}`);
      });
    } else {
      console.log("\n⚠️  No subscription payments found!");
    }
    
    // Check users with owner role
    const owners = await client.execute(`
      SELECT id, name, email, role, plan_id, payment_status FROM user WHERE role = 'owner'
    `);
    console.log(`\n👥 Users with 'owner' role: ${owners.rows.length}`);
    
    if (owners.rows.length > 0) {
      console.log("\n✅ Owners found:");
      owners.rows.forEach((owner, i) => {
        console.log(`  ${i + 1}. ${owner.name} (${owner.email})`);
        console.log(`     Plan: ${owner.plan_id || 'none'} - Payment: ${owner.payment_status || 'pending'}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

checkSubscriptions();
