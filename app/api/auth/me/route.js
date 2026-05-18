// //app\api\auth\me\route.js
// import { cookies } from "next/headers";
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("auth")?.value;

//     if (!token) {
//       return Response.json(
//         { ok: false, error: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const { payload } = await jwtVerify(token, secret);

//     return Response.json({
//       ok: true,
//       user: {
//         id: payload.id,
//         role: payload.role,
//       },
//     });
//   } catch (err) {
//     return Response.json(
//       { ok: false, error: "Invalid token" },
//       { status: 401 }
//     );
//   }
// }

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {
      return Response.json({ ok: false }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const user = await User.findById(payload.id).select("-passwordHash");

    if (!user) {
      return Response.json({ ok: false }, { status: 401 });
    }

    return Response.json({
      ok: true,
      user: {
        _id: user._id,
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch {
    return Response.json({ ok: false }, { status: 401 });
  }
}
