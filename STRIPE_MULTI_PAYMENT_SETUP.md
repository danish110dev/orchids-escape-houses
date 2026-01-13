# Multi-Payment Method Stripe Integration - Complete Guide

## Executive Summary

Your current setup uses **Stripe Checkout in subscription mode** which is good, but it only supports **card payments**. To support Apple Pay, Google Pay, Cards, and Bank Transfer, you need to:

1. **Update `payment_method_types`** to include all methods
2. **Add Payment Element** OR keep Checkout (both work, but Element is more flexible)
3. **Handle asynchronous payment states** (bank transfer can take time)
4. **Add Apple Pay domain verification** (required for production)
5. **Update webhook handling** for new payment states

---

## PART 1: Current State Analysis

### ✅ What's Working
```typescript
// Current checkout/route.ts
payment_method_types: ['card'],  // ✅ Cards work
mode: 'subscription',             // ✅ Recurring payments
billing_address_collection: 'required',  // ✅ Good for compliance
```

### ❌ What's Missing
- Apple Pay support
- Google Pay support  
- Bank Transfer (SEPA/ACH) support
- Handling of asynchronous payment completion
- Proper webhook handling for `payment_intent.processing` state

---

## PART 2: Decision - Checkout vs Payment Element

### Option A: Stripe Checkout (Current)
**Pros:**
- ✅ Easiest to implement
- ✅ Pre-built UI, no custom design needed
- ✅ Automatically handles all payment methods
- ✅ Mobile responsive
- ✅ Hosted solution (PCI compliant)
- ✅ Best for subscriptions

**Cons:**
- ⚠️ Less customization
- ⚠️ Redirects away from your site
- ⚠️ Limited branding options

**Recommendation:** **Use Checkout** (ideal for your subscription model)

### Option B: Payment Element
**Pros:**
- ✅ More customization
- ✅ Stays on your site (no redirect)
- ✅ Better UX

**Cons:**
- ⚠️ More complex implementation
- ⚠️ Requires more webhook handling
- ⚠️ PCI compliance consideration

**Recommendation:** For now, stick with **Checkout** since you're doing subscriptions.

---

## PART 3: Payment Method Types - Complete Configuration

### What Stripe Checkout Supports (Per Mode)

#### For SUBSCRIPTION Mode (Your Current Mode)
```typescript
payment_method_types: [
  'card',                    // ✅ Visa, Mastercard, Amex, etc.
  'apple_pay',              // ✅ iOS, Safari, macOS
  'google_pay',             // ✅ Android Chrome, Chromebook
  // NOT supported in subscription mode:
  // 'sepa_debit',          // ❌ SEPA Bank Transfer (subscriptions not supported)
  // 'us_bank_account',     // ❌ ACH Bank Transfer (subscriptions not supported)
  // 'klarna', 'afterpay'   // ❌ BNPL (require special setup)
]
```

#### For ONE-TIME PAYMENT Mode (If Needed Later)
```typescript
payment_method_types: [
  'card',
  'apple_pay',
  'google_pay',
  'sepa_debit',             // ✅ SEPA Bank Transfer (one-time only)
  'us_bank_account',        // ✅ ACH Bank Transfer (one-time only)
]
```

### ⚠️ Important: Bank Transfer Limitation
**Bank Transfer (SEPA/ACH) is NOT supported in Stripe Checkout's subscription mode.**

