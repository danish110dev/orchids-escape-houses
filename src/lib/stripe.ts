import Stripe from 'stripe';

// Stripe mode can be explicitly set via STRIPE_MODE env var
// Otherwise defaults: TEST for builds/dev, LIVE only for actual production runtime
const stripeMode = process.env.STRIPE_MODE || 'test';
const isLiveMode = stripeMode === 'live';

const stripeKey = isLiveMode 
  ? process.env.STRIPE_LIVE_KEY
  : (process.env.STRIPE_TEST_KEY || process.env.STRIPE_TESTMODE_KEY);

if (!stripeKey) {
  throw new Error(`Stripe API Key is missing (mode: ${stripeMode})`);
}

console.log(`[Stripe] Using ${stripeMode.toUpperCase()} mode`);

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-10-29.clover',
});
