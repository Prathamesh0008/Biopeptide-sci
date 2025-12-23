//app\api\auth\logout\route.js
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("auth", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return Response.json({ ok: true });
}
