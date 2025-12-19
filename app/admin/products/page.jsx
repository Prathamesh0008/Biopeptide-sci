//app\admin\products\page.jsx
"use client";

import { useEffect } from "react";

export default function AdminProductsPage() {
  useEffect(() => {
    const checkAdmin = async () => {
      const res = await fetch("/api/admin/dashboard");

      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
      }
    };

    checkAdmin();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <p className="text-sm text-gray-500">
        Manage products, pricing, and stock.
      </p>

      <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
        Product management coming next.
      </div>
    </>
  );
}
