// app/api/auth/login/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { ok: false, error: "Email & password required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return Response.json(
        { ok: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return Response.json(
        { ok: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

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
    console.error("LOGIN_ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
