import { NextResponse } from "next/server";

export function middleware(request) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (maintenanceMode) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!maintenance|_next|favicon.ico).*)",
};