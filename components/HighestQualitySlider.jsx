//peptides\components\HighestQualitySlider.jsx
"use client";

// import { useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo, useRef } from "react";


export default function HighestQualitySlider({ active, onChange }) {
    const tabsRef = useRef(null);
const isDown = useRef(false);
const startX = useRef(0);
const scrollLeft = useRef(0);

  const { translations } = useLanguage();

  const categories = useMemo(() => {
    const unique = Array.from(new Set(PRODUCTS.map(p => p.category))).filter(Boolean);

    const preferredOrder = [
      "Popular Peptides",
      "Peptide Capsules",
      "Peptide Blends",
      "IGF-1 Proteins",
      "Melanotan Peptides",
      "Bioregulators",
      "Cosmetic Peptides",
    ];

    const sorted = [
      ...preferredOrder.filter(c => unique.includes(c)),
      ...unique.filter(c => !preferredOrder.includes(c)),
    ];

    return ["All", ...sorted];
  }, []);

  const handleMouseDown = (e) => {
  isDown.current = true;
  tabsRef.current.classList.add("cursor-grabbing");
  startX.current = e.pageX - tabsRef.current.offsetLeft;
  scrollLeft.current = tabsRef.current.scrollLeft;
};

const handleMouseLeave = () => {
  isDown.current = false;
  tabsRef.current.classList.remove("cursor-grabbing");
};

const handleMouseUp = () => {
  isDown.current = false;
  tabsRef.current.classList.remove("cursor-grabbing");
};

const handleMouseMove = (e) => {
  if (!isDown.current) return;
  e.preventDefault();
  const x = e.pageX - tabsRef.current.offsetLeft;
  const walk = (x - startX.current) * 1.4; // drag speed
  tabsRef.current.scrollLeft = scrollLeft.current - walk;
};

  return (
    <section className="mt-12">
      {/* TITLE */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {translations?.home?.productGrid?.highestQualityTitle || "The Highest Quality Peptides"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {translations?.home?.productGrid?.highestQualitySub ||
            "Browse by category and explore our research-grade peptides."}
        </p>
      </div>

      {/* CATEGORY TABS */}
    <div
  ref={tabsRef}
  onMouseDown={handleMouseDown}
  onMouseLeave={handleMouseLeave}
  onMouseUp={handleMouseUp}
  onMouseMove={handleMouseMove}
  className="
    flex gap-3 overflow-x-auto scrollbar-hide pb-2
    cursor-grab select-none
  "
>

        {categories.map(cat => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`
                whitespace-nowrap px-5 py-2 rounded-xl text-sm font-semibold
                border transition
                ${isActive
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"}
              `}
            >
             {translations?.peptides?.categories?.[cat]?.title || cat}

            </button>
          );
        })}
      </div>
    </section>
  );
}  