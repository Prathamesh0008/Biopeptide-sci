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
    const adminEmail = process.env.ADMIN_EMAIL;

    /* -------- USER CONFIRMATION EMAIL -------- */
    await transporter.sendMail({
      from,
      to: email,
      subject: "✅ We received your message — BioPeptide",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 14px;">

        <table width="100%" style="max-width:640px;background:#ffffff;
          border-radius:16px;overflow:hidden;
          box-shadow:0 12px 34px rgba(2,6,23,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d2d47,#22c55e);
              padding:26px;text-align:center;">
              <div style="font-size:22px;font-weight:900;color:#ffffff;">
                BioPeptide
              </div>
              <div style="margin-top:6px;font-size:13px;color:#d1fae5;">
                Premium Research Peptides & Scientific Supplies
              </div>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:26px;color:#0f172a;">
              <div style="font-size:18px;font-weight:800;">
                Thank you${name ? `, ${name}` : ""}! 👋
              </div>

              <p style="margin-top:10px;font-size:14px;color:#475569;line-height:1.7;">
                We’ve received your message.  
                Our team will review it and get back to you shortly.
              </p>

              <div style="margin-top:18px;background:#f8fafc;
                border:1px solid #e5e7eb;border-radius:14px;padding:16px;">
                <div style="font-size:12px;color:#64748b;">Subject</div>
                <div style="font-weight:700;margin-top:4px;">
                  ${subject || "Contact Inquiry"}
                </div>
              </div>

              <p style="margin-top:20px;font-size:13px;color:#64748b;">
                This is a confirmation email — no action is required.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:14px;background:#f1f5f9;text-align:center;
              font-size:12px;color:#64748b;">
              © ${new Date().getFullYear()} BioPeptide • All rights reserved
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

    /* -------- ADMIN EMAIL -------- */
    await transporter.sendMail({
      from,
      to: adminEmail,
      subject: `📩 New Contact Form — ${subject || "No Subject"}`,
     html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 14px;">

        <table width="100%" style="max-width:640px;background:#ffffff;
          border-radius:16px;overflow:hidden;
          box-shadow:0 12px 34px rgba(2,6,23,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background:#0d2d47;padding:22px;">
              <div style="font-size:20px;font-weight:900;color:#ffffff;">
                BioPeptide
              </div>
              <div style="font-size:13px;color:#c7d2fe;margin-top:4px;">
                New Contact Form Submission
              </div>
            </td>
          </tr>

          <!-- DETAILS -->
          <tr>
            <td style="padding:24px;color:#0f172a;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8fafc;border-radius:14px;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:14px;">
                    <div style="font-size:12px;color:#64748b;">Name</div>
                    <div style="font-weight:700;">${name || "-"}</div>
                  </td>
                  <td style="padding:14px;">
                    <div style="font-size:12px;color:#64748b;">Email</div>
                    <div style="font-weight:700;">${email}</div>
                  </td>
                </tr>
              </table>

              <div style="margin-top:18px;">
                <div style="font-size:12px;color:#64748b;">Subject</div>
                <div style="font-weight:700;margin-top:4px;">
                  ${subject || "-"}
                </div>
              </div>

              <div style="margin-top:18px;">
                <div style="font-size:12px;color:#64748b;">Message</div>
                <div style="margin-top:6px;font-size:14px;color:#475569;
                  background:#f8fafc;border-radius:14px;padding:16px;line-height:1.7;">
                  ${message}
                </div>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:14px;background:#f1f5f9;text-align:center;
              font-size:12px;color:#64748b;">
              BioPeptide Admin Notification
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
//     await transporter.sendMail({
//       from,
//       to: email,
//       subject: "✅ We received your message — BioPeptide",
//       html: `
//       <div style="font-family:Arial,sans-serif;background:#f4f8fb;padding:24px;">
//         <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:24px;">
//           <h2 style="color:#0d2d47;">BioPeptide</h2>
//           <p style="color:#475569;font-size:14px;">
//             Hi ${name || "there"},
//           </p>
//           <p style="color:#475569;font-size:14px;line-height:1.6;">
//             Thank you for contacting BioPeptide.  
//             Our team has received your message and will respond shortly.
//           </p>
//           <p style="font-size:13px;color:#64748b;margin-top:18px;">
//             Subject: <b>${subject || "Contact Request"}</b>
//           </p>
//         </div>
//       </div>
//       `,
//     });

//     /* -------- ADMIN EMAIL -------- */
//     await transporter.sendMail({
//       from,
//       to: adminEmail,
//       subject: `📩 New Contact Form — ${subject || "No Subject"}`,
//       html: `
//       <div style="font-family:Arial,sans-serif;background:#f4f8fb;padding:24px;">
//         <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;padding:24px;">
//           <h2 style="color:#0d2d47;">New Contact Form Submission</h2>

//           <p><b>Name:</b> ${name || "-"}</p>
//           <p><b>Email:</b> ${email}</p>
//           <p><b>Subject:</b> ${subject || "-"}</p>

//           <hr style="margin:16px 0"/>

//           <p style="white-space:pre-line;color:#475569;">
//             ${message}
//           </p>
//         </div>
//       </div>
//       `,
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
