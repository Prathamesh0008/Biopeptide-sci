// app/order-success/OrderSuccessClient.jsx
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
    const cartKey = user?.email
      ? `bio-cart-${user.email}`
      : "guest-cart";

    localStorage.removeItem(cartKey);
    localStorage.removeItem("bio-checkout");
    localStorage.removeItem("bio-checkout-id");
  }, []);

  if (loading) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </main>
      <Footer />
    </>
  );
}

  const t = translations.orderSuccess;

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center relative">
      <div
        className="mx-auto mb-6 w-20 h-20 rounded-full
        bg-gradient-to-br from-bioGreen to-bioBlue
        flex items-center justify-center shadow-lg"
      >
        <span className="text-white text-4xl">✓</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-[#0d2d47] mb-4">
        {t.title}
      </h1>

      <p className="text-gray-600 max-w-md mx-auto mb-10 text-sm sm:text-base">
        {t.subtitle}
      </p>

      {orderId && (
        <div
          className="mx-auto max-w-sm bg-white border
          rounded-2xl p-6 mb-10 shadow-sm"
        >
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {t.orderIdLabel}
          </p>
          <p className="font-mono text-sm mt-2 text-gray-800 break-all">
            {orderId}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => router.push("/orders")}
          className="px-8 py-3 rounded-full border border-bioBlue
            text-bioBlue font-semibold hover:bg-bioBlue hover:text-white transition"
        >
          {t.viewOrders}
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 rounded-full
            bg-gradient-to-r from-bioBlue to-bioGreen
            text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          {t.continueShopping}
        </button>
      </div>

      <p className="mt-10 text-xs text-gray-500">
        {t.emailNote}
      </p>
    </main>
  );
}