If you need bank transfer for subscriptions, you must:
1. Use **Payment Intents API** (not Checkout)
2. Or create a separate one-time bank transfer option
3. Or wait for Stripe to enable it (check: https://stripe.com/docs)

**Current Recommendation:** Offer bank transfer as a one-time setup fee, then use card/Google Pay/Apple Pay for recurring subscriptions.

---

## PART 4: How Stripe Decides Which Payment Method to Show

Stripe's decision tree:

```
1. Payment Method Availability (by country/region)
   ├─ Check customer's billing country
   ├─ Check if payment method is available in that country
   └─ Filter methods not available

2. Payment Method Types (your config)
   ├─ Only show methods in payment_method_types array
   └─ Remove from display if not in list

3. Device Capability (for digital wallets)
   ├─ Apple Pay: Only shows on Safari/iOS/macOS (automatically detected)
   ├─ Google Pay: Only shows on Chrome/Android (automatically detected)
   └─ Card: Always available

4. Customer Device
   ├─ Apple Pay ← ONLY on Apple devices
   ├─ Google Pay ← ONLY on Android/Chrome with Google account
   ├─ Card ← All devices (fallback)
   └─ Order: Apple Pay > Google Pay > Card (if available)

5. Stripe's Internal Logic
   ├─ Filters based on payment method enabled in Stripe Dashboard
   ├─ Checks if method is supported for your mode (subscription/payment)
   └─ Shows in order of recommendation
```

**Visual Example:**
```
Desktop + Card in array → Show Card
iOS Safari + Apple Pay + Card → Show Apple Pay first, then Card
Android Chrome + Google Pay + Card → Show Google Pay first, then Card
Desktop + No compatible methods → Error (must allow card)
```

---

## PART 5: Production-Ready Implementation

### Step 1: Update Checkout Route (Multi-Payment Support)

**File:** `src/app/api/checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { PLANS, PlanId, getPlanPriceId } from '@/lib/plans';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { planId, propertyId, interval = 'yearly' } = body as { 
      planId: PlanId; 
      propertyId?: string;
      interval?: 'monthly' | 'yearly';
    };

    if (!planId || !PLANS[planId]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    // Persist plan selection to user's account before payment
    await db
      .update(userTable)
      .set({
        planId: planId,
        updatedAt: new Date(),
      })
      .where(eq(userTable.id, session.user.id));

    // Get the correct Stripe price ID
    const stripePriceId = getPlanPriceId(planId, interval);
    const plan = PLANS[planId];
    const headersList = await headers();
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    console.log(`Creating Stripe checkout for plan: ${planId}, interval: ${interval}, priceId: ${stripePriceId}`);

    // ✅ UPDATED: Added Apple Pay and Google Pay support
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',       // Visa, Mastercard, Amex, Discover
        'apple_pay',  // iOS/macOS Apple Pay
        'google_pay', // Android/Chrome Google Pay
      ],
      mode: 'subscription',
      billing_address_collection: 'required',
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      customer_email: session.user.email,
      // ✅ Important: Store metadata for webhook processing
      metadata: {
        userId: session.user.id,
        planId: planId,
        propertyId: propertyId || '',
        interval: interval,
      },
      subscription_data: {
        metadata: {
          userId: session.user.id,
          planId: planId,
          propertyId: propertyId || '',
          interval: interval,
        },
      },
      // ✅ NEW: Allow payment to complete asynchronously
      // This is critical for bank transfers which may take time
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
    });

    console.log(`Stripe checkout session created: ${checkoutSession.id}`);
    return NextResponse.json({ url: checkoutSession.url });
    
  } catch (error: any) {
    console.error('Stripe Checkout Error:', {
      message: error.message,
      type: error.type,
      code: error.code,
      detail: error
    });
    
    const errorMessage = error.message || 'Failed to create checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
```

### Step 2: Enhanced Webhook Handling (Handle Async Payments)

**File:** `src/app/api/webhooks/stripe/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { user as userTable, properties as propertiesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Prevent duplicate webhook processing
  if (processedEvents.has(event.id)) {
    console.log(`Event ${event.id} already processed, skipping`);
    return NextResponse.json({ received: true });
  }
  processedEvents.add(event.id);
  if (processedEvents.size > 1000) processedEvents.clear();

  console.log(`Processing Stripe webhook: ${event.type} (${event.id})`);

  try {
    // ✅ Handle successful subscriptions (card, Apple Pay, Google Pay)
    if (event.type === 'checkout.session.completed') {
      const checkoutSession = event.data.object as any;
      
      if (checkoutSession.subscription) {
        const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription);
        const metadata = subscription.metadata;

        if (metadata?.userId && metadata?.planId) {
          await updateUserSubscription(metadata.userId, metadata.planId, metadata.propertyId, subscription);
        }
      }
    }

    // ✅ NEW: Handle payment processing (for bank transfers, async payments)
    // This fires BEFORE payment succeeds, giving you a chance to log/track
    if (event.type === 'payment_intent.processing') {
      const paymentIntent = event.data.object as any;
      console.log(`Payment processing: ${paymentIntent.id}, method: ${paymentIntent.payment_method_types?.[0]}`);
      
      // Optional: Send email to user: "We're processing your payment, this may take 1-3 business days"
      // This is especially important for bank transfers
    }

    // ✅ Handle successful subscription invoice
    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as any;
      
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        const metadata = subscription.metadata;

        if (metadata?.userId && metadata?.planId) {
          // Subscription was paid (could be card, Apple Pay, Google Pay, bank transfer)
          await updateUserSubscription(metadata.userId, metadata.planId, metadata.propertyId, subscription);
        }
      }
    }

    // ✅ Handle subscription updates
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as any;
      const metadata = subscription.metadata;

      if (metadata?.userId && metadata?.planId) {
        await updateUserSubscription(metadata.userId, metadata.planId, metadata.propertyId, subscription);
      }
    }

    // ✅ Handle failed payments (applies to all payment methods)
    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as any;
      
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        const metadata = subscription.metadata;
        
        if (metadata?.userId) {
          // Mark subscription as past due (user has grace period to retry)
          await db
            .update(userTable)
            .set({
              paymentStatus: 'past_due',
              updatedAt: new Date(),
            })
            .where(eq(userTable.id, metadata.userId));

          console.log(`User ${metadata.userId} payment failed, status set to past_due`);
          
          // Optional: Send email: "Your payment failed. Please update your payment method."
        }
      }
    }

    // ✅ Handle subscription cancellation
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as any;
      const metadata = subscription.metadata;
      
      if (metadata?.userId) {
        await db
          .update(userTable)
          .set({
            paymentStatus: 'cancelled',
            updatedAt: new Date(),
          })
          .where(eq(userTable.id, metadata.userId));

        console.log(`User ${metadata.userId} subscription cancelled`);

        if (metadata?.propertyId) {
          await db
            .update(propertiesTable)
            .set({
              status: 'Inactive',
              isPublished: false,
              updatedAt: new Date().toISOString(),
            })
            .where(eq(propertiesTable.id, parseInt(metadata.propertyId)));

          console.log(`Property ${metadata.propertyId} deactivated due to cancellation`);
        }
      }
    }

  } catch (dbError) {
    console.error('Database update error:', dbError);
    return NextResponse.json(
      { error: 'Failed to update database records' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

// ✅ Helper function to reduce code duplication
async function updateUserSubscription(
  userId: string,
  planId: string,
  propertyId: string | undefined,
  subscription: any
) {
  await db
    .update(userTable)
    .set({
      paymentStatus: 'active',
      planId: planId,
      updatedAt: new Date(),
    })
    .where(eq(userTable.id, userId));

  console.log(`Updated user ${userId} with plan ${planId} and payment_status active`);

  if (propertyId) {
    const updateData: any = {
      status: 'Active',
      plan: planId.charAt(0).toUpperCase() + planId.slice(1),
      isPublished: true,
      updatedAt: new Date().toISOString(),
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      nextPaymentDate: new Date(subscription.current_period_end * 1000).toISOString(),
    };

    if (typeof subscription.latest_invoice === 'string') {
      updateData.stripeInvoiceId = subscription.latest_invoice;
    } else if (subscription.latest_invoice?.id) {
      updateData.stripeInvoiceId = subscription.latest_invoice.id;
    }

    await db
      .update(propertiesTable)
      .set(updateData)
      .where(eq(propertiesTable.id, parseInt(propertyId)));

    console.log(`Updated property ${propertyId} to Active with plan ${planId}`);
  }
}
```

---

## PART 6: Apple Pay Domain Verification

### ✅ Step 1: Generate Domain Association File

In your Next.js project root, create:

**File:** `public/.well-known/apple-app-site-association`

```json
{
  "webcredentials": {
    "apps": [
      "XXXXXXXXXXXXXX"
    ]
  }
}
```

**Note:** The app ID can be empty or use your actual Apple developer ID.

### ✅ Step 2: Verify in Stripe Dashboard

1. Go to: **Stripe Dashboard → Settings → Domains**
2. Click **+ Add domain**
3. Enter: `orchids-escape-houses1.vercel.app`
4. Stripe will verify the domain automatically

Stripe will check:
- `https://orchids-escape-houses1.vercel.app/.well-known/apple-app-site-association`

If verified ✅, Apple Pay will work.

### ✅ Step 3: Test Apple Pay

1. **Requirements:**
   - iPhone or iPad (Safari browser)
   - Apple Pay configured on device
   - Test card added to wallet

2. **Test Card:**
   - Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)

