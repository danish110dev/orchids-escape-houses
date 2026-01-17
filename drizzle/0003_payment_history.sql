-- Migration: Add payment_history table for audit trail
-- Created: 2026-01-17
-- Purpose: Track all payment status changes and events over time

CREATE TABLE IF NOT EXISTS payment_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payment_id INTEGER NOT NULL,
    event_type TEXT NOT NULL, -- 'created', 'status_changed', 'refunded', 'updated'
    old_status TEXT,
    new_status TEXT NOT NULL,
    amount REAL,
    metadata TEXT, -- JSON for additional event data
    stripe_event_id TEXT,
    triggered_by TEXT, -- 'webhook', 'admin', 'system', 'user'
    ip_address TEXT,
    user_agent TEXT,
    notes TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_payment_history_payment_id ON payment_history(payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_event_type ON payment_history(event_type);
CREATE INDEX IF NOT EXISTS idx_payment_history_created_at ON payment_history(created_at);
