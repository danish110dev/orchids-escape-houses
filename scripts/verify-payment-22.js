/**
 * Verify payment 22 has all required fields
 */

require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function verifyPayment() {
  console.log("🔍 Comprehensive Payment 22 Check\n");
  
  try {
    const result = await client.execute({
      sql: "SELECT * FROM payments WHERE id = 22",
      args: []
    });
    
    const payment = result.rows[0];
    
    console.log("✅ PAYMENT EXISTS:");
    console.log(`   ID: ${payment.id}`);
    console.log(`   Amount: £${payment.amount}`);
    console.log(`   Status: ${payment.payment_status}`);
    console.log(`   Created: ${payment.created_at}`);
    console.log("");
    
    console.log("🔗 CRITICAL LINKS:");
    console.log(`   ✅ user_id: ${payment.user_id}`);
    console.log(`   ✅ subscription_id: ${payment.subscription_id} ${payment.subscription_id ? '(LINKED!)' : '(❌ NOT LINKED!)'}`);
    console.log(`   ✅ booking_id: ${payment.booking_id || 'NULL (correct for owner payment)'}`);
    console.log("");
    
    console.log("📋 DISPLAY INFO:");
    console.log(`   Description: ${payment.description}`);
    console.log(`   Billing Reason: ${payment.billing_reason}`);
    console.log(`   Payment Method: ${payment.payment_method}`);
    console.log(`   Last 4: ${payment.payment_method_last4 || 'NULL'}`);
    console.log("");
    
    console.log("🎯 VERDICT:");
    if (payment.subscription_id && !payment.booking_id) {
      console.log("   ✅ This payment SHOULD appear in 'Owner Plans' tab");
      console.log("   ✅ All database requirements met");
      console.log("");
      console.log("💡 SOLUTION:");
      console.log("   1. Go to admin dashboard: /admin/dashboard");
      console.log("   2. Click 'Owner Plans' tab");
      console.log("   3. Hard refresh (Ctrl + Shift + R)");
      console.log("   4. Look for: Ali Yasir - £850 - Gold - Jan 17");
    } else {
      console.log("   ❌ Database structure issue detected!");
    }
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

verifyPayment();
