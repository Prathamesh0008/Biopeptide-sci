//peptides\app\bundle-save\page.jsx
"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { BUNDLES } from "@/data/bundles";
import Loader from "@/components/Loader"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";



export default function BundleSavePage() {
     const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Convert product IDs → real product objects
  const resolvedBundles = BUNDLES.map((bundle) => ({
    ...bundle,
    products: PRODUCTS.filter((p) => bundle.products.includes(p.id)),
  }));

  return (

    <>
    <Navbar/>
    <Breadcrumbs/>
    <main className="min-h-screen bg-white">
        {loading && <Loader />}

      {/* ⭐ PREMIUM BIOPEPTIDE HERO */}
      <div className="relative w-full py-20 overflow-hidden border-b border-gray-200">

        {/* Layer 1 – Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bioBlue/20 via-white to-bioGreen/20"></div>

        {/* Blue Glow */}
        <div className="absolute -left-20 top-10 w-72 h-72 bg-bioBlue/25 blur-[120px] rounded-full" />

        {/* Green Glow */}
        <div className="absolute -right-20 bottom-10 w-72 h-72 bg-bioGreen/25 blur-[120px] rounded-full" />

        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.12] bg-[url('/images/pattern-dots.png')] bg-repeat"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
            Bundle & Save
          </h1>

          <p className="text-gray-700 text-[15px] md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Exclusive BioPeptide research bundles designed for multi-pathway
            analysis, precision experimentation and advanced scientific workflows.
          </p>

          {/* Accent line */}
          <div className="mt-6 flex justify-center">
            <div className="h-[3px] w-24 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* PAGE LAYOUT */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-14 grid grid-cols-1 lg:grid-cols-4 gap-14">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>

        {/* RIGHT SIDE (VERTICAL BUNDLE CARDS) */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

  {resolvedBundles.map((bundle) => (
    <div
      key={bundle.id}
      className="
  flex flex-col
  border border-gray-200 rounded-2xl bg-white
  shadow-sm hover:shadow-lg transition-all
  p-3
  h-[420px]
"

    >
      {/* IMAGE */}
      <div className="relative w-full h-48 bg-gray-50 rounded-xl overflow-hidden">
        <Image
          src={bundle.products[0].image || '/images/product.png'}
          alt={bundle.title}
          fill
          className="object-contain"
        />
      </div>

      {/* CONTENT WRAPPER — keeps layout identical across cards */}
      <div className="flex flex-col flex-grow mt-4">

        {/* DISCOUNT */}
        <span className="bg-bioGreen/10 text-bioGreen text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
          {bundle.discount}
        </span>

        {/* TITLE */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-[48px]">
          {bundle.title}
        </h3>

        {/* DESCRIPTION */}
        {/* <p className="text-gray-600 text-sm line-clamp-3 h-[60px] mb-4">
          {bundle.description}
        </p> */}

        {/* PRICE + BUTTON ALWAYS AT BOTTOM */}
        <div className="mt-auto pt-4">
          {/* PRICE BOX */}
          <p className="text-lg font-bold text-gray-900 leading-none">
            ${bundle.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 line-through mb-4">
            ${bundle.original.toFixed(2)}
          </p>

          {/* BUTTON */}
          <button
  onClick={() => {
    setLoading(true); // show loader
    setTimeout(() => {
      router.push(`/bundle/${bundle.id}`);
    }, 600); // slight delay for animation
  }}
  className="
    w-full 
    bg-gradient-to-r from-bioBlue to-bioGreen 
    text-white text-sm font-semibold py-2.5
    rounded-full hover:opacity-90 transition
  "
>
  View Bundle
</button>

        </div>

      </div>
    </div>
  ))}

</div>

      </div>
    </main>
    <Footer/>
    </>
  );
}
