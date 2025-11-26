//peptides\app\page.tsx
"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import DrawerProducts from "@/components/DrawerProducts";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className="bg-white min-h-screen">

      {/* Product List Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center gap-2 px-4 py-3
                   rounded-r-full text-sm font-semibold text-white bg-gradient-to-b from-bioBlue to-bioGreen shadow-lg"
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
    <ProductGrid />
  </div>
</div>

      </section>

      <AboutSection />

      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />
    </main>
  );
}
