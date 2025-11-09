import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (use Redis in production)
const submissions = new Map<string, { count: number; timestamp: number; emails: Set<string> }>();
const ipBlacklist = new Set<string>(); // IPs that failed too many times
const emailBlacklist = new Set<string>(); // Emails that failed verification

// EXPANDED disposable email list (200+ domains)
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
  'mfsa.ru', 'notsharingmy.info', 'vomoto.com', 'spamoff.de', 'spam.su',
  // Additional 100+ more aggressive domains
  'mailcatch.com', 'mailnull.com', 'mailfreeonline.com', 'mailmetrash.com',
  'mytemp.email', 'one-time.email', 'shieldedmail.com', 'simpleitsecurity.com',
  'spammotel.com', 'tmails.net', 'instant-mail.de', 'recipeforfailure.com',
  'privacy.net', 'maileater.com', 'mailmetrash.com', 'mailshell.com',
  'mailzi.ru', 'messageden.net', 'netmails.net', 'nobulk.com', 'nospamfor.us',
  'odnorazovoe.ru', 'oneoffemail.com', 'onewaymail.com', 'online.ms', 'oopi.org',
  'opayq.com', 'ordinaryamerican.net', 'otherinbox.com', 'ourklips.com',
  'outlawspam.com', 'ovpn.to', 'owlpic.com', 'pancakemail.com', 'paplease.com',
  'petrzilka.net', 'pisze.com', 'pjjkp.com', 'plexolan.de', 'politikerclub.de',
  'postacin.com', 'posta.store', 'privacy-mail.top', 'privacy.net', 'privymail.de',
  'proxymail.eu', 'prtnx.com', 'purcell.email', 'put2.net', 'putthisinyourspamdatabase.com',
  'qq.com', 'quickinbox.com', 'quickmail.nl', 'rainmail.biz', 'rcpt.at',
  'recode.me', 'reconmail.com', 'recursor.net', 'recyclemail.dk', 'regbypass.com',
  'rejectmail.com', 'rtrtr.com', 's0ny.net', 'safe-mail.net', 'safersignup.de',
  'safetymail.info', 'safetypost.de', 'sandelf.de', 'saynotospams.com',
  'self-addressed.com', 'sendspamhere.com', 'sharklasers.com', 'shiftmail.com',
  'shitmail.me', 'shitware.nl', 'shmeriously.com', 'shortmail.net', 'sibmail.com',
  'sinda.club', 'singlespride.com', 'sinnlos-mail.de', 'slapsfromlastnight.com',
  'slaskpost.se', 'slippery.email', 'smashmail.de', 'smellfear.com',
  'snakemail.com', 'sneakemail.com', 'sneakmail.de', 'snkmail.com',
  'sofort-mail.de', 'sogetthis.com', 'soodonims.com', 'spam4.me', 'spamail.de',
  'spamarrest.com', 'spambob.com', 'spambob.net', 'spambob.org', 'spambog.com',
  'spambog.de', 'spambog.ru', 'spambox.info', 'spambox.irishspringrealty.com',
  'spambox.us', 'spamcannon.com', 'spamcannon.net', 'spamcero.com',
  'spamcon.org', 'spamcorptastic.com', 'spamcowboy.com', 'spamcowboy.net',
  'spamcowboy.org', 'spamday.com', 'spamex.com', 'spamfree.eu', 'spamfree24.com',
  'spamfree24.de', 'spamfree24.eu', 'spamfree24.info', 'spamfree24.net',
  'spamfree24.org', 'spamgoes.in', 'spamgourmet.com', 'spamgourmet.net',
  'spamgourmet.org', 'spamherelots.com', 'spamhereplease.com', 'spamhole.com',
  'spamify.com', 'spaminator.de', 'spamkill.info', 'spaml.com', 'spaml.de',
  'spammotel.com', 'spamobox.com', 'spamoff.de', 'spamslicer.com', 'spamspot.com',
  'spamstack.net', 'spamthis.co.uk', 'spamtroll.net', 'speed.1s.fr', 'spoofmail.de'
];

