import { NextRequest, NextResponse } from 'next/server';
import { getClickStats } from '@/lib/tracking';

// Simple API key for basic protection (in production, use proper authentication)
const API_KEY = process.env.TRACKING_API_KEY || 'demo-api-key';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${API_KEY}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const stats = await getClickStats();
  
  return NextResponse.json(stats);
}