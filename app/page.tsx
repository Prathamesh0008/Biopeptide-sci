//app\page.tsx
"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import DrawerProducts from "@/components/DrawerProducts";
import AboutSection from "@/components/AboutSection";
import Navbar from "@/components/Navbar";
import Footer from"@/components/Footer";


export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
    
    <Navbar/>
      {/* MOBILE BUTTON */}
{/* <button
  onClick={() => setDrawerOpen(true)}
  className="
    fixed right-0 top-1/2 -translate-y-1/2 z-50
    flex md:hidden items-center justify-center shadow-lg
    bg-gradient-to-b from-bioBlue to-bioGreen text-white font-semibold
    h-28 w-12 rounded-r-xl
  "
>
  <span className="text-sm rotate-180 [writing-mode:vertical-rl] tracking-wide">
    Product List
  </span>
</button> */}

      {/* DESKTOP BUTTON */}
    
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
      text-s font-semibold tracking-widest
      [writing-mode:vertical-rl]
    "
  >
    Product List
  </span>
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
      <Footer/>
    </>
  );
}
