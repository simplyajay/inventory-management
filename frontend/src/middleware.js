import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN);
  const res = NextResponse.next();

  if (!token) {
    // Redirect to login page if not logged in and accessing a protected route
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    res.headers.set("isLoggedIn", true);
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  //inject current path to the response
  const currentPath = req.nextUrl.pathname;
  res.headers.set("currentPath", currentPath);

  return res;
};

export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*",
    "/documents/:path*",
    "/purchase/:path*",
    "/sale/:path*",
    "/stocks/:path*",
    "/suppliers/:path*",
    "/suppliers/:path*",
    "/suppliers/:path*",
  ],
};
