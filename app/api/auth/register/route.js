//app\api\auth\register\route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, password } = body;

    console.log("REGISTER BODY:", body);

    if (!email || !password) {
      return Response.json(
        { ok: false, error: "Email and password required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json(
        { ok: false, error: "User already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name || "",
      email,
      passwordHash,
      role: "user",
    });

    console.log("USER CREATED:", user._id);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("REGISTER_ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
