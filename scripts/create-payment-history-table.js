require("dotenv").config();
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  try {
    console.log("Creating payment_history table...");
    
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
    
    console.log("✅ SUCCESS: payment_history table created!");
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    process.exit(1);
  }
}

main();
