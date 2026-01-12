//peptides\components\ProductGrid.jsx
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import PopularPeptidesCarousel from "@/components/PopularPeptidesCarousel";
import HighestQualitySlider from "@/components/HighestQualitySlider";




export default function ProductGrid({ onOpenFilter }) {
  // ✅ ALL HOOKS FIRST
  const [visible, setVisible] = useState(12);
  const [activeCategory, setActiveCategory] = useState("All");
  const [animKey, setAnimKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
const [isLeaving, setIsLeaving] = useState(false);
const [isEntering, setIsEntering] = useState(false);

  const { translations, loading } = useLanguage();

  const t = translations?.home?.productGrid;

  const popularProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === "popular peptides"
  );

  // ✅ RETURN AFTER ALL HOOKS
  if (loading || !t) return null;

 const filteredProducts =
  !activeCategory ||
  activeCategory.toLowerCase() === "all"
    ? PRODUCTS
    : PRODUCTS.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase().trim() ===
            activeCategory.toLowerCase().trim()
      );





  return (
    <div className="w-full">
      {/* MAIN TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t.mainTitle}
        </h1>
        <p className="text-gray-700 text-sm leading-relaxed">
          {t.description}
        </p>
      </div>

      {/* POPULAR PEPTIDES */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {t.popularTitle}
      </h2>

      <PopularPeptidesCarousel products={popularProducts} />

      {/* HIGHEST QUALITY FILTER */}
   <HighestQualitySlider
  active={activeCategory}
  onChange={(cat) => {
    if (cat === activeCategory) return;

    // 1️⃣ animate old cards OUT
    setIsLeaving(true);

    setTimeout(() => {
      // 2️⃣ swap data
      setActiveCategory(cat);
      setVisible(12);

      setIsLeaving(false);
      setIsEntering(true);

      // 3️⃣ animate new cards IN
      setTimeout(() => {
        setIsEntering(false);
      }, 350);

    }, 300);
  }}
/>

   {/* PRODUCT GRID */}
<div
  className={`
    grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4
    gap-x-3 gap-y-4
    md:gap-x-4 md:gap-y-6
    transition-all duration-300 ease-in-out
    ${
      isLeaving
        ? "-translate-x-16 opacity-0"
        : isEntering
        ? "translate-y-8 opacity-0"
        : "translate-x-0 translate-y-0 opacity-100"
    }
  `}
>




  {filteredProducts.map((product) => (

    <ProductCard
  key={`${product.id}-${product.slug}`}

  product={product}
/>

  ))}
</div>

    </div>
  );
}

















