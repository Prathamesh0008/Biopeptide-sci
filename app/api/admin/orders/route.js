// app/api/admin/orders/route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET() {
  await dbConnect();

  const orders = await Order.find().sort({ createdAt: -1 });

  return Response.json({ orders });
}
