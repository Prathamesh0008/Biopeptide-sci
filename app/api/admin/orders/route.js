//peptides\app\api\admin\orders\route.js
export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return new Response("Unauthorized", { status: 401 });

  await dbConnect();
  const orders = await Order.find().sort({ createdAt: -1 });
  return Response.json({ orders });
}

