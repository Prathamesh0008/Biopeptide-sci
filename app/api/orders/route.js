
//peptides\app\api\orders\route.js
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const USER_ORDER_TEMPLATE_ID = "template_f6fflm8";
const ADMIN_ORDER_TEMPLATE_ID = "template_d3zwfdo";

function money(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

function formatItems(items = []) {
  return items
    .map((item) => `${item.name} x ${item.qty} - ${money(item.price * item.qty)}`)
    .join("\n");
}

function formatItemRows(items = []) {
  return items
    .map(
      (item) => `
        <div style="padding:16px;border-bottom:1px solid #e5e7eb;">
          <div style="margin-bottom:10px;">
            <div style="font-size:11px;color:#64748b;margin-bottom:4px;">Product</div>
            <div style="font-weight:600;color:#0d2d47;font-size:15px;line-height:1.4;word-break:break-word;">${item.name}</div>
          </div>
          <div style="margin-bottom:10px;">
            <div style="font-size:11px;color:#64748b;margin-bottom:4px;">Quantity</div>
            <div style="color:#1e293b;font-size:14px;font-weight:500;">${item.qty}</div>
          </div>
          <div>
            <div style="font-size:11px;color:#64748b;margin-bottom:4px;">Amount</div>
            <div style="font-weight:700;color:#16a34a;font-size:16px;">${money(item.price * item.qty)}</div>
          </div>
        </div>
      `
    )
    .join("");
}

function formatAddress(address = {}) {
  return [
    address.fullName,
    address.house,
    address.area,
    [address.city, address.state, address.pincode].filter(Boolean).join(", "),
    address.country,
    address.phone,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendEmailJs(templateId, templateParams) {
  const serviceId = process.env.ORDER_EMAILJS_SERVICE_ID;
  const publicKey = process.env.ORDER_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.ORDER_EMAILJS_PRIVATE_KEY;

  if (!serviceId || !publicKey) {
    throw new Error("Missing ORDER EmailJS env variables");
  }

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: templateParams,
  };

  if (privateKey) {
    payload.accessToken = privateKey;
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`EmailJS failed (${res.status}): ${text}`);
  }
}

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
  let order = await Order.findOne({
  checkoutId: body.checkoutId,
});

if (!order) {
  order = await Order.create({
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
}



    /* ---------------- SEND EMAILJS EMAILS (SAFE MODE) ---------------- */
    try {
      if (!process.env.ORDER_EMAILJS_SERVICE_ID || !process.env.ORDER_EMAILJS_PUBLIC_KEY) {
        console.warn("Order EmailJS not configured, skipping email");
      } else {
        const total =
          order.totals?.total ??
          order.totals?.subtotal ??
          0;

        const commonParams = {
          title: "Order Confirmed",
          order_id: order._id.toString(),
          orderId: order._id.toString(),
          orderDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
          customer_name: order.userName || "",
          customerName: order.userName || "",
          customer_email: order.userEmail || "",
          customerEmail: order.userEmail || "",
          total: money(total),
          orderTotal: money(total),
          items: formatItems(order.items),
          itemRows: formatItemRows(order.items),
          orderItemsHtml: formatItemRows(order.items),
          address: formatAddress(order.address),
          shippingAddress: formatAddress(order.address),
          productName: order.items?.[0]?.name || "",
          productQuantity: order.items?.[0]?.qty || "",
          productTotal: order.items?.[0]
            ? money(order.items[0].price * order.items[0].qty)
            : "",
        };

        // USER EMAIL
        if (order.userEmail) {
          await sendEmailJs(USER_ORDER_TEMPLATE_ID, {
            ...commonParams,
            to_email: order.userEmail,
            email: order.userEmail,
            name: order.userName || "",
          });
        }

        // ADMIN EMAIL
        const adminEmail = process.env.ORDER_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

        if (adminEmail) {
          await sendEmailJs(ADMIN_ORDER_TEMPLATE_ID, {
            ...commonParams,
            to_email: adminEmail,
            email: adminEmail,
            name: order.userName || "",
            userEmail: order.userEmail || "",
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











