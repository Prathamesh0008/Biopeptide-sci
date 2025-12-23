//app\login\page.jsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const mergeGuestCartToUser = (user) => {
  const guestCart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
  if (!guestCart.length) return;

  const userCartKey = `bio-cart-${user.email}`;
  const userCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");

  const merged = [...userCart];

  guestCart.forEach((g) => {
    const existing = merged.find((u) => u.id === g.id);
    if (existing) {
      existing.qty += g.qty;
    } else {
      merged.push(g);
    }
  });

  localStorage.setItem(userCartKey, JSON.stringify(merged));
  localStorage.removeItem("guest-cart");
};

  const submitLogin = async () => {
    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
  alert(data.error || "Login failed");
  setLoading(false);
  return;
}



// save user for frontend
localStorage.setItem("bio-user", JSON.stringify(data.user));
mergeGuestCartToUser(data.user);


// admin flow
if (data.user.role === "admin") {
  router.push("/admin/dashboard");
  return;
}


// return to intended page (checkout/cart)
const next = localStorage.getItem("bio-after-login");
if (next) {
  localStorage.removeItem("bio-after-login");
  router.push(next);
  return;
}

// normal user → profile
router.push("/profile");

  };

  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-gradient-to-br from-white via-[#e8f7ff] to-[#d6ffe9] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Floating background */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-bioBlue/10 rounded-full blur-2xl"
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-16 right-16 w-24 h-24 bg-bioGreen/10 rounded-full blur-2xl"
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-5xl bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl border overflow-hidden"
      >
        <div className="grid md:grid-cols-2">

          {/* LEFT */}
          <div className="p-10 bg-gradient-to-br from-bioBlue/5 to-bioGreen/5">
            <h2 className="text-2xl font-bold text-[#0d2d47]">
              Registered Customers
            </h2>
            <p className="text-gray-600 mt-4 text-sm">
              Login to continue checkout and view orders.
            </p>
          </div>

          {/* RIGHT */}
          <div className="p-10 space-y-6">
            <h3 className="text-xl font-semibold text-[#0d2d47]">
              Login
            </h3>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-bioBlue"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-bioBlue"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <button
              onClick={submitLogin}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-bioBlue to-bioGreen text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?
              <Link href="/register" className="text-bioBlue ml-1 hover:underline">
                Create Account →
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
    <Footer/>
    </>
  );
}
