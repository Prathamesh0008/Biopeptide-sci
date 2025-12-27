// lib/requireAdmin.js
import { cookies } from "next/headers";

export async function requireAdmin() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) {
      return { error: "Unauthorized" };
    }

    // OPTIONAL: validate token / role here
    // Example:
    // if (token !== process.env.ADMIN_TOKEN) ...

    return { success: true };
  } catch (err) {
    return { error: "Unauthorized" };
  }
}
