//peptides\app\search\SearchClient.jsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

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
      <div className="
  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-x-2 gap-y-3 md:gap-x-3 md:gap-y-4
">
  {results.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
      )}
    </section>
  );
}
