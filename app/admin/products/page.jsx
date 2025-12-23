"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch("/api/admin/dashboard", {
  credentials: "include",
});


      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setProducts(data.products || []);
    };

    loadProducts();
  }, []);

  const toggleStock = async (id, current) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: !current }),
    });

    if (!res.ok) {
      alert("Failed to update stock");
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, stock: !current } : p
      )
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-[#0d2d47] mb-8">
        Products
      </h1>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow overflow-x-auto">
        {products.length === 0 ? (
          <div className="p-8 text-sm text-gray-500">
            No products found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-5 text-left">Product</th>
                <th className="p-5 text-left">Category</th>
                <th className="p-5 text-left">Price</th>
                <th className="p-5 text-left">Stock</th>
                <th className="p-5 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50/60"
                >
                  <td className="p-5 font-medium">
                    {p.name}
                  </td>

                  <td className="p-5 text-gray-500">
                    {p.category}
                  </td>

                  <td className="p-5 font-semibold">
                    ${p.price}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          p.stock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {p.stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() => toggleStock(p._id, p.stock)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold
                        ${
                          p.stock
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                    >
                      {p.stock ? "Mark Out" : "Mark In"}
                    </button>
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
