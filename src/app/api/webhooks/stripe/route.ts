import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    if (!session.metadata) {
      console.error('No metadata in checkout session');
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    const { userId, planId } = session.metadata;

    if (!userId || !planId) {
      console.error('Missing userId or planId in metadata');
      return NextResponse.json({ error: 'Missing required metadata' }, { status: 400 });
    }

    if (session.payment_status === 'paid') {
      try {
        await db
          .update(user)
          .set({
            paymentStatus: 'active',
            planId: planId,
            updatedAt: new Date(),
          })
          .where(eq(user.id, userId));

        console.log(`Updated user ${userId} with plan ${planId} and payment_status active`);
      } catch (dbError) {
        console.error('Database update error:', dbError);
        return NextResponse.json(
          { error: 'Failed to update user' },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
