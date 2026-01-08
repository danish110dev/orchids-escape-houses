import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_LIVE_KEY || process.env.STRIPE_TEST_KEY;

if (!stripeKey) {
  throw new Error('Stripe API Key is missing');
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-12-18.acacia',
});

export { PLANS, type PlanId } from './plans';
