import nodemailer from "nodemailer";

export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("Missing SMTP env variables");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}
