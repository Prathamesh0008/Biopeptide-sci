//peptides\app\api\products\route.js
export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return Response.json({ ok: true, products });
}
