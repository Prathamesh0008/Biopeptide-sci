//components\Sidebar.jsx
"use client";

import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";

export default function Sidebar() {
  const router = useRouter();

  // Group products by category
  const grouped = PRODUCTS.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <aside className="hidden lg:block text-sm space-y-10 max-h-[650px] overflow-y-auto pr-2 border-r border-gray-200">

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-bioGreen font-semibold mb-2">
            {category}
          </h3>

          <ul className="space-y-1.5">
            {items.map((product, index) => (
              <li
                key={`${product.slug}-${product.size || "default"}-${index}`}
                onClick={() => router.push(`/product/${product.slug}`)}
                className="text-gray-700 hover:text-bioBlue cursor-pointer transition"
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bg-white border border-gray-200 rounded-lg p-4 text-xs text-gray-600">
        <p className="font-semibold text-gray-800 mb-1">
          Research Use Only
        </p>
        <p>
          All BioPeptide products are strictly for laboratory research use.
        </p>
      </div>

    </aside>
  );
}
 