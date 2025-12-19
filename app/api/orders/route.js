// app/api/orders/route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.items || body.items.length === 0) {
      return Response.json(
        { ok: false, error: "Cart empty" },
        { status: 400 }
      );
    }

    if (!body.userId || !body.userEmail) {
      return Response.json(
        { ok: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    const order = await Order.create({
      userId: body.userId,
      userEmail: body.userEmail,
      userName: body.userName,
      phone: body.address?.phone || "",
      address: body.address,
      items: body.items,
      totals: body.totals,
      status: "pending",
    });

    return Response.json({
      ok: true,
      orderId: order._id,
    });
  } catch (err) {
    console.error("ORDER_CREATE_ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
