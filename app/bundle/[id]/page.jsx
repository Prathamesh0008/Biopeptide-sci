//peptides/app/bundle/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { PRODUCTS } from "@/data/products";
import { BUNDLES } from "@/data/bundles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BundleDetailPage() {
  const { id } = useParams();
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);

  const [previewOpen, setPreviewOpen] = useState(false);

 const handleAddBundleToCart = () => {
  if (!bundle) return;

  const userStr = localStorage.getItem("bio-user");
  const user = userStr ? JSON.parse(userStr) : null;

  const cartKey = user?.email
    ? `bio-cart-${user.email}`
    : "guest-cart";

  const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

  const bundleId = `bundle-${bundle.id}`;

  const existing = cart.find((item) => item.id === bundleId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: bundleId,
      name: bundle.title,
      price: bundle.price,
      qty: 1,
      image: bundle.resolvedProducts?.[0]?.image || "/images/product.png",
      strength: bundle.discount,
      type: "bundle",

      // keep bundle contents
      items: bundle.resolvedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        strength: p.size,
        price: p.price,
        qty: 1,
      })),
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  // 🔔 THIS is the magic line
  window.dispatchEvent(new Event("bio-cart-updated"));
};




  /* ⭐ ALWAYS SCROLL TO TOP WHEN PAGE LOADS */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ⭐ Loader Animation */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  /* ⭐ Resolve Bundle */
  useEffect(() => {
    const found = BUNDLES.find((b) => b.id === id);
    if (found) {
      const resolvedProducts = PRODUCTS.filter((p) =>
        found.products.includes(p.id)
      );
      setBundle({ ...found, resolvedProducts });
    }
  }, [id]);

  if (loading || !bundle) return <Loader />;

  return (
    <>
    <Navbar/>
    {previewOpen && (
  <div
    className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center px-4"
    onClick={() => setPreviewOpen(false)}
  >
    <div
      className="relative bg-white rounded-xl p-4 max-w-4xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setPreviewOpen(false)}
        className="
          absolute top-3 right-3 z-50
          w-9 h-9 rounded-full
          bg-black text-white
          flex items-center justify-center
          text-xl hover:bg-gray-800
        "
      >
        ×
      </button>

      {/* IMAGE */}
      <div className="relative w-full h-[70vh] pointer-events-none">
        <Image
          src={bundle.resolvedProducts[0]?.image || '/images/product.png'}
          alt={bundle.title}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  </div>
)}

    <main className="bg-white min-h-screen">

      {/* ⭐ HERO — Compact, centered, responsive */}
      <section className="
        relative w-full 
        h-[180px] sm:h-[200px] md:h-[230px] 
        border-b overflow-hidden 
        flex items-center justify-center text-center
      ">

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bioBlue/15 via-white to-bioGreen/15"></div>

        {/* Glows */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-bioBlue/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-bioGreen/20 blur-[120px] rounded-full"></div>

        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.06] bg-[url('/images/pattern-dots.png')] bg-repeat"></div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-3xl">
          <span className="bg-bioGreen/10 text-bioGreen text-xs font-bold px-4 py-1 rounded-full">
            {bundle.discount}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 leading-tight">
            {bundle.title}
          </h1>

          <p className="text-gray-700 text-sm sm:text-base mt-2 leading-relaxed">
            A curated BioPeptide research bundle for advanced scientific workflows.
          </p>

          <div className="mt-3 h-[3px] w-20 bg-gradient-to-r from-bioBlue to-bioGreen rounded-full mx-auto"></div>
        </div>
      </section>

      {/* ⭐ MAIN BODY GRID */}
      <section className="
        max-w-7xl mx-auto px-6 py-10 
        grid grid-cols-1 lg:grid-cols-4 gap-10
      ">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 flex flex-col xl:flex-row gap-10">

          {/* LEFT PANEL */}
          <div className="flex-1">

            {/* Image */}
            <div
  onClick={() => setPreviewOpen(true)}
  className="
    relative w-full h-60 sm:h-64
    bg-gray-50 rounded-xl
    overflow-hidden shadow-sm
    cursor-zoom-in
  "
>
  <Image
    src={bundle.resolvedProducts[0]?.image || "/images/product.png"}
    alt={bundle.title}
    fill
    className="object-contain"
  />
</div>


            {/* Overview */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bundle Overview</h2>
              <p className="text-gray-700 text-sm sm:text-base mt-3 leading-relaxed">
                {bundle.description}
                <br /><br />
                All peptides included undergo strict laboratory validation including:
                <br /><br />
                • ≥ 98–99% Purity  
                • HPLC & Mass-Spec Verified  
                • Molecular Stability  
                • Research-Grade Quality  
              </p>
            </div>

            {/* Included Products */}
            <div className="mt-10">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Included Compounds
              </h3>

              <div className="space-y-4">
                {bundle.resolvedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {product.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">{product.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Science */}
            <div className="mt-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Scientific Applications</h3>
              <ul className="mt-3 text-gray-700 text-sm sm:text-base space-y-2">
                <li>• Receptor-binding research</li>
                <li>• Regenerative cell modeling</li>
                <li>• Mitochondrial metabolic analysis</li>
                <li>• Signal pathway stimulation</li>
                <li>• Enzyme response assays</li>
              </ul>
            </div>

            {/* Stability */}
            <div className="mt-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Storage & Stability</h3>
              <ul className="mt-3 text-gray-700 text-sm sm:text-base space-y-2">
                <li>• Store at −20°C (lyophilized)</li>
                <li>• Protect from moisture & light</li>
                <li>• Reconstituted stability: 24–48 hours</li>
                <li>• Avoid freeze–thaw cycles</li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">FAQ</h3>

              <div className="mt-4 space-y-4 text-sm sm:text-base text-gray-700">
                <div>
                  <p className="font-semibold">Is this for human use?</p>
                  <p>Strictly for laboratory research purposes only.</p>
                </div>
                <div>
                  <p className="font-semibold">Do bundles include COA?</p>
                  <p>Yes — each peptide includes HPLC & Mass-Spec verification.</p>
                </div>
                <div>
                  <p className="font-semibold">Are they sterile?</p>
                  <p>Not sterile until properly reconstituted with lab-grade solvents.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PRICE CARD */}
          <div className="w-full xl:w-80">
            <div className="
              border rounded-2xl p-6 shadow-md bg-white 
              sticky top-24 
              w-full
            ">
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                ${bundle.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ${bundle.original.toFixed(2)}
              </p>

              <button
                onClick={handleAddBundleToCart}
                className="
                  w-full py-3 mt-6 
                  bg-gradient-to-r from-bioBlue to-bioGreen 
                  text-white font-semibold rounded-full 
                  hover:opacity-90 transition
                "
              >
                Add Bundle to Cart
              </button>


              <div className="mt-6 bg-gray-50 p-4 rounded-xl text-sm text-gray-700 leading-relaxed">
                ✓ ≥ 99% Purity  
                <br />✓ HPLC + MS Verified  
                <br />✓ Secure Lab Packaging  
                <br />✓ Global Research Quality  
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
    <Footer/>
    </>
  );
}
