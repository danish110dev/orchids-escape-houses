/**
 * Check for recent payment (£850, yasirmahar1511@gmail.com)
 */

require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function checkPayment() {
  console.log("🔍 Searching for payment...\n");
  
  try {
    // Check for user
    const userResult = await client.execute({
      sql: "SELECT id, name, email, role FROM user WHERE email = ?",
      args: ["yasirmahar1511@gmail.com"]
    });
    
    console.log("👤 User check:");
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      console.log(`   ✅ Found: ${user.name} (${user.email}) - Role: ${user.role}\n`);
      
      // Check for subscriptions
      const subsResult = await client.execute({
        sql: "SELECT * FROM subscriptions WHERE user_id = ?",
        args: [user.id]
      });
      
      console.log("📋 Subscriptions:");
      if (subsResult.rows.length > 0) {
        subsResult.rows.forEach(sub => {
          console.log(`   ✅ ID: ${sub.id}, Plan: ${sub.plan_type}, Status: ${sub.status}, Amount: £${sub.amount}`);
        });
      } else {
        console.log("   ❌ No subscriptions found");
      }
      
      // Check for payments
      const paymentsResult = await client.execute({
        sql: "SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC",
        args: [user.id]
      });
      
      console.log("\n💳 Payments:");
      if (paymentsResult.rows.length > 0) {
        paymentsResult.rows.forEach(payment => {
          console.log(`   ID: ${payment.id}, Amount: £${payment.amount}, Status: ${payment.payment_status}, Date: ${payment.created_at}`);
        });
      } else {
        console.log("   ❌ No payments found");
      }
      
      // Check for £850 payment specifically
      const targetPayment = await client.execute({
        sql: "SELECT * FROM payments WHERE amount = 850.00 ORDER BY created_at DESC LIMIT 5",
        args: []
      });
      
      console.log("\n🎯 All £850 payments in system:");
      if (targetPayment.rows.length > 0) {
        targetPayment.rows.forEach(payment => {
          console.log(`   ID: ${payment.id}, User: ${payment.user_id}, Status: ${payment.payment_status}, Date: ${payment.created_at}`);
        });
      } else {
        console.log("   ❌ No £850 payments found");
      }
      
    } else {
      console.log("   ❌ User not found: yasirmahar1511@gmail.com");
    }
    
    // Check all recent payments (last hour)
    console.log("\n⏰ All payments from last 2 hours:");
    const recentPayments = await client.execute({
      sql: `SELECT p.*, u.email FROM payments p 
            LEFT JOIN user u ON p.user_id = u.id 
            WHERE datetime(p.created_at) >= datetime('now', '-2 hours')
            ORDER BY p.created_at DESC`
    });
    
    if (recentPayments.rows.length > 0) {
      recentPayments.rows.forEach(payment => {
        console.log(`   £${payment.amount} - ${payment.email || 'unknown'} - ${payment.payment_status} - ${payment.created_at}`);
      });
    } else {
      console.log("   ❌ No recent payments in last 2 hours");
    }
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkPayment();
