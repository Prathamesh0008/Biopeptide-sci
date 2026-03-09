// //peptides\app\api\contact\route.js
// import { getTransporter } from "@/lib/mailer";

// export async function POST(req) {
//   try {
//     const { name, email, subject, message } = await req.json();

//     if (!email || !message) {
//       return Response.json(
//         { ok: false, error: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     const transporter = getTransporter();
//     const from = process.env.MAIL_FROM || process.env.SMTP_USER;
//     const adminEmail = process.env.ADMIN_EMAIL;

//     /* -------- USER CONFIRMATION EMAIL -------- */
//    await transporter.sendMail({
//   from,
//   to: email,
//   subject: "We received your message — BioPeptide",
//   html: `
// <!DOCTYPE html>
// <html>
// <body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif">

// <table width="100%" cellpadding="0" cellspacing="0">
// <tr>
// <td align="center" style="padding:30px 12px">

// <table width="100%" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08)">

// <tr>
// <td style="padding:28px;text-align:center;
// background:linear-gradient(90deg,#52c3c6,#0a79a8,#0978a7);
// color:white">

// <div style="font-size:22px;font-weight:800">
// BioPeptide
// </div>

// <div style="font-size:13px;margin-top:6px;opacity:.9">
// Research Peptides & Scientific Supplies
// </div>

// </td>
// </tr>

// <tr>
// <td style="padding:28px">

// <div style="font-size:18px;font-weight:700;color:#0d2d47">
// Thank you${name ? `, ${name}` : ""} 👋
// </div>

// <p style="font-size:14px;color:#475569;margin-top:10px;line-height:1.6">
// We have successfully received your message. Our team will review it and respond shortly.
// </p>

// <div style="margin-top:18px;background:#f7fbff;border:1px solid #e6edf5;border-radius:10px;padding:14px">

// <div style="font-size:12px;color:#64748b">
// Subject
// </div>

// <div style="font-weight:600;color:#0f172a;margin-top:4px">
// ${subject || "Contact Inquiry"}
// </div>

// </div>

// <p style="font-size:12px;color:#64748b;margin-top:20px">
// You can reply to this email if you need further assistance.
// </p>

// </td>
// </tr>

// <tr>
// <td style="text-align:center;padding:16px;font-size:12px;color:#94a3b8;background:#f1f5f9">
// © ${new Date().getFullYear()} BioPeptide
// </td>
// </tr>

// </table>

// </td>
// </tr>
// </table>

// </body>
// </html>
// `,
// });

//     /* -------- ADMIN EMAIL -------- */
//     await transporter.sendMail({
//       from,
//       to: adminEmail,
//       subject: `📩 New Contact Form — ${subject || "No Subject"}`,
//      html: `
// <!DOCTYPE html>
// <html>
// <body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
//     <tr>
//       <td align="center" style="padding:0 14px;">

//         <table width="100%" style="max-width:640px;background:#ffffff;
//           border-radius:16px;overflow:hidden;
//           box-shadow:0 12px 34px rgba(2,6,23,0.10);">

//           <!-- HEADER -->
//           <tr>
//            <td style="
// background:linear-gradient(90deg,#52c3c6,#0a79a8,#0978a7);
// padding:22px;
// color:#ffffff;
// ">
//               <div style="font-size:20px;font-weight:900;color:#ffffff;">
//                 BioPeptide
//               </div>
//               <div style="font-size:13px;color:#c7d2fe;margin-top:4px;">
//                 New Contact Form Submission
//               </div>
//             </td>
//           </tr>

//           <!-- DETAILS -->
//           <tr>
//             <td style="padding:24px;color:#0f172a;">
//               <table width="100%" cellpadding="0" cellspacing="0"
//                 style="background:#f0fbff;border-radius:14px;border:1px solid #e5e7eb;">
//                 <tr>
//                   <td style="padding:14px;">
//                     <div style="font-size:12px;color:#64748b;">Name</div>
//                     <div style="font-weight:700;">${name || "-"}</div>
//                   </td>
//                   <td style="padding:14px;">
//                     <div style="font-size:12px;color:#64748b;">Email</div>
//                     <div style="font-weight:700;">${email}</div>
//                   </td>
//                 </tr>
//               </table>

//               <div style="margin-top:18px;">
//                 <div style="font-size:12px;color:#64748b;">Subject</div>
//                 <div style="font-weight:700;margin-top:4px;">
//                   ${subject || "-"}
//                 </div>
//               </div>

