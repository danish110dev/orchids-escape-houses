# Complete Payment Methods Guide - Production Ready

## Overview

Your Stripe integration currently supports:
- ✅ **Credit/Debit Cards** (Visa, Mastercard, Amex, Discover)
- ✅ **Apple Pay** (automatic with card method on Safari/iOS)
- ✅ **Google Pay** (automatic with card method on Android/Chrome)
- ⚠️ **Bank Transfer** (requires Stripe Payment Element - implementation provided below)

---

## Part 1: Current Setup Analysis

### What You Have Now (Stripe Checkout)
**File:** `src/app/api/checkout/route.ts`

```typescript
const checkoutSession = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],  // Only cards
  mode: 'subscription',             // For subscriptions
  // ... other config
});
```

**Current Limitations:**
- ✅ Works for Card, Apple Pay, Google Pay (automatic)
- ❌ Does NOT support bank transfers
- ❌ Limited payment method control

**Why This Works:**
- Stripe Checkout is optimized for subscriptions
- Payment methods are shown automatically based on:
  - Device type (iOS = Apple Pay, Android = Google Pay, etc.)
  - Country (bank transfer availability varies)
  - Customer's saved payment methods

---

## Part 2: Bank Transfer Support

### Option A: Using Payment Element (Recommended)

For full payment method flexibility including bank transfers, you need **Payment Element** instead of Checkout.

**File to Create:** `src/app/api/payment-intent/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';
import { PLANS, PlanId } from '@/lib/plans';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { planId, interval = 'yearly' } = body;

    if (!planId || !PLANS[planId]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // For one-time payments (bank transfers need this)
    // For subscriptions, use subscription mode with Payment Element
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(PLANS[planId].price * 100), // Convert to cents
      currency: 'gbp',
      customer: session.user.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Important for bank transfers
      },
      metadata: {
        userId: session.user.id,
        planId: planId,
        interval: interval,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Payment Intent Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
```

**Frontend Usage:**

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Confirm payment - handles all methods (card, bank transfer, etc.)
    const result = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: 'if_required', // Allow bank transfer which may redirect
    });

    if (result.error) {
      console.error('Payment failed:', result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentIntentClientSecret,
          appearance: { theme: 'stripe' },
        }}
      >
        <PaymentElement />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </Elements>
    </form>
  );
}
```

### Option B: Keep Checkout + Separate Bank Transfer Flow

If you want to keep Stripe Checkout but add bank transfer support:

1. **Keep Checkout** for cards/Apple Pay/Google Pay (existing setup)
2. **Add Payment Element** as an alternative for customers who want bank transfer

```typescript
// Client-side logic to decide which to use
if (paymentMethod === 'bank_transfer') {
  // Use Payment Element flow
  goToPaymentElementPage();
} else {
  // Use Checkout (card, Apple Pay, Google Pay)
  goToCheckoutPage();
}
```

---

## Part 3: Payment Method Support Matrix

| Method | Platform | Status | Notes |
|--------|----------|--------|-------|
| Credit Card | All | ✅ Working | Visa, Mastercard, Amex |
| Apple Pay | iOS/macOS Safari | ✅ Auto | Shows on compatible devices |
| Google Pay | Android/Chrome | ✅ Auto | Shows on compatible devices |
| Bank Transfer | UK/EU | ⚠️ Needs Payment Element | Requires async handling |
| iDEAL | Netherlands | ✅ Auto (Payment Element) | EU bank redirect |
| SEPA Debit | EU | ✅ Auto (Payment Element) | European direct debit |
| Sofort | EU | ✅ Auto (Payment Element) | EU bank transfer |

---

## Part 4: Critical Webhook Handling

### Current Webhook Status
**File:** `src/app/api/webhooks/stripe/route.ts`

**Current Events Handled:**
- ✅ `checkout.session.completed` (Checkout)
- ✅ `payment_intent.succeeded` (Payment Element - one-time)
- ✅ `payment_intent.processing` (Bank transfer async handling)
- ✅ `invoice.paid` (Subscription renewals)

**For Bank Transfers - CRITICAL:**

```typescript
// In your webhook handler, add special handling for async payments:

if (event.type === 'payment_intent.processing') {
  // ⚠️ Payment is PENDING (not completed)
  // Bank transfers show this state for hours/days
  const paymentIntent = event.data.object;
  
  console.log(`Bank transfer pending: ${paymentIntent.id}`);
  
  // ❌ DO NOT activate subscription yet
  // ✅ Send email: "Your payment is being processed"
  
  // Store payment state in DB
  await db.update(users).set({
    paymentStatus: 'pending', // Not 'active'
    lastPaymentId: paymentIntent.id,
  });
}

