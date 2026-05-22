//app\api\contact\route.js
import { getContactTransporter } from "@/lib/mailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!email || !message) {
      return Response.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const transporter = getContactTransporter();
    const from = process.env.CONTACT_MAIL_FROM || process.env.CONTACT_SMTP_USER;
    const adminEmail =
      process.env.ADMIN_EMAIL || process.env.CONTACT_SMTP_USER;

    await transporter.sendMail({
      from,
      to: email,
      subject: "We received your message - BioPeptide",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 12px">
        <table width="100%" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08)">
          <tr>
            <td style="padding:30px;text-align:center;background:linear-gradient(90deg,#51c4c7,#0978a7,#0978a7);color:white">
              <div style="font-size:26px;font-weight:800">BioPeptide</div>
              <div style="font-size:13px;margin-top:6px;opacity:.9">Premium Research Peptides & Scientific Supplies</div>
            </td>
          </tr>
          <tr>
            <td style="padding:30px">
              <div style="font-size:18px;font-weight:700;color:#0d2d47">Thank you${name ? `, ${name}` : ""}</div>
              <p style="font-size:14px;color:#475569;margin-top:12px;line-height:1.7">
                We have successfully received your message. Our support team will review your request and respond shortly.
              </p>
              <div style="margin-top:20px;background:#f0fbfd;border:1px solid #d8eef3;border-radius:10px;padding:16px">
                <div style="font-size:12px;color:#64748b">Subject</div>
                <div style="font-weight:600;color:#0f172a;margin-top:4px">${subject || "Contact Inquiry"}</div>
              </div>
              <p style="font-size:12px;color:#64748b;margin-top:22px">
                You can reply directly to this email if you need further assistance.
              </p>
            </td>
          </tr>
          <tr>
            <td style="text-align:center;padding:18px;font-size:12px;color:#94a3b8;background:#f1f5f9">
              &copy; ${new Date().getFullYear()} BioPeptide
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

    await transporter.sendMail({
      from,
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Form - ${subject || "No Subject"}`,
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 12px">
        <table width="100%" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08)">
          <tr>
            <td style="padding:26px;background:linear-gradient(90deg,#51c4c7,#0978a7,#0978a7);color:white">
              <div style="font-size:22px;font-weight:800">BioPeptide Admin</div>
              <div style="font-size:12px;margin-top:4px;opacity:.9">New Contact Form Submission</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px">
              <table width="100%" style="border:1px solid #e6edf5;border-radius:10px;background:#f0fbfd">
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
                <div style="margin-top:6px;background:#f0fbfd;border:1px solid #d8eef3;border-radius:10px;padding:16px;font-size:14px;color:#475569;line-height:1.6">
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
    return Response.json({ ok: false }, { status: 500 });
  }
}
