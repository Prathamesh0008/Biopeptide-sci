import dbConnect from "@/lib/dbConnect";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return new Response("Invalid unsubscribe link.", { status: 400 });
    }

    const subscriber = await NewsletterSubscriber.findOne({
      unsubscribeToken: token,
    });

    if (!subscriber) {
      return new Response("Invalid or expired unsubscribe link.", {
        status: 404,
      });
    }

    subscriber.subscribed = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return new Response(
      `
      <html>
        <body style="font-family:Arial,sans-serif;background:#f6fbfd;padding:40px;">
          <div style="max-width:560px;margin:auto;background:white;padding:30px;border-radius:14px;border:1px solid #e5eef3;">
            <h2 style="color:#0a79a8;">You have been unsubscribed</h2>
            <p style="color:#333;line-height:1.7;">
              You will no longer receive BioPeptide newsletter emails.
            </p>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);

    return new Response("Something went wrong.", { status: 500 });
  }
}