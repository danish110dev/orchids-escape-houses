# PAYMENT HISTORY / AUDIT TRAIL SYSTEM

## 📊 OVERVIEW

In addition to the main `payments` table (which stores current payment state), I've created a **payment history audit trail** system that tracks every status change and event for complete compliance and debugging.

---

## 🗂️ TWO-TIER SYSTEM

### **Tier 1: `payments` Table** (Current State)
- Stores the **current state** of each payment
- One record per payment
- Updated when status changes
- Used for: Admin dashboard, reporting, current payment status

### **Tier 2: `payment_history` Table** (Audit Trail) ✨ NEW
- Stores **every event** that happens to a payment
- Multiple records per payment (timeline)
- Never updated, only appended
- Used for: Compliance, dispute resolution, debugging, audit trails

---

## 📋 PAYMENT HISTORY TABLE SCHEMA

```sql
CREATE TABLE payment_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payment_id INTEGER NOT NULL,              -- Links to payments.id
    event_type TEXT NOT NULL,                 -- 'created', 'status_changed', 'failed', etc.
    old_status TEXT,                          -- Previous status (if changed)
    new_status TEXT NOT NULL,                 -- New status
    amount REAL,                              -- Amount at time of event
    metadata TEXT,                            -- JSON - Event details
    stripe_event_id TEXT,                     -- Stripe webhook event ID
    triggered_by TEXT,                        -- 'webhook', 'admin', 'system', 'user'
    ip_address TEXT,                          -- For admin/user actions
    user_agent TEXT,                          -- For admin/user actions
    notes TEXT,                               -- Human-readable notes
    created_at TEXT NOT NULL,                 -- When this event occurred
    FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE
);
```

---

## 📝 EVENT TYPES

| Event Type | Description | Triggered By |
|------------|-------------|--------------|
| `created` | Payment record created | System/Webhook |
| `status_changed` | Status manually changed | Admin |
| `succeeded` | Payment succeeded | Webhook |
| `failed` | Payment failed | Webhook |
| `pending` | Payment pending | Webhook |
| `refunded` | Payment refunded | Webhook/Admin |
| `updated` | Payment details updated | Admin/System |
| `cancelled` | Payment cancelled | Admin/User |

---

## 🔄 HOW IT WORKS

### Automatic Logging (Webhooks)

Every webhook event automatically creates a history entry:

```typescript
// In webhook handler
await logPaymentEvent({
  paymentId: payment.id,
  eventType: 'succeeded',
  oldStatus: 'pending',
  newStatus: 'succeeded',
  amount: paymentIntent.amount,
  stripeEventId: event.id,
  triggeredBy: 'webhook',
  metadata: { bookingId, paymentType },
});
```

### Example Timeline for a Booking Payment

```
Time         Event Type       Old Status  New Status  Triggered By
-----------------------------------------------------------------
10:00:00 AM  created          -           pending     system
10:00:05 AM  succeeded        pending     succeeded   webhook
```

### Example Timeline with Failure

```
Time         Event Type       Old Status  New Status  Triggered By
-----------------------------------------------------------------
10:00:00 AM  created          -           pending     system
10:00:05 AM  failed           pending     failed      webhook
10:15:00 AM  created          -           pending     system (retry)
10:15:10 AM  succeeded        pending     succeeded   webhook
```

---

## 🚀 USAGE

### 1. Automatic Logging (Already Implemented)

The webhook automatically logs events when:
- ✅ Payment created via checkout session
- ✅ Payment succeeds
- ✅ Payment fails
- ✅ Payment status changes

### 2. Manual Logging (For Admin Actions)

```typescript
import { logPaymentEvent } from '@/lib/payment-history';

// When admin refunds a payment
await logPaymentEvent({
  paymentId: 123,
  eventType: 'refunded',
  oldStatus: 'succeeded',
  newStatus: 'refunded',
  amount: 720.00,
  triggeredBy: 'admin',
  ipAddress: req.ip,
  notes: 'Customer requested refund - duplicate booking',
});
```

### 3. Viewing Payment History

#### Via API:
```bash
GET /api/admin/payment-history?paymentId=123
```

Response:
```json
{
  "success": true,
  "paymentId": 123,
  "history": [
    {
      "id": 1,
      "eventType": "created",
      "oldStatus": null,
      "newStatus": "pending",
      "amount": 720.00,
      "triggeredBy": "system",
      "stripeEventId": null,
      "metadata": {
        "bookingId": "456",
        "paymentType": "deposit"
      },
      "createdAt": "2026-01-17T10:00:00Z"
    },
    {
      "id": 2,
      "eventType": "succeeded",
      "oldStatus": "pending",
      "newStatus": "succeeded",
      "amount": 720.00,
      "triggeredBy": "webhook",
      "stripeEventId": "evt_xxxxx",
      "metadata": {
        "bookingId": "456",
        "paymentType": "deposit"
      },
      "createdAt": "2026-01-17T10:00:05Z"
    }
  ],
  "total": 2
}
```

