//peptides\components\ProductCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedProduct } from "@/utils/getTranslatedProduct";
import Loader from "@/components/Loader";
import { getImageVersion, getSafeImageUrl } from "@/utils/imageUrl";

export default function ProductCard({ product, priority = false }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const { translations, loading } = useLanguage();
  const imageVersion = useMemo(
    () => getImageVersion(product),
    [product?.slug, product?.updatedAt, product?._id, product?.id]
  );
  const imageSrc = useMemo(
    () => getSafeImageUrl(product?.image, { version: imageVersion }),
    [product?.image, imageVersion]
  );

  if (loading) {
    return (
      <div className="min-h-[220px] bg-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const p = getTranslatedProduct(product, translations);
  const productId = product.id || product._id;
  const price = Number(product.price || 0);

  const addToCart = () => {
    const storedUser = localStorage.getItem("bio-user");
    let cartKey = "guest-cart";

    if (storedUser) {
      const user = JSON.parse(storedUser);
      cartKey = `bio-cart-${user.email}`;
    }

    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const found = cart.find((item) => item.id === productId);

    if (found) {
      found.qty += 1;
    } else {
      cart.push({
        id: productId,
        name: p.name,
        price,
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
        bg-white border border-gray-200 rounded-lg
        flex flex-col
        min-h-[300px] sm:min-h-[320px]
        overflow-hidden
      "
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full aspect-[1/1] flex items-center justify-center cursor-pointer"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-8 h-8 border-2 border-gray-300 border-t-bioBlue rounded-full animate-spin" />
          </div>
        )}

        <Image
          src={imageSrc}
          alt={product.name || "Product image"}
          fill
          className="object-contain scale-95"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          onLoad={() => setImgLoaded(true)}
          priority={priority}
          unoptimized
        />
      </Link>

      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          <p className="text-[17px] font-bold text-gray-900 mb-3">
            ${price.toFixed(2)}
          </p>

          <Link
            href={`/product/${product.slug}`}
            className="block cursor-pointer"
          >
            <h4 className="text-[14px] font-semibold text-gray-900 leading-snug hover:underline">
              {p.name}
            </h4>
          </Link>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="
              w-full text-center
              border border-[#0978a7]
              text-bioBlue text-sm font-semibold
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
              bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
              hover:bg-[#3a3a3a] hover:bg-none
              text-white text-sm font-semibold
              py-2 rounded-md
              transition-all duration-300
              cursor-pointer
            "
          >
            {translations.productCard.addToCart} - ${price.toFixed(2)}
          </button>
        </div>
      </div>
    </article>
  );
}
