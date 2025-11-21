// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  // Redirect if user tries to access login page while logged in
  if (req.nextUrl.pathname === "/auth/login" && token) {
    return NextResponse.redirect(new URL("/booking-list", req.url));
  }

  // Protect other pages
  const protectedPaths = ["/booking-list", "/booking-configs"];
  if (
    protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/booking-list/:path*", "/booking-configs/:path*"],
};
