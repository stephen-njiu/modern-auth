# Project TODO / Full Setup Guide

(This file contains the comprehensive sequential setup originally in README.)

<div align="center">
<h1>Better Auth Next.js Starter – Detailed Guide</h1>
<p><strong>Stack:</strong> Next.js (App Router) · Prisma 6.19.0 · PostgreSQL · Better Auth · shadcn/ui · Tailwind CSS v4</p>
</div>

## 1. Project Creation

Created with latest `create-next-app` default settings.

- App Router under `app/`
- TypeScript
- Tailwind CSS v4

Rationale: Latest stable Next.js for React 19 compatibility.

## 2. Installing Better Auth

Installed `better-auth@^1.3.34` for auth flows with Prisma adapter.

Auth initialization in `app/lib/auth.ts`:

```ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
});
```

## 3. Prisma Setup (v6.19.0)

Both `prisma` (dev) and `@prisma/client` (runtime) installed at 6.19.0.
Reasons:

- Performance & generator improvements
- Version alignment between CLI & client
- Stable with modern Node & React

### `npx prisma init`

Creates `prisma/schema.prisma` & `prisma.config.ts` and prints next steps.

### Dotenv

Installed `dotenv` to load `DATABASE_URL` with Prisma config file.

### Schema

Models: User, Session, Account, Verification, Post.
Generator custom output:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}
```

Keeps generated client locally at `lib/generated/prisma`.

### `npx prisma migrate dev --name init`

Creates migration folder, applies changes, generates client. Preferred over `db push` for history.

## 4. Scripts Enhancement

```jsonc
"scripts": {
  "dev": "prisma generate && next dev",
  "build": "prisma generate && next build"
}
```

Ensures client is fresh before running.

## 5. shadcn/ui Initialization

`npx shadcn@latest init` and then adding components:

```powershell
npx shadcn@latest add tooltip button label input text
```

Created UI primitives (button, label, input, textarea, sonner, card).

## 6. Better Auth CLI Generation

`npx @better-auth/cli generate` – generates/updates auth schema/types. First run aborted due to missing GitHub provider secrets; second run succeeded after overwrite.

## 7. Current Status

- Prisma migrated
- Auth configured
- UI primitives added
- Generation scripts integrated

## 8. Roadmap

1. Add provider env vars
2. Session handling UI
3. Sign-in/out flows
4. Seed script
5. Tests
6. CI pipeline

## 9. Commands Cheat Sheet

```powershell
npx prisma init
npx prisma migrate dev --name <migration_name>
npx prisma generate
npm run dev
npx shadcn@latest add <component>
npx @better-auth/cli generate
```

## 10. FAQ

Why custom output? Easier inspection & bundling.
Why prisma generate in scripts? Automatic regeneration.
Why migrations vs db push? Versioned history.

## 11. References

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Better Auth Docs: https://www.better-auth.com/docs/basic-usage
- shadcn/ui: https://ui.shadcn.com

(End of detailed guide)
