import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/lib/generated/prisma/client";
import { proxy } from "@/proxy";

const prisma = new PrismaClient();

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
});

