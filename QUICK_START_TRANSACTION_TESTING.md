# QUICK START GUIDE - Transaction System

## 🚀 IMMEDIATE TESTING STEPS

### 1. Start Your Development Server
```bash
npm run dev
```

### 2. Test Stripe Webhook Locally
```bash
# In a separate terminal
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 3. Test a Booking Payment

#### Option A: Through the UI
1. Go to any property page: `http://localhost:3000/properties/[slug]`
2. Click "Book Now"
3. Select dates and guests
4. Click "Book Now" in the modal
5. Complete payment with test card: `4242 4242 4242 4242`
6. Check admin dashboard: `http://localhost:3000/admin/dashboard?view=transactions`

#### Option B: Via API (Manual Testing)
```bash
# Step 1: Create a booking quote
curl -X POST http://localhost:3000/api/bookings/quote \
  -H "Content-Type: application/json" \
  -H "Cookie: YOUR_AUTH_COOKIE" \
  -d '{
    "property_id": "1",
    "check_in": "2026-06-01",
    "check_out": "2026-06-05",
    "guests": 8
  }'

# Response will include booking_id

# Step 2: Create checkout session
curl -X POST http://localhost:3000/api/payments/checkout-session \
  -H "Content-Type: application/json" \
  -H "Cookie: YOUR_AUTH_COOKIE" \
  -d '{
    "booking_id": 123,
    "payment_type": "deposit",
    "success_url": "http://localhost:3000/booking/confirmed",
    "cancel_url": "http://localhost:3000"
  }'

# Response will include checkout URL - visit it in browser
```

### 4. Verify Transaction Was Recorded

```bash
# Check database directly (if using Turso)
turso db shell your-database

# Run query
SELECT 
  id, 
  bookingId, 
  amount, 
  paymentStatus, 
  description, 
  createdAt 
FROM payments 
ORDER BY createdAt DESC 
LIMIT 5;
```

### 5. View in Admin Dashboard
1. Navigate to: `http://localhost:3000/admin/dashboard`
2. Click "Transactions" tab
3. You should see:
   - ✅ The booking payment
   - ✅ Property name displayed
   - ✅ "Booking" badge
   - ✅ Payment method details
   - ✅ Updated statistics

---

## 🧪 TEST CARDS

### Successful Payment
- **Card:** 4242 4242 4242 4242
- **Any future expiry**
- **Any 3-digit CVC**

### Declined Payment
- **Card:** 4000 0000 0000 0002
- **Result:** Payment fails, transaction recorded as failed

### Requires Authentication (3D Secure)
- **Card:** 4000 0025 0000 3155
- **Result:** Shows 3D Secure modal

---

## 📊 CHECKING TRANSACTION DATA

### API Endpoint
```bash
# Get all transactions (requires admin auth)
curl http://localhost:3000/api/admin/transactions?status=all&limit=100 \
  -H "Cookie: YOUR_ADMIN_AUTH_COOKIE"
```

### Response Format
```json
{
  "transactions": [
    {
      "id": "1",
      "amount": 720.00,
      "currency": "GBP",
      "status": "succeeded",
      "customer": {
        "name": "John Smith",
        "email": "john@example.com"
      },
      "propertyName": "Luxury Manor House",
      "description": "Deposit payment for Luxury Manor House",
      "isBookingPayment": true,
      "paymentMethodBrand": "visa",
      "paymentMethodLast4": "4242",
      "date": "2026-01-17T10:30:00Z"
    }
  ],
  "stats": {
    "totalRevenue": 720.00,
    "successful": 1,
    "pending": 0,
    "failed": 0,
    "refunded": 0,
    "cancelled": 0,
    "bookingPayments": 1,
    "subscriptionPayments": 0
  }
}
```

---

## ⚠️ COMMON ISSUES & FIXES

### Issue: "Unauthorized" error
**Fix:** Make sure you're logged in as admin
```bash
# Login first at /admin-setup or /api/auth/signin
```

### Issue: Webhook not receiving events
**Fix:** Check webhook secret matches
```bash
# Verify in .env.local
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Issue: Booking not found
**Fix:** Create booking first via quote API or UI

### Issue: Transaction not showing in admin
**Fix:** 
1. Check browser console for errors
2. Refresh the page
3. Check database directly
4. Verify webhook fired (check Stripe dashboard)

---

## 🎯 WHAT TO LOOK FOR

### In Admin Dashboard (`/admin/dashboard?view=transactions`)
- [ ] Booking payments appear with "Booking" badge
- [ ] Property names are displayed
- [ ] Stats show booking vs subscription breakdown
- [ ] Failed payments show error messages
- [ ] Payment method details visible
- [ ] Search works for property names and guest names

### In Database
```sql
-- Should see records like this
SELECT * FROM payments WHERE bookingId IS NOT NULL;
-- Returns booking payment records

SELECT * FROM bookings WHERE depositPaid = 1;
-- Returns bookings with paid deposits
```

### In Stripe Dashboard
- Events → View recent webhook events
- Should see `payment_intent.succeeded` for bookings
- Metadata should include `bookingId` and `paymentType`

---

## 📝 FILES TO CHECK

1. **Created (New Files):**
   - `src/app/api/payments/checkout-session/route.ts`
   - `src/app/api/bookings/quote/route.ts`
   - `TRANSACTION_SYSTEM_IMPLEMENTATION.md` (full docs)

2. **Modified (Enhanced):**
   - `src/app/api/webhooks/stripe/route.ts`
   - `src/app/api/admin/transactions/route.ts`
   - `src/components/admin/Transactions.tsx`

3. **Unchanged (No modifications):**
   - Database schema files (already had payments table)
   - Existing booking flow
   - Subscription payment flow

---

## ✅ SUCCESS CRITERIA

You'll know it's working when:
1. ✅ User completes a booking payment
2. ✅ Payment record appears in `payments` table
3. ✅ Booking status updates to `confirmed` (deposit) or `paid` (balance)
4. ✅ Admin dashboard shows the transaction
5. ✅ Property name is visible in transaction list
6. ✅ Payment method details are captured
7. ✅ Failed payments are also recorded with error messages

---

## 🔄 WORKFLOW SUMMARY

```
User Action → API Call → Stripe → Webhook → Database → Admin View
```

1. User clicks "Book Now"
2. System creates booking quote
3. System creates Stripe checkout
4. User pays on Stripe
5. Stripe sends webhook
6. System records transaction
7. System updates booking
8. Admin sees real data

---

## 🆘 NEED HELP?

Check these in order:
1. Browser console (F12) for frontend errors
2. Server logs (`npm run dev` terminal) for backend errors
3. Stripe dashboard → Events for webhook issues
4. Database directly for data verification
5. Full documentation: `TRANSACTION_SYSTEM_IMPLEMENTATION.md`

---

**Ready to test? Start with step 1-5 above! 🚀**
