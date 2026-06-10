// peptides/app/bundle-save/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import DrawerProducts from "@/components/DrawerProducts";
import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";

import { BUNDLES } from "@/data/bundles";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BundleSavePage() {
  const { translations, loading } = useLanguage();
  const { products, loading: productsLoading } = useProducts();

  const [activeCategory, setActiveCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const normalize = (str) => str?.toLowerCase().replace(/[\s-]/g, "");

  const resolvedBundles = BUNDLES.map((bundle) => ({
    ...bundle,
    products: products.filter((p) => bundle.products.includes(p.id || p._id)),
  }));

  const filteredBundles = activeCategory === "All" ? resolvedBundles : [];

  const filteredProducts =
    activeCategory === "All"
      ? []
      : products.filter(
          (p) =>
            p.category &&
            normalize(p.category) === normalize(activeCategory)
        );

  if (loading || productsLoading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-white">
          <Loader />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <main className="min-h-screen bg-white">
        <div
          className="
            mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-10
            px-4 sm:px-6 md:gap-12 lg:grid-cols-4
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
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              {translations.bundlePage.title}
            </h1>

            <p className="mb-6 mt-2 text-sm text-gray-600">
              {translations.bundlePage.subtitle}
            </p>

            {/* SHOP BY CATEGORY HEADING */}
            <div className="mb-3 mt-6">
              <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                {translations.bundlePage.shopByCategoryTitle}
              </h2>

              <p className="mt-1 text-sm text-gray-600">
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
              <p className="mb-6 mt-4 text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold">{filteredBundles.length}</span>{" "}
                bundles
              </p>
            ) : (
              <p className="mb-6 mt-4 text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold">{filteredProducts.length}</span>{" "}
                products
              </p>
            )}

            {/* BUNDLES */}
            {activeCategory === "All" && (
              <div
                className="
                  grid grid-cols-2 gap-x-2 gap-y-3
                  md:grid-cols-3 md:gap-x-3 md:gap-y-4
                  xl:grid-cols-4
                "
              >
                {filteredBundles.map((bundle) => (
                  <Link
                    key={bundle.id}
                    href={`/bundle/${bundle.id}`}
                    className="
                      flex flex-col rounded-lg border border-gray-200
                      bg-white p-2 shadow-sm transition-all
                      hover:border-bioBlue/40 hover:shadow-md
                    "
                  >
                    <div className="relative h-56 w-full overflow-hidden rounded-xl bg-white sm:h-64">
                      <Image
                        src={bundle.image || "/images/product.png"}
                        alt={bundle.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="mt-2 flex flex-grow flex-col">
                      <span className="mb-1 w-fit rounded-full bg-bioGreen/10 px-2 py-0.5 text-[11px] font-semibold text-bioGreen">
                        {bundle.discount}
                      </span>

                      <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
                        {bundle.title}
                      </h3>

                      <div className="mt-auto pt-4">
                        <p className="text-base font-bold text-gray-900">
                          ${bundle.price.toFixed(2)}
                        </p>

                        <p className="mb-4 text-sm text-gray-500 line-through">
                          ${bundle.original.toFixed(2)}
                        </p>

                        <span
                          className="
                            block w-full rounded-md
                            bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
                            py-2 text-center text-xs font-semibold text-white
                            transition-all duration-300
                            hover:bg-[#3a3a3a] hover:bg-none
                          "
                        >
                          {translations.bundlePage.viewBundleButton ||
                            "View Bundle"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* PRODUCTS */}
            {activeCategory !== "All" && (
              <div
                className="
                  grid grid-cols-2 gap-x-2 gap-y-3
                  md:grid-cols-3 md:gap-x-3 md:gap-y-4
                  lg:grid-cols-4
                "
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product._id || product.id || product.slug || index}
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