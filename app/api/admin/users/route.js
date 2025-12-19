import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const { error } = requireAdmin(); // ✅ NO await
  if (error) return error;

  await dbConnect();
  const users = await User.find()
    .select("-passwordHash")
    .sort({ createdAt: -1 });

  return Response.json({ users });
}
