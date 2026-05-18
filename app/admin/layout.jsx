//app\admin\layout.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      if (data.user.role !== "admin") {
        router.push("/");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6]">
        <div className="rounded-2xl border border-[#d8eef3] bg-white px-6 py-4 text-sm font-semibold text-[#0d2d47] shadow-sm">
          Loading admin panel...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6] text-gray-800">
      <AdminTopbar onMenu={() => setSidebarOpen(true)} />

      <div className="flex flex-1 relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-[#0d2d47]/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <AdminFooter />
    </div>
  );
}
