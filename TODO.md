# Deployment TODO – Modern Auth

Follow this checklist to bring the project live on Vercel (or any Next.js host).

## 1. Clone & Install

```powershell
git clone https://github.com/stephen-njiu/modern-auth.git
cd modern-auth
npm install
```

## 2. Create the Database

1. Provision a PostgreSQL instance (Neon, Supabase, Railway, Render, etc.).
2. Copy the connection string and set `DATABASE_URL` in your `.env`.
3. Run the migrations once to create the schema:

```powershell
npx prisma migrate deploy
```

## 3. Generate a Better Auth Secret

Visit <https://www.better-auth.com/docs/installation> and create a `BETTER_AUTH_SECRET`. Add it to `.env`.

## 4. Set Up Resend (Magic Link Emails)

1. Create a Resend account and API key.
2. Verify a sending domain and add DNS records. Without verification, Resend will bounce emails and users must rely on social sign-in only.
3. Add to `.env`:
   - `RESEND_API_KEY`
   - `SEND_EMAIL_FROM` (must match the verified domain, e.g. `support@yourdomain.com`).

## 5. Configure Social Providers (Optional)

For each provider you plan to offer, create an OAuth app and set credentials in `.env` (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, etc.). Repeat for Google, Twitter/X, Apple, LinkedIn, Spotify, Dropbox, Twitch, and others supported in `app/lib/auth.ts`.

### Redirect & Authorized URIs (Better Auth defaults)

- Local: `http://localhost:3000/api/auth/callback/<provider>`
- Production: `https://your-domain.com/api/auth/callback/<provider>`

Add both the localhost and production URLs to the provider dashboard. Some providers also require `http://localhost:3000` and `https://your-domain.com` in the “Authorized JavaScript origins” list.

Apple requires `APPLE_TEAM_ID`, `APPLE_KEY_ID`, and `APPLE_PRIVATE_KEY` in addition to the client ID and secret.

## 6. Populate `.env`

Example layout:

```dotenv
DATABASE_URL="postgres://..."
BETTER_AUTH_SECRET="..."
RESEND_API_KEY="..."
SEND_EMAIL_FROM="support@yourdomain.com"
# Optional overrides
NEXT_PUBLIC_API_URL="https://your-domain.com/api/auth"

# Social providers
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
# etc.
```

## 7. Verify Locally

```powershell
npm run dev
```

Check:

- Magic link flow sends an email (Resend dashboard should show delivery). If the domain isn’t verified, expect failure and rely on social login only.
- Social sign-in redirects correctly using the callback URLs above.

## 8. Deploy

1. Push your changes to GitHub.
2. Import the repository into Vercel (or click the Deploy button in `README.md`).
3. Add the same environment variables in the Vercel dashboard (Production + Preview).
4. Trigger a deploy—`npm run build` already calls `prisma generate`.

After the first deploy, re-run `npx prisma migrate deploy` against production if new migrations were created.

---