//               <div style="margin-top:18px;">
//                 <div style="font-size:12px;color:#64748b;">Message</div>
//                 <div style="margin-top:6px;font-size:14px;color:#475569;
//                   background:#f0fbff;border-radius:14px;padding:16px;line-height:1.7;">
//                   ${message}
//                 </div>
//               </div>
//             </td>
//           </tr>

//           <!-- FOOTER -->
//           <tr>
//             <td style="padding:14px;background:#f1f5f9;text-align:center;
//               font-size:12px;color:#64748b;">
//               BioPeptide Admin Notification
//             </td>
//           </tr>

//         </table>

//       </td>
//     </tr>
//   </table>
// </body>
// </html>
// `,

//     });

//     return Response.json({ ok: true });
//   } catch (err) {
//     console.error("CONTACT_EMAIL_ERROR:", err);
//     return Response.json(
//       { ok: false },
//       { status: 500 }
//     );
//   }
// }

//peptides/app/api/contact/route.js
import { getTransporter } from "@/lib/mailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!email || !message) {
      return Response.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;
    const adminEmail =
      process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    /* ---------------- USER EMAIL ---------------- */

    await transporter.sendMail({
      from,
      to: email,
      subject: "We received your message — BioPeptide",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 12px">

<table width="100%" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08)">

<tr>
<td style="padding:30px;text-align:center;background:linear-gradient(90deg,#52c3c6,#0a79a8,#0978a7);color:white">

<div style="font-size:24px;font-weight:800">
BioPeptide
</div>

<div style="font-size:13px;margin-top:6px;opacity:.9">
Premium Research Peptides & Scientific Supplies
</div>

</td>
</tr>

<tr>
<td style="padding:30px">

<div style="font-size:18px;font-weight:700;color:#0d2d47">
Thank you${name ? `, ${name}` : ""} 👋
</div>

<p style="font-size:14px;color:#475569;margin-top:12px;line-height:1.7">
We have successfully received your message. Our support team will review your request and respond shortly.
</p>

<div style="margin-top:20px;background:#f6fbff;border:1px solid #e6edf5;border-radius:10px;padding:16px">

<div style="font-size:12px;color:#64748b">
Subject
</div>

<div style="font-weight:600;color:#0f172a;margin-top:4px">
${subject || "Contact Inquiry"}
</div>

</div>

<p style="font-size:12px;color:#64748b;margin-top:22px">
You can reply directly to this email if you need further assistance.
</p>

</td>
</tr>

<tr>
<td style="text-align:center;padding:18px;font-size:12px;color:#94a3b8;background:#f1f5f9">
© ${new Date().getFullYear()} BioPeptide
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
    });

    /* ---------------- ADMIN EMAIL ---------------- */

    await transporter.sendMail({
      from,
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Form — ${subject || "No Subject"}`,
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 12px">

<table width="100%" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08)">

<tr>
<td style="padding:26px;background:linear-gradient(90deg,#52c3c6,#0a79a8,#0978a7);color:white">

<div style="font-size:20px;font-weight:800">
BioPeptide Admin
</div>

<div style="font-size:12px;margin-top:4px;opacity:.9">
New Contact Form Submission
</div>

</td>
</tr>

<tr>
<td style="padding:28px">

<table width="100%" style="border:1px solid #e6edf5;border-radius:10px;background:#f7fbff">

<tr>
<td style="padding:14px">
<div style="font-size:12px;color:#64748b">Name</div>
<div style="font-weight:600">${name || "-"}</div>
</td>

<td style="padding:14px">
<div style="font-size:12px;color:#64748b">Email</div>
<div style="font-weight:600">${email}</div>
</td>
</tr>

</table>

<div style="margin-top:18px">
<div style="font-size:12px;color:#64748b">Subject</div>
<div style="font-weight:600;margin-top:4px">${subject || "-"}</div>
</div>

<div style="margin-top:18px">
<div style="font-size:12px;color:#64748b">Message</div>

<div style="margin-top:6px;background:#f7fbff;border:1px solid #e6edf5;border-radius:10px;padding:16px;font-size:14px;color:#475569;line-height:1.6">
${message.replace(/\n/g, "<br>")}
</div>

</div>

</td>
</tr>

<tr>
<td style="text-align:center;padding:18px;font-size:12px;color:#94a3b8;background:#f1f5f9">
BioPeptide Contact System
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_EMAIL_ERROR:", err);
    return Response.json(
      { ok: false },
      { status: 500 }
    );
  }
}




