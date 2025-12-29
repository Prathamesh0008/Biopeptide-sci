export function isAdminFromCookies() {
  const cookie = require("next/headers").cookies().get("admin-token");
  return !!cookie;
}
