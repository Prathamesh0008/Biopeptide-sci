
//peptides\components\ProductCard.jsx"use client";

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

  return (
    <>
      {/* 🌟 FULL PAGE LOADER (3 lines) */}
      {pageLoading && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-[9999]">
          <div className="flex gap-2">
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
            <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
          </div>
        </div>
      )}

      <article
        className="
          relative
          min-w-[240px] 
          bg-white 
          border border-gray-200 
          rounded-2xl 
          p-5 
          flex flex-col 
          justify-between 
          hover:shadow-lg 
          hover:-translate-y-1 
          transition-all
        "
      >
        {/* IMAGE */}
        <div
          className="relative h-56 w-full rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer"
          onClick={openProduct}
        >
          <Image
            src={product.image || "/images/product.png"}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* TEXT */}
        <div className="mt-4 flex-1 cursor-pointer" onClick={openProduct}>
          <h4 className="text-base font-semibold text-gray-900">{product.name}</h4>
          <p className="text-sm text-gray-500">{product.strength}</p>
        </div>

        {/* PRICE */}
        <p className="text-lg font-bold text-gray-900 mt-4">
          ${product.price.toFixed(2)}
        </p>

        {/* BUTTONS */}
        <div className="mt-4 space-y-3">
          {/* FIXED Learn More Button — full width */}
          <button
            onClick={openProduct}
            className="
              w-full 
              border border-bioBlue 
              text-bioBlue 
              text-sm 
              font-semibold 
              py-2.5 
              rounded-full 
              hover:bg-bioBlue 
              hover:text-white 
              transition
            "
          >
            Learn More
          </button>

          <button
            className="
              w-full 
              bg-gradient-to-r from-bioBlue to-bioGreen 
              text-white 
              text-sm 
              font-semibold 
              py-2.5 
              rounded-full 
              hover:opacity-90 
              transition
            "
          >
            Add to Cart
          </button>
        </div>
      </article>
    </>
  );
}
