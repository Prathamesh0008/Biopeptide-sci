


// peptides/app/product/[slug]/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductContent from "@/components/ProductContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import DrawerProducts from "@/components/DrawerProducts";


export default function ProductPage() {
  const { slug } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
   const [previewOpen, setPreviewOpen] = useState(false);
  const { translations } = useLanguage();
  const t = translations?.productPage;
  if (!t?.description) {
  return null;
}



 
  const product = PRODUCTS.find(p => p.slug === slug);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        {t?.notFound}
      </div>
    );
  }

  const handleAddToCart = () => {
    const userStr = localStorage.getItem("bio-user");
    const user = userStr ? JSON.parse(userStr) : null;

    const cartKey = user?.email
      ? `bio-cart-${user.email}`
      : "guest-cart";

    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const existing = cart.find(item => item.id === product.id);

    if (existing) existing.qty += 1;
    else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.image,
        strength: product.strength
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("bio-cart-updated"));
  };

  return (
    <>
      <Navbar />
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
      text-s font-semibold tracking-widest
      [writing-mode:vertical-rl]
    "
  >
    Product List
  </span>
</button>


      <main className="min-h-screen bg-white pt-4 md:pt-10 pb-20">
        {/* BACK */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
          <Link href="/" className="text-bioBlue underline text-sm">
            {t?.back}
          </Link>
        </div>

        {/* PRODUCT */}
        <section className="max-w-7xl mx-auto px-0 sm:px-6 mt-4 md:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-14 p-6 sm:p-10 ">

            {/* IMAGE */}
            <div className="flex flex-col gap-6 w-full max-w-[450px] mx-auto">
              <div
  onClick={() => setPreviewOpen(true)}
  className="
  relative
  h-[360px] sm:h-[420px] md:h-[500px] lg:h-[560px]
  p-4 sm:p-6
  cursor-zoom-in
  flex items-center justify-center
"

>
  {/* BOTTOM SHADOW */}
  <div
    className="
      absolute 
      bottom-12 
      w-[55%] 
      h-[30px] 
      bg-black/30 
      blur-2xl 
      rounded-full
    "
  />

  {/* PRODUCT IMAGE */}
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         450px"
  className="object-contain p-2 relative z-10"
/>

</div>

              {/* BADGES */}
              <div className="flex flex-wrap justify-center gap-2 text-[11px] font-medium">
                <span className="px-3 py-1 border ">
                  {t?.badges.hplc}
                </span>
                <span className="px-3 py-1 border ">
                  {product.purity}
                </span>
                <span className="px-3 py-1 border ">
                  {t?.badges.research}
                </span>
                <span className="px-3 py-1 border ">
                  {t?.badges.coa}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <h1 className="text-4xl font-bold text-black">
                {product.name}
              </h1>

              <p className="text-sm font-bold  p-2 text-black border-l-4 border-black pl-3">
                {t?.tagline}
              </p>

              <p className="text-black text-sm  leading-relaxed max-w-xl">
               {t?.description?.p0?.replace("{name}", product.name)}
                <br /><br />
                {t?.description.p1.replace("{name}", product.name)}
                <br /><br />
                {t?.description.p2.replace("{name}", product.name)}
              </p>

              {/* PRICE */}
              <div className=" p-6 max-w-xs ">
                <p className="text-4xl font-semibold text-black">
                  ${product.price}
                </p>
                <p className="text-xs text-black">
                  {t?.priceNote}
                </p>

                <button
                  onClick={handleAddToCart}
                  className="mt-4 w-full py-3 font-semibold text-white bg-[linear-gradient(to_right,#185b30,#55a045,#66b4d8,#1a4a7d)]
"
                >
                  {t?.addToCart}
                </button>
              </div>

              {/* SPECS */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  [t?.specs.category, product.category],
                  [t?.specs.purity, product.purity],
                  [t?.specs.size, product.size],
                  [t?.specs.cas, product.cas || "N/A"]
                ].map(([label, value]) => (
                  <div key={label} className="border p-4 ">
                    <p className="text-[11px] text-gray-500">{label}</p>
                    <p className="font-semibold text-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProductContent product={product} />
      </main>
      {/* IMAGE PREVIEW MODAL */}
{previewOpen && (
  <div
    className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center px-4"
    onClick={() => setPreviewOpen(false)}
  >
    {/* STOP PROPAGATION */}
    <div
      className="relative w-full max-w-3xl bg-white p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setPreviewOpen(false)}
        className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-black cursor-pointer"
      >
        ✕
      </button>

      {/* IMAGE */}
      <div className="relative w-full h-[70vh]">
        {/* <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          priority
        /> */}
        <Image
  src={product.image}
  alt={product.name}
  fill
  className="object-contain p-2 relative z-10"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
  priority
/>

      </div>
    </div>
  </div>
)}
<DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <Footer />
    </>
  );
}








