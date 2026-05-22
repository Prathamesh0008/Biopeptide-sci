import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { sendMail } from "@/lib/sendMail";

export const dynamic = "force-dynamic";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function newsletterUpdateHtml({
  title,
  message,
  buttonText,
  buttonUrl,
  unsubscribeToken,
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bio-peptides.com";
  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const safeButtonText = escapeHtml(buttonText || "Visit BioPeptide");
  const safeButtonUrl = buttonUrl || siteUrl;

  return `
    <div style="font-family: Arial, sans-serif; background:#f6fbfd; padding:30px;">
      <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:14px; padding:28px; border:1px solid #e5eef3;">
        <h2 style="color:#0a79a8; margin-top:0;">${safeTitle}</h2>

        <p style="font-size:15px; color:#333; line-height:1.7;">
          ${safeMessage}
        </p>

        <div style="margin:26px 0;">
          <a href="${safeButtonUrl}" style="background:#0a79a8;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:bold;">
            ${safeButtonText}
          </a>
        </div>

        <p style="font-size:13px; color:#777; line-height:1.6;">
          You are receiving this email because you subscribed to BioPeptide updates.
        </p>

        <p style="font-size:12px; color:#999; margin-top:25px;">
          <a href="${unsubscribeUrl}" style="color:#0a79a8;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;
}

export async function POST(req) {
  try {
    const secret = req.headers.get("x-newsletter-secret");

    if (!process.env.NEWSLETTER_ADMIN_SECRET) {
      return NextResponse.json(
        { ok: false, error: "NEWSLETTER_ADMIN_SECRET is missing." },
        { status: 500 }
      );
    }

    if (secret !== process.env.NEWSLETTER_ADMIN_SECRET) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await req.json();

    const subject = body.subject?.trim();
    const title = body.title?.trim();
    const message = body.message?.trim();
    const buttonText = body.buttonText?.trim() || "Visit BioPeptide";
    const buttonUrl = body.buttonUrl?.trim();

    if (!subject || !title || !message) {
      return NextResponse.json(
        {
          ok: false,
          error: "Subject, title and message are required.",
        },
        { status: 400 }
      );
    }

    const subscribers = await NewsletterSubscriber.find({
      subscribed: true,
      email: { $exists: true, $ne: "" },
    }).select("email unsubscribeToken");

    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      try {
        await sendMail({
          to: subscriber.email,
          subject,
          html: newsletterUpdateHtml({
            title,
            message,
            buttonText,
            buttonUrl,
            unsubscribeToken: subscriber.unsubscribeToken,
          }),
          text: message,
        });

        await NewsletterSubscriber.updateOne(
          { _id: subscriber._id },
          { $set: { lastEmailSentAt: new Date() } }
        );

        sent++;
      } catch (mailError) {
        console.error("Newsletter send failed:", subscriber.email, mailError);
        failed++;
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Newsletter update sent.",
      totalSubscribers: subscribers.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Newsletter send route error:", error);

    return NextResponse.json(
      { ok: false, error: "Something went wrong while sending newsletter." },
      { status: 500 }
    );
  }
}