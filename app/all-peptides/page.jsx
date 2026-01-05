//app\all-peptides\page.jsx
"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";



export default function AllPeptidesPage() {
  const { translations, loading } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

const filteredProducts =
  activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);



useEffect(() => {
  window.scrollTo(0, 0);
}, []);

if (loading) return null;

  return (
    <>
      {/* NAVBAR — NO PADDING ABOVE */}
      <Navbar />
      <Breadcrumbs/>

      {/* MAIN CONTENT ONLY */}
      <main className="min-h-screen bg-white pt-[55px] sm:pt-[90px]">
        

        {/* GRID */}
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

          {/* PRODUCTS */}
          <div className="lg:col-span-3">

  {/* TITLE */}
  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
    {translations.allPeptides.title}
  </h1>
  <p className="text-gray-600 text-sm mt-1 mb-4">
    {translations.allPeptides.subtitle}
  </p>

  {/* FILTER */}
  <AllPeptidesCategorySlider
    active={activeCategory}
    onChange={setActiveCategory}
  />

  {/* COUNT */}
  <p className="text-sm text-gray-700 mt-4 mb-6">
    Showing <span className="font-semibold">{filteredProducts.length}</span> products
  </p>

  {/* PRODUCTS */}
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">

    {filteredProducts.map((product, index) => (
      <ProductCard
        key={`${product.id}-${index}`}
        product={product}
      />
    ))}
  </div>

</div>

        </div>
      </main>

      {/* FOOTER — NO GAP BELOW */}
      <Footer />
    </>
  );
}








// //app\all-peptides\page.jsx
// "use client";

// import { useState, useEffect } from "react";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Sidebar from "@/components/Sidebar";
// import ProductCard from "@/components/ProductCard";
// import { PRODUCTS } from "@/data/products";
// import Breadcrumbs from "../../components/Breadcrumbs";

// export default function AllPeptidesPage() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

  

 

//   return (
//     <>
//       {/* NAVBAR — NO PADDING ABOVE */}
//       <Navbar />
//       <Breadcrumbs/>

//       {/* MAIN CONTENT ONLY */}
//       <main className="min-h-screen bg-white pt-[72px] sm:pt-[90px]">
//         {/* PAGE TITLE */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-10">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//             All Peptides
//           </h1>
//           <p className="text-gray-600 text-sm mt-1">
//             Explore our full collection of premium BioPeptide research compounds.
//           </p>
//         </div>

//         {/* GRID */}
//         <div
//           className="
//             max-w-7xl mx-auto 
//             px-4 sm:px-6 
//             grid grid-cols-1 lg:grid-cols-4 
//             gap-10 md:gap-12
//           "
//         >
//           {/* SIDEBAR */}
//           <aside className="hidden lg:block">
//             <Sidebar />
//           </aside>

//           {/* PRODUCTS */}
//           <div className="lg:col-span-3">
//             <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
//               <p className="text-sm text-gray-700">
//   Showing {PRODUCTS.length} products
// </p>


              
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//   {PRODUCTS.map((product, index) => (
//     <ProductCard
//       key={`${product.id}-${index}`}
//       product={product}
//     />
//   ))}
// </div>

//           </div>
//         </div>
//       </main>

//       {/* FOOTER — NO GAP BELOW */}
//       <Footer />
//     </>
//   );
// }
