//peptides\components\ProductGrid.jsx
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";

export default function ProductGrid() {
  const [visible, setVisible] = useState(12);

  return (
    <div className="w-full">

      {/* Title */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Buy Peptides for Scientific Research
        </h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          BioPeptide supplies high-purity research peptides with full documentation.
        </p>
      </div>

      {/* Section heading */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Featured Research Peptides
      </h2>

      {/* PRODUCT SCROLL AREA */}
      <div className="max-h-[650px] overflow-y-auto pr-3">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {PRODUCTS.slice(0, visible).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>

      {/* VIEW MORE BUTTON */}
      {visible < PRODUCTS.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisible((prev) => prev + 12)}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen 
                       text-white text-sm font-semibold hover:opacity-90 transition"
          >
            View More
          </button>
        </div>
      )}

    </div>
  );
}
