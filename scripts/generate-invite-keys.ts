import { Redis } from '@upstash/redis';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Demo users from CLAUDE.md
const demoUsers = [
  {
    name: 'Zeus (CEO)',
    email: 'zeus@olympus.divine',
    password: 'Demo2025!',
    company: 'Mount Olympus Digital Services'
  },
  {
    name: 'Athena (CTO)',
    email: 'athena@olympus.divine',
    password: 'Demo2025!',
    company: 'Mount Olympus Digital Services'
  },
  {
    name: 'Hermes (PM)',
    email: 'hermes@olympus.divine',
    password: 'Demo2025!',
    company: 'Mount Olympus Digital Services'
  },
  {
    name: 'Werner Steinbach (CEO)',
    email: 'werner.steinbach@steinbach-precision.de',
    password: 'Demo2025!',
    company: 'Steinbach Precision Systems GmbH'
  },
  {
    name: 'Franziska Chen-Mueller (Head of Digital Innovation)',
    email: 'franziska.chen-mueller@steinbach-precision.de',
    password: 'Demo2025!',
    company: 'Steinbach Precision Systems GmbH',
    fixedKey: 'a6cfd525-c625-4caf-b6a1-1097f933f0bb' // Use specific key for Franziska
  },
  {
    name: 'Demo User',
    email: 'demo@unified-dynamics.com',
    password: 'Demo2025!',
    company: 'Unified Dynamics Corporation'
  }
];

async function generateInviteKeys() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('Missing Upstash Redis environment variables');
    process.exit(1);
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://wisdomous-invite-redirect.vercel.app';
  const inviteLinks: string[] = [];

  console.log('Generating invite keys for demo users...\n');

  for (const user of demoUsers) {
    // Use fixed key if provided, otherwise generate a new one
    const inviteKey = (user as any).fixedKey || uuidv4();
    const inviteData = {
      email: user.email,
      password: user.password,
      name: user.name,
      company: user.company,
      createdAt: new Date().toISOString()
    };

    // Store in Redis with the invite: prefix
    await redis.set(`invite:${inviteKey}`, JSON.stringify(inviteData), {
      ex: 60 * 60 * 24 * 30 // Expire in 30 days
    });

    const inviteLink = `${baseUrl}/invite?key=${inviteKey}`;
    inviteLinks.push(`**${user.name}** (${user.company})\n- Email: ${user.email}\n- Password: ${user.password}\n- Link: ${inviteLink}\n`);

    console.log(`✅ Generated key for ${user.name}: ${inviteKey}`);
  }

  console.log('\n\n# Demo Links for Wisdomous\n');
  console.log('Here are the demo links for all demo users:\n');
  
  inviteLinks.forEach(link => console.log(link));

  console.log('\n## Direct Links (with auto-fill credentials)\n');
  console.log('These links will automatically redirect to demo.wisdomous.io with credentials as query parameters:\n');
  
  for (const link of inviteLinks) {
    console.log(link);
  }
}

// Run the script
generateInviteKeys().catch(console.error);