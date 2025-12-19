import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = getAuthUser(); // ✅ NO await

  if (!user) {
    return Response.json(
      { ok: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  return Response.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
}
