//app\api\admin\orders\[id]\route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req, { params }) {
  console.log("✅ ADMIN ORDER PATCH HIT", params.id);

  await dbConnect();

  const { status } = await req.json();
  console.log("STATUS RECEIVED:", status);

  const updated = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  console.log("UPDATED ORDER:", updated);

  return Response.json({
    ok: true,
    order: updated,
  });
}
