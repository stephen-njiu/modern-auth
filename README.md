<div align="center">
<h1>Better Auth + Next.js</h1>
<p>Concise setup & run instructions. For the full guide see <code>TODO.md</code>.</p>
</div>

## Stack

Next.js (App Router) · Prisma 6.19.0 · PostgreSQL · Better Auth · shadcn/ui · Tailwind CSS v4

## Prerequisites

1. Set <code>DATABASE_URL</code> in <code>.env</code> (PostgreSQL URL)
2. Install dependencies: <code>npm install</code>

## First-Time Setup

```powershell
# Apply initial migration & generate client
npx prisma migrate dev --name init

# (Optional) Generate Better Auth artifacts
npx @better-auth/cli generate
```

## Development

Scripts auto-run <code>prisma generate</code> before Next:

```powershell
npm run dev   # starts Next.js + ensures Prisma Client is current
```

## Adding UI Components (shadcn/ui)

```powershell
npx shadcn@latest add button label input textarea card tooltip
```

## Common Commands

```powershell
npx prisma migrate dev --name <change>   # create & apply migration
npx prisma generate                      # regenerate client manually
npx prisma init                        # initializes prisma
npx @better-auth/cli generate            # update auth generated files
npx shadcn@latest add <component>        # add UI component
```

## Auth Config Location

`app/lib/auth.ts` – initializes Better Auth with Prisma adapter.

## Docs

- Better Auth: https://www.better-auth.com/docs/basic-usage
- Prisma: https://www.prisma.io/docs
- Next.js: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com

## Troubleshooting Quickies

- Missing env vars for providers → set `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` etc.
- Client not updating → run `npx prisma generate`.

