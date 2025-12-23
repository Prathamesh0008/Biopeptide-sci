//app\api\auth\login\route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

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

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return Response.json(
        { ok: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔐 CREATE JWT
    const token = await new SignJWT({
      id: user._id.toString(),
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    // 🍪 IMPORTANT: await cookies()
    const cookieStore = await cookies();
    cookieStore.set("auth", token, {
      httpOnly: true,
      sameSite: "lax", // required for localhost
      secure: process.env.NODE_ENV === "production",
      path: "/",
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
    console.error("LOGIN_ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
