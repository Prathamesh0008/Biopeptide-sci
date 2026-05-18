//components\ProductGrid.jsx
"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import PopularPeptidesCarousel from "@/components/PopularPeptidesCarousel";
import HighestQualitySlider from "@/components/HighestQualitySlider";
import Loader from "@/components/Loader";
import { useProducts } from "@/hooks/useProducts";

export default function ProductGrid({ onOpenFilter }) {
  const [visible, setVisible] = useState(12);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const { translations, loading } = useLanguage();
  const { products, loading: productLoading } = useProducts();

  const t = translations?.home?.productGrid;

  const popularProducts = useMemo(() => {
    return products.filter(
      (p) => p.category?.toLowerCase() === "popular peptides"
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory || activeCategory.toLowerCase() === "all") {
      return products;
    }

    return products.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase().trim() ===
          activeCategory.toLowerCase().trim()
    );
  }, [products, activeCategory]);

  const isLoading = loading || productLoading || !t;

  return (
    <div className="w-full">
      {/* MAIN TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t?.mainTitle || "Research Peptides"}
        </h1>

        <p className="text-gray-700 text-sm leading-relaxed">
          {t?.description || "Loading research-grade peptide products..."}
        </p>
      </div>

      {/* LOADING */}
      {isLoading ? (
        <div className="min-h-[420px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
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

              setIsLeaving(true);

              setTimeout(() => {
                setActiveCategory(cat);
                setVisible(12);

                setIsLeaving(false);
                setIsEntering(true);

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
            {filteredProducts.slice(0, visible).map((product, index) => (
              <ProductCard
                key={`${product._id || product.id}-${product.slug}`}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>

          {visible < filteredProducts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisible((prev) => prev + 12)}
                className="px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-semibold cursor-pointer"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
