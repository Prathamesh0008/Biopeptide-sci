export async function requireAdmin(req) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return { error: true };

  if (!cookieHeader.includes("admin-token=")) {
    return { error: true };
  }

  return { ok: true };
}
