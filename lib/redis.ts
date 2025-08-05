import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

function getRedisClient(): Redis | null {
  if (!redis) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.warn('Upstash Redis not configured - invite validation disabled');
      return null;
    }
    
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  
  return redis;
}

export async function validateInviteKey(key: string): Promise<boolean> {
  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      // If Redis is not configured, allow all keys (for development)
      console.warn('Redis not configured - allowing all invite keys');
      return true;
    }
    // Check if the key exists in Redis
    const exists = await redisClient.exists(`invite:${key}`);
    return exists === 1;
  } catch (error) {
    console.error('Error validating invite key:', error);
    return false;
  }
}

export interface InviteData {
  email?: string;
  password?: string;
  name?: string;
  company?: string;
  createdAt?: string;
}

export async function getInviteData(key: string): Promise<InviteData | null> {
  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      return null;
    }
    const data = await redisClient.get(`invite:${key}`);
    return data as InviteData | null;
  } catch (error) {
    console.error('Error getting invite data:', error);
    return null;
  }
}