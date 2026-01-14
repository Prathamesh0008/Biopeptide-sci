export function userStatusEmail({ name, orderId, status }) {
  const statusColors = {
    pending: "#facc15",
    paid: "#38bdf8",
    shipped: "#6366f1",
    delivered: "#22c55e",
    cancelled: "#ef4444",
  };

  const color = statusColors[status] || "#64748b";

  return {
    subject: `Order #${orderId} is now ${status.toUpperCase()}`,
    html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:20px;font-family:Arial,sans-serif">
  <tr>
    <td align="center">

      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden">

        <!-- HEADER -->
        <tr>
          <td style="padding:20px 24px;background:#0d2d47;color:#ffffff">
            <h2 style="margin:0;font-size:20px">BioPeptide</h2>
            <p style="margin:4px 0 0;font-size:13px;opacity:.85">
              Order Status Update
            </p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:28px 24px;color:#334155">

            <p style="margin-top:0;font-size:15px">
              Hello <strong>${name || "Customer"}</strong>,
            </p>

            <p style="font-size:14px;line-height:1.6">
              We wanted to let you know that the status of your order has been updated.
            </p>

            <!-- STATUS BADGE -->
            <div style="margin:20px 0;text-align:center">
              <span style="
                display:inline-block;
                padding:10px 18px;
                border-radius:999px;
                background:${color};
                color:#ffffff;
                font-size:14px;
                font-weight:bold;
                letter-spacing:.5px;
              ">
                ${status.toUpperCase()}
              </span>
            </div>

            <!-- ORDER CARD -->
            <div style="
              background:#f8fafc;
              border-radius:10px;
              padding:16px;
              text-align:center;
              margin-bottom:20px
            ">
              <p style="margin:0;font-size:13px;color:#64748b">
                Order ID
              </p>
              <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#0f172a">
                #${orderId}
              </p>
            </div>

            <p style="font-size:14px;line-height:1.6">
              If you have any questions regarding your order, feel free to contact our support team.
            </p>

            <p style="margin-top:24px;font-size:14px">
              Thank you for choosing <strong>BioPeptide</strong>.
            </p>

            <p style="margin-bottom:0;font-size:14px">
              — BioPeptide Team
            </p>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:16px;background:#f8fafc;text-align:center;font-size:12px;color:#94a3b8">
            © ${new Date().getFullYear()} BioPeptide. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
    `,
  };
}


export function adminStatusEmail({ orderId, status, userEmail }) {
  return {
    subject: `Order ${orderId} status updated`,
    html: `
      <h3>Order Status Changed</h3>
      <p><b>Order:</b> ${orderId}</p>
      <p><b>New Status:</b> ${status}</p>
      <p><b>User:</b> ${userEmail}</p>
    `,
  };
}
