import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register", "/api", "/_next", "/favicon.ico"];
const protectedRoutes = ["/", "/dashboard", "/profile"]; // List of routes to protect

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  console.log("Middleware triggered:", request.nextUrl.pathname);
  console.log("Token found:", token);

  // Skip middleware if it's a public route
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  if (isPublic) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only run on these paths
export const config = {
  matcher: ["/:path*"],
};
