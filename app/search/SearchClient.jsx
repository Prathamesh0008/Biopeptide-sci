//peptides\app\search\SearchClient.jsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

export default function SearchClient() {
  const params = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";

  const results = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query) ||
    p.category?.toLowerCase().includes(query)
  );

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Search results for:{" "}
        <span className="text-bioBlue">{query}</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((product) => (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="p-5 border rounded-xl hover:border-bioBlue transition"
            >
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="mt-2 font-bold">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
