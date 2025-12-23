import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const { error } = requireAdmin();
  if (error) return error;

  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 });

  return Response.json({ products });
}