if (event.type === 'payment_intent.succeeded') {
  // ✅ Payment completed
  const paymentIntent = event.data.object;
  
  // Now activate subscription/plan
  await db.update(users).set({
    paymentStatus: 'active',
    planId: paymentIntent.metadata.planId,
  });
  
  // Send email: "Payment successful! Subscription activated"
}

if (event.type === 'payment_intent.payment_failed') {
  // ❌ Payment failed
  const paymentIntent = event.data.object;
  
  // Deactivate or warn user
  await db.update(users).set({
    paymentStatus: 'failed',
  });
  
  // Send email: "Payment failed. Please retry or contact support"
}
```

---

## Part 5: Domain Verification (Apple Pay)

### Do You Need It?

**YES if:**
- You want Apple Pay as a distinct, supported payment method
- You're promoting Apple Pay in marketing

**NO if:**
- You only want card payments (Apple Pay shows automatically anyway)
- Bank transfer is your priority

### Implementation (if needed)

**Step 1: Generate Apple Pay Verification File**

```bash
# Stripe will give you a file like:
# apple-developer-merchantid-domain-association

# Place it in:
/public/.well-known/apple-developer-merchantid-domain-association
```

**Step 2: Verify in Stripe Dashboard**

1. Go: **Settings → Business Settings → Apple Pay**
2. Add your domain: `https://orchids-escape-houses1.vercel.app`
3. Stripe will verify the `.well-known` file
4. Status will show ✅ Verified

**Step 3: Code (nothing new needed)**

Your current checkout already supports Apple Pay:

```typescript
payment_method_types: ['card'], // Apple Pay auto-appears on iOS Safari
```

---

## Part 6: Testing Payment Methods

### Testing Environment Setup

Your `.env` already has TEST keys set ✅

```
STRIPE_TEST_KEY=sk_test_51SOHHRI0J9sqa21CrO1...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SOHHRI0J9sqa21Cwr6...
```

### Test Cards

**Credit Card (always succeeds):**
- Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

**Bank Transfer (in TEST mode):**
- Stripe Dashboard → Test Mode
- Use "Simulate Bank Transfer" in Stripe Dashboard
- Real bank transfers don't work in test mode (by design)

### Testing Apple Pay

**Real Device Required:**
1. iPhone/iPad with Safari
2. Apple Pay set up with a test card
3. Visit your site
4. Apple Pay button appears in Stripe Checkout
5. Tap → Authenticate with Face/Touch ID → Success

**Cannot test on:**
- ❌ Android (shows Google Pay instead)
- ❌ Desktop browser (shows card form instead)
- ❌ Chrome on iPhone (uses Google Pay not Apple)

### Testing Google Pay

**Real Device Required:**
1. Android phone with Chrome
2. Google account logged in
3. Google Play Services installed
4. Google Pay set up with a test card
5. Visit your site
6. Google Pay button appears
7. Tap → Authenticate → Success

**Cannot test on:**
- ❌ iPhone (shows Apple Pay instead)
- ❌ Desktop (shows card form)
- ❌ Safari on Android (uses different payment method)

### Testing Bank Transfer

**In TEST Mode (Stripe Dashboard):**
1. Create a payment with bank transfer method
2. Go to: **Developers → Webhooks → Test Clock**
3. Create a test clock to simulate time passing
4. Use clock to advance payment to completion state
5. Webhook fires automatically

**In LIVE Mode:**
- Actual bank transfers work (real money)
- Takes 1-5 business days
- Can be tested with actual Wise transfers or similar

---

## Part 7: Common Mistakes to Avoid

### ❌ Mistake 1: Activating Subscription Before Webhook Confirms

```typescript
// ❌ WRONG - Activates immediately
const session = await stripe.checkout.sessions.create({...});
await db.update(users).set({ paymentStatus: 'active' }); // Too early!

// ✅ RIGHT - Only webhook sets to active
// Webhook waits for payment_intent.succeeded event
```

### ❌ Mistake 2: Not Handling Async Payments

```typescript
// ❌ WRONG - Assumes payment completes immediately
if (event.type === 'payment_intent.processing') {
  // This is still pending!
  await activateSubscription(); // Shouldn't do this
}

// ✅ RIGHT - Wait for succeeded
if (event.type === 'payment_intent.succeeded') {
  await activateSubscription();
}
```

### ❌ Mistake 3: Forgetting Domain Verification

