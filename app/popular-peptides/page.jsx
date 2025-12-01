//peptides\app\popular-peptides\page.jsx
"use client";

import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useState } from "react";

export default function PopularPeptidesPage() {
  const [sort, setSort] = useState("default");

  // FILTER POPULAR PRODUCTS
  const popular = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === "popular peptides".toLowerCase()
  );

  // SORTING
  const sorted = [...popular].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <main className="min-h-screen bg-white py-12">

      {/* PAGE TITLE */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Popular Peptides
        </h1>

        <p className="text-gray-600 text-sm mt-1">
          Explore the most in-demand BioPeptide research peptides.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3">

          {/* SORT BAR */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-700">
              Showing {sorted.length} products
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 text-sm rounded-md px-3 py-2"
            >
              <option value="default">Sort By</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}
