import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';
import { payments } from './schema';

/**
 * Payment History / Audit Trail Table
 * Tracks all changes to payment records over time
 * Useful for compliance, debugging, and dispute resolution
 */
export const paymentHistory = sqliteTable('payment_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  paymentId: integer('payment_id').notNull().references(() => payments.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(), // 'created', 'status_changed', 'refunded', 'updated', 'failed', 'succeeded'
  oldStatus: text('old_status'),
  newStatus: text('new_status').notNull(),
  amount: integer('amount'), // Amount in pence/cents at time of event
  metadata: text('metadata'), // JSON - Stripe event data, webhook payload, etc.
  stripeEventId: text('stripe_event_id'),
  triggeredBy: text('triggered_by'), // 'webhook', 'admin', 'system', 'user'
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
}, (table) => ({
  paymentIdIdx: index('idx_payment_history_payment_id').on(table.paymentId),
  eventTypeIdx: index('idx_payment_history_event_type').on(table.eventType),
  createdAtIdx: index('idx_payment_history_created_at').on(table.createdAt),
}));
