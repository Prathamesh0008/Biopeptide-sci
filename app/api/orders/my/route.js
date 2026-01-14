// app/api/orders/my/route.js
export const dynamic = "force-dynamic"; // ✅ THIS WAS MISSING

import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {
      return Response.json(
        { ok: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, secret);

    const orders = await Order.find({ userId: payload.id })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ ok: true, orders });
  } catch (err) {
    console.error("MY_ORDERS_ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}







// // app/api/orders/my/route.js
// import dbConnect from "@/lib/dbConnect";
// import Order from "@/models/Order";
// import { cookies } from "next/headers";
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function GET() {
//   try {
//     await dbConnect();

//     // ✅ Next.js 16: cookies() can be async
//     const cookieStore = await cookies();
//     const token = cookieStore.get("auth")?.value;

//     if (!token) {
//       return Response.json({ ok: false, error: "Not authenticated" }, { status: 401 });
//     }

//     const { payload } = await jwtVerify(token, secret);

//     const orders = await Order.find({ userId: payload.id })
//       .sort({ createdAt: -1 })
//       .lean();

//     return Response.json({ ok: true, orders });
//   } catch (err) {
//     console.error("MY_ORDERS_ERROR:", err);
//     return Response.json({ ok: false, error: "Server error" }, { status: 500 });
//   }
// }
