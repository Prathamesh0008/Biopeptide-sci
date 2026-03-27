"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";

export default function OrderSuccessClient() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId");
  const { translations, loading } = useLanguage();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bio-user"));
    const cartKey = user?.email ? `bio-cart-${user.email}` : "guest-cart";

    localStorage.removeItem(cartKey);
    localStorage.removeItem("bio-checkout");
    localStorage.removeItem("bio-checkout-id");
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </main>
    );
  }

  const t = translations.orderSuccess;

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center relative">

      {/* SUCCESS ICON */}
      <div
        className="mx-auto mb-6 w-20 h-20 rounded-full
        bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
        flex items-center justify-center shadow-lg"
      >
        <span className="text-white text-4xl">✓</span>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0d2d47] mb-4">
        {t.title}
      </h1>

      {/* SUBTITLE */}
      <p className="text-gray-600 max-w-md mx-auto mb-10 text-sm sm:text-base">
        {t.subtitle}
      </p>

      {/* ORDER ID */}
      {orderId && (
        <div
          className="mx-auto max-w-sm bg-white border border-gray-200
          rounded-2xl p-6 mb-10 shadow-sm"
        >
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {t.orderIdLabel}
          </p>

          <p
            className="font-mono text-sm mt-2 break-all
            bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
            bg-clip-text text-transparent font-semibold"
          >
            {orderId}
          </p>
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

        {/* VIEW ORDERS */}
        <button
          onClick={() => router.push("/orders")}
          className="px-8 py-3 rounded-full border
          border-[#0a79a8] text-[#0a79a8]
          font-semibold hover:bg-[#0a79a8] hover:text-white
          transition duration-300 cursor-pointer"
        >
          {t.viewOrders}
        </button>

        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 rounded-full
          bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
          text-white font-semibold shadow-md hover:shadow-lg
          transition duration-300 cursor-pointer"
        >
          {t.continueShopping}
        </button>

      </div>

      {/* EMAIL NOTE */}
      <p className="mt-10 text-xs text-gray-500">
        {t.emailNote}
      </p>

    </main>
  );
}