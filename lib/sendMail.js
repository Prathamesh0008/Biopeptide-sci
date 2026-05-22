import nodemailer from "nodemailer";

export async function sendMail({ to, subject, html, text }) {
  const host = process.env.ORDER_SMTP_HOST;
  const port = Number(process.env.ORDER_SMTP_PORT || 465);
  const secure = process.env.ORDER_SMTP_SECURE === "true";
  const user = process.env.ORDER_SMTP_USER;
  const pass = process.env.ORDER_SMTP_PASS;

  if (!host || !user || !pass) {
    console.log("ORDER SMTP missing:", {
      host: Boolean(host),
      user: Boolean(user),
      pass: Boolean(pass),
    });

    throw new Error("ORDER SMTP is not configured.");
  }

  console.log("Newsletter using ORDER SMTP:", {
    host,
    port,
    secure,
    user,
    hasPass: Boolean(pass),
  });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const fromName = "BioPeptide";
  const fromEmail = user;

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("Newsletter email sent:", info.messageId);

  return info;
}