import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { sendMail } from "@/lib/sendMail";

export const dynamic = "force-dynamic";

function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

function welcomeEmailHtml({ email, unsubscribeToken }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bio-peptides.com";
  const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

  return `
    <div style="font-family: Arial, sans-serif; background:#f6fbfd; padding:30px;">
      <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:14px; padding:28px; border:1px solid #e5eef3;">
        <h2 style="color:#0a79a8; margin-top:0;">Stay Updated with BioPeptide</h2>

        <p style="font-size:15px; color:#333; line-height:1.7;">
          Thank you for subscribing to BioPeptide updates.
        </p>

        <p style="font-size:15px; color:#333; line-height:1.7;">
          You will receive research updates, product launches, exclusive offers,
          and important BioPeptide announcements.
        </p>

        <div style="background:#eef9fc; border-left:4px solid #52c3c6; padding:14px 16px; margin:22px 0;">
          <p style="margin:0; color:#24515c; font-size:14px;">
            Subscribed email: <strong>${email}</strong>
          </p>
        </div>

        <p style="font-size:13px; color:#777; line-height:1.6;">
          BioPeptide products and information are intended for research and informational purposes only.
        </p>

        <p style="font-size:12px; color:#999; margin-top:25px;">
          If you no longer want to receive emails, you can
          <a href="${unsubscribeUrl}" style="color:#0a79a8;">unsubscribe here</a>.
        </p>
      </div>
    </div>
  `;
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const email = body.email?.toLowerCase()?.trim();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    let subscriber = await NewsletterSubscriber.findOne({ email });

    if (subscriber) {
      if (subscriber.subscribed) {
        return NextResponse.json(
          { ok: false, error: "Email already subscribed." },
          { status: 409 }
        );
      }

      subscriber.subscribed = true;
      subscriber.unsubscribedAt = null;
      subscriber.source = "biopeptide-footer-newsletter";

      if (!subscriber.unsubscribeToken) {
        subscriber.unsubscribeToken = createToken();
      }

      await subscriber.save();

      try {
        await sendMail({
          to: email,
          subject: "You are subscribed again to BioPeptide updates",
          html: welcomeEmailHtml({
            email,
            unsubscribeToken: subscriber.unsubscribeToken,
          }),
          text: "You are subscribed again to BioPeptide updates.",
        });
      } catch (mailError) {
        console.error("Newsletter welcome email error:", mailError);
      }

      return NextResponse.json({
        ok: true,
        message: "You are subscribed again successfully.",
      });
    }

    subscriber = await NewsletterSubscriber.create({
      email,
      subscribed: true,
      interests: [
        "research-updates",
        "product-launches",
        "exclusive-offers",
        "discounts",
      ],
      source: "biopeptide-footer-newsletter",
      unsubscribeToken: createToken(),
    });

    try {
      await sendMail({
        to: email,
        subject: "Welcome to BioPeptide updates",
        html: welcomeEmailHtml({
          email,
          unsubscribeToken: subscriber.unsubscribeToken,
        }),
        text: "Thank you for subscribing to BioPeptide updates.",
      });
    } catch (mailError) {
      console.error("Newsletter welcome email error:", mailError);
    }

    return NextResponse.json({
      ok: true,
      message:
        "Subscribed successfully! You will receive research updates, product launches and exclusive offers.",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);

    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}