3. **Testing Steps:**
   - Open your live site on iPad/iPhone Safari
   - Select plan and click checkout
   - Apple Pay button should appear
   - Tap button and authorize payment
   - Should see success page

---

## PART 7: Testing All Payment Methods

### Testing Matrix

| Method | Device | Browser | Status | How to Test |
|--------|--------|---------|--------|------------|
| **Card** | Desktop/Mobile | Any | ✅ Always Works | Enter card manually |
| **Apple Pay** | iPhone/iPad | Safari only | ✅ If verified | Configured in wallet |
| **Google Pay** | Android | Chrome only | ✅ Works | Configured in device |
| **Apple Pay** | Desktop Mac | Safari only | ⚠️ Limited | macOS Safari required |
| **Bank Transfer** | N/A (subscription) | N/A | ❌ Not supported | Use Payment Intent API instead |

### Step-by-Step Testing

#### Test 1: Card Payment (Desktop)
```
1. Go to checkout
2. See payment form
3. Enter: 4242 4242 4242 4242
4. Expiry: 12/25
5. CVC: 123
6. Click Pay → Should succeed
```

#### Test 2: Apple Pay (iOS Safari)
```
1. Go to checkout on iPad/Safari
2. See payment form
3. Apple Pay button appears automatically
4. Tap Apple Pay
5. Authenticate (Face ID/Touch ID)
6. Confirm payment
7. Should succeed
```

