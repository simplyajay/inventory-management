import { NextResponse } from "next/server";

export const middleware = (req) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN);
  const publicPaths = ["/login", "/register", "/"];

  if (
    pathname.startsWith("/_next/") || // Next.js build files (JS, CSS)
    pathname.startsWith("/static/") || // Custom static files
    pathname.startsWith("/api/") || // API routes
    pathname.endsWith(".ico") || // Favicon
    pathname.endsWith(".png") || // Images
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".css") || // Stylesheets
    pathname.endsWith(".js") // JavaScript
  ) {
    return NextResponse.next();
  }

  const isLoggedIn = token ? true : false;

  if (!isLoggedIn && !publicPaths.includes(pathname)) {
    // Redirect to login page if not logged in and accessing a protected route
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
};
