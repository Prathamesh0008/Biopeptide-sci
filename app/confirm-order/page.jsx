//app\confirm-order\page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConfirmOrderPage() {
  const router = useRouter();

  useEffect(() => {
    const place = async () => {
      const saved = JSON.parse(localStorage.getItem("bio-checkout"));
      if (!saved) {
        router.push("/checkout");
        return;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
  userId: saved.user._id,
  userName: saved.user.name,
  userEmail: saved.user.email,
  phone: saved.form.phone,
  address: saved.form,
  paymentMethod: saved.paymentMethod, // ✅ ADDED
  items: saved.cart,
  totals: {
    subtotal: saved.subtotal,
    shipping: 0,
    tax: 0,
    total: saved.subtotal,
  },
}),

      });

      const data = await res.json();

      if (!data.ok) {
        alert("Order failed");
        router.push("/checkout");
        return;
      }

      localStorage.removeItem("bio-cart");
      localStorage.removeItem("bio-checkout");

      router.push(`/order-success?orderId=${data.orderId}`);
    };

    place();
  }, [router]);

  return (
    <>
    <Navbar/>
    <main className="min-h-[60vh] flex items-center justify-center">
      <p className="text-lg font-medium text-gray-600">
        Processing your order…
      </p>
    </main>
    <Footer/>
    </>
  );
}
