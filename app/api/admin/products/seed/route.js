export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";

export async function POST() {
  await dbConnect();

  for (const p of PRODUCTS) {
    await Product.updateOne(
      { slug: p.slug },
      { $set: { ...p, inStock: true } },
      { upsert: true }
    );
  }

  return Response.json({
    ok: true,
    message: "Products added to database",
  });
}







// //peptides\app\api\admin\products\seed\route.js
// export const dynamic = "force-dynamic";

// import dbConnect from "@/lib/dbConnect";
// import Product from "@/models/Product";
// import { requireAdmin } from "@/lib/requireAdmin";
// import { PRODUCTS } from "@/data/products"; // adjust path if different

// export async function POST() {
//   const { error } = await requireAdmin();
//   if (error) return new Response("Unauthorized", { status: 401 });

//   await dbConnect();

//   // avoid duplicates by slug
//   for (const p of PRODUCTS) {
//     await Product.updateOne(
//       { slug: p.slug },
//       {
//         $set: {
//           name: p.name,
//           slug: p.slug,
//           price: p.price,
//           strength: p.strength || "",
//           image: p.image || "",
//           category: p.category || "",
//           inStock: true,
//         },
//       },
//       { upsert: true }
//     );
//   }

//   return Response.json({ ok: true, message: "Seeded products" });
// }
