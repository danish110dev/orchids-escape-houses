import Stripe from 'stripe';

// IMPORTANT: Always use TEST keys except in live production
// Build process and development both use TEST mode
const isProduction = process.env.NEXT_PUBLIC_APP_URL_PRODUCTION && !process.env.NODE_ENV?.includes('development');

const stripeKey = isProduction 
  ? (process.env.STRIPE_LIVE_KEY || process.env.STRIPE_TEST_KEY)
  : (process.env.STRIPE_TEST_KEY || process.env.STRIPE_TESTMODE_KEY);

if (!stripeKey) {
  throw new Error('Stripe API Key is missing');
}

console.log(`[Stripe] Using ${isProduction ? 'LIVE' : 'TEST'} mode`);

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-10-29.clover',
});
