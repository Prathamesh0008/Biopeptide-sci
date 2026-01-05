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
gap-x-4 gap-y-6 md:gap-x-5 md:gap-y-8
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

















//peptides\components\ProductGrid.jsx
// "use client";

// import { useState } from "react";
// import ProductCard from "./ProductCard";
// import { PRODUCTS } from "@/data/products";

// export default function ProductGrid({ onOpenFilter }) {
//   const [visible, setVisible] = useState(12);

//   const totalCount = PRODUCTS.length;
//   const showingCount = Math.min(visible, totalCount);

//   return (
//     <div className="w-full">
//       {/* MAIN TITLE */}
// <div className="mb-6">
//   <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//     Buy Peptides for Scientific Research
//   </h1>
//   <p className="text-gray-700 text-sm leading-relaxed">
//     BioPeptide supplies high-purity research peptides with full documentation.
//   </p>
// </div>

// {/* FEATURED TITLE */}
// <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//   Featured Research Peptides
// </h2>

// {/* FILTER + COUNT (MOBILE CLEAN ROW) */}
// <div className="flex items-center justify-between gap-3 mb-6">

//   {/* FILTER BUTTON — MOBILE ONLY */}
//   <button
//   onClick={onOpenFilter}
//   className="
//     lg:hidden
//     flex items-center gap-2
//     px-4 py-2
//     rounded-full
//     border border-gray-300
//     text-sm font-semibold
//     text-gray-800
//     bg-white
//     hover:border-bioBlue hover:text-bioBlue
//     transition
//   "
// >
//   ☰ Filter
// </button>


//   {/* PRODUCT COUNT */}
//   <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-auto">
//     Showing{" "}
//     <span className="font-semibold text-gray-800">{showingCount}</span>{" "}
//     of{" "}
//     <span className="font-semibold text-gray-800">{totalCount}</span>{" "}
//     products
//   </p>

// </div>


//       {/* PRODUCT SCROLL AREA */}
//       <div className="max-h-[650px] overflow-y-auto pr-3">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
//           {PRODUCTS.slice(0, visible).map((product, index) => (
//   <ProductCard
//     key={`${product.id}-${product.slug}-${index}`}
//     product={product}
//   />
// ))}
//         </div>
//       </div>

//       {/* VIEW MORE BUTTON */}
//       {visible < PRODUCTS.length && (
//         <div className="text-center mt-8">
//           <button
//   onClick={() => setVisible((prev) => prev + 12)}
//   className="
//     px-7 py-3 rounded-full
//     text-white text-sm font-semibold
//     bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
//     hover:brightness-110
//     transition
//   "
// >
//   View More
// </button>



//         </div>
//       )}
//     </div>
//   );
// }
