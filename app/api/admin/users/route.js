import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();

  if (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  await dbConnect();

  const users = await User.find().select("-passwordHash");

  return Response.json({ users });
}






// //peptides\app\api\admin\users\route.js
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";
// import { cookies } from "next/headers";

// export async function GET() {
//   const token = cookies().get("admin-token")?.value;
//   if (!token) return new Response("Unauthorized", { status: 401 });

//   await dbConnect();
//   const users = await User.find().select("-passwordHash");
//   return Response.json({ users });
// }
