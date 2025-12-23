"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import DrawerProducts from "@/components/DrawerProducts";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* ✅ NAVBAR */}
      <Navbar />

      <main className="min-h-screen">

        {/* MOBILE — vertical tab */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="
            fixed left-0 top-1/2 -translate-y-1/2 z-50
            flex md:hidden items-center justify-center shadow-lg
            bg-gradient-to-b from-bioBlue to-bioGreen text-white font-semibold
            h-28 w-12 rounded-r-xl
          "
        >
          <span className="text-sm rotate-180 [writing-mode:vertical-rl] tracking-wide">
            Product List
          </span>
        </button>

        {/* DESKTOP — original horizontal button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="
            hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50
            items-center gap-2 px-4 py-3 rounded-r-full text-sm font-semibold
            bg-gradient-to-b from-bioBlue to-bioGreen text-white shadow-lg
          "
        >
          Product List
        </button>

        <Hero />

        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <Sidebar />
            </div>

            <div className="lg:col-span-3">
              <ProductGrid onOpenFilter={() => setDrawerOpen(true)} />
            </div>
          </div>
        </section>

        <AboutSection />

        <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />
      </main>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
}
