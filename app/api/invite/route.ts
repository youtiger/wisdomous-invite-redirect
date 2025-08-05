import { NextRequest, NextResponse } from 'next/server';
import { trackClick } from '@/lib/tracking';
import { track } from '@vercel/analytics/server';
import { sendInviteClickNotification } from '@/lib/email';
import { validateInviteKey, getInviteData } from '@/lib/redis';

// Redirect URL - can be configured via environment variable
const REDIRECT_URL = process.env.REDIRECT_URL || 'https://www.wisdomous.io';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get('key');
  
  if (!key) {
    return NextResponse.json(
      { error: 'Missing invite key' },
      { status: 400 }
    );
  }

  // Validate the invite key against Upstash Redis
  const isValid = await validateInviteKey(key);
  
  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid invite key' },
      { status: 403 }
    );
  }

  // Get invite data to potentially customize the redirect
  const inviteData = await getInviteData(key);

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
    isValid: true
  }).catch(console.error);

  // Send email notification (non-blocking)
  sendInviteClickNotification(trackingData).catch(console.error);

  // Log for debugging
  console.log(`Valid invite link clicked:`, trackingData);

  // Build redirect URL with optional query parameters from invite data
  const redirectUrl = new URL(REDIRECT_URL);
  
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