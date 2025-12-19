//app\admin\layout.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bio-user") || "{}");

    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
