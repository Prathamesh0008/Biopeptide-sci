//peptides\components\DrawerProducts.jsx
"use client";

import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import { PRODUCTS } from "@/data/products";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DrawerProducts({ open, setOpen }) {

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loadingSlug, setLoadingSlug] = useState(null);

  const results = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  // Loading animation element
  const LoaderBars = () => (
    <div className="flex gap-2">
      <div className="w-2 h-8 bg-bioBlue animate-pulse rounded"></div>
      <div className="w-2 h-8 bg-bioGreen animate-pulse rounded delay-150"></div>
      <div className="w-2 h-8 bg-bioBlue animate-pulse rounded delay-300"></div>
    </div>
  );

  const openProduct = (slug) => {
    setLoadingSlug(slug);     // start loader
    setTimeout(() => {
      setOpen(false);         // close drawer
      router.push(`/product/${slug}`); // go to page
    }, 500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FaFilter className="text-bioBlue" />
            <span className="font-semibold text-gray-800 text-sm">Product List</span>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-xs"
            />
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">

          {results.map((p) => (
            <div
              key={p.id}
              onClick={() => openProduct(p.slug)}
              className="
                relative
                border border-gray-200 
                rounded-md px-3 py-2 
                hover:border-bioBlue/70 
                cursor-pointer
              "
            >

              {/* Loader overlay on product */}
              {loadingSlug === p.slug && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md z-20">
                  <LoaderBars />
                </div>
              )}

              <p className="font-semibold text-gray-900">{p.name}</p>
              <p className="text-gray-500">{p.category}</p>

            </div>
          ))}

        </div>

      </aside>
    </>
  );
}
