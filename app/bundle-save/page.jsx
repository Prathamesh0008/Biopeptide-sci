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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

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
        {/* {loading && <Loader />} */}

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

          {/* SHOP BY CATEGORY HEADING */}
<div className="mt-6 mb-3">
  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
    {translations.bundlePage.shopByCategoryTitle}
  </h2>
  <p className="text-sm text-gray-600 mt-1">
    {translations.bundlePage.shopByCategorySubtitle}
  </p>
</div>

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
              <div className="
  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4
  gap-x-2 gap-y-3
  md:gap-x-3 md:gap-y-4
">

                {filteredBundles.map(bundle => (
             <div
  key={bundle.id}
  onClick={() => router.push(`/bundle/${bundle.id}`)}
  className="
    flex flex-col
    border border-gray-200 rounded-l
    bg-white
    shadow-sm hover:shadow-md
    transition-all
    p-2
    cursor-pointer
    hover:border-bioBlue/40
  "
>

                   <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-white">
  <Image
    src={bundle.image || "/images/product.png"}
    alt={bundle.title}
    fill
    className="object-contain p-2"
  />
</div>


                    <div className="flex flex-col flex-grow mt-2">

                      <span className="bg-bioGreen/10 text-bioGreen text-[11px] font-semibold px-2 py-0.5 mb-1 rounded-full  w-fit">
                        {bundle.discount}
                      </span>

                     <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-snug">

                        {bundle.title}
                      </h3>

                      <div className="mt-auto pt-4">
                        <p className="text-basefont-bold text-gray-900">
                          ${bundle.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 line-through mb-4">
                          ${bundle.original.toFixed(2)}
                        </p>
<button
  onClick={() => router.push(`/bundle/${bundle.id}`)}
  className="
    w-full
    bg-gradient-to-r from-bioBlue to-bioGreen
    py-2.5 rounded-full
    font-semibold text-xs
    transition
    hover:opacity-90
    relative
    !text-white
    !opacity-100
  "
>
  <span className="!text-white !opacity-100 block">
    {translations.bundlePage.viewBundleButton || "View Bundle"}
  </span>
</button>

                        {/* <button
                          onClick={() =>
                            router.push(`/bundle/${bundle.id}`)
                          }
                          className="w-full bg-gradient-to-r from-bioBlue to-bioGreen text-white text-sm font-semibold py-2.5 rounded-full hover:opacity-90 transition"
                        >
                          {translations.bundlePage.viewBundleButton}
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 🔹 PRODUCTS (ONLY WHEN CATEGORY SELECTED) */}
            {activeCategory !== "All" && (
             <div className="
  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-x-2 gap-y-3
  md:gap-x-3 md:gap-y-4
">

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



















