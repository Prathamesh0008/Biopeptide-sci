//app\admin\dashboard\page.jsx
"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const res = await fetch("/api/admin/dashboard");

      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setStats(data);
    };

    loadDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-6 shadow-sm animate-pulse h-24"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Orders" value={stats.orders} />
        <StatsCard title="Pending Orders" value={stats.pending} />
        <StatsCard title="Users" value={stats.users} />
        <StatsCard title="Revenue" value={`$${stats.revenue}`} />
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <p className="font-semibold mb-2">Admin Overview</p>
        <p className="text-sm text-gray-600">
          Monitor orders, users, revenue, and stock from this panel.
        </p>
      </div>
    </>
  );
}
