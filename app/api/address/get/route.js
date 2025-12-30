//peptides\app\api\address\get\route.js
import dbConnect from "@/lib/dbConnect";
import Address from "@/models/Address";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const addresses = await Address.find({ userId })
  .sort({ createdAt: -1 });

return new Response(JSON.stringify(addresses), { status: 200 });

}
