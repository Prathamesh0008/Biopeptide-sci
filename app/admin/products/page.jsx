//peptides\app\admin\products\page.jsx
"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setProducts(data.products);
      });
  }, []);

  const toggleStock = async (id, inStock) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock }),
    });

    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, inStock } : p))
      );
    }
  };

  return (
    <>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0978a7]">
          Catalog
        </p>
        <h1 className="text-3xl font-black text-[#0d2d47] mt-1">Products</h1>
        <p className="text-sm text-gray-600 mt-2">
          Manage product availability across the storefront.
        </p>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white/95 border border-[#d8eef3] rounded-2xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-sm"
          >
            <div>
              <p className="font-bold text-[#0d2d47]">{p.name}</p>
              <p className="text-sm text-gray-500 mt-1">{p.slug}</p>
            </div>

            <button
              onClick={() => toggleStock(p._id, !p.inStock)}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition ${
                p.inStock
                  ? "bg-[#ecfff6] text-green-700 border-green-200 hover:bg-green-100"
                  : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              }`}
            >
              {p.inStock ? "In Stock" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
