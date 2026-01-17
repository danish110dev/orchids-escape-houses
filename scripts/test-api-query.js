/**
 * Test the API endpoint directly
 */

require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function testAPI() {
  console.log("🔍 Simulating API query...\n");
  
  try {
    // This is the exact query from the API
    const result = await client.execute({
      sql: `SELECT 
              p.id,
              p.user_id,
              u.name as userName,
              u.email as userEmail,
              u.role as userRole,
              p.amount,
              p.currency,
              p.payment_status as status,
              p.payment_method as paymentMethod,
              p.payment_method_brand as paymentMethodBrand,
              p.payment_method_last4 as paymentMethodLast4,
              p.description,
              p.billing_reason as billingReason,
              p.created_at as createdAt,
              p.stripe_payment_intent_id as stripePaymentIntentId,
              p.stripe_subscription_id as stripeSubscriptionId,
              p.receipt_url as receiptUrl,
              s.id as subscriptionId,
              s.plan_name as planName,
              s.plan_type as planType,
              s.status as subscriptionStatus,
              s.interval as subscriptionInterval,
              s.current_period_end as currentPeriodEnd
            FROM payments p
            LEFT JOIN user u ON p.user_id = u.id
            LEFT JOIN subscriptions s ON p.subscription_id = s.id
            WHERE p.subscription_id IS NOT NULL 
              AND p.booking_id IS NULL
            ORDER BY p.created_at DESC`,
      args: []
    });
    
    console.log(`📊 Found ${result.rows.length} owner transactions\n`);
    
    result.rows.forEach(row => {
      console.log(`ID: ${row.id}, Amount: £${row.amount}, User: ${row.userEmail}, Plan: ${row.planType}, Date: ${row.createdAt}`);
    });
    
    // Check specifically for payment 22
    const payment22 = result.rows.find(r => r.id === 22);
    if (payment22) {
      console.log("\n✅ Payment ID 22 IS in results!");
      console.log(JSON.stringify(payment22, null, 2));
    } else {
      console.log("\n❌ Payment ID 22 NOT in results!");
    }
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testAPI();
