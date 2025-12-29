//peptides\components\ProductGrid.jsx
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";


export default function ProductGrid({ onOpenFilter }) {
  const [visible, setVisible] = useState(12);

  const totalCount = PRODUCTS.length;
  const showingCount = Math.min(visible, totalCount);

  const { translations, loading } = useLanguage();
if (loading) return null;

const t = translations.home.productGrid;


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

{/* FEATURED TITLE */}
<h2 className="text-2xl font-semibold text-gray-900 mb-4">
  {t.featuredTitle}
</h2>

{/* FILTER + COUNT (MOBILE CLEAN ROW) */}
<div className="flex items-center justify-between gap-3 mb-6">

  {/* FILTER BUTTON — MOBILE ONLY */}
  <button
  onClick={onOpenFilter}
  className="
    lg:hidden
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
  ☰ {t.filter}
</button>


  {/* PRODUCT COUNT */}
  <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-auto">
    {t.showing}g{" "}
    <span className="font-semibold text-gray-800">{showingCount}</span>{" "}
    {t.of}{" "}
    <span className="font-semibold text-gray-800">{totalCount}</span>{" "}
    {t.products}
  </p>

</div>


      {/* PRODUCT SCROLL AREA */}
      <div className="max-h-[650px] overflow-y-auto pr-3">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {PRODUCTS.slice(0, visible).map((product, index) => (
  <ProductCard
    key={`${product.id}-${product.slug}-${index}`}
    product={product}
  />
))}
        </div>
      </div>

      {/* VIEW MORE BUTTON */}
      {visible < PRODUCTS.length && (
        <div className="text-center mt-8">
          <button
  onClick={() => setVisible((prev) => prev + 12)}
  className="
    px-7 py-3 rounded-full
    text-white text-sm font-semibold
    bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
    hover:brightness-110
    transition
  "
>
  {t.viewMore}
</button>



        </div>
      )}
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
