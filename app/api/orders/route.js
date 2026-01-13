//peptides\app\api\orders\route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getTransporter } from "@/lib/mailer";
import {
  userOrderEmail,
  adminOrderEmail,
} from "@/lib/orderEmailTemplates";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  try {
    await dbConnect();

    /* ---------------- AUTH ---------------- */
    const cookieStore = await cookies(); // ✅ FIXED
    const token = cookieStore.get("auth")?.value;

    if (!token) {
      return Response.json(
        { ok: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, secret);

    /* ---------------- BODY ---------------- */
    const body = await req.json();

    if (!body.items || body.items.length === 0) {
      return Response.json(
        { ok: false, error: "Cart empty" },
        { status: 400 }
      );
    }

    if (!body.checkoutId) {
      return Response.json(
        { ok: false, error: "Missing checkoutId" },
        { status: 400 }
      );
    }

    /* ---------------- DUPLICATE CHECK ---------------- */
    const existing = await Order.findOne({
      checkoutId: body.checkoutId,
    });

    if (existing) {
      return Response.json({
        ok: true,
        orderId: existing._id.toString(),
      });
    }

    /* ---------------- SAVE ORDER ---------------- */
    const order = await Order.create({
      checkoutId: body.checkoutId,
      userId: payload.id || payload._id || payload.sub,
      userEmail: body.userEmail || "",
      userName: body.userName || "",
      phone: body.phone || "",
      address: body.address,
      items: body.items,
      totals: body.totals,
      status: "pending",
    });

    /* ---------------- SEND EMAIL (SAFE MODE) ---------------- */
    try {
      if (!process.env.SMTP_HOST) {
        console.warn("SMTP not configured, skipping email");
      } else {
        const transporter = getTransporter();
        const from = process.env.MAIL_FROM || process.env.SMTP_USER;
        const adminEmail = process.env.ADMIN_EMAIL;

        const total =
          order.totals?.total ??
          order.totals?.subtotal ??
          0;

        // USER EMAIL
        if (order.userEmail) {
          const userMail = userOrderEmail({
            orderId: order._id.toString(),
            name: order.userName,
            total,
            items: order.items,
            address: order.address,
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
          const adminMail = adminOrderEmail({
            orderId: order._id.toString(),
            userEmail: order.userEmail,
            name: order.userName,
            total,
            items: order.items,
            address: order.address,
          });

          await transporter.sendMail({
            from,
            to: adminEmail,
            subject: adminMail.subject,
            html: adminMail.html,
          });
        }
      }
    } catch (mailErr) {
      console.error("EMAIL FAILED (IGNORED):", mailErr);
    }

    /* ---------------- RESPONSE ---------------- */
    return Response.json({
      ok: true,
      orderId: order._id.toString(),
    });
  } catch (err) {
    console.error("ORDER_ERROR:", err);
    return Response.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}











