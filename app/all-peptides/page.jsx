
//app\all-peptides\page.jsx

"use client";

import { useState, useEffect, useMemo } from "react";

import Loader from "../../components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import DrawerProducts from "@/components/DrawerProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import AllPeptidesCategorySlider from "@/components/AllPeptidesCategorySlider";
import { useProducts } from "@/hooks/useProducts";

export default function AllPeptidesPage() {
  const { translations, loading } = useLanguage();
  const { products, loading: productLoading } = useProducts();

  const [activeCategory, setActiveCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(24);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;

    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  useEffect(() => {
    setVisible(24);
  }, [activeCategory]);

  if (loading || productLoading) {
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

      {/* DESKTOP / MOBILE DRAWER BUTTON */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
           bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
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

      <main className="min-h-screen bg-white py-12">
        <div
          className="
            max-w-7xl mx-auto
            px-4 sm:px-6
            grid grid-cols-1 lg:grid-cols-4
            gap-10 md:gap-12
          "
        >
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          <div className="lg:col-span-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              U.S. Research Peptides Supplier for Scientific R&amp;D
            </h1>

            <AllPeptidesCategorySlider
              active={activeCategory}
              onChange={setActiveCategory}
              mode="all"
            />

            <p className="text-sm text-gray-700 mt-4 mb-6">
              Showing{" "}
              <span className="font-semibold">{filteredProducts.length}</span>{" "}
              products
            </p>

            <div
              className="
                grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                gap-x-2 gap-y-3
                md:gap-x-3 md:gap-y-4
              "
            >
              {filteredProducts.slice(0, visible).map((product, index) => (
                <ProductCard
                  key={`${product._id || product.id || product.slug}-${index}`}
                  product={product}
                  priority={index < 4}
                />
              ))}
            </div>

            {visible < filteredProducts.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisible((prev) => prev + 24)}
                  className="px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-semibold cursor-pointer"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

