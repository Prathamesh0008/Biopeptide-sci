






const LOGO_URL = "https://biopeptide07.vercel.app/images/Biologo.png";


function money(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

export function userOrderEmail({ orderId, name, total, items, address }) {
  const itemRows = (items || [])
    .map(
      (it) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-size:14px;">
          <div style="font-weight:600">${it.name}</div>
          <div style="color:#64748b;font-size:12px;margin-top:4px;">
            Qty: ${it.qty}
          </div>
        </td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-size:14px;font-weight:600;">
          ${money(it.price * it.qty)}
        </td>
      </tr>
    `
    )
    .join("");

  return {
    subject: `✅ Order Confirmed — ${orderId}`,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Order Confirmed</title>
</head>

<body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8fb;padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 14px;">

        <!-- OUTER CARD -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 34px rgba(2,6,23,0.10);">
          
          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d2d47,#22c55e);padding:22px 22px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
<div style="text-align:left;">
  <div style="
    font-size:22px;
    font-weight:900;
    letter-spacing:0.6px;
    color:#ffffff;
  ">
    BioPeptide
  </div>
  <div style="
    margin-top:6px;
    font-size:13px;
    color:#d1fae5;
    letter-spacing:0.3px;
  ">
    Premium Research Peptides & Scientific Supplies
  </div>
</div>


                  </td>
                  <td align="right" valign="middle" style="color:#eafff5;font-size:12px;">
                    <div style="opacity:0.95;">Order Confirmed</div>
                    <div style="font-weight:700;margin-top:4px;">${orderId}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:26px 22px 10px 22px;">
              
              <!-- GREETING -->
              <div style="font-size:18px;font-weight:800;color:#0f172a;">
                Thank you${name ? `, ${name}` : ""}! 🎉
              </div>
              <div style="margin-top:8px;color:#475569;font-size:14px;line-height:1.6;">
                Your order has been placed successfully. We’ll email you updates when your order status changes.
              </div>

              <!-- SUMMARY STRIP -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
                <tr>
                  <td style="padding:14px 14px;">
                    <div style="color:#64748b;font-size:12px;">Total Amount</div>
                    <div style="color:#16a34a;font-size:22px;font-weight:900;margin-top:4px;">
                      ${money(total)}
                    </div>
                  </td>
                  <td align="right" style="padding:14px 14px;">
                    <div style="display:inline-block;background:#0d2d47;color:#ffffff;font-size:12px;padding:8px 12px;border-radius:999px;font-weight:700;">
                      Status: Pending
                    </div>
                  </td>
                </tr>
              </table>

              <!-- ORDER ITEMS -->
              <div style="margin-top:22px;font-size:15px;font-weight:800;color:#0f172a;">
                Order Items
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
                ${itemRows}
                <tr>
                  <td style="padding-top:14px;color:#64748b;font-size:13px;">
                    Subtotal
                  </td>
                  <td align="right" style="padding-top:14px;color:#0f172a;font-size:13px;font-weight:700;">
                    ${money(total)}
                  </td>
                </tr>
              </table>

              <!-- ADDRESS + SUPPORT -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
                <tr>
                  <td valign="top" style="width:50%;padding-right:10px;">
                    <div style="font-size:14px;font-weight:800;color:#0f172a;">Shipping Address</div>
                    <div style="margin-top:8px;color:#475569;font-size:13px;line-height:1.6;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px;">
                      <div style="font-weight:700;color:#0f172a;">${address.fullName}</div>
                      <div style="margin-top:6px;">
                        ${address.house}${address.area ? `, ${address.area}` : ""}<br/>
                        ${address.city}, ${address.state} – ${address.pincode}<br/>
                        ${address.country}<br/>
                        📞 ${address.phone}
                      </div>
                    </div>
                  </td>
                  <td valign="top" style="width:50%;padding-left:10px;">
                    <div style="font-size:14px;font-weight:800;color:#0f172a;">Need help?</div>
                    <div style="margin-top:8px;color:#475569;font-size:13px;line-height:1.6;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px;">
                      <div style="font-weight:700;color:#0f172a;">Support</div>
                      <div style="margin-top:6px;">
                        Reply to this email and our team will assist you.<br/>
                        <span style="color:#64748b;">(We usually respond within 24 hours)</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center;margin:24px 0 8px 0;">
                <a href="https://biopeptide-sci-jvrd.vercel.app/orders"
                   style="display:inline-block;padding:12px 26px;border-radius:999px;
                          background:linear-gradient(135deg,#0d2d47,#22c55e);
                          color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;">
                  View My Orders
                </a>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:16px 22px;background:#f1f5f9;color:#64748b;font-size:12px;line-height:1.6;text-align:center;">
              © ${new Date().getFullYear()} BioPeptide • All rights reserved<br/>
              This email was sent because you placed an order on BioPeptide.
            </td>
          </tr>

        </table>

        <!-- BOTTOM SPACER -->
        <div style="height:18px;"></div>

      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}

export function adminOrderEmail({ orderId, userEmail, name, total, items, address }) {
  const itemList = (items || [])
    .map((it) => `<li style="margin:6px 0;">${it.name} × ${it.qty} — <b>${money(it.price * it.qty)}</b></li>`)
    .join("");

  return {
    subject: `🛒 New Order — ${orderId}`,
    html: `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 14px;">
        <table width="100%" style="max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 34px rgba(2,6,23,0.10);">
          <tr>
            <td style="background:#0d2d47;padding:18px 22px;color:#ffffff;">
              <div style="display:flex;align-items:center;gap:12px;">
                <img src="${LOGO_URL}" alt="BioPeptide" width="40" height="40"
                  style="display:block;border-radius:10px;background:#ffffff;padding:6px;" />
                <div>
                  <div style="font-weight:900;font-size:16px;">New Order Received</div>
                  <div style="opacity:0.9;font-size:12px;margin-top:2px;">Order ID: ${orderId}</div>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:22px;color:#0f172a;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
                <tr>
                  <td style="padding:14px;">
                    <div style="color:#64748b;font-size:12px;">Customer</div>
                    <div style="font-weight:800;margin-top:4px;">${name || "-"}</div>
                    <div style="color:#475569;font-size:13px;margin-top:2px;">${userEmail || "-"}</div>
                  </td>
                  <td align="right" style="padding:14px;">
                    <div style="color:#64748b;font-size:12px;">Total</div>
                    <div style="color:#16a34a;font-size:20px;font-weight:900;margin-top:4px;">
                      ${money(total)}
                    </div>
                  </td>
                </tr>
              </table>

              <h3 style="margin:18px 0 8px 0;">Items</h3>
              <ul style="margin:0;padding-left:18px;color:#334155;font-size:13px;line-height:1.6;">
                ${itemList}
              </ul>

              <h3 style="margin:18px 0 8px 0;">Shipping Address</h3>
              <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px;color:#475569;font-size:13px;line-height:1.6;">
                <b style="color:#0f172a;">${address.fullName}</b><br/>
                ${address.house}${address.area ? `, ${address.area}` : ""}<br/>
                ${address.city}, ${address.state} – ${address.pincode}<br/>
                ${address.country}<br/>
                📞 ${address.phone}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px;background:#f1f5f9;color:#64748b;font-size:12px;text-align:center;">
              BioPeptide Admin Notification
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}
















// const LOGO_URL = "https://biopeptide07.vercel.app/images/Biologo.png";


// function money(n) {
//   return `$${Number(n || 0).toFixed(2)}`;
// }

// export function userOrderEmail({ orderId, name, total, items, address }) {
//   const itemRows = (items || [])
//     .map(
//       (it) => `
//       <tr>
//         <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-size:14px;">
//           <div style="font-weight:600">${it.name}</div>
//           <div style="color:#64748b;font-size:12px;margin-top:4px;">
//             Qty: ${it.qty}
//           </div>
//         </td>
//         <td align="right" style="padding:12px 0;border-bottom:1px solid #e5e7eb;color:#0f172a;font-size:14px;font-weight:600;">
//           ${money(it.price * it.qty)}
//         </td>
//       </tr>
//     `
//     )
//     .join("");

//   return {
//     subject: `✅ Order Confirmed — ${orderId}`,
//     html: `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width" />
//   <title>Order Confirmed</title>
// </head>

// <body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8fb;padding:24px 0;">
//     <tr>
//       <td align="center" style="padding:0 14px;">

//         <!-- OUTER CARD -->
//         <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 34px rgba(2,6,23,0.10);">
          
//           <!-- HEADER -->
//           <tr>
//             <td style="background:linear-gradient(135deg,#0d2d47,#22c55e);padding:22px 22px;">
//               <table width="100%" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <td valign="middle">
//                     <div style="display:flex;align-items:center;">
//   <img src="${LOGO_URL}" alt="BioPeptide" width="56" height="56"
//     style="
//       display:block;
//       border-radius:14px;
//       background:#ffffff;
//       padding:8px;
//     " />
// </div>

//                   </td>
//                   <td align="right" valign="middle" style="color:#eafff5;font-size:12px;">
//                     <div style="opacity:0.95;">Order Confirmed</div>
//                     <div style="font-weight:700;margin-top:4px;">${orderId}</div>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- CONTENT -->
//           <tr>
//             <td style="padding:26px 22px 10px 22px;">
              
//               <!-- GREETING -->
//               <div style="font-size:18px;font-weight:800;color:#0f172a;">
//                 Thank you${name ? `, ${name}` : ""}! 🎉
//               </div>
//               <div style="margin-top:8px;color:#475569;font-size:14px;line-height:1.6;">
//                 Your order has been placed successfully. We’ll email you updates when your order status changes.
//               </div>

//               <!-- SUMMARY STRIP -->
//               <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
//                 <tr>
//                   <td style="padding:14px 14px;">
//                     <div style="color:#64748b;font-size:12px;">Total Amount</div>
//                     <div style="color:#16a34a;font-size:22px;font-weight:900;margin-top:4px;">
//                       ${money(total)}
//                     </div>
//                   </td>
//                   <td align="right" style="padding:14px 14px;">
//                     <div style="display:inline-block;background:#0d2d47;color:#ffffff;font-size:12px;padding:8px 12px;border-radius:999px;font-weight:700;">
//                       Status: Pending
//                     </div>
//                   </td>
//                 </tr>
//               </table>

//               <!-- ORDER ITEMS -->
//               <div style="margin-top:22px;font-size:15px;font-weight:800;color:#0f172a;">
//                 Order Items
//               </div>

//               <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;">
//                 ${itemRows}
//                 <tr>
//                   <td style="padding-top:14px;color:#64748b;font-size:13px;">
//                     Subtotal
//                   </td>
//                   <td align="right" style="padding-top:14px;color:#0f172a;font-size:13px;font-weight:700;">
//                     ${money(total)}
//                   </td>
//                 </tr>
//               </table>

//               <!-- ADDRESS + SUPPORT -->
//               <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
//                 <tr>
//                   <td valign="top" style="width:50%;padding-right:10px;">
//                     <div style="font-size:14px;font-weight:800;color:#0f172a;">Shipping Address</div>
//                     <div style="margin-top:8px;color:#475569;font-size:13px;line-height:1.6;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px;">
//                       <div style="font-weight:700;color:#0f172a;">${address.fullName}</div>
//                       <div style="margin-top:6px;">
//                         ${address.house}${address.area ? `, ${address.area}` : ""}<br/>
//                         ${address.city}, ${address.state} – ${address.pincode}<br/>
//                         ${address.country}<br/>
//                         📞 ${address.phone}
//                       </div>
//                     </div>
//                   </td>
//                   <td valign="top" style="width:50%;padding-left:10px;">
//                     <div style="font-size:14px;font-weight:800;color:#0f172a;">Need help?</div>
//                     <div style="margin-top:8px;color:#475569;font-size:13px;line-height:1.6;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px;">
//                       <div style="font-weight:700;color:#0f172a;">Support</div>
//                       <div style="margin-top:6px;">
//                         Reply to this email and our team will assist you.<br/>
//                         <span style="color:#64748b;">(We usually respond within 24 hours)</span>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               </table>

//               <!-- CTA -->
//               <div style="text-align:center;margin:24px 0 8px 0;">
//                 <a href="https://biopeptide-sci-jvrd.vercel.app/orders"
//                    style="display:inline-block;padding:12px 26px;border-radius:999px;
//                           background:linear-gradient(135deg,#0d2d47,#22c55e);
//                           color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;">
//                   View My Orders
//                 </a>
//               </div>

//             </td>
//           </tr>

//           <!-- FOOTER -->
//           <tr>
//             <td style="padding:16px 22px;background:#f1f5f9;color:#64748b;font-size:12px;line-height:1.6;text-align:center;">
//               © ${new Date().getFullYear()} BioPeptide • All rights reserved<br/>
//               This email was sent because you placed an order on BioPeptide.
//             </td>
//           </tr>

//         </table>

//         <!-- BOTTOM SPACER -->
//         <div style="height:18px;"></div>

//       </td>
//     </tr>
//   </table>
// </body>
// </html>`,
//   };
// }

// export function adminOrderEmail({ orderId, userEmail, name, total, items, address }) {
//   const itemList = (items || [])
//     .map((it) => `<li style="margin:6px 0;">${it.name} × ${it.qty} — <b>${money(it.price * it.qty)}</b></li>`)
//     .join("");

//   return {
//     subject: `🛒 New Order — ${orderId}`,
//     html: `<!DOCTYPE html>
// <html>
// <body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
//     <tr>
//       <td align="center" style="padding:0 14px;">
//         <table width="100%" style="max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 34px rgba(2,6,23,0.10);">
//           <tr>
//             <td style="background:#0d2d47;padding:18px 22px;color:#ffffff;">
//               <div style="display:flex;align-items:center;gap:12px;">
//                 <img src="${LOGO_URL}" alt="BioPeptide" width="40" height="40"
//                   style="display:block;border-radius:10px;background:#ffffff;padding:6px;" />
//                 <div>
//                   <div style="font-weight:900;font-size:16px;">New Order Received</div>
//                   <div style="opacity:0.9;font-size:12px;margin-top:2px;">Order ID: ${orderId}</div>
//                 </div>
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <td style="padding:22px;color:#0f172a;">
//               <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;">
//                 <tr>
//                   <td style="padding:14px;">
//                     <div style="color:#64748b;font-size:12px;">Customer</div>
//                     <div style="font-weight:800;margin-top:4px;">${name || "-"}</div>
//                     <div style="color:#475569;font-size:13px;margin-top:2px;">${userEmail || "-"}</div>
//                   </td>
//                   <td align="right" style="padding:14px;">
//                     <div style="color:#64748b;font-size:12px;">Total</div>
//                     <div style="color:#16a34a;font-size:20px;font-weight:900;margin-top:4px;">
//                       ${money(total)}
//                     </div>
//                   </td>
//                 </tr>
//               </table>

//               <h3 style="margin:18px 0 8px 0;">Items</h3>
//               <ul style="margin:0;padding-left:18px;color:#334155;font-size:13px;line-height:1.6;">
//                 ${itemList}
//               </ul>

//               <h3 style="margin:18px 0 8px 0;">Shipping Address</h3>
//               <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px;color:#475569;font-size:13px;line-height:1.6;">
//                 <b style="color:#0f172a;">${address.fullName}</b><br/>
//                 ${address.house}${address.area ? `, ${address.area}` : ""}<br/>
//                 ${address.city}, ${address.state} – ${address.pincode}<br/>
//                 ${address.country}<br/>
//                 📞 ${address.phone}
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <td style="padding:14px 22px;background:#f1f5f9;color:#64748b;font-size:12px;text-align:center;">
//               BioPeptide Admin Notification
//             </td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>`,
//   };
// }