#### Via Code:
```typescript
import { getPaymentHistory } from '@/lib/payment-history';

const history = await getPaymentHistory(123);
console.log(history);
```

---

## 📁 FILES CREATED

1. **Migration SQL:**
   - `drizzle/0003_payment_history.sql` - Database migration

2. **Schema Definition:**
   - `src/db/payment-history-schema.ts` - Drizzle schema

3. **Utility Functions:**
   - `src/lib/payment-history.ts` - Helper functions

4. **API Endpoint:**
   - `src/app/api/admin/payment-history/route.ts` - View history

5. **Enhanced Webhook:**
   - Updated: `src/app/api/webhooks/stripe/route.ts` - Auto-logging

---

## 🧪 TESTING

### 1. Run Migration

```bash
# Apply the migration to create the table
npx drizzle-kit push:sqlite
```

### 2. Make a Test Payment

```bash
# Complete a booking payment (via UI or API)
# Then check the history
```

### 3. View History

```bash
curl http://localhost:3000/api/admin/payment-history?paymentId=1 \
  -H "Cookie: YOUR_ADMIN_AUTH_COOKIE"
```

### 4. Verify in Database

```sql
-- See all events for payment #1
SELECT * FROM payment_history WHERE payment_id = 1 ORDER BY created_at;

-- See all failed payment events
SELECT * FROM payment_history WHERE event_type = 'failed';

-- Count events by type
SELECT event_type, COUNT(*) as count 
FROM payment_history 
GROUP BY event_type;
```

---

## 🎯 USE CASES

### 1. **Dispute Resolution**
View complete timeline of what happened to a payment:
```typescript
const history = await getPaymentHistory(paymentId);
// Shows: Created → Pending → Failed → Created → Succeeded
```

### 2. **Compliance & Auditing**
Prove when and how a payment status changed:
```sql
SELECT * FROM payment_history 
WHERE payment_id = 123 
AND event_type = 'status_changed'
AND triggered_by = 'admin';
```

### 3. **Debugging**
Understand why a payment failed:
```typescript
const failedEvents = await getPaymentHistoryByEventType('failed');
// Review error messages and metadata
```

### 4. **Analytics**
Track payment success rates over time:
```sql
SELECT 
  DATE(created_at) as date,
  SUM(CASE WHEN event_type = 'succeeded' THEN 1 ELSE 0 END) as successes,
  SUM(CASE WHEN event_type = 'failed' THEN 1 ELSE 0 END) as failures
FROM payment_history
GROUP BY DATE(created_at);
```

---

## 🔐 SECURITY & PRIVACY

- ✅ Admin-only access (role check enforced)
- ✅ Foreign key cascade delete (history removed when payment deleted)
- ✅ IP address and user agent tracked for accountability
- ✅ Immutable (never updated, only appended)
- ✅ Full audit trail for compliance (PCI-DSS, GDPR)

---

## 📊 COMPARISON

### Before (Just `payments` table):
```
Payment #123
├─ Status: succeeded
├─ Amount: £720.00
└─ Updated: 2026-01-17T10:00:05Z

❌ No history of what happened
❌ Can't see if it failed first
❌ No audit trail
```

### After (With `payment_history`):
```
Payment #123
├─ Current: succeeded
└─ History:
    ├─ [10:00:00] created → pending (system)
    ├─ [10:00:02] pending → failed (webhook) ❌ Card declined
    ├─ [10:05:00] created → pending (system) 🔄 Retry
    └─ [10:05:05] pending → succeeded (webhook) ✅

✅ Complete timeline
✅ See retry after failure
✅ Full audit trail
```

---

## 🚀 NEXT STEPS

### Optional Enhancements:

1. **Admin UI Component:**
   ```typescript
   <PaymentHistoryTimeline paymentId={123} />
   ```

2. **Email Alerts:**
   - Send admin alert on repeated failures
   - Notify on suspicious activity

3. **Export to CSV:**
   - Export history for accounting
   - Generate compliance reports

4. **Retention Policy:**
   - Auto-archive old history after 7 years
   - Comply with financial regulations

---

## ✅ SUMMARY

You now have **TWO layers** of payment tracking:

1. **`payments` Table** = Current state (what exists now)
2. **`payment_history` Table** = Complete timeline (what happened)

This gives you:
- ✅ Complete audit trail for compliance
- ✅ Debugging capabilities for failed payments
- ✅ Dispute resolution evidence
- ✅ Analytics on payment behavior
- ✅ Accountability (who changed what, when)

**Status:** ✅ Implemented and Ready
**Migration Required:** Yes - Run `npx drizzle-kit push:sqlite`
