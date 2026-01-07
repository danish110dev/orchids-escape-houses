import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_TEST_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export { PLANS, type PlanId } from './plans';
