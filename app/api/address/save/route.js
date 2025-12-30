//peptides\app\api\address\save\route.js
import dbConnect from "@/lib/dbConnect";
import Address from "@/models/Address";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { userId, address } = body;

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const saved = await Address.create({
    userId,
    ...address,
  });

  return new Response(JSON.stringify(saved), { status: 200 });
}
