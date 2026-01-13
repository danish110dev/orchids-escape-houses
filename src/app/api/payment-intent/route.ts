import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';
import { PLANS, PlanId, getPlanPriceId } from '@/lib/plans';
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
    const { planId, interval = 'yearly', paymentMethod = 'card' } = body as {
      planId: PlanId;
      interval?: 'monthly' | 'yearly';
      paymentMethod?: string;
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

    const plan = PLANS[planId];
    
    // For bank transfers and other async methods, we use setup intents
    // This creates a subscription with initial payment
    const paymentIntentObject: any = {
      amount: Math.round(plan.price * 100), // Convert to cents
      currency: 'gbp',
      customer: session.user.id,
      description: `${plan.name} - ${interval === 'yearly' ? 'Annual' : 'Monthly'} subscription`,
      
      // Enable all payment methods automatically
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'if_required', // Allow bank transfers which may redirect
      },
      
      metadata: {
        userId: session.user.id,
        planId: planId,
        interval: interval,
        paymentType: 'subscription_initial',
      },
      
      // For subscription setup
      setup_future_usage: 'off_session', // Save payment method for future use
      statement_descriptor: `GEH-${planId.toUpperCase()}-${interval}`,
    };

    // Handle bank transfers specifically
    if (paymentMethod === 'bank_transfer' || paymentMethod === 'uk_bank_transfer') {
      paymentIntentObject.payment_method_types = ['uk_bank_transfer', 'sepa_debit'];
      paymentIntentObject.mandate_data = {
        customer_acceptance: {
          type: 'online',
          accepted_at: Math.floor(Date.now() / 1000),
        },
      };
    } else {
      // For cards/Apple Pay/Google Pay
      paymentIntentObject.automatic_payment_methods = {
        enabled: true,
        allow_redirects: 'never',
      };
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentObject);

    console.log(`Payment intent created: ${paymentIntent.id} for plan: ${planId}`);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Payment Intent Error:', {
      message: error.message,
      type: error.type,
      code: error.code,
    });
    
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
