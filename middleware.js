import { NextResponse } from "next/server";

export function middleware(request) {
  const maintenanceMode = true; // turn ON/OFF here

  if (maintenanceMode) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!maintenance|_next|favicon.ico).*)",
};