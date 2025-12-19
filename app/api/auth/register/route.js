// app/api/auth/register/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const { name = "", email, password, phone = "" } = await req.json();

    if (!email || !password) {
      return Response.json(
        { ok: false, error: "Email & password required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return Response.json(
        { ok: false, error: "User already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      role: "user",
    });

    return Response.json({
      ok: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("REGISTER_ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
