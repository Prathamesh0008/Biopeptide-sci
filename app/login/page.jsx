"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const openRegister = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/register");
    }, 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#e8f7ff] to-[#d6ffe9] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Floating background molecules */}
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

      {/* SLIDE-IN CARD */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-200 overflow-hidden"
      >

        <div className="grid md:grid-cols-2">

          {/* LEFT INFO */}
          <div className="p-10 bg-gradient-to-br from-bioBlue/5 to-bioGreen/5">
            <h2 className="text-2xl font-bold text-[#0d2d47]">Registered Customers</h2>
            <p className="text-gray-600 mt-4 text-[15px] leading-relaxed">
              If you have an account, log in with your email address.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• Faster checkout</li>
              <li>• Access full order history</li>
              <li>• Save multiple addresses</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <motion.form
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="p-10 space-y-6"
          >
            <h3 className="text-xl font-semibold text-[#0d2d47]">Login</h3>

            <div>
              <label className="text-sm text-gray-700 font-medium">Email *</label>
              <input
                className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bioBlue outline-none transition"
                type="email"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">Password *</label>
              <input
                className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bioBlue outline-none transition"
                type="password"
                required
              />
            </div>

            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-bioBlue to-bioGreen text-white font-semibold hover:scale-[1.02] transition">
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?
              <button 
                type="button"
                onClick={openRegister}
                className="text-bioBlue ml-1 hover:underline"
              >
                Create Account →
              </button>
            </p>
          </motion.form>
        </div>
      </motion.div>
    </main>
  );
}
