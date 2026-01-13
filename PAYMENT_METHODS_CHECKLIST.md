# Multi-Payment Implementation - Quick Reference

## ✅ Changes Made

### 1. Backend Updates
- [x] `src/app/api/checkout/route.ts` - Added Apple Pay + Google Pay
- [x] `src/app/api/webhooks/stripe/route.ts` - Added async payment handling
- [x] `public/.well-known/apple-app-site-association` - Created for Apple Pay verification

### 2. Payment Methods Now Supported
```
✅ Credit/Debit Cards (Visa, Mastercard, Amex, Discover)
✅ Apple Pay (iOS/macOS) - Requires domain verification
✅ Google Pay (Android/Chrome) - Automatic
❌ Bank Transfer (Not supported with subscriptions, see guide for alternatives)
```

## 📋 TODO Checklist

### Immediate (Next 24 hours)
- [ ] Go to **Stripe Dashboard → Settings → Domains**
- [ ] Add domain: `orchids-escape-houses1.vercel.app`
- [ ] Wait for verification (should auto-verify within minutes)
- [ ] Verify `.well-known/apple-app-site-association` is accessible:
  ```bash
  curl -I https://orchids-escape-houses1.vercel.app/.well-known/apple-app-site-association
  # Should return: 200 OK (not 404)
  ```

### Testing (Next 48 hours)
- [ ] Test on **Desktop** with Card payment
  - Card: `4242 4242 4242 4242`
  - Expiry: `12/25`
  - CVC: `123`

- [ ] Test on **iPhone/iPad Safari** with Apple Pay
  - Requires: Apple Pay set up on device
  - Should see: "Apple Pay" button automatically

- [ ] Test on **Android Chrome** with Google Pay
  - Requires: Google account + Google Pay app
  - Should see: "Google Pay" button automatically

- [ ] Verify Webhooks in **Stripe Dashboard → Developers → Webhooks**
  - Should see: `checkout.session.completed` (Delivered)
  - Should see: `invoice.paid` (Delivered)

### Environment Variables (Vercel)
- [ ] Go to **Vercel → Project Settings → Environment Variables**
- [ ] Verify these are set:
  ```
  STRIPE_TEST_KEY = sk_test_[your-key]
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_[your-key]
  STRIPE_WEBHOOK_SECRET = whsec_[your-secret]
  NEXT_PUBLIC_SITE_URL = https://orchids-escape-houses1.vercel.app
  ```
- [ ] **Redeploy** after any changes

### Production Migration (Week 2)
- [ ] Get LIVE keys from Stripe Dashboard
- [ ] Update Vercel environment variables with LIVE keys
- [ ] Set `STRIPE_MODE=live` in Vercel
- [ ] Test with small payment ($0.50)
- [ ] Monitor Stripe Dashboard for 48 hours
- [ ] Full production rollout

## 🎯 Key Points

### How Payment Methods Show
- **Card**: Always available (fallback)
- **Apple Pay**: Only on Safari/iOS/macOS (if verified)
- **Google Pay**: Only on Chrome/Android with Google account
- Stripe shows in this order: Apple Pay > Google Pay > Card

### About Bank Transfer
- ❌ NOT supported for subscriptions (Stripe limitation)
- ✅ Workaround: Create separate one-time bank transfer endpoint
- Check documentation: `STRIPE_MULTI_PAYMENT_SETUP.md` (Part 8)

### Webhook Events to Monitor
- ✅ `checkout.session.completed` - Payment successful
- ✅ `invoice.paid` - Subscription renewed
- ✅ `payment_intent.processing` - Async payment in progress
- ✅ `invoice.payment_failed` - Payment failed
- ✅ `payment_intent.payment_failed` - Payment error
- ✅ `customer.subscription.deleted` - Subscription cancelled

## 🔐 Security

### What's Secure
- ✅ All keys in environment variables (not hardcoded)
- ✅ Webhook signature verification enabled
- ✅ Stripe handles PCI compliance (we never touch card data)
- ✅ Domain verification for Apple Pay

### What to Avoid
- ❌ Don't expose secret keys in frontend code
- ❌ Don't skip webhook signature verification
- ❌ Don't mark payment "active" before webhook confirms
- ❌ Don't hardcode Stripe keys

## 📞 Support Links

- **Stripe Docs**: https://stripe.com/docs/payments/checkout
- **Apple Pay**: https://stripe.com/docs/apple-pay
- **Google Pay**: https://stripe.com/docs/google-pay
- **Test Cards**: https://stripe.com/docs/testing
- **Webhooks**: https://stripe.com/docs/webhooks/setup
- **Dashboard**: https://dashboard.stripe.com

## 📊 Testing Summary

| Method | Device | Expected | Notes |
|--------|--------|----------|-------|
| Card | Any | Always works | Manual entry required |
| Apple Pay | iPhone/iPad | Button appears | Requires domain verify |
| Google Pay | Android | Button appears | Requires Google account |
| Card (Desktop) | Mac/Windows | Always works | Fallback option |

## ❓ Common Issues

### "Apple Pay button not showing"
- [ ] Check domain verification in Stripe Dashboard
- [ ] Verify `.well-known/apple-app-site-association` is accessible (200 OK)
- [ ] Using HTTPS on deployment domain
- [ ] Testing on Safari/iOS/macOS

### "Google Pay button not showing"
- [ ] Testing on Android Chrome (not desktop)
- [ ] Logged into Google account
- [ ] Google Pay app installed on device

### "Payment not completing"
- [ ] Check webhook logs in Vercel
- [ ] Verify webhook secret is correct
- [ ] Check Stripe Dashboard for failed events
- [ ] Look at database logs for errors

### "Subscription not activating after payment"
- [ ] Check webhook handler is running
- [ ] Verify metadata is being passed correctly
- [ ] Check database for user payment status
- [ ] Look at API logs for errors

## 🚀 Next Steps

1. **Verify Apple Pay domain** (highest priority)
2. **Test all payment methods** on correct devices
3. **Monitor webhook logs** after test payments
4. **Deploy to production** when confident
5. **Switch to LIVE keys** only after successful test

---

**Questions?** See `STRIPE_MULTI_PAYMENT_SETUP.md` for complete implementation guide.
