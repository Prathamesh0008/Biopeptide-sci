// app/category/[slug]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import DrawerProducts from "@/components/DrawerProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // map URL slug → category name
  const CATEGORY_MAP = {
    "capsules": "Peptide Capsules",
    "purchase-peptides": "Purchase Peptides",
    "blends": "Peptide Blends",
    "igf-1-proteins": "IGF-1 Proteins",
    "melanotan": "Melanotan Peptides",
    "bioregulators": "Bioregulators",
    "cosmetic-peptides": "Cosmetic Peptides",
  };

  const REVERSE_CATEGORY_MAP = Object.fromEntries(
    Object.entries(CATEGORY_MAP).map(([slug, name]) => [name, slug])
  );

  const categoryName = CATEGORY_MAP[slug] || "All";

  const filteredProducts =
    categoryName === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoryName);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      router.push("/all-peptides");
      return;
    }
    const newSlug = REVERSE_CATEGORY_MAP[category];
    if (newSlug) router.push(`/category/${newSlug}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <Navbar />

      {/* SAME FIXED DRAWER BUTTON AS ALL-PEPTIDES */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
          bg-gradient-to-b from-bioBlue to-bioGreen
          text-white shadow-lg
          cursor-pointer
          h-36 w-10 rounded-l-xl
        "
      >
        <span
          className="
            text-xs font-semibold tracking-widest
            [writing-mode:vertical-rl]
          "
        >
          Product List
        </span>
      </button>

      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      {/* MAIN CONTENT — SAME STRUCTURE AS ALL-PEPTIDES */}
      <main className="min-h-screen bg-white pt-[55px] sm:pt-[90px]">
        <div
          className="
            max-w-7xl mx-auto
            px-4 sm:px-6
            grid grid-cols-1 lg:grid-cols-4
            gap-10 md:gap-12
          "
        >
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-3">
            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {categoryName}
            </h1>

            <p className="text-gray-600 text-sm mt-1 mb-4">
              Browse all products in the {categoryName} category.
            </p>

            {/* CATEGORY SLIDER — SAME POSITION AS ALL-PEPTIDES */}
            <AllPeptidesCategorySlider
              active={categoryName}
              onChange={handleCategoryChange}
            />

            {/* COUNT */}
            <p className="text-sm text-gray-700 mt-4 mb-6">
              Showing{" "}
              <span className="font-semibold">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}











// //app\category\[slug]\page.jsx
// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { PRODUCTS } from "@/data/products";
// import ProductCard from "@/components/ProductCard";
// import Sidebar from "@/components/Sidebar";
// import DrawerProducts from "@/components/DrawerProducts";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";
// import { useRouter } from "next/navigation";


// export default function CategoryPage() {
//   const { slug } = useParams();
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // map URL slug → category name
//   const CATEGORY_MAP = {
//     "capsules": "Peptide Capsules",
//     "purchase-peptides": "Purchase Peptides",
//     "blends": "Peptide Blends",
//     "igf-1-proteins": "IGF-1 Proteins",
//     "melanotan": "Melanotan Peptides",
//     "bioregulators": "Bioregulators",
//     "cosmetic-peptides": "Cosmetic Peptides",
//   };
// const REVERSE_CATEGORY_MAP = Object.fromEntries(
//   Object.entries(CATEGORY_MAP).map(([slug, name]) => [name, slug])
// );

// const categoryName = CATEGORY_MAP[slug] || "All";


//   const filteredProducts = PRODUCTS.filter(
//     (p) => p.category === categoryName
//   );

//   const totalCount = filteredProducts.length;
//   const showingCount = totalCount; // no pagination yet
// const handleCategoryChange = (category) => {
//   if (category === "All") {
//     router.push("/all-peptides");
//     return;
//   }

//   const newSlug = REVERSE_CATEGORY_MAP[category];
//   if (newSlug) {
//     router.push(`/category/${newSlug}`);
//   }
// };

//   return (
//     <>
//     <Navbar/>
    
//     <main className="bg-white">

//       {/* HEADER */}
//       <section className="border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             {categoryName}
//           </h1>
//           <p className="mt-2 text-gray-600 text-sm">
//             Browse all products in the {categoryName} category.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

//           {/* LEFT SIDEBAR — DESKTOP */}
//           <aside className="hidden lg:block">
//             <Sidebar />
//           </aside>

//           {/* RIGHT CONTENT */}
//           <div className="lg:col-span-3">

//             {/* MOBILE FILTER + COUNT ROW */}
//             <div className="flex lg:hidden items-center justify-between mb-6">
//               <button
//                 onClick={() => setDrawerOpen(true)}
//                 className="
//                   flex items-center gap-2
//                   px-4 py-2
//                   rounded-full
//                   border border-gray-300
//                   text-sm font-semibold
//                   text-gray-800
//                   bg-white
//                   hover:border-bioBlue hover:text-bioBlue
//                   transition
//                 "
//               >
//                 ☰ Filter
//               </button>

//               <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
//                 Showing{" "}
//                 <span className="font-semibold text-gray-800">
//                   {showingCount}
//                 </span>{" "}
//                 of{" "}
//                 <span className="font-semibold text-gray-800">
//                   {totalCount}
//                 </span>{" "}
//                 products
//               </p>
//             </div>

//             {/* PRODUCT GRID */}
//             {filteredProducts.length === 0 ? (
//               <p className="text-gray-500">No products found.</p>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* DRAWER — SAME AS HOME */}
//       <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />
//     </main>
//     <Footer/>
//     </>
//   );
// }
