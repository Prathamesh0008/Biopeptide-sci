//app\admin\orders\page.jsx
"use client";

import { useEffect, useState } from "react";
import StatusDropdown from "@/components/admin/StatusDropdown";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetch("/api/admin/orders");

      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }

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
    });

    if (!res.ok) {
      alert("Failed to update order status");
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
        {orders.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">
            No orders found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-4">{o.userName}</td>
                  <td className="p-4 text-gray-500">{o.userEmail}</td>
                  <td className="p-4 font-semibold">
                    ${o.totals.total}
                  </td>
                  <td className="p-4">
                    <StatusDropdown
                      value={o.status}
                      onChange={(s) => updateStatus(o._id, s)}
                    />
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
