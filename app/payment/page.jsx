//app\payment\page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaymentPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [method, setMethod] = useState("card");

  useEffect(() => {
    const saved = localStorage.getItem("bio-checkout");
    if (!saved) {
      router.push("/checkout");
      return;
    }
    setData(JSON.parse(saved));
  }, [router]);

  if (!data) return null;

  return (
    <>
    <Navbar/>
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-[#0d2d47] mb-10">
        Payment
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT – PAYMENT METHODS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6">
            Choose Payment Method
          </h2>

          <div className="space-y-4">

            {/* CARD */}
            <PaymentOption
              active={method === "card"}
              onClick={() => setMethod("card")}
              title="Credit / Debit Card"
              desc="Visa, MasterCard, RuPay"
              icon="💳"
            />

            {/* UPI */}
            <PaymentOption
              active={method === "upi"}
              onClick={() => setMethod("upi")}
              title="UPI"
              desc="Google Pay, PhonePe, Paytm"
              icon="📱"
            />

            {/* COD */}
            <PaymentOption
              active={method === "cod"}
              onClick={() => setMethod("cod")}
              title="Cash on Delivery"
              desc="Pay when order is delivered"
              icon="🚚"
            />
          </div>
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm">
            {data.cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${data.subtotal.toFixed(2)}</span>
          </div>

          <button
  onClick={() => {
    const saved = JSON.parse(localStorage.getItem("bio-checkout"));

    localStorage.setItem(
      "bio-checkout",
      JSON.stringify({
        ...saved,
        paymentMethod: method, // ✅ SAVE PAYMENT METHOD
      })
    );

    router.push("/confirm-order");
  }}
  className="mt-6 w-full py-3 rounded-full font-semibold text-white
    bg-gradient-to-r from-bioBlue to-bioGreen"
>
  Pay Securely
</button>


          <p className="text-xs text-gray-500 mt-3 text-center">
            🔒 100% Secure Payments
          </p>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}

/* ---------------- PAYMENT OPTION CARD ---------------- */

function PaymentOption({ active, onClick, title, desc, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        border rounded-xl px-5 py-4 text-left
        transition
        ${active
          ? "border-bioBlue bg-bioBlue/5"
          : "border-gray-200 hover:border-bioBlue"}
      `}
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>

      <div
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${active ? "border-bioBlue" : "border-gray-300"}
        `}
      >
        {active && (
          <div className="w-2.5 h-2.5 bg-bioBlue rounded-full" />
        )}
      </div>
    </button>
  );
}