#### Test 3: Google Pay (Android Chrome)
```
1. Go to checkout on Android Chrome
2. See payment form
3. Google Pay button appears automatically
4. Tap Google Pay
5. Authenticate (fingerprint/PIN)
6. Confirm payment
7. Should succeed
```

#### Test 4: Webhook Verification
```
After each payment:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Find your endpoint
3. Look for latest events:
   - checkout.session.completed
   - payment_intent.succeeded (or payment_intent.processing for async)
   - invoice.paid

4. Check Vercel logs:
   - Vercel Dashboard → Logs
   - Search for webhook processing messages
```

---

## PART 8: Common Mistakes & How to Avoid Them

### ❌ Mistake 1: Apple Pay Not Showing

**Causes:**
- [ ] Domain not verified in Stripe Dashboard
- [ ] Not using HTTPS (must be https://...)
- [ ] Testing on non-Apple device
- [ ] `.well-known/apple-app-site-association` file is wrong

**Fix:**
```bash
# Verify file exists and is accessible
curl -I https://orchids-escape-houses1.vercel.app/.well-known/apple-app-site-association
# Should return: 200 OK (not 404)

# Check Stripe Dashboard domain verification status
# Should show: ✅ Verified
```

---

### ❌ Mistake 2: Google Pay Not Showing

**Causes:**
- [ ] Not using Android Chrome
- [ ] Not logged into Google account
- [ ] Google Pay not set up on device
- [ ] Testing on desktop instead of mobile

**Fix:**
```
✅ Correct: Android phone + Chrome + Logged into Google + Google Pay app installed
❌ Wrong: Desktop Chrome (it will show card instead, which is normal)
```

---

### ❌ Mistake 3: Bank Transfer Won't Work with Subscriptions

**Why:** Stripe Checkout doesn't support bank transfer + subscription combo.

**Solutions:**

**Option A: One-time bank transfer setup fee (Recommended)**
```typescript
// Create separate endpoint for one-time bank transfer
const paymentIntent = await stripe.paymentIntents.create({
  amount: setupFeeAmount,
  currency: 'gbp',
  payment_method_types: ['sepa_debit', 'card'],
  // After success, create subscription
});
```

**Option B: Bank transfer only for first payment, then card for renewal**
```typescript
// This requires Payment Element (not Checkout)
// More complex, not recommended
```

**Recommendation:** Use Option A.

---

### ❌ Mistake 4: Marking User "Paid" Before Payment Completes

**Problem:**
```typescript
// ❌ WRONG: Don't do this
checkoutSession = await stripe.checkout.sessions.create({ ... });
await db.update(user).set({ paymentStatus: 'active' }); // ❌ TOO EARLY!
// User hasn't paid yet!
```

**Solution:**
```typescript
// ✅ RIGHT: Only update on webhook
// In webhook handler:
if (event.type === 'payment_intent.succeeded' || event.type === 'invoice.paid') {
  await db.update(user).set({ paymentStatus: 'active' }); // ✅ NOW they paid
}
```

---

### ❌ Mistake 5: Not Handling Async Payments (Bank Transfer)

**Problem:**
```typescript
// ❌ WRONG: Assume payment is instant
// In success page, immediately activate subscription
// But bank transfer takes 1-3 days!
```

**Solution:**
```typescript
// ✅ RIGHT: Handle different states
// payment_intent.processing → Keep status 'pending'
// invoice.paid → Only then set to 'active'

// Email user on payment_intent.processing:
// "Your bank transfer was received. It will be processed in 1-3 business days."
```

---

### ❌ Mistake 6: Insufficient Webhook Events

**Current events you're handling:**
- ✅ `checkout.session.completed`
- ✅ `invoice.paid`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_failed`

**Missing events to add:**
- ⚠️ `payment_intent.processing` (for bank transfers)
- ⚠️ `payment_intent.payment_failed` (additional tracking)

**How to add:**
```typescript
if (event.type === 'payment_intent.processing') {
  // Bank transfer or other async payment is in progress
  // Send customer email: "Payment is being processed..."
}
```

---

### ❌ Mistake 7: Not Validating Payment Method Type

**Problem:**
```typescript
// ❌ WRONG: Trust customer blindly
const { paymentMethod } = request.body;
// Could be 'apple_pay', 'google_pay', 'card', or malicious input
```

**Solution:**
```typescript
// ✅ RIGHT: Validate
const validPaymentMethods = ['card', 'apple_pay', 'google_pay'];
if (!validPaymentMethods.includes(paymentMethod)) {
  return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
}
```

---

## PART 9: Environment Variables Required

### In `.env.local` (Development)
```env
STRIPE_TEST_KEY=sk_test_[your-test-key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[your-publishable-key]
STRIPE_WEBHOOK_SECRET=whsec_[your-webhook-secret]
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### On Vercel (Production)
```
Settings → Environment Variables

Add:
- STRIPE_TEST_KEY (while in test mode)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (TEST key)
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SITE_URL=https://orchids-escape-houses1.vercel.app

After each change: Redeploy
```

---

## PART 10: Migration Checklist

### Week 1: Development
- [ ] Update `checkout/route.ts` with new payment methods
- [ ] Update webhook handler with new event types
- [ ] Test on device (desktop, iOS, Android)
- [ ] Test webhook events fire correctly

### Week 2: Staging (on Vercel)
- [ ] Deploy to Vercel with TEST keys
- [ ] Verify Apple Pay domain in Stripe Dashboard
- [ ] Test all payment methods on live domain
- [ ] Check webhook logs in Vercel

### Week 3: Production Cutover
- [ ] Get LIVE keys from Stripe Dashboard
- [ ] Add to Vercel environment variables
- [ ] Update `STRIPE_MODE=live` in Vercel
- [ ] Redeploy
- [ ] Test with small test transaction
- [ ] Monitor Stripe Dashboard for activity

---

## PART 11: Code Changes Summary

### Files to Update:
1. ✅ `src/app/api/checkout/route.ts` - Add payment methods
2. ✅ `src/app/api/webhooks/stripe/route.ts` - Enhanced webhook handling
3. ✅ `public/.well-known/apple-app-site-association` - Create for Apple Pay
4. ✅ `.env.local` - Add NEXT_PUBLIC_SITE_URL
5. ✅ Vercel Dashboard - Add environment variables

### No Changes Needed:
- `src/lib/stripe.ts` - Already correct
- Frontend payment code - Stripe handles everything

---

## PART 12: FAQ

### Q: Does Google Pay require domain verification like Apple Pay?
**A:** No. Google Pay works automatically on Android Chrome. No domain verification needed.

### Q: Can I use Payment Element instead of Checkout?
**A:** Yes, but for subscriptions, Checkout is better. Payment Element requires more webhook handling.

### Q: When will Stripe support bank transfer + subscriptions?
**A:** Check Stripe roadmap: https://stripe.com/blog. As of 2025, not supported in Checkout.

### Q: What happens if a bank transfer fails?
**A:** Stripe fires `payment_intent.payment_failed`. Update user status to `past_due`. They can retry.

### Q: Can I test without real devices?
**A:** Limited:
- ✅ Card: Yes (desktop simulator)
- ✅ Apple Pay: No (need real device or iOS simulator)
- ✅ Google Pay: No (need real Android device)
- Test on actual devices for accuracy

---

## IMPLEMENTATION TEMPLATE

Ready to implement? Copy this template:

```typescript
// BEFORE (current code)
payment_method_types: ['card'],

// AFTER (multi-payment)
payment_method_types: [
  'card',        // ✅ Visa, Mastercard, Amex
  'apple_pay',   // ✅ iOS/macOS (requires domain verification)
  'google_pay',  // ✅ Android Chrome (automatic)
],
```

---

## Next Steps

1. **Update checkout route** with new payment methods
2. **Create Apple Pay domain verification file**
3. **Verify domain** in Stripe Dashboard
4. **Test each method** on correct device
5. **Check webhook logs** after payment
6. **Deploy to Vercel**
7. **Monitor for issues** in first week

---

## Support Resources

- Stripe Checkout Docs: https://stripe.com/docs/payments/checkout
- Apple Pay Setup: https://stripe.com/docs/apple-pay
- Google Pay Setup: https://stripe.com/docs/google-pay
- Bank Transfer: https://stripe.com/docs/payments/sepa-debit
- Webhook Events: https://stripe.com/docs/api/events/types
- Test Cards: https://stripe.com/docs/testing
