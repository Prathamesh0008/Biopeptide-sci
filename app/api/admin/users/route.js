//app\api\admin\users\route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect();

  const users = await User.find()
    .select("-passwordHash")
    .sort({ createdAt: -1 });

  return Response.json({ users });
}