// MASSIVELY expanded suspicious patterns
const suspiciousPatterns = [
  /^[a-z]{12,}@/i, // Long random letters (LOWERED from 15)
  /^\d{6,}@/, // Many numbers (LOWERED from 8)
  /^[a-z0-9]{20,}@/i, // Long alphanumeric (LOWERED from 25)
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
  /^[^@]+\d{4,}@/, // Ends with many numbers before @ (LOWERED)
  /^[a-z0-9._-]{45,}@/i, // Extremely long local part (LOWERED)
  /\.ru$/, // Russian domains (often spam)
  /\.tk$/, // Tokelau domains (often spam)
  /\.ga$/, // Gabon domains (often spam)
  /\.ml$/, // Mali domains (often spam)
  /\.cf$/, // Central African Republic (often spam)
  /\.gq$/, // Equatorial Guinea (often spam)
  /\+.*@/, // Plus addressing (often used by spammers)
  /^[0-9a-f]{32}@/i, // MD5-like hash
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@/i, // UUID format
  // NEW PATTERNS
  /^[a-z]{5}\d{5,}@/i, // 5 letters followed by 5+ numbers
  /^user\d+@/i, // user123@
  /^temp@/i, // temp addresses
  /^mail@/i, // generic mail addresses
  /^hello@/i, // hello addresses
  /^webmaster@/i, // webmaster addresses
  /^postmaster@/i, // postmaster addresses
  /^no-reply@/i, // no-reply addresses
  /^donotreply@/i, // donotreply addresses
  /^[a-z0-9]{8}@/i, // Exactly 8 random chars (common bot pattern)
  /^[a-z0-9]{16}@/i, // Exactly 16 random chars
  /^.{60,}@/, // Extremely long email (60+ chars)
  /(\w)\1{3,}/, // Same character repeated 4+ times (aaaa)
  /^[^aeiou]{8,}@/i, // 8+ consonants in a row (no vowels)
  /^[aeiou]{6,}@/i, // 6+ vowels in a row
  /\d{10,}/, // 10+ digits anywhere
  /^[^@]*([._-]){3,}[^@]*@/, // 3+ special chars (dots/dashes/underscores)
];

