//peptides\components\ProductCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedProduct } from "@/utils/getTranslatedProduct";

export default function ProductCard({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const { translations, loading } = useLanguage();
  if (loading) return null;

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
    
    bg-white border border-gray-200 rounded-xl
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
    bg-gray-50
    flex items-center justify-center
    cursor-pointer
  "
>
{!imgLoaded && (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex flex-col gap-1">
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
    </div>
  </div>
)}

 <Image
  src={
    product.image && product.image.trim() !== ""
      ? product.image
      : "/images/product.png"
  }
  alt={product.name}
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
          py-2 rounded-full
          hover:bg-bioBlue hover:text-white
          transition
        "
      >
        {translations.productCard.learnMore}
      </Link>

      <button
        onClick={addToCart}
        className="
          w-full
          bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
          text-white text-xs font-semibold
          py-2 rounded-full
          hover:brightness-110
          transition
        "
      >
        {translations.productCard.addToCart}
      </button>
    </div>
  </div>
</article>

  );
}











// //peptides\components\ProductCard.jsx
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { getTranslatedProduct } from "@/utils/getTranslatedProduct";
// import Link from "next/link";




// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const [pageLoading, setPageLoading] = useState(false);
//   const { translations, loading } = useLanguage();
// if (loading) return null;


// const p = getTranslatedProduct(product, translations);
//   const openProduct = () => {
//     setPageLoading(true);
//     setTimeout(() => {
//       router.push(`/product/${product.slug}`);
//     }, 600);
//   };

//   const addToCart = () => {
//   // ✅ allow guest + user cart
//   const storedUser = localStorage.getItem("bio-user");

//   let cartKey = "guest-cart";

//   if (storedUser) {
//     const user = JSON.parse(storedUser);
//     cartKey = `bio-cart-${user.email}`;
//   }

//   const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

//   const found = cart.find((item) => item.id === product.id);

//   if (found) {
//     found.qty += 1;
//   } else {
//     cart.push({
//       id: product.id,
//      name: p.name,
//       price: product.price,
//      strength: p.strength,
//       image: product.image,
//       slug: product.slug,
//       qty: 1,
//     });
//   }
// localStorage.setItem(cartKey, JSON.stringify(cart));

// // 🔔 tell UI that cart changed
// window.dispatchEvent(new Event("bio-cart-updated"));

// };

//   return (
//     <>
//       {pageLoading && (
//         <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-[9999]">
//           <div className="flex gap-2">
//             <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
//             <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
//             <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
//           </div>
//         </div>
//       )}

//      <article
//   className="
//     relative w-full
//     bg-white border border-gray-200 rounded-xl
//    p-2 sm:p-4

//     flex flex-col justify-between
//     hover:shadow-md hover:-translate-y-1 transition-all
//     min-h-[360px] sm:min-h-[380px]
//   "
// >


//         {/* IMAGE */}
//         <div
//           className="
//   relative
//   h-64 sm:h-72 md:h-80
//   w-full
//   rounded-lg
//   overflow-hidden
//   bg-gray-50
//   flex items-center justify-center
//   cursor-pointer
// "

//           onClick={openProduct}
//         >
//    <Link
//   href={`/product/${product.slug}`}
//   className="
//     relative
//     h-64 sm:h-72 md:h-80
//     w-full
//     rounded-lg
//     overflow-hidden
//     bg-gray-50
//     flex items-center justify-center
//     cursor-pointer
//   "
// >
//   <Image
//     src={product.image || "/images/product.png"}
//     alt={product.name}
//     fill
//     className="object-contain scale-125 sm:scale-110"
//   />
// </Link>





//         </div>

//         {/* TEXT */}
//         <div className="mt-3 sm:flex-1 cursor-pointer" onClick={openProduct}>
//           <Link
//   href={`/product/${product.slug}`}
//   className="mt-3 sm:flex-1 cursor-pointer block"
// >
//   <h4 className="text-[15px] font-semibold text-gray-900 leading-snug hover:underline">
//     {p.name}
//   </h4>
// </Link>

//           {/* <p className="text-xs text-gray-500 mt-1">{p.strength}</p> */}
//         </div>

