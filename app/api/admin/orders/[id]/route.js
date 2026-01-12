//app\api\admin\orders\[id]\route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PATCH(req, { params }) {
  const { error } = await requireAdmin();

  if (error) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  await dbConnect();

  const { status } = await req.json();

  const updated = await Order.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  return Response.json({ ok: true, order: updated });
}``








// //app\api\admin\orders\[id]\route.js
// import dbConnect from "@/lib/dbConnect";
// import Order from "@/models/Order";
// import { requireAdmin } from "@/lib/requireAdmin";

// export async function PATCH(req, { params }) {
//   const { error } = await requireAdmin(req);



//   if (error) {
//     return new Response(
//       JSON.stringify({ message: "Unauthorized" }),
//       { status: 401 }
//     );
//   }

//   await dbConnect();

//   const { status } = await req.json();

//   const updated = await Order.findByIdAndUpdate(
//     params.id,
//     { status },
//     { new: true }
//   );

//   return Response.json({ ok: true, order: updated });
// }``



