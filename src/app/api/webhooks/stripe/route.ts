import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { user as userTable, properties as propertiesTable, payments as paymentsTable, subscriptions as subscriptionsTable } from '../../../../../drizzle/schema';
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

  if (processedEvents.has(event.id)) {
    console.log(`Event ${event.id} already processed, skipping`);
    return NextResponse.json({ received: true });
  }
  processedEvents.add(event.id);
  if (processedEvents.size > 1000) processedEvents.clear();

  console.log(`Processing Stripe webhook: ${event.type} (${event.id})`);

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'invoice.paid' || event.type === 'customer.subscription.updated') {
      const sessionOrInvoiceOrSub = event.data.object as any;
      
      let subscriptionId = sessionOrInvoiceOrSub.subscription;
      if (event.type === 'customer.subscription.updated') {
        subscriptionId = sessionOrInvoiceOrSub.id;
      }

      const subscription = subscriptionId ? await stripe.subscriptions.retrieve(subscriptionId) : null;
      
      const metadata = sessionOrInvoiceOrSub.metadata?.userId ? sessionOrInvoiceOrSub.metadata : 
                      (subscription?.metadata?.userId ? subscription.metadata : null);

      if (!metadata) {
        console.warn('No metadata found in event:', event.type);
        return NextResponse.json({ received: true });
      }

      const { userId, planId, propertyId } = metadata;

      if (!userId || !planId) {
        console.error('Missing userId or planId in metadata');
        return NextResponse.json({ error: 'Missing required metadata' }, { status: 400 });
      }

      // Create or update subscription in database
      if (subscription) {
        const sub = subscription as any;
        
        try {
          console.log(`Attempting to insert subscription record for subscription ${sub.id}...`);
          
          // Check if subscription already exists
          const existingSubscription = await db
            .select()
            .from(subscriptionsTable)
            .where(eq(subscriptionsTable.stripeSubscriptionId, sub.id))
            .limit(1);

          if (!existingSubscription || existingSubscription.length === 0) {
            // Insert new subscription
            await db.insert(subscriptionsTable).values({
              userId: userId,
              stripeSubscriptionId: sub.id,
              stripePriceId: sub.items.data[0]?.price.id || '',
              stripeCustomerId: sub.customer as string,
              planName: planId.charAt(0).toUpperCase() + planId.slice(1),
              planType: planId,
              status: sub.status === 'active' ? 'active' : 'inactive',
              currentPeriodStart: new Date(sub.current_period_start * 1000).toISOString(),
              currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
              cancelAtPeriodEnd: sub.cancel_at_period_end ? 1 : 0,
              amount: sub.items.data[0]?.price.unit_amount ? sub.items.data[0].price.unit_amount / 100 : 0,
              currency: (sub.currency || 'gbp').toUpperCase(),
              interval: sub.items.data[0]?.price.recurring?.interval || 'month',
              intervalCount: sub.items.data[0]?.price.recurring?.interval_count || 1,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });

            console.log(`✅ Subscription record created for user ${userId}, subscription ${sub.id}`);
          } else {
            // Update existing subscription
            await db
              .update(subscriptionsTable)
              .set({
                status: sub.status === 'active' ? 'active' : 'inactive',
                currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
                cancelAtPeriodEnd: sub.cancel_at_period_end ? 1 : 0,
                updatedAt: new Date().toISOString(),
              })
              .where(eq(subscriptionsTable.stripeSubscriptionId, sub.id));

            console.log(`✅ Subscription record updated for user ${userId}, subscription ${sub.id}`);
          }
        } catch (insertError) {
          console.error('❌ Failed to insert/update subscription:', insertError);
        }
      }

      // Save subscription/invoice transaction if this is an invoice.paid event
      if (event.type === 'invoice.paid' && sessionOrInvoiceOrSub) {
        const invoice = sessionOrInvoiceOrSub as any;
        const paymentMethod = invoice.payment_settings?.default_mandate || {};

        try {
          console.log(`Attempting to insert payment record for invoice ${invoice.id}...`);
          
          await db.insert(paymentsTable).values({
            userId: userId,
            stripePaymentIntentId: invoice.payment_intent || invoice.id,
            stripeInvoiceId: invoice.id,
            amount: invoice.amount_paid ? invoice.amount_paid / 100 : 0,
            currency: (invoice.currency || 'gbp').toUpperCase(),
            paymentStatus: 'succeeded',
            paymentMethod: 'card',
            paymentMethodBrand: 'unknown',
            paymentMethodLast4: '0000',
            description: `Plan ${planId} invoice payment`,
            receiptEmail: invoice.customer_email || '',
            receiptUrl: invoice.invoice_pdf || '',
            processedAt: new Date(invoice.created * 1000).toISOString(),
            stripeEventId: event.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          console.log(`✅ Invoice payment transaction saved for user ${userId}, invoice ${invoice.id}`);
        } catch (insertError) {
          console.error('❌ Failed to insert invoice payment:', insertError);
        }
      }

      // Note: planId and paymentStatus are stored in subscriptions table, not user table
      console.log(`Invoice paid event processed for user ${userId}, plan ${planId}`);

      if (propertyId) {
        const updateData: any = {
          status: 'Active',
          plan: planId.charAt(0).toUpperCase() + planId.slice(1),
          isPublished: true,
          updatedAt: new Date().toISOString(),
        };

        if (subscription) {
          const sub = subscription as any;
          updateData.stripeCustomerId = sub.customer as string;
          updateData.stripeSubscriptionId = sub.id;
          updateData.stripePriceId = sub.items.data[0].price.id;
          updateData.nextPaymentDate = new Date(sub.current_period_end * 1000).toISOString();
          updateData.stripeInvoiceId = typeof sub.latest_invoice === 'string' ? sub.latest_invoice : sub.latest_invoice?.id;
        }

        await db
          .update(propertiesTable)
          .set(updateData)
          .where(eq(propertiesTable.id, parseInt(propertyId)));
        
        console.log(`Updated property ${propertyId} to Active with plan ${planId}`);
      }
    }

    // ✅ CRITICAL: Handle payment intent succeeded (bank transfers finally complete)
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any;
      const { userId, planId, propertyId } = paymentIntent.metadata || {};
      
      console.log(`Payment intent succeeded: ${paymentIntent.id}, method: ${paymentIntent.payment_method_types?.[0]}`);
      
      if (userId && planId) {
        // Save transaction to payments table
        const paymentMethod = paymentIntent.payment_method_details?.card || {};
        
        try {
          console.log(`Attempting to insert payment record for payment intent ${paymentIntent.id}...`);
          
          await db.insert(paymentsTable).values({
            userId: userId,
            stripePaymentIntentId: paymentIntent.id,
            stripeChargeId: paymentIntent.charges?.data?.[0]?.id || paymentIntent.id,
            amount: paymentIntent.amount ? paymentIntent.amount / 100 : 0, // Convert from cents
            currency: (paymentIntent.currency || 'gbp').toUpperCase(),
            paymentStatus: 'succeeded',
            paymentMethod: paymentIntent.payment_method_types?.[0] || 'card',
            paymentMethodBrand: paymentMethod.brand || 'unknown',
            paymentMethodLast4: paymentMethod.last4 || '0000',
            description: `Plan ${planId} subscription payment`,
            receiptEmail: paymentIntent.receipt_email || '',
            receiptUrl: paymentIntent.charges?.data?.[0]?.receipt_url || '',
            processedAt: new Date(paymentIntent.created * 1000).toISOString(),
            stripeEventId: event.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          console.log(`✅ Transaction saved for payment ${paymentIntent.id}`);
        } catch (insertError) {
          console.error('❌ Failed to insert payment intent transaction:', insertError);
        }

        // Create subscription record if not exists
        if (paymentIntent.charges?.data?.[0]) {
          try {
            console.log(`Creating subscription record for user ${userId}, plan ${planId}...`);
            
            const existingSubscription = await db
              .select()
              .from(subscriptionsTable)
              .limit(1);

            if (!existingSubscription || existingSubscription.length === 0) {
              await db.insert(subscriptionsTable).values({
                userId: userId,
                stripePriceId: '',
                planName: planId.charAt(0).toUpperCase() + planId.slice(1),
                planType: planId,
                status: 'active',
                currentPeriodStart: new Date().toISOString(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
                amount: paymentIntent.amount ? paymentIntent.amount / 100 : 0,
                currency: (paymentIntent.currency || 'gbp').toUpperCase(),
                interval: 'month',
                intervalCount: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });

              console.log(`✅ Subscription record created for user ${userId}`);
            }
          } catch (subError) {
            console.error('❌ Failed to create subscription:', subError);
          }
        }

        // Note: Subscription already created above from checkout.session.completed
        console.log(`Bank transfer completed for user ${userId}, plan ${planId}`);

        if (propertyId) {
          await db
            .update(propertiesTable)
            .set({
              status: 'Active',
              isPublished: 1,
            })
            .where(eq(propertiesTable.id, parseInt(propertyId)));
          
          console.log(`Property ${propertyId} activated due to payment intent success`);
        }
      }
    }

    // ✅ Handle asynchronous payments (bank transfer, etc.) - PAYMENT PENDING
    if (event.type === 'payment_intent.processing') {
      const paymentIntent = event.data.object as any;
      const { userId } = paymentIntent.metadata || {};
      
      console.log(`Payment processing: ${paymentIntent.id}, method: ${paymentIntent.payment_method_types?.[0]} - AWAITING COMPLETION`);
      
      if (userId) {
        console.log(`User ${userId} payment pending (bank transfer in progress, will complete in 1-3 days)`);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as any;
      const metadata = subscription.metadata;
      
      if (metadata?.userId) {
        console.log(`User ${metadata.userId} subscription cancelled`);
      }

      if (metadata?.propertyId) {
        await db
          .update(propertiesTable)
          .set({
            status: 'Inactive',
            isPublished: 0,
          })
          .where(eq(propertiesTable.id, parseInt(metadata.propertyId)));
        console.log(`Property ${metadata.propertyId} deactivated due to subscription cancellation`);
      }
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as any;
      const subscriptionId = invoice.subscription;
      
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const metadata = subscription.metadata;
        
        if (metadata?.userId) {
          // Save failed payment transaction
          const paymentMethod = invoice.payment_settings?.save_default_payment_method ? 
            { brand: 'unknown', last4: '0000' } : 
            { brand: 'unknown', last4: '0000' };

          try {
            console.log(`Attempting to insert failed payment record for invoice ${invoice.id}...`);
            
            await db.insert(paymentsTable).values({
              userId: metadata.userId,
              stripePaymentIntentId: invoice.payment_intent || invoice.id,
              stripeInvoiceId: invoice.id,
              amount: invoice.amount_due ? invoice.amount_due / 100 : 0,
              currency: (invoice.currency || 'gbp').toUpperCase(),
              paymentStatus: 'failed',
              paymentMethod: 'card',
              paymentMethodBrand: paymentMethod.brand,
              paymentMethodLast4: paymentMethod.last4,
              description: `Failed payment for subscription`,
              receiptEmail: invoice.customer_email || '',
              failureMessage: invoice.last_finalization_error?.message || 'Payment declined',
              processedAt: new Date(invoice.created * 1000).toISOString(),
              stripeEventId: event.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });

            console.log(`✅ Failed transaction recorded for invoice ${invoice.id}`);
          } catch (insertError) {
            console.error('❌ Failed to insert failed payment record:', insertError);
          }

          console.log(`User ${metadata.userId} payment failed, status tracked in payments table`);
        }
      }
    }

    // ✅ NEW: Handle payment intent failures (additional tracking)
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as any;
      console.log(`Payment failed: ${paymentIntent.id}, error: ${paymentIntent.last_payment_error?.message}`);
      
      // This can happen if user's bank rejects the transfer
      // Optional: Send customer email: "Your payment failed. Please try another method."
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
