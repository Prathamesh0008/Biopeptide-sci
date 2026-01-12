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

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {
      return Response.json({ ok: false }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);

    return Response.json({
      ok: true,
      user: payload,
    });
  } catch {
    return Response.json({ ok: false }, { status: 401 });
  }
}
