//peptides\components\ProductCard.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  const openProduct = () => {
    setPageLoading(true);
    setTimeout(() => {
      router.push(`/product/${product.slug}`);
    }, 600);
  };

  // ⭐ ADD TO CART FUNCTION
  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem("bio-cart") || "[]");

    const found = existing.find((item) => item.id === product.id);

    if (found) {
      found.qty += 1; // increase quantity
    } else {
      existing.push({
        id: product.id,
        name: product.name,
        price: product.price,
        strength: product.strength,
        image: product.image,
        slug: product.slug,
        qty: 1,
      });
    }

    localStorage.setItem("bio-cart", JSON.stringify(existing));

    // Redirect to cart after a short animation
    setPageLoading(true);
    setTimeout(() => {
      router.push("/cart");
    }, 500);
  };

  return (
    <>
      {pageLoading && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-[9999]">
          <div className="flex gap-2">
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
            <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
          </div>
        </div>
      )}

      <article className="relative w-full bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all">

        {/* IMAGE */}
        <div
          className="relative h-40 w-full rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer"
          onClick={openProduct}
        >
          <Image
            src={product.image || "/images/product.png"}
            alt={product.name}
            width={180}
            height={180}
            className="object-contain"
          />
        </div>

        {/* TEXT */}
        <div className="mt-3 cursor-pointer" onClick={openProduct}>
          <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
          <p className="text-xs text-gray-500">{product.strength}</p>
        </div>

        {/* PRICE */}
        <p className="text-base font-bold text-gray-900 mt-3">
          ${product.price.toFixed(2)}
        </p>

        {/* BUTTONS */}
        <div className="mt-3 space-y-2">
          <button
            onClick={openProduct}
            className="w-full border border-bioBlue text-bioBlue text-xs font-semibold py-2 rounded-full hover:bg-bioBlue hover:text-white transition"
          >
            Learn More
          </button>

          <button
            onClick={addToCart}
            className="w-full bg-gradient-to-r from-bioBlue to-bioGreen text-white text-xs font-semibold py-2 rounded-full hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </article>
    </>
  );
}
