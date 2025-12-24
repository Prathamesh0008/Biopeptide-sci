"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConfirmOrderPage() {
  const router = useRouter();
  const hasPlacedRef = useRef(false); // 🔒 LOCK

  useEffect(() => {
    if (hasPlacedRef.current) return; // 🚫 BLOCK SECOND RUN
    hasPlacedRef.current = true;

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
          checkoutId: saved.checkoutId,
          userName: saved.user.name,
          userEmail: saved.user.email,
          phone: saved.form.phone,
          address: {
            fullName: saved.form.fullName,
            phone: saved.form.phone,
            address: `${saved.form.house}, ${saved.form.area}`,
            city: saved.form.city,
            pincode: saved.form.pincode,
            country: saved.form.country,
          },
          paymentMethod: saved.paymentMethod,
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

      const user = JSON.parse(localStorage.getItem("bio-user"));
      const cartKey = user?.email
        ? `bio-cart-${user.email}`
        : "guest-cart";

      localStorage.removeItem(cartKey);
      localStorage.removeItem("bio-checkout");
      localStorage.removeItem("bio-checkout-id");

      router.push(`/order-success?orderId=${data.orderId}`);
    };

    place();
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Processing your order…
        </p>
      </main>
      <Footer />
    </>
  );
}
