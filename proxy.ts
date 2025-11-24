import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request: NextRequest) {
  // Use request.headers in this context
  const session = await auth.api.getSession({
    headers: request.headers
  });

  // define the paths that the user can visit without signing in
  const publicPaths = ["/auth/login", "/auth/register", "/"];

  const { pathname } = new URL(request.url);
  const isLogin = pathname.startsWith("/auth/login");
  const isRegister = pathname.startsWith("/auth/register");
  const isAuthPage = isLogin || isRegister;

  // Consider home and any explicitly listed route as public
  const isPublic = publicPaths.some((p) => {
    if (p === "/") return pathname === "/"; // home only
    return pathname === p || pathname.startsWith(p + "/");
  });


  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // 2) If user is NOT signed in and the page is NOT public, send to /auth/login
  if (!session && !isPublic) {
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