import { kv } from '@vercel/kv';

interface ClickData {
  key: string;
  timestamp: string;
  userAgent: string | null;
  ip: string | null;
  referer: string | null;
}

const CLICK_HISTORY_KEY = 'invite:clicks';
const CLICK_COUNT_KEY = 'invite:total_clicks';
const UNIQUE_KEYS_SET = 'invite:unique_keys';

export async function trackClick(data: ClickData): Promise<void> {
  try {
    // Store in KV with timestamp as score for sorted set
    const timestamp = Date.now();
    
    // Add to click history (sorted set)
    await kv.zadd(CLICK_HISTORY_KEY, {
      score: timestamp,
      member: JSON.stringify(data)
    });
    
    // Keep only last 1000 clicks
    const count = await kv.zcount(CLICK_HISTORY_KEY, '-inf', '+inf');
    if (count > 1000) {
      await kv.zremrangebyrank(CLICK_HISTORY_KEY, 0, count - 1001);
    }
    
    // Increment total click counter
    await kv.incr(CLICK_COUNT_KEY);
    
    // Track unique keys
    await kv.sadd(UNIQUE_KEYS_SET, data.key);
    
  } catch (error) {
    console.error('Failed to track click in KV:', error);
    // Fallback: just log the error and continue
  }
}

export async function getClickHistory(): Promise<ClickData[]> {
  try {
    const clicks = await kv.zrange(CLICK_HISTORY_KEY, 0, -1, { rev: true });
    return clicks.map(click => JSON.parse(click as string));
  } catch (error) {
    console.error('Failed to get click history from KV:', error);
    return [];
  }
}

export async function getClickStats() {
  try {
    const [totalClicks, uniqueKeys, clicks] = await Promise.all([
      kv.get<number>(CLICK_COUNT_KEY) || 0,
      kv.scard(UNIQUE_KEYS_SET),
      getClickHistory()
    ]);
    
    // Calculate last 24 hours
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const last24Hours = clicks.filter(click => {
      const clickTime = new Date(click.timestamp).getTime();
      return clickTime > dayAgo;
    }).length;

    return {
      totalClicks,
      uniqueKeys,
      last24Hours,
      clicks: clicks.slice(0, 100) // Return only last 100 clicks
    };
  } catch (error) {
    console.error('Failed to get click stats from KV:', error);
    return {
      totalClicks: 0,
      uniqueKeys: 0,
      last24Hours: 0,
      clicks: []
    };
  }
}