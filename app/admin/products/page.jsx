//peptides\app\admin\products\page.jsx
"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const res = await fetch("/api/products", {
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json();
    if (data.ok) setProducts(data.products);
  };

  useEffect(() => {
    load();
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">{p.slug}</p>
            </div>

            <button
              onClick={() => toggleStock(p._id, !p.inStock)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                p.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {p.inStock ? "In Stock" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
