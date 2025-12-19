//app\order-success\page.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId");

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for your order. We’ll process it shortly.
      </p>

      {orderId && (
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono text-sm">{orderId}</p>
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 rounded-full bg-bioBlue text-white font-semibold"
      >
        Continue Shopping
      </button>
    </main>
  );
}
