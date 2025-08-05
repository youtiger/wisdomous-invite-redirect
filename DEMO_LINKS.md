# Demo Links for Wisdomous

Here are the demo links for all demo users. Each link will validate the invite key and redirect to https://demo.wisdomous.io with auto-login credentials.

## How to Generate Links

1. Set up your Upstash Redis credentials in `.env.local`
2. Run `npm run generate-keys` to generate and store invite keys
3. The script will output ready-to-use links for each demo user

## Demo Users

### Mount Olympus Digital Services

1. **Zeus (CEO)**
   - Email: zeus@olympus.divine
   - Password: Demo2025!
   - Link: Will be generated when you run `npm run generate-keys`

2. **Athena (CTO)**
   - Email: athena@olympus.divine
   - Password: Demo2025!
   - Link: Will be generated when you run `npm run generate-keys`

3. **Hermes (PM)**
   - Email: hermes@olympus.divine
   - Password: Demo2025!
   - Link: Will be generated when you run `npm run generate-keys`

### Steinbach Precision Systems GmbH

4. **Werner Steinbach (CEO)**
   - Email: werner.steinbach@steinbach-precision.de
   - Password: Demo2025!
   - Link: Will be generated when you run `npm run generate-keys`

5. **Franziska Chen-Mueller (Head of Digital Innovation)**
   - Email: franziska.chen-mueller@steinbach-precision.de
   - Password: Demo2025!
   - Link: Will be generated when you run `npm run generate-keys`

### Unified Dynamics Corporation

6. **Demo User**
   - Email: demo@unified-dynamics.com
   - Password: Demo2025!
   - Link: Will be generated when you run `npm run generate-keys`

## How It Works

1. User clicks the invite link
2. System validates the invite key against Upstash Redis
3. If valid, redirects to: `https://demo.wisdomous.io?email=<email>&password=<password>`
4. The demo app can read these query parameters for auto-login

## Testing

To test locally:
1. Run `npm run dev`
2. Generate keys with `npm run generate-keys`
3. Visit one of the generated links
4. Verify redirect to demo.wisdomous.io with credentials in URL

## Security Notes

- Invite keys expire after 30 days
- Each key is unique and can only be used by one person
- Keys are validated server-side before redirect
- Credentials are passed as URL parameters (ensure HTTPS is used)