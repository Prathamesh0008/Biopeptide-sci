// peptides/app/popular-peptides/page.jsx
"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import DrawerProducts from "@/components/DrawerProducts";
import { PRODUCTS } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";

export default function PopularPeptidesPage() {
  const { translations, loading } = useLanguage();
  if (loading) return null;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS.filter(p => p.category.toLowerCase() === "popular peptides")
      : PRODUCTS.filter(p => p.category === activeCategory);

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

      {/* DRAWER (PAGE LEVEL) */}
      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <main className="min-h-screen bg-white py-12">
        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          {/* PRODUCTS */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {translations.popularPeptides.title}
            </h1>

            <p className="text-gray-600 text-sm mt-1 mb-4">
              {translations.popularPeptides.subtitle}
            </p>

            {/* CATEGORY SLIDER */}
            <AllPeptidesCategorySlider
              active={activeCategory}
              onChange={setActiveCategory}
            />

            {/* COUNT */}
            <p className="text-sm text-gray-700 mt-4 mb-6">
              {translations.popularPeptides.showing}{" "}
              <span className="font-semibold">
                {filteredProducts.length}
              </span>{" "}
              {translations.popularPeptides.products}
            </p>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard
                  key={`${product.id}-${product.slug}`}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}






// //peptides\app\popular-peptides\page.jsx
// "use client";

// import Sidebar from "@/components/Sidebar";
// import ProductCard from "@/components/ProductCard";
// import { PRODUCTS } from "@/data/products";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext";
// import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";
// import { useState } from "react";




// export default function PopularPeptidesPage() {
//   const { translations, loading } = useLanguage();
//   if (loading) return null;

//   const popular = PRODUCTS.filter(
//     (p) => p.category.toLowerCase() === "popular peptides"
//   );
// const [activeCategory, setActiveCategory] = useState("All");

// const filteredProducts =
//   activeCategory === "All"
//     ? PRODUCTS.filter(p => p.category.toLowerCase() === "popular peptides")
//     : PRODUCTS.filter(p => p.category === activeCategory);

//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs />

//       <main className="min-h-screen bg-white py-12">

//         {/* PAGE TITLE */}
//         {/* <div className="max-w-7xl mx-auto px-6 mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             {translations.popularPeptides.title}
//           </h1>

//           <p className="text-gray-600 text-sm mt-1">
//             {translations.popularPeptides.subtitle}
//           </p>
//         </div> */}

//         {/* MAIN GRID */}
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">

//           {/* SIDEBAR */}
//           <aside className="hidden lg:block">
//             <Sidebar />
//           </aside>

//           {/* PRODUCTS */}
// <div className="lg:col-span-3">

//   {/* TITLE */}
//   <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//     {translations.popularPeptides.title}
//   </h1>
//   <p className="text-gray-600 text-sm mt-1 mb-4">
//     {translations.popularPeptides.subtitle}
//   </p>

//   {/* CATEGORY SLIDER */}
//   <AllPeptidesCategorySlider
//     active={activeCategory}
//     onChange={setActiveCategory}
//   />

//   {/* COUNT */}
//   <p className="text-sm text-gray-700 mt-4 mb-6">
//     {translations.popularPeptides.showing}{" "}
//     <span className="font-semibold">{filteredProducts.length}</span>{" "}
//     {translations.popularPeptides.products}
//   </p>

//   {/* PRODUCTS */}
//   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//     {filteredProducts.map((product) => (
//       <ProductCard
//         key={`${product.id}-${product.slug}`}
//         product={product}
//       />
//     ))}
//   </div>

// </div>


//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }









// //peptides\app\popular-peptides\page.jsx
// "use client";

// import Sidebar from "@/components/Sidebar";
// import ProductCard from "@/components/ProductCard";
// import { PRODUCTS } from "@/data/products";
// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";

// export default function PopularPeptidesPage() {
  

//   // FILTER POPULAR PRODUCTS
//   const popular = PRODUCTS.filter(
//     (p) => p.category.toLowerCase() === "popular peptides".toLowerCase()
//   );

//   // SORTING
 

//   return (

//     <>
//     <Navbar/>
//     <Breadcrumbs/>
//    <main className="min-h-screen bg-white py-12">

//       {/* PAGE TITLE */}
//       <div className="max-w-7xl mx-auto px-6 mb-10">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//           Popular Peptides
//         </h1>

//         <p className="text-gray-600 text-sm mt-1">
//           Explore the most in-demand BioPeptide research peptides.
//         </p>
//       </div>

//       {/* MAIN GRID */}
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">

//         {/* LEFT SIDEBAR */}
//         <aside className="hidden lg:block">
//           <Sidebar />
//         </aside>

//         {/* RIGHT CONTENT */}
//         <div className="lg:col-span-3">

//   <p className="text-sm text-gray-700 mb-6">
//     Showing {popular.length} products
//   </p>

//   <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
//     {popular.map((product) => (
//       <ProductCard
//         key={`${product.id}-${product.slug}`}
//         product={product}
//       />
//     ))}
//   </div>

// </div>

//       </div>
//     </main>
//     <Footer/>
//     </>
//   );
// }
