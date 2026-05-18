// // components/Sidebar.jsx
// "use client";

// import { useRouter } from "next/navigation";
// import { PRODUCTS } from "@/data/products";
// import { getTranslatedProduct } from "@/utils/getTranslatedProduct";
// import { useLanguage } from "@/contexts/LanguageContext";

// export default function Sidebar() {
//   const router = useRouter();
//   const { translations } = useLanguage();

//   // ✅ Group products by category
//   const grouped = PRODUCTS.reduce((acc, product) => {
//     const category = product.category || "Other";
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(product);
//     return acc;
//   }, {});

//   const handleClick = (e, slug) => {
//     const url = `/product/${slug}`;

//     // ✅ Ctrl (Windows/Linux) OR Cmd (Mac) OR middle click
//     if (e.ctrlKey || e.metaKey || e.button === 1) {
//       window.open(url, "_blank");
//       return;
//     }

//     // ✅ Normal click
//     router.push(url);
//   };

//   return (
//     <aside
//       className="
//         hidden lg:block
//         text-sm space-y-10
//         pr-4
//         border-r border-gray-200
//       "
//     >
//       {Object.entries(grouped).map(([category, items]) => (
//         <div key={`cat-${category}`}>
//           <h3 className="text-bioBlue font-semibold text-lg mb-3 tracking-wide">
//             {translations?.categories?.[category] || category}
//           </h3>

//           <ul className="space-y-1.5">
//             {items.map((product, index) => {
//               const p = getTranslatedProduct(product, translations);
//               const uniqueKey = `${category}-${product.slug}-${index}`;

//               return (
//                 <li
//                   key={uniqueKey}
//                   onMouseDown={(e) => handleClick(e, product.slug)}
//                   className="
//                     cursor-pointer
//                     text-gray-700
//                     hover:text-bioBlue
//                     transition-colors
//                   "
//                 >
//                   {p?.name || product.name}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       ))}

//       {/* RESEARCH ONLY BOX */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4 text-xs text-gray-600">
//         <p className="font-semibold text-gray-800 mb-1">
//           {translations?.sidebar?.researchOnlyTitle || "Research Use Only"}
//         </p>
//         <p>
//           {translations?.sidebar?.researchOnlyText ||
//             "All BioPeptide products are strictly for laboratory research use."}
//         </p>
//       </div>
//     </aside>
//   );
// }




"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/hooks/useProducts";

const allowedLanguages = [
  "en",
  "ar",
  "bg",
  "bs",
  "de",
  "el",
  "es",
  "fr",
  "hr",
  "ja",
  "mk",
  "nl",
  "pt",
  "ro",
  "sq",
  "sr",
  "zh",
];

function normalizeLanguage(lang) {
  return allowedLanguages.includes(lang) ? lang : "en";
}

function getProductName(product, language) {
  return (
    product?.translations?.[language]?.name ||
    product?.translations?.en?.name ||
    product?.name ||
    "Product"
  );
}

export default function Sidebar() {
  const router = useRouter();
  const { language, translations } = useLanguage();
  const { products, loading } = useProducts();

  const currentLanguage = normalizeLanguage(language);

  const grouped = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category || "Other";

      if (!acc[category]) acc[category] = [];

      acc[category].push(product);

      return acc;
    }, {});
  }, [products]);

  const handleClick = (e, slug) => {
    const url = `/product/${slug}`;

    if (e.ctrlKey || e.metaKey || e.button === 1) {
      window.open(url, "_blank");
      return;
    }

    router.push(url);
  };

  return (
    <aside
      className="
        hidden lg:block
        text-sm space-y-10
        pr-4
        border-r border-gray-200
      "
    >
      {loading && (
        <div className="text-xs text-gray-500">
          {translations?.sidebar?.loading || "Loading products..."}
        </div>
      )}

      {!loading &&
        Object.entries(grouped).map(([category, items]) => (
          <div key={`cat-${category}`}>
            <h3 className="text-bioBlue font-semibold text-lg mb-3 tracking-wide">
              {translations?.categories?.[category] || category}
            </h3>

            <ul className="space-y-1.5">
              {items.map((product, index) => {
                const uniqueKey = `${category}-${product.slug}-${index}`;

                return (
                  <li
                    key={uniqueKey}
                    onMouseDown={(e) => handleClick(e, product.slug)}
                    className="
                      cursor-pointer
                      text-gray-700
                      hover:text-bioBlue
                      transition-colors
                    "
                  >
                    {getProductName(product, currentLanguage)}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

      <div className="bg-white border border-gray-200 rounded-lg p-4 text-xs text-gray-600">
        <p className="font-semibold text-gray-800 mb-1">
          {translations?.sidebar?.researchOnlyTitle || "Research Use Only"}
        </p>

        <p>
          {translations?.sidebar?.researchOnlyText ||
            "All BioPeptide products are strictly for laboratory research use."}
        </p>
      </div>
    </aside>
  );
}
