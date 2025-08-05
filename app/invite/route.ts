import { NextRequest, NextResponse } from 'next/server';
import { trackClick } from '@/lib/tracking';
import { track } from '@vercel/analytics/server';
import { sendInviteClickNotification } from '@/lib/email';

// Redirect URL - can be configured via environment variable
const REDIRECT_URL = process.env.REDIRECT_URL || 'https://demo.wisdomous.io';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get('key');
  
  if (!key) {
    return NextResponse.json(
      { error: 'Missing invite key' },
      { status: 400 }
    );
  }

  // Get tracking data
  const trackingData = {
    key,
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    referer: request.headers.get('referer')
  };

  // Track with Vercel KV (non-blocking)
  trackClick(trackingData).catch(console.error);

  // Track with Vercel Analytics (non-blocking)
  track('invite_click', {
    key,
    timestamp: trackingData.timestamp
  }).catch(console.error);

  // Send email notification (non-blocking)
  sendInviteClickNotification(trackingData).catch(console.error);

  // Log for debugging
  console.log(`Invite link clicked:`, trackingData);

  // TODO: In production, you might want to:
  // 1. Validate the key against a database
  // 2. Determine redirect URL based on the key or user segment
  // 3. Track conversion after redirect

  // Redirect to the target URL
  return NextResponse.redirect(new URL(REDIRECT_URL));
}