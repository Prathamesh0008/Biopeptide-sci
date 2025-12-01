//peptides\app\product\[slug]\page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductContent from "@/components/ProductContent";

export default function ProductPage() {
  // ⭐ Correct way in client components
  const { slug } = useParams();

  const product = PRODUCTS.find((p) => p.slug === slug);
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("bio-cart") || "[]");

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.image,
        strength: product.strength,
      });
    }

    localStorage.setItem("bio-cart", JSON.stringify(cart));

    window.location.href = "/cart";
  };

  // ⭐ Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-10 pb-20">

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
        <Link href="/" className="text-bioBlue underline text-sm">
          ← Back to Products
        </Link>
      </div>

      {/* MAIN PRODUCT TOP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="
          grid grid-cols-1 lg:grid-cols-2 
          gap-10 lg:gap-14 
          border border-gray-200 p-6 sm:p-10
          bg-gradient-to-br from-white via-[#f3faff] to-[#eefcfc]
        ">
          
          {/* LEFT — IMAGE + BADGES */}
          <div className="flex flex-col gap-6 w-full max-w-[350px] mx-auto">

            {/* IMAGE BOX */}
            <div className="
              flex items-center justify-center 
              bg-white border p-4 sm:p-6 
              shadow-sm 
              h-[340px] sm:h-[420px] 
              w-full
              max-w-[350px]
            ">
              <Image
                src={product.image || "/images/product.png"}
                alt={product.name}
                width={300}
                height={400}
                className="object-contain w-full h-full"
              />
            </div>

            {/* BADGES */}
            <div className="flex flex-wrap justify-center gap-2 text-[11px] font-medium">
              <span className="px-3 py-1 border bg-[#e7f4ff] text-[#0d2d47]">HPLC Tested</span>
              <span className="px-3 py-1 border bg-[#e7f4ff] text-[#0d2d47]">{product.purity}</span>
              <span className="px-3 py-1 border bg-[#eefcfc] text-[#0097b8]">Research Grade</span>
              <span className="px-3 py-1 border bg-[#fff9e6] text-[#b88a00]">COA Available</span>
            </div>

          </div>

          {/* RIGHT — DETAILS */}
          <div className="flex flex-col gap-6 sm:gap-8">

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0d2d47] leading-tight">
              {product.name}
            </h1>

            {/* SUBTEXT */}
            <p className="text-sm font-medium text-[#0d2d47]/60 border-l-4 border-[#0097b8] pl-3">
              Premium BioPeptide • High-Purity Scientific Research Material
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-700 text-sm leading-relaxed max-w-xl">
              {product.description}
              <br /><br />
              Developed using precision peptide synthesis technology, {product.name}
              undergoes high-resolution purification to ensure molecular accuracy.
              <br /><br />
              Designed for biochemical assays, pathway signaling, cell studies,
              receptor-binding analysis, and controlled research environments.
            </p>

            {/* PRICE BOX */}
            <div className="border p-6 w-full max-w-xs bg-white shadow-sm">
              <p className="text-3xl sm:text-4xl font-semibold text-[#0d2d47]">
                ${product.price}
              </p>
              <p className="text-xs text-gray-500">Research Use Only</p>

             <button
                onClick={handleAddToCart}
                className="
                  mt-4 w-full py-3 
                  font-semibold text-white 
                  bg-gradient-to-r from-[#0d2d47] to-[#0097b8]
                  hover:opacity-90 transition
                "
              >
                Add to Cart
              </button>
            </div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Category", product.category], ["Purity", product.purity],
                ["Unit Size", product.size], ["CAS", product.cas || "N/A"]].map(
                ([label, value]) => (
                  <div key={label} className="border p-4 bg-[#f7fbff]">
                    <p className="text-[11px] text-gray-500">{label}</p>
                    <p className="font-semibold text-[#0d2d47]">{value}</p>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CONTENT */}
      <ProductContent product={product} />

    </main>
  );
}
