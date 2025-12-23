//lib\auth.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function getAuthUser() {
  try {
    const cookieStore = cookies(); // ✅ sync
    const token = cookieStore.get("auth")?.value;

    if (!token) return null;

    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function requireAuth() {
  const user = getAuthUser();
  if (!user) {
    return {
      user: null,
      error: Response.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }
  return { user, error: null };
}

export function requireAdmin() {
  const { user, error } = requireAuth();
  if (error) return { user: null, error };

  if (user.role !== "admin") {
    return {
      user: null,
      error: Response.json(
        { ok: false, error: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return { user, error: null };
}
