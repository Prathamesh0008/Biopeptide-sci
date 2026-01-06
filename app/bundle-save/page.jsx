// peptides/app/bundle-save/page.jsx
"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { BUNDLES } from "@/data/bundles";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";
import ProductCard from "@/components/ProductCard";
import DrawerProducts from "@/components/DrawerProducts";

export default function BundleSavePage() {
  const router = useRouter();
  const { translations, loading } = useLanguage();

  const [activeCategory, setActiveCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 🔹 normalize helper
  const normalize = str =>
    str?.toLowerCase().replace(/[\s-]/g, "");

  // 🔹 resolve bundles
  const resolvedBundles = BUNDLES.map(bundle => ({
    ...bundle,
    products: PRODUCTS.filter(p => bundle.products.includes(p.id)),
  }));

  // 🔹 bundles ONLY for "All"
  const filteredBundles =
    activeCategory === "All" ? resolvedBundles : [];

  // 🔹 products ONLY for category (NOT All)
  const filteredProducts =
    activeCategory === "All"
      ? []
      : PRODUCTS.filter(
          p =>
            p.category &&
            normalize(p.category) === normalize(activeCategory)
        );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      {/* DRAWER BUTTON */}
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

      {/* DRAWER (PAGE LEVEL ONLY) */}
      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <main className="min-h-screen bg-white">
        {loading && <Loader />}

        <div
          className="
            max-w-7xl mx-auto
            px-4 sm:px-6
            mt-10
            grid grid-cols-1 lg:grid-cols-4
            gap-10 md:gap-12
          "
        >
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-3">
            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {translations.bundlePage.title}
            </h1>
            <p className="text-gray-600 text-sm mt-1 mb-4">
              {translations.bundlePage.subtitle}
            </p>

            {/* CATEGORY SLIDER */}
            <AllPeptidesCategorySlider
              active={activeCategory}
              onChange={setActiveCategory}
            />

            {/* COUNT */}
            {activeCategory === "All" ? (
              <p className="text-sm text-gray-700 mt-4 mb-6">
                Showing{" "}
                <span className="font-semibold">
                  {filteredBundles.length}
                </span>{" "}
                bundles
              </p>
            ) : (
              <p className="text-sm text-gray-700 mt-4 mb-6">
                Showing{" "}
                <span className="font-semibold">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
            )}

            {/* 🔹 BUNDLES (ONLY WHEN ALL) */}
            {activeCategory === "All" && (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredBundles.map(bundle => (
                  <div
                    key={bundle.id}
                    className="flex flex-col border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all p-3"
                  >
                    <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden">
                      <Image
                        src={bundle.image || "/images/product.png"}
                        alt={bundle.title}
                        fill
                        className="object-cover scale-110"
                      />
                    </div>

                    <div className="flex flex-col flex-grow mt-4">
                      <span className="bg-bioGreen/10 text-bioGreen text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
                        {bundle.discount}
                      </span>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {bundle.title}
                      </h3>

                      <div className="mt-auto pt-4">
                        <p className="text-lg font-bold text-gray-900">
                          ${bundle.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 line-through mb-4">
                          ${bundle.original.toFixed(2)}
                        </p>

                        <button
                          onClick={() =>
                            router.push(`/bundle/${bundle.id}`)
                          }
                          className="w-full bg-gradient-to-r from-bioBlue to-bioGreen text-white text-sm font-semibold py-2.5 rounded-full hover:opacity-90 transition"
                        >
                          {translations.bundlePage.viewBundleButton}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 🔹 PRODUCTS (ONLY WHEN CATEGORY SELECTED) */}
            {activeCategory !== "All" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.id}-${index}`}
                    product={product}
                  />
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






// // peptides/app/bundle-save/page.jsx
// "use client";

// import Sidebar from "@/components/Sidebar";
// import Image from "next/image";
// import { PRODUCTS } from "@/data/products";
// import { BUNDLES } from "@/data/bundles";
// import Loader from "@/components/Loader";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext";
// import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";
// import ProductCard from "@/components/ProductCard";

// export default function BundleSavePage() {
//   const router = useRouter();
//   const { translations, loading } = useLanguage();
//   const [activeCategory, setActiveCategory] = useState("All");

//   // 🔹 normalize helper
//   const normalize = str =>
//     str?.toLowerCase().replace(/[\s-]/g, "");

//   // 🔹 resolve bundles
//   const resolvedBundles = BUNDLES.map(bundle => ({
//     ...bundle,
//     products: PRODUCTS.filter(p => bundle.products.includes(p.id)),
//   }));

//   // 🔹 bundles ONLY for "All"
//   const filteredBundles =
//     activeCategory === "All" ? resolvedBundles : [];

//   // 🔹 products ONLY for category (NOT All)
//   const filteredProducts =
//     activeCategory === "All"
//       ? []
//       : PRODUCTS.filter(
//           p =>
//             p.category &&
//             normalize(p.category) === normalize(activeCategory)
//         );

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   if (loading) return null;

//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs />

//       <main className="min-h-screen bg-white">
//         {loading && <Loader />}

//         <div
//           className="
//             max-w-7xl mx-auto
//             px-4 sm:px-6
//             mt-10
//             grid grid-cols-1 lg:grid-cols-4
//             gap-10 md:gap-12
//           "
//         >
//           {/* SIDEBAR */}
//           <aside className="hidden lg:block">
//             <div className="sticky top-24">
//               <Sidebar />
//             </div>
//           </aside>

//           {/* CONTENT */}
//           <div className="lg:col-span-3">
//             {/* TITLE */}
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//               {translations.bundlePage.title}
//             </h1>
//             <p className="text-gray-600 text-sm mt-1 mb-4">
//               {translations.bundlePage.subtitle}
//             </p>

//             {/* CATEGORY SLIDER */}
//             <AllPeptidesCategorySlider
//               active={activeCategory}
//               onChange={setActiveCategory}
//             />

//             {/* COUNT */}
//             {activeCategory === "All" ? (
//               <p className="text-sm text-gray-700 mt-4 mb-6">
//                 Showing{" "}
//                 <span className="font-semibold">
//                   {filteredBundles.length}
//                 </span>{" "}
//                 bundles
//               </p>
//             ) : (
//               <p className="text-sm text-gray-700 mt-4 mb-6">
//                 Showing{" "}
//                 <span className="font-semibold">
//                   {filteredProducts.length}
//                 </span>{" "}
//                 products
//               </p>
//             )}

//             {/* 🔹 BUNDLES (ONLY WHEN ALL) */}
//             {activeCategory === "All" && (
//               <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
//                 {filteredBundles.map(bundle => (
//                   <div
//                     key={bundle.id}
//                     className="flex flex-col border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all p-3"
//                   >
//                     <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden">
//                       <Image
//                         src={bundle.image || "/images/product.png"}
//                         alt={bundle.title}
//                         fill
//                         className="object-cover scale-110"
//                       />
//                     </div>

//                     <div className="flex flex-col flex-grow mt-4">
//                       <span className="bg-bioGreen/10 text-bioGreen text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
//                         {bundle.discount}
//                       </span>

//                       <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
//                         {bundle.title}
//                       </h3>

//                       <div className="mt-auto pt-4">
//                         <p className="text-lg font-bold text-gray-900">
//                           ${bundle.price.toFixed(2)}
//                         </p>
//                         <p className="text-sm text-gray-500 line-through mb-4">
//                           ${bundle.original.toFixed(2)}
//                         </p>

//                         <button
//                           onClick={() =>
//                             router.push(`/bundle/${bundle.id}`)
//                           }
//                           className="w-full bg-gradient-to-r from-bioBlue to-bioGreen text-white text-sm font-semibold py-2.5 rounded-full hover:opacity-90 transition"
//                         >
//                           {translations.bundlePage.viewBundleButton}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* 🔹 PRODUCTS (ONLY WHEN CATEGORY SELECTED) */}
//             {activeCategory !== "All" && (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//                 {filteredProducts.map((product, index) => (
//                   <ProductCard
//                     key={`${product.id}-${index}`}
//                     product={product}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }



// //peptides\app\bundle-save\page.jsx
// "use client";

// import Sidebar from "@/components/Sidebar";
// import Image from "next/image";
// import { PRODUCTS } from "@/data/products";
// import { BUNDLES } from "@/data/bundles";
// import Loader from "@/components/Loader"; 
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext"; 
// import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";

// export default function BundleSavePage() {
//      const router = useRouter();
// const [isRedirecting, setIsRedirecting] = useState(false);
// // state



// // state
// const [activeCategory, setActiveCategory] = useState("All");

// // Convert product IDs → real product objects
// const resolvedBundles = BUNDLES.map((bundle) => ({
//   ...bundle,
//   products: PRODUCTS.filter((p) => bundle.products.includes(p.id)),
// }));

// // Filtered bundles (AFTER resolvedBundles exists)
// const normalize = str =>
//   str?.toLowerCase().replace(/[\s-]/g, "");

// const filteredBundles =
//   activeCategory === "All"
//     ? resolvedBundles
//     : resolvedBundles.filter(bundle =>
//         normalize(bundle.category) === normalize(activeCategory)
//       );

// // Filter individual products by category
// const filteredProducts =
//   activeCategory === "All"
//     ? PRODUCTS
//     : PRODUCTS.filter(
//         p =>
//           p.category &&
//           normalize(p.category) === normalize(activeCategory)
//       );


  
// const { translations, loading } = useLanguage();

// useEffect(() => {
//   window.scrollTo(0, 0);
// }, []);

// if (loading) return null;

//   return (

//     <>
//     <Navbar/>
//     <Breadcrumbs/>
    
//     <main className="min-h-screen bg-white">
//         {loading && <Loader />}

      

//      {/* PAGE LAYOUT */}
// <div
//   className="
//     max-w-7xl mx-auto 
//     px-4 sm:px-6 
//     mt-10
//     grid grid-cols-1 lg:grid-cols-4 
//     gap-10 md:gap-12
//   "
// >
//   {/* LEFT SIDEBAR */}
//   <aside className="hidden lg:block">
//     <div className="sticky top-24">
//       <Sidebar />
//     </div>
//   </aside>

//   {/* RIGHT CONTENT */}
//   <div className="lg:col-span-3">

//     {/* TITLE */}
//     <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//       {translations.bundlePage.title}
//     </h1>
//     <p className="text-gray-600 text-sm mt-1 mb-4">
//       {translations.bundlePage.subtitle}
//     </p>

//     {/* CATEGORY SLIDER — SAME AS ALL PEPTIDES */}
//    <AllPeptidesCategorySlider
//   active={activeCategory}
//   onChange={setActiveCategory}
// />


//     {/* COUNT (OPTIONAL, BUT CONSISTENT) */}
//     <p className="text-sm text-gray-700 mt-4 mb-6">
//   Showing{" "}
//   <span className="font-semibold">
//     {filteredBundles.length}
//   </span>{" "}
//   bundles &{" "}
//   <span className="font-semibold">
//     {filteredProducts.length}
//   </span>{" "}
//   products
// </p>


//     {/* BUNDLE GRID */}
//     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">

//       {filteredBundles.map((bundle) => (
//         <div
//           key={bundle.id}
//           className="
//             flex flex-col
//             border border-gray-200 rounded-2xl bg-white
//             shadow-sm hover:shadow-lg transition-all
//             p-3
//           "
//         >
//           {/* IMAGE */}
//    <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden">
//   <Image
//     src={bundle.image || "/images/product.png"}
//     alt={bundle.title}
//     fill
//     className="
//       object-cover
//       scale-110
//     "
//   />
// </div>

//           {/* CONTENT */}
//           <div className="flex flex-col flex-grow mt-4">

//             <span className="bg-bioGreen/10 text-bioGreen text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
//               {bundle.discount}
//             </span>

//             <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
//               {bundle.title}
//             </h3>

//             {/* PRICE + BUTTON */}
//             <div className="mt-auto pt-4">
//               <p className="text-lg font-bold text-gray-900">
//                 ${bundle.price.toFixed(2)}
//               </p>
//               <p className="text-sm text-gray-500 line-through mb-4">
//                 ${bundle.original.toFixed(2)}
//               </p>

//               <button
//                 onClick={() => router.push(`/bundle/${bundle.id}`)}
//                 className="
//                   w-full bg-gradient-to-r from-bioBlue to-bioGreen
//                   text-white text-sm font-semibold py-2.5
//                   rounded-full hover:opacity-90 transition
//                   cursor-pointer
//                 "
//               >
//                 {translations.bundlePage.viewBundleButton}
//               </button>
//             </div>

//           </div>
//         </div>
//       ))}

//     </div>
//   </div>
// </div>

//     </main>
//     <Footer/>
//     </>
//   );
// }

















// //peptides\app\bundle-save\page.jsx
// "use client";

// import Sidebar from "@/components/Sidebar";
// import Image from "next/image";
// import { PRODUCTS } from "@/data/products";
// import { BUNDLES } from "@/data/bundles";
// import Loader from "@/components/Loader"; 
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";



// export default function BundleSavePage() {
//      const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   // Convert product IDs → real product objects
//   const resolvedBundles = BUNDLES.map((bundle) => ({
//     ...bundle,
//     products: PRODUCTS.filter((p) => bundle.products.includes(p.id)),
//   }));

//   return (

//     <>
//     <Navbar/>
//     <Breadcrumbs/>
//     <main className="min-h-screen bg-white">
//         {loading && <Loader />}

//       {/* ⭐ PREMIUM BIOPEPTIDE HERO */}
//       <div className="relative w-full py-20 overflow-hidden border-b border-gray-200">

//         {/* Layer 1 – Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-bioBlue/20 via-white to-bioGreen/20"></div>

//         {/* Blue Glow */}
//         <div className="absolute -left-20 top-10 w-72 h-72 bg-bioBlue/25 blur-[120px] rounded-full" />

//         {/* Green Glow */}
//         <div className="absolute -right-20 bottom-10 w-72 h-72 bg-bioGreen/25 blur-[120px] rounded-full" />

//         {/* Dot Pattern */}
//         <div className="absolute inset-0 opacity-[0.12] bg-[url('/images/pattern-dots.png')] bg-repeat"></div>

//         {/* Content */}
//         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
//             Bundle & Save
//           </h1>

//           <p className="text-gray-700 text-[15px] md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
//             Exclusive BioPeptide research bundles designed for multi-pathway
//             analysis, precision experimentation and advanced scientific workflows.
//           </p>

//           {/* Accent line */}
//           <div className="mt-6 flex justify-center">
//             <div className="h-[3px] w-24 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen shadow-sm"></div>
//           </div>
//         </div>
//       </div>

//       {/* PAGE LAYOUT */}
//       <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-14 grid grid-cols-1 lg:grid-cols-4 gap-14">
//         {/* LEFT SIDEBAR */}
//         <aside className="hidden lg:block">
//           <div className="sticky top-24">
//             <Sidebar />
//           </div>
//         </aside>

//         {/* RIGHT SIDE (VERTICAL BUNDLE CARDS) */}
//         <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

//   {resolvedBundles.map((bundle) => (
//     <div
//       key={bundle.id}
//       className="
//   flex flex-col
//   border border-gray-200 rounded-2xl bg-white
//   shadow-sm hover:shadow-lg transition-all
//   p-3
//   h-[420px]
// "

//     >
//       {/* IMAGE */}
//       <div className="relative w-full h-48 bg-gray-50 rounded-xl overflow-hidden">
//         <Image
//           src={bundle.products[0].image || '/images/product.png'}
//           alt={bundle.title}
//           fill
//           className="object-contain"
//         />
//       </div>

//       {/* CONTENT WRAPPER — keeps layout identical across cards */}
//       <div className="flex flex-col flex-grow mt-4">

//         {/* DISCOUNT */}
//         <span className="bg-bioGreen/10 text-bioGreen text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
//           {bundle.discount}
//         </span>

//         {/* TITLE */}
//         <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-[48px]">
//           {bundle.title}
//         </h3>

//         {/* DESCRIPTION */}
//         {/* <p className="text-gray-600 text-sm line-clamp-3 h-[60px] mb-4">
//           {bundle.description}
//         </p> */}

//         {/* PRICE + BUTTON ALWAYS AT BOTTOM */}
//         <div className="mt-auto pt-4">
//           {/* PRICE BOX */}
//           <p className="text-lg font-bold text-gray-900 leading-none">
//             ${bundle.price.toFixed(2)}
//           </p>
//           <p className="text-sm text-gray-500 line-through mb-4">
//             ${bundle.original.toFixed(2)}
//           </p>

//           {/* BUTTON */}
//           <button
//   onClick={() => {
//     setLoading(true); // show loader
//     setTimeout(() => {
//       router.push(`/bundle/${bundle.id}`);
//     }, 600); // slight delay for animation
//   }}
//   className="
//     w-full 
//     bg-gradient-to-r from-bioBlue to-bioGreen 
//     text-white text-sm font-semibold py-2.5
//     rounded-full hover:opacity-90 transition
//   "
// >
//   View Bundle
// </button>

//         </div>

//       </div>
//     </div>
//   ))}

// </div>

//       </div>
//     </main>
//     <Footer/>
//     </>
//   );
// }
