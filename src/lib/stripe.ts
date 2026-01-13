import Stripe from 'stripe';

// Always use TEST key unless explicitly in production with STRIPE_MODE env var
const useTestMode = process.env.STRIPE_MODE !== 'live';
const stripeKey = useTestMode
  ? (process.env.STRIPE_TEST_KEY || process.env.STRIPE_TESTMODE_KEY)
  : process.env.STRIPE_LIVE_KEY;

if (!stripeKey) {
  throw new Error('Stripe API Key is missing');
}

console.log(`[Stripe] Using ${useTestMode ? 'TEST' : 'LIVE'} mode`);

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-10-29.clover',
});
