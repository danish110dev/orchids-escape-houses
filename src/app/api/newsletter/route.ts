import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Store email in your database or email marketing service
    // For now, just log it
    console.log("Newsletter subscription:", email);
    
    // In production, you would:
    // 1. Store in database
    // 2. Or send to email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    // Example with database (uncomment when ready):
    // await db.insert(newsletterSubscriptions).values({
    //   email,
    //   subscribedAt: new Date(),
    //   source: 'homepage'
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
