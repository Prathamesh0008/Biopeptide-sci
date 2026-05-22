//lib\mailer.js
import nodemailer from "nodemailer";

function createTransporter(prefix) {
  const host = process.env[`${prefix}_SMTP_HOST`];
  const port = Number(process.env[`${prefix}_SMTP_PORT`] || 465);
  const secure = process.env[`${prefix}_SMTP_SECURE`] === "true";
  const user = process.env[`${prefix}_SMTP_USER`];
  const pass = process.env[`${prefix}_SMTP_PASS`];

  if (!host || !user || !pass) {
    throw new Error(`Missing ${prefix} SMTP env variables`);
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export function getOrderTransporter() {
  return createTransporter("ORDER");
}

export function getContactTransporter() {
  return createTransporter("CONTACT");
}

export function getTransporter() {
  return getOrderTransporter();
}

