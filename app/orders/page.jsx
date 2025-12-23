"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setOrders(data.orders);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <h1 className="text-3xl font-bold text-[#0d2d47] mb-10">
          My Orders
        </h1>

        {loading && (
          <p className="text-gray-500">Loading your orders…</p>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white border rounded-2xl p-8 text-center shadow">
            <p className="text-gray-500 text-lg">
              You haven’t placed any orders yet.
            </p>
          </div>
        )}

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-2xl shadow-sm overflow-hidden"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 bg-gray-50 border-b">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>
                  <p className="font-semibold text-[#0d2d47]">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <StatusBadge status={order.status} />
              </div>

              {/* ITEMS */}
              <div className="px-6 py-4 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm border-b last:border-b-0 pb-2"
                  >
                    <span className="text-gray-700">
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-bioBlue/5 to-bioGreen/5">
                <span className="text-sm font-medium text-gray-600">
                  Order Total
                </span>
                <span className="text-lg font-bold text-[#0d2d47]">
                  ${order.totals.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