//         {/* PRICE */}
//         <p className="text-[17px] font-bold text-gray-900 mt-3">
//           ${product.price.toFixed(2)}
//         </p>

//         {/* BUTTONS — always stick to bottom */}
//         <div className="mt-4 flex flex-col gap-2">
//           <button
//             onClick={openProduct}
//             className="w-full border border-bioBlue text-bioBlue text-xs font-semibold 
//                        py-2 rounded-full hover:bg-bioBlue hover:text-white transition"
//           >
//             {translations.productCard.learnMore}
//           </button>

//         <button
//   onClick={addToCart}
//   className="
//     w-full
//     cursor-pointer
//     bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
//     text-white text-xs font-semibold
//     py-2 rounded-full
//     hover:brightness-110
//     transition
//   "
// >
//   {translations.productCard.addToCart}
// </button>


//         </div>

//       </article>
//     </>
//   );
// }
























// //peptides\components\ProductCard.jsx
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function ProductCard({ product }) {
//   const router = useRouter();
//   const [pageLoading, setPageLoading] = useState(false);

//   const openProduct = () => {
//     setPageLoading(true);
//     setTimeout(() => {
//       router.push(`/product/${product.slug}`);
//     }, 600);
//   };

//   const addToCart = () => {
//   // ✅ allow guest + user cart
//   const storedUser = localStorage.getItem("bio-user");

//   let cartKey = "guest-cart";

//   if (storedUser) {
//     const user = JSON.parse(storedUser);
//     cartKey = `bio-cart-${user.email}`;
//   }

//   const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

//   const found = cart.find((item) => item.id === product.id);

//   if (found) {
//     found.qty += 1;
//   } else {
//     cart.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       strength: product.strength,
//       image: product.image,
//       slug: product.slug,
//       qty: 1,
//     });
//   }

//   localStorage.setItem(cartKey, JSON.stringify(cart));

//   setPageLoading(true);
//   setTimeout(() => {
//     router.push("/cart");
//   }, 500);
// };

//   return (
//     <>
//       {pageLoading && (
//         <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-[9999]">
//           <div className="flex gap-2">
//             <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
//             <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
//             <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
//           </div>
//         </div>
//       )}

//       <article
//         className="relative w-full min-w-[10px] sm:min-w-[180px] md:min-w-[200px]
//  bg-white border border-gray-200 rounded-xl 
//                    p-2 sm:p-4 flex flex-col justify-between
//                    hover:shadow-md hover:-translate-y-1 transition-all
//                    min-h-[380px]"  /* ⭐ SAME HEIGHT FOR ALL CARDS */
//       >

//         {/* IMAGE */}
//         <div
//           className="
//   relative
//   h-56 sm:h-60 md:h-64
//   w-full
//   rounded-lg
//   overflow-hidden
//   bg-gray-50
//   flex items-center justify-center
//   cursor-pointer
// "

//           onClick={openProduct}
//         >
//           <Image
//   src={product.image || "/images/product.png"}
//   alt={product.name}
//   width={180}
//   height={180}
//   className="object-contain w-auto h-auto"
// />


//         </div>

//         {/* TEXT */}
//         <div className="mt-3 flex-1 cursor-pointer" onClick={openProduct}>
//           <h4 className="text-[15px] font-semibold text-gray-900 leading-snug">
//             {product.name}
//           </h4>
//           <p className="text-xs text-gray-500 mt-1">{product.strength}</p>
//         </div>

//         {/* PRICE */}
//         <p className="text-[17px] font-bold text-gray-900 mt-3">
//           ${product.price.toFixed(2)}
//         </p>

//         {/* BUTTONS — always stick to bottom */}
//         <div className="mt-4 flex flex-col gap-2">
//           <button
//             onClick={openProduct}
//             className="w-full border border-bioBlue text-bioBlue text-xs font-semibold 
//                        py-2 rounded-full hover:bg-bioBlue hover:text-white transition"
//           >
//             Learn More
//           </button>

//         <button
//   onClick={addToCart}
//   className="
//     w-full
//     bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
//     text-white text-xs font-semibold
//     py-2 rounded-full
//     hover:brightness-110
//     transition
//   "
// >
//   Add to Cart
// </button>


//         </div>

//       </article>
//     </>
//   );
// }
