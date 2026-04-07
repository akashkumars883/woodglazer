import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy function (formerly middleware in Next.js <16)
 * Handles request-level logic like authentication and redirects.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. We only care about /admin routes
  if (pathname.startsWith("/admin")) {
    
    // 2. Exclude the login page itself to avoid infinite redirect
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // 3. Check for the admin session cookie
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession) {
      // 4. Redirect to login if no session found
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Named export 'config' or default export 'proxy' are both supported in Next.js 16
export const config = {
  matcher: "/admin/:path*",
};
