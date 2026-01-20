//peptides\components\ProductCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedProduct } from "@/utils/getTranslatedProduct";
import Loader from "@/components/Loader";


export default function ProductCard({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const getSafeImage = (img) => {
  if (!img || typeof img !== "string") {
    return "/images/product.png";
  }

  const trimmed = img.trim();

  if (trimmed.startsWith("http")) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;

  // 🔥 auto-fix relative paths
  return `/${trimmed}`;
};


  const { translations, loading } = useLanguage();
  if (loading) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </main>
      <Footer />
    </>
  );
}

  const p = getTranslatedProduct(product, translations);

  const addToCart = () => {
    const storedUser = localStorage.getItem("bio-user");
    let cartKey = "guest-cart";

    if (storedUser) {
      const user = JSON.parse(storedUser);
      cartKey = `bio-cart-${user.email}`;
    }

    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const found = cart.find((item) => item.id === product.id);

    if (found) {
      found.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: p.name,
        price: product.price,
        strength: p.strength,
        image: product.image,
        slug: product.slug,
        qty: 1,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("bio-cart-updated"));
  };

  return (
    <article
  className="
    
    bg-white border border-gray-200 rounded-l
    flex flex-col
    min-h-[300px] sm:min-h-[320px]
    overflow-hidden
  "
>
  {/* IMAGE — FULL WIDTH, NO PADDING */}
  <Link
  href={`/product/${product.slug}`}
  className="
    relative w-full
    aspect-[1/1]
    flex items-center justify-center
    cursor-pointer
  "
>

  {/*Is loading buffering */}
{!imgLoaded && (
  <div className="absolute inset-0 flex items-center justify-center">
    <span
      className="
        w-8 h-8
        border-2 border-gray-300
        border-t-bioBlue
        rounded-full
        animate-spin
      "
    />
  </div>
)}


 <Image
  src={getSafeImage(product.image)}
  alt={product.name || "Product image"}
  fill
  className="object-contain scale-95"
  onLoad={() => setImgLoaded(true)}
/>


  </Link>

  {/* CONTENT — PADDED */}
  <div className="p-2 sm:p-4 flex flex-col justify-between flex-1">

    {/* TITLE */}
    <Link
      href={`/product/${product.slug}`}
      className="mt-2 block cursor-pointer"
    >
      <h4 className="text-[15px] font-semibold text-gray-900 leading-snug hover:underline">
        {p.name}
      </h4>
    </Link>

    {/* PRICE */}
    <p className="text-[17px] font-bold text-gray-900 mt-3">
      ${product.price.toFixed(2)}
    </p>

    {/* ACTIONS */}
    <div className="mt-4 flex flex-col gap-2">
      <Link
        href={`/product/${product.slug}`}
        className="
          w-full text-center
          border border-bioBlue
          text-bioBlue text-xs font-semibold
          py-2 rounded-md
         hover:bg-black hover:text-white
          transition
        "
      >
        {translations.productCard.learnMore}
      </Link>

 <button
  onClick={addToCart}
  className="
    w-full
    bg-gradient-to-r from-[#145b2f] via-[#559f45] to-[#1a497c]
    hover:bg-[#3a3a3a]
    hover:bg-none
    text-white text-xs font-semibold
    py-2 rounded-md
    transition-all duration-300
    cursor-pointer
  "
>
  {translations.productCard.addToCart}
</button>


    </div>
  </div>
</article>

  );
}
{/*gradient-to-r from-[#145b2f] via-[#559f45] to-[#1a497c] */}










