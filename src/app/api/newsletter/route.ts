import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (use Redis in production)
const submissions = new Map<string, { count: number; timestamp: number; emails: Set<string> }>();
const ipBlacklist = new Set<string>(); // IPs that failed too many times

// MASSIVELY expanded disposable email list (100+ domains)
const disposableEmailDomains = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'maildrop.cc', 'yopmail.com', 'temp-mail.org',
  'trashmail.com', 'getnada.com', 'fakeinbox.com', 'sharklasers.com',
  'temp-mail.io', 'mintemail.com', 'emailondeck.com', 'tempinbox.com',
  'discard.email', 'spamgourmet.com', 'mailnesia.com', 'mytrashmail.com',
  'mohmal.com', 'guerrillamailblock.com', 'tmpeml.info', 'cuvox.de',
  'disposableemailaddresses.com', 'emailtemporario.com.br', 'anonymbox.com',
  'burnermail.io', 'getairmail.com', 'mailsac.com', 'armyspy.com',
  'dayrep.com', 'einrot.com', 'fleckens.hu', 'gustr.com',
  'jourrapide.com', 'rhyta.com', 'superrito.com', 'teleworm.us',
  // Additional 60+ domains
  'inbox.com', 'dropmail.me', 'spambox.us', 'fakemail.net', 'throwawaymail.com',
  '33mail.com', 'guerrillamail.biz', 'guerrillamail.de', 'spam4.me', 'grr.la',
  'guerrillamail.net', 'guerrillamail.org', 'guerrillamailblock.com', 'pokemail.net',
  'spam.la', 'tempail.com', 'tempemail.net', '10minutemail.net', '20minutemail.com',
  'emailsensei.com', 'trashcanmail.com', 'emailgo.de', 'kickassideas.com',
  'getonemail.com', 'mytempemail.com', 'mailcatch.com', 'emailias.com',
  'mailexpire.com', 'rcpt.at', 'trashmail.net', 'wegwerfmail.de', 'trashmail.ws',
  'mailforspam.com', 'fudgerub.com', 'lookugly.com', 'spamavert.com',
  'spamfree24.org', 'spamgourmet.org', 'kasmail.com', 'spamhereplease.com',
  'bccto.me', 'mailhazard.com', 'sogetthis.com', 'spambox.info', 'tempemail.biz',
  'jetable.org', 'link2mail.net', 'meltmail.com', 'mt2014.com', 'trbvm.com',
  'digitalsanctuary.com', 'brefmail.com', 'ovpn.to', 'emltmp.com', 'incognitomail.org',
  'mailtemp.info', 'spamcon.org', 'luxusmail.org', 'zippymail.info', 'iroid.com',
  'spamthisplease.com', 'mailimate.com', 'guerrillamail.info', 'poofy.org',
  'mfsa.ru', 'notsharingmy.info', 'vomoto.com', 'spamoff.de', 'spam.su'
];

