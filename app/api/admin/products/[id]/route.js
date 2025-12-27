import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/requireAdmin";
export async function PATCH(req, { params }) {
  const { error } = requireAdmin();
  if (error) return error;

  await dbConnect();
  const { stock } = await req.json();

  const updated = await Product.findByIdAndUpdate(
    params.id,
    { stock },
    { new: true }
  );

  return Response.json({ ok: true, product: updated });
}
