//peptides\app\api\admin\products\[id]\route.js
export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req, context) {
  const { error } = await requireAdmin();
  if (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  await dbConnect();

  const { id } = await context.params;
  const { inStock } = await req.json();

  const updated = await Product.findByIdAndUpdate(
    id,
    { inStock },
    { new: true }
  );

  if (!updated) {
    return new Response("Product not found", { status: 404 });
  }

  return Response.json({ ok: true, product: updated });
}
