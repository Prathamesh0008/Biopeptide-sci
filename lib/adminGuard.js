import { cookies } from "next/headers";

export function isAdminFromCookies() {
  const cookie = cookies().get("admin-token");
  return !!cookie;
}
