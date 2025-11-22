import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request: NextRequest) {
  // Use request.headers in this context
  const session = await auth.api.getSession({
    headers: request.headers
  });

  const { pathname } = new URL(request.url);
  const isLogin = pathname.startsWith("/auth/login");
  const isRegister = pathname.startsWith("/auth/register");
  const isAuthPage = isLogin || isRegister;

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
  // 1) If user is signed in and visits /auth/login or /auth/register, send to /profile
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // 2) If user is NOT signed in and the page is NOT an auth page, send to /auth/login
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
runtime: "nodejs", // Required for auth.api calls
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}