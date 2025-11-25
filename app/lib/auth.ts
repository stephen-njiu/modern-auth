import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

function buildSocialProviders() {
  const entries: Array<[
    string,
    Record<string, string>
  ]> = [];

  // Providers that only need clientId/clientSecret
  const simple = [
    ["github", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
    ["google", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
    ["twitter", "TWITTER_CLIENT_ID", "TWITTER_CLIENT_SECRET"],
    ["linkedin", "LINKEDIN_CLIENT_ID", "LINKEDIN_CLIENT_SECRET"],
    ["facebook", "FACEBOOK_CLIENT_ID", "FACEBOOK_CLIENT_SECRET"],
    ["discord", "DISCORD_CLIENT_ID", "DISCORD_CLIENT_SECRET"],
    ["gitlab", "GITLAB_CLIENT_ID", "GITLAB_CLIENT_SECRET"],
    ["bitbucket", "BITBUCKET_CLIENT_ID", "BITBUCKET_CLIENT_SECRET"],
    ["tiktok", "TIKTOK_CLIENT_ID", "TIKTOK_CLIENT_SECRET"],
    ["microsoft", "MICROSOFT_CLIENT_ID", "MICROSOFT_CLIENT_SECRET"],
    ["spotify", "SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET"],
    ["dropbox", "DROPBOX_CLIENT_ID", "DROPBOX_CLIENT_SECRET"],
    ["twitch", "TWITCH_CLIENT_ID", "TWITCH_CLIENT_SECRET"],
  ] as const;

  for (const [key, idVar, secretVar] of simple) {
    const clientId = process.env[idVar];
    const clientSecret = process.env[secretVar];
    if (clientId && clientSecret) {
      entries.push([key, { clientId, clientSecret }]);
    }
  }

  // Apple requires extra fields; only include if all present
  const appleClientId = process.env.APPLE_CLIENT_ID;
  const appleTeamId = process.env.APPLE_TEAM_ID;
  const appleKeyId = process.env.APPLE_KEY_ID;
  const applePrivateKey = process.env.APPLE_PRIVATE_KEY;
  if (appleClientId && appleTeamId && appleKeyId && applePrivateKey) {
    entries.push([
      "apple",
      {
        clientId: appleClientId,
        teamId: appleTeamId,
        keyId: appleKeyId,
        privateKey: applePrivateKey,
      } as unknown as Record<string, string>,
    ]);
  }

  return Object.fromEntries(entries) as any;
}
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: buildSocialProviders(),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const from = process.env.SEND_EMAIL_FROM;
        if (!from) {
          console.error("SEND_EMAIL_FROM is not configured. Unable to send magic link email.");
          return;
        }

        if (!process.env.RESEND_API_KEY) {
          console.error("RESEND_API_KEY is not configured. Unable to send magic link email.");
          return;
        }

        const subject = "Your sign-in link";
        const html = `
          <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; background-color: #0f172a; color: #e2e8f0;">
            <h1 style="margin: 0 0 16px; font-size: 20px;">Finish signing in</h1>
            <p style="margin: 0 0 12px;">Click the button below to securely sign in.</p>
            <p style="margin: 0 0 24px; font-size: 12px; color: #94a3b8;">This link expires soon and can only be used once.</p>
            <a href="${url}" style="display: inline-block; padding: 12px 20px; background: linear-gradient(90deg,#6366f1,#ec4899); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Sign in to your account</a>
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">If the button above does not work, copy and paste this URL into your browser:</p>
            <p style="word-break: break-all; font-size: 12px;"><a href="${url}" style="color: #38bdf8; text-decoration: none;">${url}</a></p>
          </div>
        `;

        const text = `Sign in to your account by clicking this link: ${url}`;

        try {
          const { error } = await resend.emails.send({
            to: email,
            from,
            subject,
            html,
            text,
          });

          if (error) {
            console.error("Resend send error", error);
          }
        } catch (error) {
          console.error("Failed to send magic link via Resend", error);
        }
      },
    }),
  ],
});

