import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  try {
    await dbConnect();

    const cookieStore = cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {
      return Response.json({ ok: false });
    }

    const { payload } = await jwtVerify(token, secret);
    const body = await req.json();

    const user = await User.findByIdAndUpdate(
      payload.id,
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
      { new: true }
    );

    return Response.json({
      ok: true,
      user,
    });
  } catch (err) {
    return Response.json({ ok: false });
  }
}