# ✅ Stripe Webhook Setup Checklist

## Current Status

Your webhook handler is ready at: `/api/webhooks/stripe`

## 🔧 Setup Steps for Production/Live Payments

### 1. **Get Your Webhook Endpoint URL**

For local testing:
```
https://your-ngrok-url.ngrok.io/api/webhooks/stripe
```

For production:
```
https://yourdomain.com/api/webhooks/stripe
```

### 2. **Configure in Stripe Dashboard**

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL
4. Select these events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
5. Copy the **Webhook Signing Secret** (starts with `whsec_...`)

### 3. **Update Environment Variables**

Add to your `.env` file:
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 4. **Test with Stripe CLI (Local Development)**

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# This will give you a webhook secret like: whsec_...
# Add it to your .env file
```

---

## 🧪 Testing Real Payments

### Option A: Test Mode Payments
1. Use Stripe test cards: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Complete checkout
5. **Payment appears in admin dashboard** ✅

### Option B: Live Mode Payments
1. Switch to live mode in Stripe
2. Use real credit card
3. Complete checkout
4. **Payment appears in admin dashboard** ✅

---

## 🔍 What Happens When You Make a Payment

### Owner Plan Purchase:
1. Owner clicks "Subscribe to Silver Plan"
2. Redirected to Stripe Checkout
3. Completes payment with card
4. **Stripe webhook fires** → `checkout.session.completed`
5. Your webhook handler creates:
   - `subscriptions` record
   - `payments` record with `subscription_id`
6. **Admin sees it in "Owner Plans" tab** 🎉

### Guest Booking:
1. Guest completes booking checkout
2. Pays deposit (30%)
3. **Stripe webhook fires** → `payment_intent.succeeded`
4. Your webhook handler creates:
   - `payments` record with `booking_id`
   - Updates `bookings.depositPaid = 1`
5. **Admin sees it in "Guest Bookings" tab** 🎉

---

## ✅ Current Test Data

You already have:
- **11 guest booking payments** (seeded)
- **5 owner subscription payments** (just created)

These show up because we manually inserted them into the database.

---

## 🚀 Next Steps

1. **Check if webhook secret is in `.env`**
   ```bash
   # Look for:
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

2. **For local testing**: Use Stripe CLI
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. **Make a test payment** (use test card)

4. **Check terminal logs** - You should see:
   ```
   Processing Stripe webhook: checkout.session.completed
   Created subscription payment for user...
   ```

5. **Refresh admin dashboard** - New payment appears!

---

## ⚠️ Common Issues

### Webhook Not Firing?
- Check webhook endpoint in Stripe dashboard
- Verify STRIPE_WEBHOOK_SECRET is correct
- Check server logs for errors

### Payment Created But Not Showing?
- Check if `subscription_id` or `booking_id` is set correctly
- Verify webhook created the payment record
- Check browser console for API errors

### Duplicate Payments?
- This is prevented by `processedEvents` Set in webhook handler
- Each event ID is tracked to avoid duplicates

---

## 🎯 Summary

**YES** - Real Stripe payments will automatically appear in your admin dashboard **IF**:
1. ✅ Webhook is configured in Stripe dashboard
2. ✅ `STRIPE_WEBHOOK_SECRET` is in your `.env`
3. ✅ Webhook endpoint is accessible (localhost via Stripe CLI, or public URL)
4. ✅ Payment includes proper `metadata` (userId, planId, bookingId, etc.)

**The test data we created is just for demonstration - real payments will flow through Stripe webhooks automatically!**
