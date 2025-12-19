// app/api/admin/orders/[id]/route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function PATCH(req, { params }) {
  await dbConnect();

  const { status } = await req.json();

  const updated = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  return Response.json({
    ok: true,
    order: updated,
  });
}