// Enhanced suspicious patterns - MORE AGGRESSIVE
const suspiciousPatterns = [
  /^[a-z]{15,}@/i, // Long random letters (reduced from 20 to 15)
  /^\d{8,}@/, // Many numbers (reduced from 10 to 8)
  /^[a-z0-9]{25,}@/i, // Long alphanumeric (reduced from 30 to 25)
  /test\d+@/i, // test1@, test123@
  /spam@/i, // Contains 'spam'
  /noreply@/i, // noreply addresses
  /^admin@/i, // admin addresses
  /^info@/i, // info addresses  
  /^[a-z]\d+[a-z]\d+@/i, // Alternating letters/numbers
  /^support@/i, // support addresses
  /^sales@/i, // sales addresses
  /^contact@/i, // contact addresses
  /^\d+@/, // Starts with numbers
  /^[a-z]{1,2}@/i, // Very short local part (1-2 chars)
  /^[^@]+\d{5,}@/, // Ends with many numbers before @
  /^[a-z0-9._-]{50,}@/i, // Extremely long local part
  /\.ru$/, // Russian domains (often spam)
  /\.tk$/, // Tokelau domains (often spam)
  /\.ga$/, // Gabon domains (often spam)
  /\.ml$/, // Mali domains (often spam)
  /\.cf$/, // Central African Republic (often spam)
  /\.gq$/, // Equatorial Guinea (often spam)
  /\+.*@/, // Plus addressing (often used by spammers)
  /^[0-9a-f]{32}@/i, // MD5-like hash
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@/i, // UUID format
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
  if (!domain) return true;
  return disposableEmailDomains.some(disposable => domain === disposable || domain.endsWith('.' + disposable));
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
    const { email, honeypot, timestamp, challenge, userInteraction } = body;

    const clientIP = getClientIP(request);

    // 0. CHECK IP BLACKLIST
    if (ipBlacklist.has(clientIP)) {
      console.log("Spam detected: Blacklisted IP -", clientIP);
      return NextResponse.json(
        { error: "Too many failed attempts" },
        { status: 403 }
      );
    }

    // 1. HONEYPOT CHECK
    if (honeypot) {
      console.log("Spam detected: Honeypot filled");
      ipBlacklist.add(clientIP); // Blacklist this IP
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // 2. USER INTERACTION CHECK - Must have clicked/typed
    if (!userInteraction || !userInteraction.clicks || !userInteraction.keystrokes) {
      console.log("Spam detected: No user interaction");
      return NextResponse.json(
        { error: "Please interact with the form" },
        { status: 400 }
      );
    }

    // Verify reasonable interaction (at least 2 clicks and some typing)
    if (userInteraction.clicks < 2 || userInteraction.keystrokes < 5) {
      console.log("Spam detected: Insufficient user interaction");
      return NextResponse.json(
        { error: "Please complete the form properly" },
        { status: 400 }
      );
    }

    // 3. JAVASCRIPT CHALLENGE
    const expectedChallenge = Math.floor(Date.now() / 10000);
    if (!challenge || Math.abs(parseInt(challenge) - expectedChallenge) > 2) {
      console.log("Spam detected: Failed JavaScript challenge");
      return NextResponse.json(
        { error: "Security verification failed" },
        { status: 400 }
      );
    }

    // 4. VALIDATE EMAIL
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 5. CHECK DISPOSABLE EMAIL
    if (isDisposableEmail(normalizedEmail)) {
      console.log("Spam detected: Disposable email -", normalizedEmail);
      return NextResponse.json(
        { error: "Please use a permanent email address" },
        { status: 400 }
      );
    }

    // 6. CHECK SUSPICIOUS PATTERNS
    if (isSuspiciousEmail(normalizedEmail)) {
      console.log("Spam detected: Suspicious pattern -", normalizedEmail);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 7. TIME-BASED CHECK (increased to 8 seconds minimum)
    if (timestamp) {
      const submitTime = Date.now();
      const formLoadTime = parseInt(timestamp);
      const timeDiff = submitTime - formLoadTime;
      
      // Must take at least 8 seconds
      if (timeDiff < 8000) {
        console.log("Spam detected: Form submitted too quickly -", timeDiff, "ms");
        return NextResponse.json(
          { error: "Please take your time filling the form" },
          { status: 400 }
        );
      }

      // Max 20 minutes (reduced from 30)
      if (timeDiff > 1200000) {
        console.log("Spam detected: Form open too long");
        return NextResponse.json(
          { error: "Form expired. Please refresh and try again." },
          { status: 400 }
        );
      }
    }

    // 8. RATE LIMITING - REDUCED TO 1 PER HOUR
    cleanupOldSubmissions();
    const now = Date.now();
    
    const ipData = submissions.get(clientIP) || { 
      count: 0, 
      timestamp: now, 
      emails: new Set() 
    };

    // Check if email already subscribed from this IP
    if (ipData.emails.has(normalizedEmail)) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    // ONLY 1 SUBMISSION PER HOUR PER IP
    if (ipData.count >= 1) {
      console.log("Spam detected: Rate limit exceeded for IP", clientIP);
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again in 1 hour." },
        { status: 429 }
      );
    }

    // Update rate limiting
    ipData.count += 1;
    ipData.timestamp = now;
    ipData.emails.add(normalizedEmail);
    submissions.set(clientIP, ipData);

    // 9. EMAIL LENGTH CHECK (stricter)
    if (normalizedEmail.length > 80 || normalizedEmail.length < 6) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 10. DOMAIN VALIDATION
    const domain = normalizedEmail.split('@')[1];
    if (!domain || !domain.includes('.') || domain.endsWith('.') || domain.startsWith('.')) {
      return NextResponse.json(
        { error: "Invalid email domain" },
        { status: 400 }
      );
    }

    // 11. CHECK FOR COMMON LEGITIMATE DOMAINS (whitelist approach)
    const trustedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'protonmail.com', 'aol.com', 'live.com', 'msn.com', 'me.com'];
    const isTrustedDomain = trustedDomains.some(trusted => domain === trusted || domain.endsWith('.' + trusted));
    
    // If not a trusted domain, apply extra scrutiny
    if (!isTrustedDomain) {
      // Check if domain has valid TLD (at least 2 chars)
      const tld = domain.split('.').pop();
      if (!tld || tld.length < 2 || tld.length > 6) {
        console.log("Spam detected: Invalid TLD -", domain);
        return NextResponse.json(
          { error: "Invalid email domain" },
          { status: 400 }
        );
      }
    }

    console.log("✅ Valid newsletter subscription:", normalizedEmail, "from IP:", clientIP);
    
    // TODO: Store in database
    // await db.insert(newsletterSubscriptions).values({
    //   email: normalizedEmail,
    //   subscribedAt: new Date(),
    //   source: 'homepage',
    //   ipAddress: clientIP,
    //   userAgent: request.headers.get('user-agent')
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