function cleanupOldSubmissions() {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000; // Changed to 24 hours
  
  for (const [key, data] of submissions.entries()) {
    if (now - data.timestamp > oneDay) {
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

// NEW: Check if email has reasonable entropy (not too random, not too simple)
function hasReasonableEntropy(email: string): boolean {
  const localPart = email.split('@')[0];
  const uniqueChars = new Set(localPart.toLowerCase()).size;
  const length = localPart.length;
  
  // Too simple (like "aaa" or "111")
  if (uniqueChars < 3) return false;
  
  // Too random (almost all unique characters)
  if (uniqueChars / length > 0.9 && length > 15) return false;
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, honeypot, timestamp, challenge, userInteraction } = body;

    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';

    // 0. CHECK IP BLACKLIST
    if (ipBlacklist.has(clientIP)) {
      console.log("🚫 Spam: Blacklisted IP -", clientIP);
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    // 1. HONEYPOT CHECK
    if (honeypot) {
      console.log("🚫 Spam: Honeypot filled");
      ipBlacklist.add(clientIP);
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // 2. USER AGENT CHECK
    if (!userAgent || userAgent.length < 20) {
      console.log("🚫 Spam: Suspicious user agent");
      return NextResponse.json(
        { error: "Invalid browser" },
        { status: 400 }
      );
    }

    // 3. USER INTERACTION CHECK - STRICTER (must click 3+ times, type 10+ chars)
    if (!userInteraction || !userInteraction.clicks || !userInteraction.keystrokes) {
      console.log("🚫 Spam: No user interaction");
      return NextResponse.json(
        { error: "Please interact with the form" },
        { status: 400 }
      );
    }

    if (userInteraction.clicks < 3 || userInteraction.keystrokes < 10) {
      console.log("🚫 Spam: Insufficient interaction -", userInteraction);
      return NextResponse.json(
        { error: "Please complete the form properly" },
        { status: 400 }
      );
    }

    // 4. JAVASCRIPT CHALLENGE
    const expectedChallenge = Math.floor(Date.now() / 10000);
    if (!challenge || Math.abs(parseInt(challenge) - expectedChallenge) > 2) {
      console.log("🚫 Spam: Failed JS challenge");
      return NextResponse.json(
        { error: "Security verification failed" },
        { status: 400 }
      );
    }

    // 5. VALIDATE EMAIL
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

    // 6. CHECK EMAIL BLACKLIST
    if (emailBlacklist.has(normalizedEmail)) {
      console.log("🚫 Spam: Blacklisted email -", normalizedEmail);
      return NextResponse.json(
        { error: "This email cannot be used" },
        { status: 400 }
      );
    }

    // 7. CHECK DISPOSABLE EMAIL
    if (isDisposableEmail(normalizedEmail)) {
      console.log("🚫 Spam: Disposable email -", normalizedEmail);
      emailBlacklist.add(normalizedEmail);
      return NextResponse.json(
        { error: "Please use a permanent email address" },
        { status: 400 }
      );
    }

    // 8. CHECK SUSPICIOUS PATTERNS
    if (isSuspiciousEmail(normalizedEmail)) {
      console.log("🚫 Spam: Suspicious pattern -", normalizedEmail);
      emailBlacklist.add(normalizedEmail);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 9. CHECK EMAIL ENTROPY
    if (!hasReasonableEntropy(normalizedEmail)) {
      console.log("🚫 Spam: Unreasonable entropy -", normalizedEmail);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 10. TIME-BASED CHECK (INCREASED to 12 seconds minimum)
    if (timestamp) {
      const submitTime = Date.now();
      const formLoadTime = parseInt(timestamp);
      const timeDiff = submitTime - formLoadTime;
      
      // Must take at least 12 seconds (INCREASED)
      if (timeDiff < 12000) {
        console.log("🚫 Spam: Too quick -", timeDiff, "ms");
        return NextResponse.json(
          { error: "Please take your time filling the form" },
          { status: 400 }
        );
      }

      // Max 15 minutes (REDUCED from 20)
      if (timeDiff > 900000) {
        console.log("🚫 Spam: Form open too long");
        return NextResponse.json(
          { error: "Form expired. Please refresh and try again." },
          { status: 400 }
        );
      }
    }

    // 11. RATE LIMITING - ONLY 1 SUBMISSION PER DAY PER IP (INCREASED)
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

    // ONLY 1 SUBMISSION PER DAY PER IP (STRICTER)
    if (ipData.count >= 1) {
      const hoursSinceLastSubmit = (now - ipData.timestamp) / (1000 * 60 * 60);
      console.log("🚫 Spam: Rate limit -", clientIP, "- last submit", hoursSinceLastSubmit.toFixed(1), "hours ago");
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // Update rate limiting
    ipData.count += 1;
    ipData.timestamp = now;
    ipData.emails.add(normalizedEmail);
    submissions.set(clientIP, ipData);

    // 12. EMAIL LENGTH CHECK (stricter - LOWERED max)
    if (normalizedEmail.length > 60 || normalizedEmail.length < 6) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 13. DOMAIN VALIDATION (stricter)
    const domain = normalizedEmail.split('@')[1];
    if (!domain || !domain.includes('.') || domain.endsWith('.') || domain.startsWith('.')) {
      return NextResponse.json(
        { error: "Invalid email domain" },
        { status: 400 }
      );
    }

    // Check for suspicious TLD patterns
    const tld = domain.split('.').pop()?.toLowerCase();
    const suspiciousTLDs = ['tk', 'ml', 'ga', 'cf', 'gq', 'xyz', 'top', 'work', 'click', 'link', 'bid', 'date', 'review', 'trade', 'racing', 'faith', 'science', 'party'];
    if (tld && suspiciousTLDs.includes(tld)) {
      console.log("🚫 Spam: Suspicious TLD -", domain);
      return NextResponse.json(
        { error: "Email domain not allowed" },
        { status: 400 }
      );
    }

    // 14. CHECK FOR COMMON LEGITIMATE DOMAINS (whitelist approach)
    const trustedDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 
      'protonmail.com', 'aol.com', 'live.com', 'msn.com', 'me.com',
      'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'outlook.co.uk', 'hotmail.co.uk',
      'btinternet.com', 'googlemail.com', 'mail.com', 'gmx.com', 'yandex.com',
      'zoho.com', 'fastmail.com', 'tutanota.com'
    ];
    const isTrustedDomain = trustedDomains.some(trusted => domain === trusted || domain.endsWith('.' + trusted));
    
    // If not a trusted domain, apply EXTRA scrutiny
    if (!isTrustedDomain) {
      // Check if domain has valid TLD (at least 2 chars, max 6)
      if (!tld || tld.length < 2 || tld.length > 6) {
        console.log("🚫 Spam: Invalid TLD length -", domain);
        return NextResponse.json(
          { error: "Invalid email domain" },
          { status: 400 }
        );
      }

      // For non-trusted domains, require even MORE interaction
      if (userInteraction.clicks < 4 || userInteraction.keystrokes < 15) {
        console.log("🚫 Spam: Non-trusted domain needs more interaction");
        return NextResponse.json(
          { error: "Please complete the form" },
          { status: 400 }
        );
      }
    }

    console.log("✅ Valid subscription:", normalizedEmail, "from IP:", clientIP);
    
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