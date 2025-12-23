//peptides\app\popular-peptides\page.jsx
"use client";

import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PopularPeptidesPage() {
  

  // FILTER POPULAR PRODUCTS
  const popular = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === "popular peptides".toLowerCase()
  );

  // SORTING
 

  return (

    <>
    <Navbar/>
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

  <p className="text-sm text-gray-700 mb-6">
    Showing {popular.length} products
  </p>

  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {popular.map((product) => (
      <ProductCard
        key={`${product.id}-${product.slug}`}
        product={product}
      />
    ))}
  </div>

</div>

      </div>
    </main>
    <Footer/>
    </>
  );
}
