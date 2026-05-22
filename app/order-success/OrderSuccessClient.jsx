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
<<<<<<< HEAD
      <main className="min-h-screen bg-white flex items-center justify-center">
=======
      <main className="min-h-screen bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6] flex items-center justify-center">
>>>>>>> dde900b908d570418087d0752ad16a5a2fc9fd18
        <Loader />
      </main>
    );
  }

  const t = translations.orderSuccess;

  return (
<<<<<<< HEAD
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
=======
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6] flex items-center justify-center px-4 py-8 sm:py-12 md:py-16">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Main Card - Cleaner design */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
          
          {/* Success Icon - Simplified */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7] flex items-center justify-center shadow-md">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          {/* Title - Clean typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#0d2d47] mb-3">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-center max-w-md mx-auto mb-8 text-sm sm:text-base">
            {t.subtitle}
>>>>>>> dde900b908d570418087d0752ad16a5a2fc9fd18
          </p>

          {/* Order ID Card - Professional design */}
          {orderId && (
            <div className="mb-8 bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  {t.orderIdLabel}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#52c3c6]"></div>
                  <span className="text-xs text-[#0a79a8] font-medium">Confirmed</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 font-mono text-sm break-all text-center font-semibold text-gray-800 border border-gray-200">
                {orderId}
              </div>

              {/* Simple Status Indicator */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Order placed</span>
                  <span>Processing</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-[#52c3c6] to-[#0a79a8] rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Buttons - Clean and responsive */}
          <div className="space-y-3">
            
            {/* Continue Shopping - Primary */}
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <span>{t.continueShopping}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>

            {/* View Orders - Secondary */}
            <button
              onClick={() => router.push("/orders")}
              className="w-full py-3 px-4 rounded-xl border border-[#0a79a8] text-[#0a79a8] font-semibold hover:bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {t.viewOrders}
            </button>

          </div>

          {/* Email Note - Minimal */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>{t.emailNote}</span>
            </div>
          </div>

        </div>
<<<<<<< HEAD
      )}

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

        {/* VIEW ORDERS */}
        <button
          onClick={() => router.push("/orders")}
          className="px-8 py-3 rounded-full border
          border-[#0a79a8] text-[#0a79a8]
          font-semibold hover:bg-[#0a79a8] hover:text-white
          transition duration-300"
        >
          {t.viewOrders}
        </button>

        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 rounded-full
          bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
          text-white font-semibold shadow-md hover:shadow-lg
          transition duration-300"
        >
          {t.continueShopping}
        </button>

      </div>

      {/* EMAIL NOTE */}
      <p className="mt-10 text-xs text-gray-500">
        {t.emailNote}
      </p>

=======
      </div>
>>>>>>> dde900b908d570418087d0752ad16a5a2fc9fd18
    </main>
  );
}