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
            className="h-28 rounded-2xl bg-white/70 border border-[#d8eef3] animate-pulse shadow-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0978a7]">
          BioPeptide Admin
        </p>
        <h1 className="text-3xl font-black text-[#0d2d47] mt-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Monitor orders, customers, products, and store performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Total Orders" value={stats.orders} />
        <StatsCard title="Pending Orders" value={stats.pending} />
        <StatsCard title="Users" value={stats.users} />
        <StatsCard title="Revenue" value={`$${stats.revenue}`} />
      </div>

      <div className="bg-white/90 border border-[#d8eef3] rounded-2xl shadow-sm p-8">
        <p className="font-bold text-lg mb-2 text-[#0d2d47]">
          Admin Overview
        </p>
        <p className="text-sm text-gray-600">
          Manage orders, users, and product availability from one workspace.
        </p>
      </div>
    </>
  );
}
