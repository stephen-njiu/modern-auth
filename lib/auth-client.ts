"use client";
// React-aware Better Auth client so hooks like useSession() work per docs
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
