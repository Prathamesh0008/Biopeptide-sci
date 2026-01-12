//peptides\components\AllPeptidesCategorySlider.jsx
"use client";

import { useMemo, useRef } from "react";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";


export default function AllPeptidesCategorySlider({ active, onChange }) {
  const { translations } = useLanguage();

  const tabsRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(PRODUCTS.map(p => p.category))
    ).filter(Boolean);

    const preferredOrder = [
      "Popular Peptides",
      "Peptide Capsules",
      "Peptide Blends",
      "IGF-1 Proteins",
      "Melanotan Peptides",
      "Bioregulators",
      "Cosmetic Peptides",
    ];

    return ["All", ...preferredOrder.filter(c => unique.includes(c))];
  }, []);

  const categoryData =
    translations?.peptides?.categories?.[active];

  const onDown = e => {
    isDown.current = true;
    startX.current = e.pageX - tabsRef.current.offsetLeft;
    scrollLeft.current = tabsRef.current.scrollLeft;
  };

  const onMove = e => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    tabsRef.current.scrollLeft =
      scrollLeft.current - (x - startX.current) * 1.4;
  };

  const stop = () => (isDown.current = false);

  return (
    <div className="w-full">
      {/* CATEGORY SLIDER */}
      <div
        ref={tabsRef}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={stop}
        onMouseLeave={stop}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 cursor-grab select-none"
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold border whitespace-nowrap transition
              ${
                active === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CATEGORY DESCRIPTION */}
      {categoryData && (
        <div className="mt-6 max-w-4xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {categoryData.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {categoryData.description}
          </p>
        </div>
      )}
    </div>
  );
}





