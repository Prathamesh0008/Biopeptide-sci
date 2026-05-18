//peptides\app\search\SearchClient.jsx
"use client";

import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";

export default function SearchClient() {
  const params = useSearchParams();
  const query = params.get("query")?.toLowerCase() || "";
  const { products, loading } = useProducts();

  const results = products.filter((p) =>
    p.name?.toLowerCase().includes(query) ||
    p.category?.toLowerCase().includes(query)
  );

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-12">
        <Loader />
      </section>
    );
  }

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
    <ProductCard
      key={product._id || product.id || product.slug}
      product={product}
    />
  ))}
</div>
      )}
    </section>
  );
}
