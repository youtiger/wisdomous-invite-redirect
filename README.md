# Wisdomous Invite Redirect

A Next.js application that handles invite link tracking and redirects for Wisdomous demo.

## Features

- Accepts invite links with format: `/invite?key=<unique-key>`
- Tracks clicks using Vercel KV (Redis) and Vercel Analytics
- Sends real-time email notifications via Resend when links are clicked
- Redirects users to configured demo URL
- Provides API endpoint for viewing tracking statistics

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

- `REDIRECT_URL`: Where to redirect users after tracking (default: https://demo.wisdomous.io)
- `TRACKING_API_KEY`: API key for accessing tracking stats endpoint
- `RESEND_API_KEY`: Your Resend API key for sending email notifications
- `NOTIFICATION_EMAIL`: Email address to receive click notifications

### 3. Vercel KV Setup

When deploying to Vercel:

1. Go to your project dashboard
2. Navigate to Storage tab
3. Create a new KV database
4. Connect it to your project (this automatically sets the KV environment variables)

### 4. Development

```bash
npm run dev
```

Visit http://localhost:3000

## Usage

### Invite Links

Share invite links in this format:
```
https://your-domain.vercel.app/invite?key=a6cfd525-c625-4caf-b6a1-1097f933f0bb
```

### Tracking API

View tracking statistics:

```bash
curl -H "Authorization: Bearer your-api-key" https://your-domain.vercel.app/api/tracking
```

Response:
```json
{
  "totalClicks": 42,
  "uniqueKeys": 12,
  "last24Hours": 18,
  "clicks": [
    {
      "key": "a6cfd525-c625-4caf-b6a1-1097f933f0bb",
      "timestamp": "2024-01-15T10:30:00Z",
      "userAgent": "Mozilla/5.0...",
      "ip": "192.168.1.1",
      "referer": "https://example.com"
    }
  ]
}
```

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/wisdomous-invite-redirect)

1. Click the deploy button
2. Configure environment variables
3. Connect Vercel KV database
4. Deploy

### Post-Deployment

1. Set up your subdomain to point to this Vercel app
2. Test with a sample invite link
3. Monitor analytics in Vercel dashboard

## Analytics & Notifications

The app tracks:
- Click events in Vercel Analytics (as `invite_click` events)
- Detailed click data in Vercel KV
- Request logs in Vercel Functions logs

Email notifications include:
- Invite key clicked
- Timestamp of click
- User's IP address
- Referrer URL
- User agent information

## Development Notes

- Tracking data is stored in Vercel KV with automatic cleanup (keeps last 1000 clicks)
- The redirect is performed server-side for better tracking accuracy
- All tracking is non-blocking to ensure fast redirects