/**
 * Payment History Tracking Utility
 * Automatically logs all payment status changes for audit trail
 */

import { db } from '@/db';
import { paymentHistory } from '@/db/payment-history-schema';

export type PaymentEventType = 
  | 'created' 
  | 'status_changed' 
  | 'refunded' 
  | 'updated' 
  | 'failed' 
  | 'succeeded'
  | 'pending'
  | 'cancelled';

export type TriggeredBy = 'webhook' | 'admin' | 'system' | 'user' | 'cron';

interface LogPaymentEventParams {
  paymentId: number;
  eventType: PaymentEventType;
  oldStatus?: string | null;
  newStatus: string;
  amount?: number;
  metadata?: Record<string, any>;
  stripeEventId?: string;
  triggeredBy?: TriggeredBy;
  ipAddress?: string;
  userAgent?: string;
  notes?: string;
}

/**
 * Log a payment event to the audit trail
 * Call this whenever a payment status changes
 */
export async function logPaymentEvent(params: LogPaymentEventParams): Promise<void> {
  try {
    await db.insert(paymentHistory).values({
      paymentId: params.paymentId,
      eventType: params.eventType,
      oldStatus: params.oldStatus || null,
      newStatus: params.newStatus,
      amount: params.amount,
      metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      stripeEventId: params.stripeEventId || null,
      triggeredBy: params.triggeredBy || 'system',
      ipAddress: params.ipAddress || null,
      userAgent: params.userAgent || null,
      notes: params.notes || null,
      createdAt: new Date().toISOString(),
    });

    console.log(`📝 Payment history logged: Payment #${params.paymentId} - ${params.eventType}`);
  } catch (error) {
    console.error('❌ Failed to log payment history:', error);
    // Don't throw - logging should never break the main flow
  }
}

/**
 * Get full payment history for a specific payment
 */
export async function getPaymentHistory(paymentId: number) {
  return await db
    .select()
    .from(paymentHistory)
    .where(eq(paymentHistory.paymentId, paymentId))
    .orderBy(desc(paymentHistory.createdAt));
}

/**
 * Get payment history for a date range
 */
export async function getPaymentHistoryByDateRange(startDate: string, endDate: string) {
  return await db
    .select()
    .from(paymentHistory)
    .where(
      and(
        gte(paymentHistory.createdAt, startDate),
        lte(paymentHistory.createdAt, endDate)
      )
    )
    .orderBy(desc(paymentHistory.createdAt));
}

/**
 * Get all events of a specific type
 */
export async function getPaymentHistoryByEventType(eventType: PaymentEventType) {
  return await db
    .select()
    .from(paymentHistory)
    .where(eq(paymentHistory.eventType, eventType))
    .orderBy(desc(paymentHistory.createdAt));
}

import { eq, and, gte, lte, desc } from 'drizzle-orm';
