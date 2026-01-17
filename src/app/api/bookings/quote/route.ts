import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { bookings, properties } from '../../../../../drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * Create a Booking Quote
 * Generates a booking record with calculated pricing
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { property_id, check_in, check_out, guests } = body as {
      property_id: string;
      check_in: string;
      check_out: string;
      guests: number;
    };

    // Validate required fields
    if (!property_id || !check_in || !check_out || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields: property_id, check_in, check_out, guests' },
        { status: 400 }
      );
    }

    // Fetch property details
    const [property] = await db
      .select()
      .from(properties)
      .where(eq(properties.id, parseInt(property_id)))
      .limit(1);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Calculate number of nights
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      return NextResponse.json(
        { error: 'Invalid date range' },
        { status: 400 }
      );
    }

    // Calculate pricing (simplified - you may want more complex logic)
    const isWeekend = checkInDate.getDay() === 5 || checkInDate.getDay() === 6;
    const pricePerNight = isWeekend ? property.priceFromWeekend : property.priceFromMidweek;
    const totalPrice = pricePerNight * nights;
    const depositAmount = totalPrice * 0.3; // 30% deposit
    const balanceAmount = totalPrice - depositAmount;

    // Create booking record
    const [newBooking] = await db.insert(bookings).values({
      propertyId: parseInt(property_id),
      propertyName: property.title,
      propertyLocation: property.location,
      guestName: session.user.name || 'Guest',
      guestEmail: session.user.email || '',
      guestPhone: '', // Will be collected later if needed
      checkInDate: check_in,
      checkOutDate: check_out,
      numberOfGuests: guests,
      bookingStatus: 'pending',
      totalPrice: totalPrice,
      depositAmount: depositAmount,
      balanceAmount: balanceAmount,
      depositPaid: 0,
      balancePaid: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).returning();

    console.log(`✅ Booking quote created: ${newBooking.id} for ${property.title}`);

    return NextResponse.json({
      success: true,
      data: {
        booking_id: newBooking.id,
        property_name: property.title,
        check_in: check_in,
        check_out: check_out,
        nights: nights,
        guests: guests,
        total_price: totalPrice,
        deposit_amount: depositAmount,
        balance_amount: balanceAmount,
      },
    });

  } catch (error: any) {
    console.error('Booking Quote Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create booking quote' },
      { status: 500 }
    );
  }
}
