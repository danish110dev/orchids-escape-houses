/**
 * Apply payment_history migration to database
 */

require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function applyMigration() {
  console.log("🔄 Applying payment_history migration...\n");
  
  try {
    // Create payment_history table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS payment_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          payment_id INTEGER NOT NULL,
          event_type TEXT NOT NULL,
          old_status TEXT,
          new_status TEXT NOT NULL,
          amount REAL,
          metadata TEXT,
          stripe_event_id TEXT,
          triggered_by TEXT,
          ip_address TEXT,
          user_agent TEXT,
          notes TEXT,
          created_at TEXT NOT NULL,
          FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE
      )
    `);
    
    console.log("✅ payment_history table created successfully!");
    
    // Verify table exists
    const result = await client.execute(`
      SELECT name FROM sqlite_master WHERE type='table' AND name='payment_history'
    `);
    
    if (result.rows.length > 0) {
      console.log("✅ Verified: payment_history table exists in database");
      
      // Check table structure
      const columns = await client.execute(`PRAGMA table_info(payment_history)`);
      console.log(`\n📊 Table structure (${columns.rows.length} columns):`);
      columns.rows.forEach(col => {
        console.log(`  - ${col.name}: ${col.type}${col.notnull ? ' NOT NULL' : ''}`);
      });
    }
    
    console.log("\n🎉 Migration completed successfully!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

applyMigration();
