import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN);
  const res = NextResponse.next();

  if (!token) {
    if (pathname !== "/register" && !pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (token) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/register/")) {
    const step = pathname.split("/")[2];

    if (step !== "account") {
      return NextResponse.redirect(new URL("/register", req.url));
    }
  }

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
    "/register/:path*",
  ],
};
