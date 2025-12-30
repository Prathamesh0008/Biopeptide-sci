import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function requireAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) return { error: true };

    const { payload } = await jwtVerify(token, secret);

    // ✅ REQUIRE ADMIN ROLE
    if (payload.role !== "admin") {
      return { error: true };
    }

    return { ok: true, admin: payload };
  } catch {
    return { error: true };
  }
}

