// app/api/admin/dashboard/route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import User from "@/models/User";

export async function GET() {
  await dbConnect();

  const orders = await Order.countDocuments();
  const pending = await Order.countDocuments({ status: "pending" });
  const users = await User.countDocuments();

  const revenueAgg = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$totals.total" },
      },
    },
  ]);

  return Response.json({
    orders,
    pending,
    users,
    revenue: revenueAgg[0]?.total || 0,
  });
}
