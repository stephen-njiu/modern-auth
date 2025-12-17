<div align="center">
	<h1>Modern Auth – Magic Link & Social Sign-In</h1>
	<p>A Next.js starter tailored for passwordless authentication via Better Auth.</p>
</div>

<div align="center">

For a more customizable, updated passwordless template configurable by the `.env` file, see [**Passwordless**](https://github.com/stephen-njiu/passwordless)

</div>


<p align="center">
	<a href="https://modern-auth-sable.vercel.app/" target="_blank" rel="noreferrer"><strong>Live Demo</strong></a>
</p>

<p align="center">
	<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fstephen-njiu%2Fmodern-auth" target="_blank" rel="noreferrer">
		<img alt="Deploy with Vercel" src="https://vercel.com/button" />
	</a>
</p>

## Highlights

- Magic-link registration and login with Better Auth’s plugin system.
- Social providers (GitHub, Google, Twitter, Apple, LinkedIn, and more) auto-enabled via environment vars.
- Resend delivers all transactional mail—ready for Vercel and other serverless targets.
- Prisma 6 + PostgreSQL with custom output and bundled query engine support.
- Tailwind v4, shadcn/ui components, and Sonner toasts for polished UX.

## Quick Start

```powershell
git clone https://github.com/stephen-njiu/modern-auth.git
cd modern-auth
npm install

# Apply migrations and generate the client
npx prisma migrate deploy

# Launch the dev server (scripts auto-run prisma generate)
npm run dev
```

Visit `http://localhost:3000` to hit the public landing page, login, and register flows.

## Environment Variables

Add these to `.env` (or your hosting provider):

| Variable                                    | Purpose                                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `DATABASE_URL`                              | PostgreSQL connection string.                                                          |
| `BETTER_AUTH_SECRET`                        | Better Auth secret key (generate via <https://www.better-auth.com/docs/installation>). |
| `RESEND_API_KEY`                            | Resend API key for magic-link delivery.                                                |
| `SEND_EMAIL_FROM`                           | Verified sender address (e.g. `support@cv99x.com`).                                    |
| `NEXT_PUBLIC_API_URL`                       | Optional override for Better Auth client base URL.                                     |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Social credentials (repeat for Google, Twitter, LinkedIn, etc.).                       |

Apple additionally needs `APPLE_TEAM_ID`, `APPLE_KEY_ID`, and `APPLE_PRIVATE_KEY`. Providers only activate when all required variables are present.

> **Note:** If your Resend domain isn’t verified, email delivery will bounce. You can still authenticate entirely with social providers until verification is complete.

## Project Layout

- `app/lib/auth.ts` – Better Auth server setup (Prisma adapter, magic link, Resend mailer, social detection).
- `app/lib/auth-client.ts` – Better Auth React client with magic-link plugin.
- `components/auth/` – Magic-link forms and social sign-in UI.
- `prisma/` – Schema + migrations (client emitted into `lib/generated/prisma`).

## Scripts & Tooling

```jsonc
"postinstall": "prisma generate",   // ensures Prisma Client exists after install/deploy
"dev": "prisma generate && next dev",
"build": "prisma generate && next build"
```

Common commands:

```powershell
npx prisma migrate dev --name <change>   # iterate locally
npx prisma migrate deploy                # apply migrations in CI/prod
npx prisma generate                      # regenerate client manually
npx @better-auth/cli generate            # refresh Better Auth artifacts
```

## Deployment Tips

- **Vercel**: Supported out of the box. Set environment variables in the project dashboard and push to `main`.
- **Render / other containers**: SMTP works if you switch the mailer, otherwise Resend is ready to go.
- Always run `npx prisma migrate deploy` against your production database before the first release.

## References

- Better Auth – <https://www.better-auth.com/docs/basic-usage>
- Prisma – <https://www.prisma.io/docs>
- Resend – <https://resend.com/docs>
- Next.js – <https://nextjs.org/docs>
- shadcn/ui – <https://ui.shadcn.com>
