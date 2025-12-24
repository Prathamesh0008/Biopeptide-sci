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
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl border">
          No orders found.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">
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

              {/* CUSTOMER */}
              <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="font-medium">Customer</p>
                  <p>{o.userName}</p>
                  <p className="text-gray-500">{o.userEmail}</p>
                  <p className="text-gray-500">{o.phone}</p>
                </div>

                <div>
                  <p className="font-medium">Shipping Address</p>
                  <p className="text-gray-600">
                    {o.address?.fullName}<br />
                    {o.address?.city} – {o.address?.pincode}<br />
                    {o.address?.country}
                  </p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
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
      className="border-t"
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

              {/* TOTAL */}
              <div className="flex justify-end mt-4 font-semibold">
                Total: ${o.totals.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
