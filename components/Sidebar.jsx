// components/Sidebar.jsx
"use client";

import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { getTranslatedProduct } from "@/utils/getTranslatedProduct";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Sidebar() {
  const router = useRouter();
  const { translations } = useLanguage();

  // ✅ Group products by category
  const grouped = PRODUCTS.reduce((acc, product) => {
    const category = product.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <aside
      className="
        hidden lg:block
        text-sm space-y-10
        pr-4
        border-r border-gray-200
      "
    >
      {Object.entries(grouped).map(([category, items]) => (
        <div key={`cat-${category}`}>
         <h3 className="text-bioGreen font-semibold text-lg mb-3 tracking-wide">
            {translations?.categories?.[category] || category}
          </h3>

          <ul className="space-y-1.5">
            {items.map((product, index) => {
              const p = getTranslatedProduct(product, translations);

              // ✅ ABSOLUTELY UNIQUE KEY (cannot collide)
              const uniqueKey = `${category}-${product.slug || "no-slug"}-${index}`;

              return (
                <li
                  key={uniqueKey}
                  onClick={() => router.push(`/product/${product.slug}`)}
                  className="
                    cursor-pointer
                    text-gray-700
                    hover:text-bioBlue
                    transition-colors
                  "
                >
                  {p?.name || product.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* RESEARCH ONLY BOX */}
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
