//app\api\orders\route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

   let userId = null;

if (token) {
  const { payload } = await jwtVerify(token, secret);
  userId = payload.id;
}


    const { payload } = await jwtVerify(token, secret);
    const body = await req.json();

    if (!body.items || body.items.length === 0) {
      return Response.json(
        { ok: false, error: "Cart empty" },
        { status: 400 }
      );
    }

    const { checkoutId } = body;

    if (!checkoutId) {
      return Response.json(
        { ok: false, error: "Missing checkoutId" },
        { status: 400 }
      );
    }

    // ✅ DUPLICATE PROTECTION (CORRECT)
    const existing = await Order.findOne({ checkoutId });

    if (existing) {
      return Response.json({
        ok: true,
        orderId: existing._id.toString(),
      });
    }

    // ✅ CREATE ORDER ONLY ONCE
    const order = await Order.create({
      checkoutId,
      userId: payload.id,
      userEmail: body.userEmail || "",
      userName: body.userName || "",
      phone: body.phone || "",
      address: body.address,
      items: body.items,
      totals: body.totals,
      status: "pending",
    });

    return Response.json({
      ok: true,
      orderId: order._id.toString(),
    });
  } catch (err) {
    console.error("ORDER_ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
