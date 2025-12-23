//app\category\[slug]\page.jsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import DrawerProducts from "@/components/DrawerProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CategoryPage() {
  const { slug } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // map URL slug → category name
  const CATEGORY_MAP = {
    "capsules": "Peptide Capsules",
    "purchase-peptides": "Purchase Peptides",
    "blends": "Peptide Blends",
    "igf-1-proteins": "IGF-1 Proteins",
    "melanotan": "Melanotan Peptides",
    "bioregulators": "Bioregulators",
    "cosmetic-peptides": "Cosmetic Peptides",
  };

  const categoryName = CATEGORY_MAP[slug] || "Products";

  const filteredProducts = PRODUCTS.filter(
    (p) => p.category === categoryName
  );

  const totalCount = filteredProducts.length;
  const showingCount = totalCount; // no pagination yet

  return (
    <>
    <Navbar/>
    <main className="bg-white">

      {/* HEADER */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {categoryName}
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Browse all products in the {categoryName} category.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* LEFT SIDEBAR — DESKTOP */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-3">

            {/* MOBILE FILTER + COUNT ROW */}
            <div className="flex lg:hidden items-center justify-between mb-6">
              <button
                onClick={() => setDrawerOpen(true)}
                className="
                  flex items-center gap-2
                  px-4 py-2
                  rounded-full
                  border border-gray-300
                  text-sm font-semibold
                  text-gray-800
                  bg-white
                  hover:border-bioBlue hover:text-bioBlue
                  transition
                "
              >
                ☰ Filter
              </button>

              <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {showingCount}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {totalCount}
                </span>{" "}
                products
              </p>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DRAWER — SAME AS HOME */}
      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />
    </main>
    <Footer/>
    </>
  );
}
