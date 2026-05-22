//app\admin\orders\page.jsx
"use client";

import { useEffect, useState } from "react";
import StatusDropdown from "@/components/admin/StatusDropdown";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const groupItems = (items) => {
    const map = {};

    items.forEach((item) => {
      const key = item.id || item.productId || item.name;

      if (!map[key]) {
        map[key] = { ...item };
      } else {
        map[key].qty += item.qty;
      }
    });

    return Object.values(map);
  };

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetch("/api/admin/orders", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setOrders(data.orders || []);
    };

    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });

    if (!res.ok) {
      alert("Failed to update status");
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );
  };

  return (
    <>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0978a7]">
          Operations
        </p>
        <h1 className="text-3xl font-black text-[#0d2d47] mt-1">Orders</h1>
        <p className="text-sm text-gray-600 mt-2">
          Review customer purchases, shipping details, and fulfillment status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white/90 p-6 rounded-2xl border border-[#d8eef3] text-gray-600 shadow-sm">
          No orders found.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white/95 border border-[#d8eef3] rounded-2xl p-5 sm:p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5 pb-5 border-b border-[#e6f3f5]">
                <div>
                  <p className="text-lg font-black text-[#0d2d47]">
                    Order #{o._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>

                <StatusDropdown
                  value={o.status}
                  onChange={(s) => updateStatus(o._id, s)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm mb-5">
                <div className="rounded-xl bg-[#f8fafc] border border-[#e6f3f5] p-4">
                  <p className="font-bold text-[#0d2d47] mb-1">Customer</p>
                  <p className="font-semibold">{o.userName}</p>
                  <p className="text-gray-500">{o.userEmail}</p>
                  <p className="text-gray-500">{o.phone}</p>
                </div>

                <div className="rounded-xl bg-[#f8fafc] border border-[#e6f3f5] p-4">
                  <p className="font-bold text-[#0d2d47] mb-1">
                    Shipping Address
                  </p>
                  <p className="text-gray-600">
                    {o.address?.fullName}
                    <br />
                    {o.address?.city} - {o.address?.pincode}
                    <br />
                    {o.address?.country}
                  </p>
                </div>
              </div>

              <div className="border border-[#d8eef3] rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#f0fbfd] text-[#0d2d47]">
                    <tr>
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupItems(o.items).map((item) => (
                      <tr
                        key={`${item.id || item.productId}-${o._id}`}
                        className="border-t border-[#e6f3f5]"
                      >
                        <td className="p-3">{item.name}</td>
                        <td className="p-3 text-center">{item.qty}</td>
                        <td className="p-3 text-right">
                          ${(item.price * item.qty).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4 text-lg font-black text-[#0d2d47]">
                Total: ${o.totals.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
