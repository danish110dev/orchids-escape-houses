import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { bookings, payments as paymentsTable } from '../../../../../drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * Create Stripe Checkout Session for Booking Payments
 * Handles deposit and balance payments for property bookings
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { booking_id, payment_type = 'deposit', success_url, cancel_url } = body as {
      booking_id: number;
      payment_type?: 'deposit' | 'balance';
      success_url: string;
      cancel_url: string;
    };

    if (!booking_id) {
      return NextResponse.json({ error: 'booking_id is required' }, { status: 400 });
    }

    if (!success_url || !cancel_url) {
      return NextResponse.json({ error: 'success_url and cancel_url are required' }, { status: 400 });
    }

    // Fetch the booking
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, booking_id))
      .limit(1);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Determine amount based on payment type
    const amount = payment_type === 'deposit' 
      ? booking.depositAmount 
      : booking.balanceAmount;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: `Invalid ${payment_type} amount` },
        { status: 400 }
      );
    }

    // Check if already paid
    const alreadyPaid = payment_type === 'deposit' 
      ? booking.depositPaid 
      : booking.balancePaid;

    if (alreadyPaid) {
      return NextResponse.json(
        { error: `${payment_type.charAt(0).toUpperCase() + payment_type.slice(1)} already paid` },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'required',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: Math.round(amount * 100), // Convert to pence
            product_data: {
              name: `${payment_type === 'deposit' ? 'Deposit' : 'Balance'} Payment - ${booking.propertyName}`,
              description: `${booking.guestName} | Check-in: ${booking.checkInDate} | Check-out: ${booking.checkOutDate}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: success_url,
      cancel_url: cancel_url,
      customer_email: booking.guestEmail,
      metadata: {
        bookingId: booking_id.toString(),
        userId: session.user.id,
        paymentType: payment_type,
        propertyName: booking.propertyName,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
      },
      payment_intent_data: {
        metadata: {
          bookingId: booking_id.toString(),
          userId: session.user.id,
          paymentType: payment_type,
          propertyName: booking.propertyName,
        },
      },
    });

    console.log(`✅ Checkout session created for booking ${booking_id}, ${payment_type}: ${checkoutSession.id}`);

    // Create pending payment record immediately
    try {
      const [pendingPayment] = await db.insert(paymentsTable).values({
        userId: session.user.id,
        stripePaymentIntentId: checkoutSession.payment_intent as string || checkoutSession.id,
        stripeSessionId: checkoutSession.id,
        bookingId: booking_id,
        amount: amount,
        currency: 'GBP',
        paymentStatus: 'pending',
        paymentMethod: 'card',
        description: `${payment_type === 'deposit' ? 'Deposit' : 'Balance'} payment for ${booking.propertyName}`,
        receiptEmail: booking.guestEmail,
        metadata: JSON.stringify({
          paymentType: payment_type,
          propertyName: booking.propertyName,
          guestName: booking.guestName,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
        }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }).returning();

      console.log(`✅ Pending payment record created for booking ${booking_id}:`, pendingPayment);
    } catch (error) {
      console.error('Failed to create pending payment record:', error);
      // Continue anyway - webhook will create it
    }

    return NextResponse.json({
      success: true,
      data: {
        session: {
          id: checkoutSession.id,
          url: checkoutSession.url,
        },
      },
    });

  } catch (error: any) {
    console.error('Booking Checkout Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
