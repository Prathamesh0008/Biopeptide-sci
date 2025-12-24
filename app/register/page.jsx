//app\register\page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitRegister = async () => {
    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      alert(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    alert("Account created successfully");
    router.push("/login");
  };

  return (
    <>
    <Navbar/>
    <main
  className="
    relative overflow-hidden
    px-6 py-14
    bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6]
  "
>


      {/* Floating bio shapes */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-bioBlue/5 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-16 right-16 w-20 h-20 bg-bioGreen/5 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
  mx-auto w-full max-w-md
  bg-white/95
  backdrop-blur-xl
  border border-gray-200/60
  shadow-[0_20px_50px_-15px_rgba(13,45,71,0.25)]
  rounded-2xl
  p-8
"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-bioBlue to-bioGreen flex items-center justify-center text-white text-2xl font-bold">
            B
          </div>
          <h1 className="text-2xl font-bold text-[#0d2d47] mt-4">
            Create BioPeptide Account
          </h1>
          <div className="mx-auto mt-3 w-12 h-1 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen"></div>

          <p className="text-sm text-gray-600 mt-1">
            Register to continue checkout and manage orders
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-bioBlue outline-none text-sm"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-bioBlue outline-none text-sm"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-bioBlue outline-none text-sm"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={submitRegister}
            disabled={loading}
            className="
  w-full py-3 rounded-lg
  font-semibold text-white
  bg-gradient-to-r from-bioBlue to-bioGreen
  shadow-md hover:shadow-xl
  hover:scale-[1.01] active:scale-[0.99]
  transition
  disabled:opacity-50
"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <button
            onClick={() => router.push("/login")}
            className="text-bioBlue ml-1 hover:underline font-medium"
          >
            Sign in →
          </button>
        </p>
      </motion.div>
    </main>
    <Footer/>
    </>
  );
}
