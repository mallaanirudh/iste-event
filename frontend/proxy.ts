import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic admin gate: without a session cookie there is no point rendering the
 * dashboard, so send the visitor to the login page. The real check (valid session,
 * admin role) happens against /api/v1/auth/me inside the dashboard.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (!request.cookies.has("session")) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