```typescript
// ❌ Apple Pay won't show if domain isn't verified
// Even though the code looks right

// ✅ Always verify domain in Stripe Dashboard
// Check: Settings → Business Settings → Apple Pay
```

### ❌ Mistake 4: Testing Apple/Google Pay on Wrong Device

```typescript
// ❌ WRONG - Testing Apple Pay on Android
// ❌ WRONG - Testing Google Pay on iPhone
// ❌ WRONG - Testing either on desktop

// ✅ RIGHT - Use correct device type
```

### ❌ Mistake 5: Multiple Webhooks Creating Duplicates

```typescript
// ❌ WRONG - Both activate subscription
listener1: checkout.session.completed → activate
listener2: payment_intent.succeeded → activate
// Result: Duplicate subscriptions!

// ✅ RIGHT - Use ONE source of truth
// Either checkout.session.completed OR payment_intent.succeeded
// Never both for same payment
```

---

## Part 8: Production Checklist

### Before Going LIVE

- [ ] All payment methods tested on real devices
- [ ] Webhook endpoints verified working
- [ ] Domain verified for Apple Pay (if using)
- [ ] Test payment created and processed
- [ ] Webhook events received and logged
- [ ] Database subscription status correctly updated
- [ ] Email confirmations sent
- [ ] Billing portal working
- [ ] Test with both Checkout and Payment Element (if both implemented)
- [ ] Currency and amount conversions correct

### Switching to LIVE Mode

**Step 1: Get LIVE Keys**
1. Stripe Dashboard → **Developers → API Keys**
2. Copy LIVE Secret Key (`sk_live_...`)
3. Copy LIVE Publishable Key (`pk_live_...`)

**Step 2: Update Environment Variables**

```env
# Vercel Dashboard → Settings → Environment Variables

STRIPE_LIVE_KEY=sk_live_51SOHHRI0J9sqa21C2yGhX4...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51SOHHRI0J9sqa21Cwr6...

# Update webhook secret too
STRIPE_WEBHOOK_SECRET=whsec_... (LIVE version)
```

**Step 3: Update .env file locally**

```env
STRIPE_TEST_KEY=sk_test_... # Keep for local testing
STRIPE_LIVE_KEY=sk_live_... # Add LIVE keys

# Code uses STRIPE_MODE to decide which
# src/lib/stripe.ts checks: process.env.STRIPE_MODE !== 'live'
```

**Step 4: Redeploy on Vercel**
- Vercel automatically redeploys when env vars change
- Or manually trigger redeployment

**Step 5: Monitor First 24 Hours**
- Watch Stripe Dashboard for payments
- Check Vercel logs for any webhook issues
- Verify database updates correctly
- Monitor email delivery

---

## Part 9: Quick Reference - What To Do Next

### Immediate (Today)
1. ✅ Build is working with card-only Checkout
2. ✅ Webhooks are configured
3. Review this guide for architecture

### This Week
1. Test Apple Pay on iPhone
2. Test Google Pay on Android
3. Decide: Add bank transfer support?
   - If YES → Implement Payment Element (guide above)
   - If NO → Keep current setup

### Before Going LIVE
1. Verify Apple Pay domain (if using)
2. Test all payment methods end-to-end
3. Monitor webhook delivery
4. Switch to LIVE keys only after testing confirmed

---

## Part 10: Support & References

### Stripe Documentation
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Payment Element](https://stripe.com/docs/payments/payment-element)
- [Payment Methods](https://stripe.com/docs/payments/payment-methods)
- [Apple Pay](https://stripe.com/docs/payments/payment-methods/apple-pay)
- [Bank Transfers](https://stripe.com/docs/payments/bank-transfers)
- [Webhooks](https://stripe.com/docs/webhooks)

### Testing
- [Test Mode Overview](https://stripe.com/docs/testing)
- [Test Card Numbers](https://stripe.com/docs/testing#cards)
- [Test Bank Accounts](https://stripe.com/docs/testing#bank-accounts)

### Current Implementation Files
- Backend: `src/app/api/checkout/route.ts`
- Webhooks: `src/app/api/webhooks/stripe/route.ts`
- Config: `src/lib/stripe.ts`
- Environment: `.env`

---

## Summary

✅ **Current State:** Working card-only payments with automatic Apple Pay/Google Pay  
⚠️ **Next Step:** Decide if you need bank transfer support  
🚀 **Ready to Go LIVE:** Once you verify domain (Apple) and test payments  

Questions? Refer to Stripe documentation links above or review webhook handling section.
