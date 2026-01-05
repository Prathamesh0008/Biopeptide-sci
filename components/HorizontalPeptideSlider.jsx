//peptides\components\HorizontalPeptideSlider.jsx
"use client";

import { useRef } from "react";
import { PRODUCTS } from "@/data/products";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedProduct } from "@/utils/getTranslatedProduct";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function HorizontalPeptideSlider() {
  const sliderRef = useRef(null);
  const router = useRouter();
  const { translations } = useLanguage();

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  // pick popular peptides (you can change logic)
  const popular = PRODUCTS.filter(p => p.badge === "Best Seller");

  return (
    <section className="relative mt-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {translations.productGrid?.featuredTitle || "Popular Peptides"}
        </h3>

        {/* ARROWS */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
           <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="
          flex gap-4 overflow-x-auto scroll-smooth
          scrollbar-hide
          pb-2
        "
      >
        {popular.map(product => {
          const p = getTranslatedProduct(product, translations);

          return (
            <div
              key={product.slug}
              onClick={() => router.push(`/product/${product.slug}`)}
              className="
                min-w-[260px]
                bg-white border rounded-xl shadow-sm
                p-4 cursor-pointer
                hover:shadow-md transition
              "
            >
              <div className="relative w-full h-[140px] mb-3">
                <Image
                  src={product.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h4 className="text-sm font-semibold text-gray-900">
                {p.name}
              </h4>

              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {p.strength}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
