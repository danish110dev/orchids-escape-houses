import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (use Redis in production)
const submissions = new Map<string, { count: number; timestamp: number; emails: Set<string> }>();

// Expanded list of disposable email domains
const disposableEmailDomains = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'maildrop.cc', 'yopmail.com', 'temp-mail.org',
  'trashmail.com', 'getnada.com', 'fakeinbox.com', 'sharklasers.com',
  'temp-mail.io', 'mintemail.com', 'emailondeck.com', 'tempinbox.com',
  'discard.email', 'spamgourmet.com', 'mailnesia.com', 'mytrashmail.com',
  'mohmal.com', 'guerrillamailblock.com', 'tmpeml.info', 'cuvox.de',
  'disposableemailaddresses.com', 'emailtemporario.com.br', 'anonymbox.com',
  'burnermail.io', 'getairmail.com', 'mailsac.com', 'armyspy.com',
  'cuvox.de', 'dayrep.com', 'einrot.com', 'fleckens.hu', 'gustr.com',
  'jourrapide.com', 'rhyta.com', 'superrito.com', 'teleworm.us'
];

// Suspicious email patterns
const suspiciousPatterns = [
  /^[a-z]{20,}@/i, // Very long random letters
  /^\d{10,}@/, // Too many numbers at start
  /^[a-z0-9]{30,}@/i, // Extremely long alphanumeric
  /test\d+@/i, // test1@, test123@
  /spam@/i, // Contains 'spam'
  /noreply@/i, // noreply addresses
  /^admin@/i, // admin addresses
  /^info@/i, // info addresses
  /^[a-z]\d+[a-z]\d+@/i, // Alternating letters/numbers pattern
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

function isSuspiciousEmail(email: string): boolean {
  return suspiciousPatterns.some(pattern => pattern.test(email));
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, honeypot, timestamp, challenge } = body;

    // 1. HONEYPOT CHECK - Bot trap
    if (honeypot) {
      console.log("Spam detected: Honeypot filled");
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // 2. JAVASCRIPT CHALLENGE - Verify client-side calculation
    const expectedChallenge = Math.floor(Date.now() / 10000); // Changes every 10 seconds
    if (!challenge || Math.abs(parseInt(challenge) - expectedChallenge) > 2) {
      console.log("Spam detected: Failed JavaScript challenge");
      return NextResponse.json(
        { error: "Security verification failed" },
        { status: 400 }
      );
    }

    // 3. VALIDATE EMAIL
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Email must be lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 4. CHECK DISPOSABLE EMAIL
    if (isDisposableEmail(normalizedEmail)) {
      console.log("Spam detected: Disposable email -", normalizedEmail);
      return NextResponse.json(
        { error: "Please use a permanent email address" },
        { status: 400 }
      );
    }

    // 5. CHECK SUSPICIOUS PATTERNS
    if (isSuspiciousEmail(normalizedEmail)) {
      console.log("Spam detected: Suspicious pattern -", normalizedEmail);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 6. TIME-BASED CHECK - Form filled too quickly (increased to 5 seconds)
    if (timestamp) {
      const submitTime = Date.now();
      const formLoadTime = parseInt(timestamp);
      const timeDiff = submitTime - formLoadTime;
      
      // If form submitted in less than 5 seconds, likely a bot
      if (timeDiff < 5000) {
        console.log("Spam detected: Form submitted too quickly");
        return NextResponse.json(
          { error: "Please take your time filling the form" },
          { status: 400 }
        );
      }

      // Also check if form was open for suspiciously long (> 30 minutes)
      if (timeDiff > 1800000) {
        console.log("Spam detected: Form open too long");
        return NextResponse.json(
          { error: "Form expired. Please refresh and try again." },
          { status: 400 }
        );
      }
    }

    // 7. RATE LIMITING - IP-based (reduced to 2 per hour)
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
    if (ipData.emails.has(normalizedEmail)) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    // Allow max 2 submissions per hour per IP (reduced from 3)
    if (ipData.count >= 2) {
      console.log("Spam detected: Rate limit exceeded for IP", clientIP);
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Update rate limiting data
    ipData.count += 1;
    ipData.timestamp = now;
    ipData.emails.add(normalizedEmail);
    submissions.set(clientIP, ipData);

    // 8. EMAIL LENGTH CHECK
    if (normalizedEmail.length > 100 || normalizedEmail.length < 5) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 9. DOMAIN VALIDATION - Must have valid TLD
    const domain = normalizedEmail.split('@')[1];
    if (!domain || !domain.includes('.') || domain.endsWith('.')) {
      return NextResponse.json(
        { error: "Invalid email domain" },
        { status: 400 }
      );
    }

    // TODO: Store email in your database or email marketing service
    console.log("✅ Valid newsletter subscription:", normalizedEmail);
    
    // In production, you would:
    // 1. Store in database
    // 2. Or send to email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send confirmation email
    
    // Example with database (uncomment when ready):
    // await db.insert(newsletterSubscriptions).values({
    //   email: normalizedEmail,
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