"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";

export default function PopularPeptidesCarousel({ products }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const containerWidth = sliderRef.current.clientWidth;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -containerWidth : containerWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative mb-10">

      {/* LEFT ARROW — DESKTOP ONLY */}
      <button
        onClick={() => scroll("left")}
        className="
          hidden md:flex
          absolute left-2 top-1/2 -translate-y-1/2 z-10
          bg-white border shadow-md w-9 h-9 rounded-full
          items-center justify-center hover:bg-gray-100
        "
      >
        <FaChevronLeft size={14} />
      </button>

      {/* RIGHT ARROW — DESKTOP ONLY */}
      <button
        onClick={() => scroll("right")}
        className="
          hidden md:flex
          absolute right-2 top-1/2 -translate-y-1/2 z-10
          bg-white border shadow-md w-9 h-9 rounded-full
          items-center justify-center hover:bg-gray-100
        "
      >
        <FaChevronRight size={14} />
      </button>

      {/* SCROLLER */}
      <div
        ref={sliderRef}
        className="
          grid
          grid-flow-col
          auto-cols-[calc(100%/2)]
          sm:auto-cols-[calc(100%/3)]
          lg:auto-cols-[calc(100%/4)]

          gap-3 md:gap-6
          overflow-x-auto scroll-smooth
          scrollbar-hide
          px-4 md:px-12
          snap-x snap-mandatory
        "
      >
        {products.map((product) => (
          <div
            key={`${product.id}-${product.slug}`}
            className="snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </section>
  );
}







// //peptides/components/PopularPeptidesCarousel.jsx
// "use client";

// import { useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import ProductCard from "@/components/ProductCard";

// export default function PopularPeptidesCarousel({ products }) {
//   const sliderRef = useRef(null);

//   const scroll = (direction) => {
//     if (!sliderRef.current) return;
//     sliderRef.current.scrollBy({
//       left: direction === "left" ? -360 : 360,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="relative mb-10">

//       {/* LEFT ARROW — DESKTOP ONLY */}
//       <button
//         onClick={() => scroll("left")}
//         className="
//           hidden md:flex
//           absolute left-0 top-1/2 -translate-y-1/2 z-10
//           bg-white border shadow-md w-9 h-9 rounded-full
//           items-center justify-center hover:bg-gray-100
//         "
//       >
//         <FaChevronLeft size={14} />
//       </button>

//       {/* RIGHT ARROW — DESKTOP ONLY */}
//       <button
//         onClick={() => scroll("right")}
//         className="
//           hidden md:flex
//           absolute right-0 top-1/2 -translate-y-1/2 z-10
//           bg-white border shadow-md w-9 h-9 rounded-full
//           items-center justify-center hover:bg-gray-100
//         "
//       >
//         <FaChevronRight size={14} />
//       </button>

//       {/* HORIZONTAL SCROLLER */}
//       <div
//         ref={sliderRef}
//         className="
//           flex gap-4 md:gap-6
//           overflow-x-auto scroll-smooth
//           scrollbar-hide
//           px-4 md:px-12
//         "
//       >
//         {products.map((product) => (
//          <div
//   key={`${product.id}-${product.slug}`}
//   className="
//     flex-shrink-0
//     w-[80vw] sm:w-[320px] md:w-[260px]
//   "
// >
//   <ProductCard product={product} />
// </div>

//         ))}
//       </div>

//     </section>
//   );
// }
