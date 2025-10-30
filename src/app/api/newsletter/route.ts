import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (use Redis in production)
const submissions = new Map<string, { count: number; timestamp: number; emails: Set<string> }>();

// List of common disposable email domains
const disposableEmailDomains = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'maildrop.cc', 'yopmail.com', 'temp-mail.org',
  'trashmail.com', 'getnada.com', 'fakeinbox.com', 'sharklasers.com'
];

function cleanupOldSubmissions() {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  
  for (const [key, data] of submissions.entries()) {
    if (now - data.timestamp > oneHour) {
      submissions.delete(key);
    }
  }
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableEmailDomains.some(disposable => domain === disposable);
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, honeypot, timestamp } = body;

    // 1. HONEYPOT CHECK - Bot trap
    if (honeypot) {
      console.log("Spam detected: Honeypot filled");
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // 2. VALIDATE EMAIL
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

    // 3. CHECK DISPOSABLE EMAIL
    if (isDisposableEmail(email)) {
      console.log("Spam detected: Disposable email -", email);
      return NextResponse.json(
        { error: "Please use a permanent email address" },
        { status: 400 }
      );
    }

    // 4. TIME-BASED CHECK - Form filled too quickly
    if (timestamp) {
      const submitTime = Date.now();
      const formLoadTime = parseInt(timestamp);
      const timeDiff = submitTime - formLoadTime;
      
      // If form submitted in less than 3 seconds, likely a bot
      if (timeDiff < 3000) {
        console.log("Spam detected: Form submitted too quickly");
        return NextResponse.json(
          { error: "Please take your time filling the form" },
          { status: 400 }
        );
      }
    }

    // 5. RATE LIMITING - IP-based
    cleanupOldSubmissions();
    const clientIP = getClientIP(request);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    const ipData = submissions.get(clientIP) || { 
      count: 0, 
      timestamp: now, 
      emails: new Set() 
    };

    // Check if this email was already submitted from this IP recently
    if (ipData.emails.has(email)) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    // Allow max 3 submissions per hour per IP
    if (ipData.count >= 3) {
      console.log("Spam detected: Rate limit exceeded for IP", clientIP);
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Update rate limiting data
    ipData.count += 1;
    ipData.timestamp = now;
    ipData.emails.add(email);
    submissions.set(clientIP, ipData);

    // 6. EMAIL LENGTH CHECK
    if (email.length > 100) {
      return NextResponse.json(
        { error: "Email address too long" },
        { status: 400 }
      );
    }

    // TODO: Store email in your database or email marketing service
    console.log("✅ Valid newsletter subscription:", email);
    
    // In production, you would:
    // 1. Store in database
    // 2. Or send to email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    // Example with database (uncomment when ready):
    // await db.insert(newsletterSubscriptions).values({
    //   email,
    //   subscribedAt: new Date(),
    //   source: 'homepage',
    //   ipAddress: clientIP
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