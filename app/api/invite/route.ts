import { NextRequest, NextResponse } from 'next/server';
import { trackClick } from '@/lib/tracking';
import { track } from '@vercel/analytics/server';
import { sendInviteClickNotification } from '@/lib/email';
import { validateInviteKey, getInviteData } from '@/lib/redis';

// Redirect URL - can be configured via environment variable
const REDIRECT_URL = process.env.REDIRECT_URL || 'https://www.wisdomous.io';

// Special Y Combinator key that always works
const YCOMBINATOR_KEY = 'a6cfd525-c625-4caf-b6a1-1097f933f0bb';
const YCOMBINATOR_DATA = {
  email: 'franziska.chen-mueller@steinbach-precision.de',
  password: 'Demo2025!',
  name: 'Franziska Chen-Mueller',
  company: 'Steinbach Precision Systems GmbH'
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get('key');
  
  if (!key) {
    return NextResponse.json(
      { error: 'Missing invite key' },
      { status: 400 }
    );
  }

  let isValid = false;
  let inviteData = null;

  // Special handling for Y Combinator key
  if (key === YCOMBINATOR_KEY) {
    isValid = true;
    inviteData = YCOMBINATOR_DATA;
    console.log('Y Combinator key detected - bypassing Redis validation');
  } else {
    // Validate other keys against Upstash Redis
    isValid = await validateInviteKey(key);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid invite key' },
        { status: 403 }
      );
    }

    // Get invite data from Redis
    inviteData = await getInviteData(key);
  }

  // Get tracking data
  const trackingData = {
    key,
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    referer: request.headers.get('referer'),
    inviteData
  };

  // Track with Vercel KV (non-blocking)
  trackClick(trackingData).catch(console.error);

  // Track with Vercel Analytics (non-blocking)
  track('invite_click', {
    key,
    timestamp: trackingData.timestamp,
    isValid: true,
    isYCombinator: key === YCOMBINATOR_KEY
  }).catch(console.error);

  // Send email notification (non-blocking)
  sendInviteClickNotification(trackingData).catch(console.error);

  // Log for debugging
  console.log(`Valid invite link clicked:`, trackingData);

  // Build redirect URL with optional query parameters from invite data
  const baseUrl = new URL(REDIRECT_URL);
  const redirectUrl = new URL('/demo-login', baseUrl.origin);
  
  // If invite data contains email and password, add them as query parameters
  if (inviteData && typeof inviteData === 'object') {
    if (inviteData.email) {
      redirectUrl.searchParams.set('email', inviteData.email);
    }
    if (inviteData.password) {
      redirectUrl.searchParams.set('password', inviteData.password);
    }
  }

  // Redirect to the target URL
  return NextResponse.redirect(redirectUrl);
}