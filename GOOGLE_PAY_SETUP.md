# Google Pay Implementation Checklist

## ✅ Step 1: Stripe Checkout Configuration
**Status: COMPLETE**

Our backend checkout code is correctly configured:
- File: `src/app/api/checkout/route.ts`
- Payment method: `['card']` ✅
- Mode: `'subscription'` ✅
- Google Pay is **automatically enabled** with card payment method

**Code:**
```typescript
const checkoutSession = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],  // Google Pay shows automatically
  mode: 'subscription',
  // ... rest of config
});
```

---

## ✅ Step 2: Environment Variables
**Status: CONFIGURED**

### Local Development (.env)
- `STRIPE_TEST_KEY` = `sk_test_[your-test-key-here]` ✅
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_[your-publishable-key-here]` ✅
- `NEXT_PUBLIC_SITE_URL` = `https://orchids-escape-houses1.vercel.app` ✅
- `STRIPE_WEBHOOK_SECRET` = `whsec_[your-webhook-secret]` ✅

### Vercel Deployment
**TODO: Verify in Vercel Dashboard**

Go to: **Vercel → Project Settings → Environment Variables**

Ensure these are set:
- [ ] `STRIPE_TEST_KEY` (TEST secret key)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (TEST publishable key)
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://orchids-escape-houses1.vercel.app`
- [ ] `STRIPE_WEBHOOK_SECRET`

After adding/editing → **Redeploy**

---

## ✅ Step 3: Webhook Configuration
**Status: COMPLETE**

File: `src/app/api/webhooks/stripe/route.ts`

Webhook events handled:
- `checkout.session.completed` ✅
- `invoice.paid` ✅
- `customer.subscription.updated` ✅
- `customer.subscription.deleted` ✅

---

## 📱 Step 4: Testing on the RIGHT Device
**IMPORTANT: Google Pay shows only on compatible devices**

### ✅ Works (Google Pay will show):
- **Android phone** with Chrome browser
- Logged into Google account
- Google Pay set up (test card is fine)

### ⚠️ Limited or No Google Pay:
- iPhone (shows Apple Pay instead) - **Normal, not an error**
- Desktop browser (shows card option instead) - **Normal, not an error**
- Not logged into Google account
- Google Pay not configured on device

### Test Cards for Google Pay:
Use Stripe test cards: https://stripe.com/docs/testing

---

## 🔄 Step 5: Verify Webhook is Firing
**After a test payment, check:**

### In Stripe Dashboard:
1. Go to **Developers → Webhooks**
2. Look for `checkout.session.completed` event
3. Status should be **Delivered** ✅

### In Vercel Logs:
1. Go to **Vercel → Logs**
2. Search for webhook processing logs
3. Should see success messages

---

## ✅ Complete Checklist

- [x] GPay enabled in TEST mode
- [x] Using Stripe Checkout (subscription mode)
- [x] TEST keys configured in code
- [x] HTTPS Vercel domain set (`https://orchids-escape-houses1.vercel.app`)
- [x] Webhook endpoint set up and receiving events
- [x] Environment variables added to .env
- [ ] **TODO: Verify Environment Variables on Vercel Dashboard**
- [ ] **TODO: Test payment on Android device with Google Pay**
- [ ] **TODO: Confirm webhook delivers successfully**
- [ ] **TODO: Verify user subscription status updates in database**

---

## 🚀 What To Do Next

### 1. Set Environment Variables on Vercel
```
Vercel Dashboard → Project → Settings → Environment Variables

Add/Verify:
- STRIPE_TEST_KEY=sk_test_...
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
- NEXT_PUBLIC_SITE_URL=https://orchids-escape-houses1.vercel.app
- STRIPE_WEBHOOK_SECRET=whsec_...

Then: Redeploy the project
```

### 2. Test on Android Device
1. Visit: `https://orchids-escape-houses1.vercel.app`
2. Create account / Sign in
3. Choose a plan
4. Click "Upgrade" / "Subscribe"
5. Stripe Checkout opens
6. **If logged into Google account on Android Chrome:**
   - Google Pay button should appear
   - Tap to pay with Google Pay
7. Complete payment

### 3. Verify Payment Processing
```
After successful payment:

1. Check Stripe Dashboard:
   - Developers → Webhooks
   - Should see checkout.session.completed (Delivered)

2. Check Vercel Logs:
   - Should show webhook processing logs

3. Check Database:
   - User's paymentStatus should be 'active'
   - User's planId should be updated
```

### 4. Only Then Switch to LIVE Mode
Once you confirm:
- ✅ Successful test payment
- ✅ Webhook fires and updates database
- ✅ Google Pay works on Android

Then update to LIVE keys in:
- Stripe Dashboard (copy live keys)
- Vercel Environment Variables
- Redeploy

---

## 📝 Notes

- Google Pay works **automatically** with Stripe Checkout when using `payment_method_types: ['card']`
- You **do NOT** need to add "google_pay" manually
- It's normal for Google Pay to only show on compatible devices
- Always test on the actual device (Android) before considering it broken
- Webhook verification is critical for subscription status updates

---

## Support

If issues occur:
1. Check Stripe test mode is active (not live)
2. Verify webhook endpoint URL in Stripe Dashboard
3. Check Vercel function logs for errors
4. Ensure test card is valid: https://stripe.com/docs/testing
