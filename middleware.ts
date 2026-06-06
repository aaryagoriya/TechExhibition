import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@insforge/sdk/ssr";

const PROTECTED_PREFIXES = ["/dashboard", "/profile", "/find-jobs"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const { accessToken } = await updateSession({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
