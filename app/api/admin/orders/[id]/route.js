export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/requireAdmin";
import { getTransporter } from "@/lib/mailer";
import {
  userStatusEmail,
  adminStatusEmail,
} from "@/lib/orderStatusEmails";

export async function PATCH(req, context) {
  const { error } = await requireAdmin();
  if (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  await dbConnect();

  const { id } = await context.params;
  const { status } = await req.json();

  // 1️⃣ Get existing order
  const order = await Order.findById(id);
  if (!order) {
    return new Response("Order not found", { status: 404 });
  }

  // ❌ Do nothing if status is same
  if (order.status === status) {
    return Response.json({ ok: true, order });
  }

  const oldStatus = order.status;
  order.status = status;
  await order.save();

  // 2️⃣ Send emails (safe mode)
  try {
    if (process.env.SMTP_HOST) {
      const transporter = getTransporter();
      const from = process.env.MAIL_FROM || process.env.SMTP_USER;
      const adminEmail = process.env.ADMIN_EMAIL;

      // USER EMAIL
      if (order.userEmail) {
        const userMail = userStatusEmail({
          name: order.userName,
          orderId: order._id.toString().slice(-6),
          status,
        });

        await transporter.sendMail({
          from,
          to: order.userEmail,
          subject: userMail.subject,
          html: userMail.html,
        });
      }

      // ADMIN EMAIL
      if (adminEmail) {
        const adminMail = adminStatusEmail({
          orderId: order._id.toString().slice(-6),
          status,
          userEmail: order.userEmail,
        });

        await transporter.sendMail({
          from,
          to: adminEmail,
          subject: adminMail.subject,
          html: adminMail.html,
        });
      }
    }
  } catch (err) {
    console.error("STATUS EMAIL FAILED:", err);
  }

  return Response.json({ ok: true, order });
}






// export const dynamic = "force-dynamic";

// import dbConnect from "@/lib/dbConnect";
// import Order from "@/models/Order";
// import { requireAdmin } from "@/lib/requireAdmin";

// export async function PATCH(req, context) {
//   const { error } = await requireAdmin();
//   if (error) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   await dbConnect();

//   // ✅ FIX: await params
//   const { id } = await context.params;

//   const { status } = await req.json();

//   const updated = await Order.findByIdAndUpdate(
//     id,
//     { status },
//     { new: true, runValidators: true }
//   );

//   if (!updated) {
//     return new Response("Order not found", { status: 404 });
//   }

//   return Response.json({ ok: true, order: updated });
// }




// //app\api\admin\orders\[id]\route.js
// import dbConnect from "@/lib/dbConnect";
// import Order from "@/models/Order";
// import { requireAdmin } from "@/lib/requireAdmin";

// export async function PATCH(req, { params }) {
//   const { error } = await requireAdmin();

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








