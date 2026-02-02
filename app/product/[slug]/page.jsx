
//peptides\app\product\[slug]\page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import productLang from "@/data2/languages/en";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";


/* 🎨 BioPeptides Color Scheme */
const colors = {
  primary: "#185b30",
  secondary: "#55a045",
  accent: "#1a4a7d",
  light: "#f7faf9",
  dark: "#0f172a",
};

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();

const [openFaq, setOpenFaq] = useState(null);

  const product = PRODUCTS.find((p) => p.slug === slug);
  const langProduct = productLang?.products?.[slug];

  if (!product || !langProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Product not found
      </div>
    );
  }

  const { name, cas, strength, topDescription, content } = langProduct;
const [activeTab, setActiveTab] = useState("chemical");
const [qty, setQty] = useState(1);

const handleAddToCart = () => {
  const userStr = localStorage.getItem("bio-user");
  const user = userStr ? JSON.parse(userStr) : null;

  const cartKey = user?.email
    ? `bio-cart-${user.email}`
    : "guest-cart";

  const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: qty,
      image: product.image,
      strength: product.size
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  window.dispatchEvent(new Event("bio-cart-updated"));

  // ✅ go to cart page
  // window.location.href = "/cart";
};


  return (
    <>
      <Navbar />
      <Breadcrumbs />
{/* BACK BUTTON */}
<div className="max-w-7xl mx-auto px-4 mt-4">
  <button
    onClick={() => router.back()}
    className="
      inline-flex items-center gap-2
      text-sm font-semibold
      text-gray-700
      hover:text-black
      transition
      cursor:pointer
    "
  >
    ← Back
  </button>
</div>

      <main className="bg-white min-h-screen">
        
        
{/* PRODUCT HERO */}
<section className="max-w-7xl mx-auto px-4 py-10">
  <div className="grid grid-cols-1 lg:grid-cols-[390px_1fr_320px] gap-10 items-start">

    {/* LEFT – PRODUCT IMAGE (NO BG) */}
    <div className="flex justify-center">
<div className="relative w-[390px] h-[390px] lg:w-[490px] lg:h-[490px]">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>

    {/* MIDDLE – PRODUCT INFO */}
    <div className="space-y-6 pl-14">
      <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

      <p className="text-sm text-gray-600">
        <b>CAS:</b> {cas}
      </p>

      <div className="space-y-2 text-sm leading-6 text-gray-700 max-w-[420px]">
        {Array.isArray(strength) &&
          strength.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
      </div>
    </div>

    {/* RIGHT – ADD TO CART */}
    <div className=" p-6 space-y-5 bg-white ">
      {/* PRICE */}
      <p className="text-3xl font-bold text-black-600">
        ${product.price.toFixed(2)}
      </p>

      {/* NOTE */}
      <div className="bg-gray-100 rounded-md p-3 text-xs text-gray-700">
        Products will arrive in a lyophilized (powder) form for maximum stability
      </div>

      {/* MG SELECT (UI ONLY FOR NOW) */}
      {/* <div className="space-y-2">
        <p className="text-sm font-semibold">Select mg:</p>
        <div className="flex gap-2">
          {["5mg", "10mg", "15mg"].map((mg) => (
            <button
              key={mg}
              className={`px-4 py-2 text-sm rounded-md border ${
                mg === product.size
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {mg}
            </button>
          ))}
        </div>
      </div> */}

      {/* QTY */}
     <div className="flex items-center border rounded-md w-fit">
  <button
    onClick={() => setQty((q) => Math.max(1, q - 1))}
    className="px-4 py-2 text-lg"
  >
    −
  </button>

  <span className="px-4">{qty}</span>

  <button
    onClick={() => setQty((q) => q + 1)}
    className="px-4 py-2 text-lg"
  >
    +
  </button>
</div>


      {/* ADD TO CART */}
 <button
  onClick={handleAddToCart}
  className="
    w-full
    bg-gradient-to-r from-[#145b2f] via-[#559f45] to-[#1a497c]
    text-white text-sm font-semibold
    py-3 rounded-md
    transition-all duration-300
    cursor-pointer
  "
>
  Add to Cart
</button>



      <p className="text-xs text-gray-500 text-center">
        Research Use Only
      </p>
    </div>

  </div>
</section>


       

      {/* LOWER CONTENT AREA */}
<section className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
  
  {/* LEFT SIDEBAR */}
  <Sidebar />

  {/* RIGHT CONTENT */}
  <div>
    {/* TABS */}
<div className="flex gap-8 border-b text-sm font-semibold uppercase">
  <button
    onClick={() => setActiveTab("chemical")}
    className={`pb-3 ${
      activeTab === "chemical"
        ? "border-b-2 border-black text-black"
        : "text-gray-500"
    }`}
  >
    Chemical Properties
  </button>

  <button
    onClick={() => setActiveTab("description")}
    className={`pb-3 ${
      activeTab === "description"
        ? "border-b-2 border-black text-black"
        : "text-gray-500"
    }`}
  >
    Description
  </button>

  <button
    onClick={() => setActiveTab("coa")}
    className={`pb-3 ${
      activeTab === "coa"
        ? "border-b-2 border-black text-black"
        : "text-gray-500"
    }`}
  >
    COA / HPLC / MS
  </button>
</div>

    {/* TAB CONTENT */}
    <div className="py-8 space-y-6 text-sm text-gray-700">
{activeTab === "chemical" && (
  <div className="mt-8">

    {/* CENTERED NARROW CONTAINER */}
    <div className="max-w-[760px] border rounded-md overflow-hidden">

     {content?.chemicalProperties &&
  Object.entries(content.chemicalProperties).map(
    ([key, value], index) => (
      <div
        key={key}
        className={`grid grid-cols-[240px_1fr] px-6 py-4 text-sm ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        {/* LABEL */}
        <div className="font-semibold text-gray-900">
          {key.replace(/([A-Z])/g, " $1")}
        </div>

        {/* VALUE */}
        <div className="text-gray-700 break-all leading-6">
          {value}
        </div>
      </div>
    )
  )}


    </div>

  </div>
)}



{activeTab === "description" && (
  <div className="space-y-6 mt-6 text-sm leading-6 text-gray-700">

    {/* OVERVIEW */}
    <h2 className="text-lg font-semibold">{content.overviewTitle}</h2>
    {content.overview.map((p, i) => <p key={i}>{p}</p>)}

    {/* SCIENTIFIC BACKGROUND */}
    <h2 className="text-lg font-semibold mt-6">
      {content.scientificBackgroundTitle}
    </h2>
    {content.scientificBackground.map((p, i) => <p key={i}>{p}</p>)}

    {/* MECHANISM */}
    <h2 className="text-lg font-semibold mt-6">
      {content.mechanismTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.mechanismPoints.map((m, i) => (
        <li key={i}>{m}</li>
      ))}
    </ul>

    {/* APPLICATIONS */}
    <h2 className="text-lg font-semibold mt-6">
      {content.applicationsTitle}
    </h2>
    {content.applications.map((a, i) => (
      <p key={i}><b>{a.title}:</b> {a.text}</p>
    ))}

    {/* MOLECULAR CHARACTERISTICS */}
    <h2 className="text-lg font-semibold mt-6">
      {content.molecularTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.molecularPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* STABILITY */}
    <h2 className="text-lg font-semibold mt-6">
      {content.stabilityTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.stabilityPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* SOLUBILITY */}
    <h2 className="text-lg font-semibold mt-6">
      {content.solubilityTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.solubilityPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* TECH SPECS */}
    <h2 className="text-lg font-semibold mt-6">
      {content.techSpecsTitle}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {Object.entries(content.techSpecs).map(([key, value]) => (
        <div key={key} className="border rounded p-4 bg-gray-50">
          <p className="text-xs uppercase text-gray-500">
            {key.replace(/([A-Z])/g, " $1")}
          </p>
          <p className="font-semibold text-gray-900 mt-1">
            {value}
          </p>
        </div>
      ))}
    </div>

    {/* VALIDATION */}
    <h2 className="text-lg font-semibold mt-6">
      {content.validationTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.validationPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* WHY SOURCE */}
    <h2 className="text-lg font-semibold mt-6">
      {content.whyTitle}
    </h2>
    <p>{content.whyText}</p>

 {/* FAQ */}
<h2 className="text-lg font-semibold mt-6">
  {content.faqTitle}
</h2>

<div className="space-y-3">
  {content.faqItems.map((f, i) => {
    const isOpen = openFaq === i;

    return (
      <div
        key={i}
        className="border-b pb-3 cursor-pointer"
      >
        {/* QUESTION */}
        <button
          onClick={() => setOpenFaq(isOpen ? null : i)}
          className="w-full flex items-center justify-between text-left"
        >
          <span className="font-semibold text-gray-900">
            {f.q}
          </span>

          {/* ARROW */}
          <span
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>

        {/* ANSWER */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40 mt-2" : "max-h-0"
          }`}
        >
          <p className="text-sm text-gray-700 leading-6">
            {f.a}
          </p>
        </div>
      </div>
    );
  })}
</div>


  </div>
)}


{activeTab === "coa" && (
  <div className="flex justify-center mt-8">
    <div className="relative w-full max-w-4xl h-[750px] border rounded">
      <Image
        src={product.coaImage}
        alt={`${name} COA`}
        fill
        className="object-contain"
      />
    </div>
  </div>
)}
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
  );
}
















// // peptides/app/product/[slug]/page.jsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { PRODUCTS } from "@/data/products";
// import ProductContent from "@/components/ProductContent";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useLanguage } from "@/contexts/LanguageContext";
// import DrawerProducts from "@/components/DrawerProducts";


// export default function ProductPage() {
//   const { slug } = useParams();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//    const [previewOpen, setPreviewOpen] = useState(false);
//   const { translations } = useLanguage();
//   const t = translations?.productPage;
//   if (!t?.description) {
//   return null;
// }



 
//   const product = PRODUCTS.find(p => p.slug === slug);

//   // useEffect(() => {
//   //   window.scrollTo(0, 0);
//   // }, []);

//   if (!product) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center text-xl">
//         {t?.notFound}
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     const userStr = localStorage.getItem("bio-user");
//     const user = userStr ? JSON.parse(userStr) : null;

//     const cartKey = user?.email
//       ? `bio-cart-${user.email}`
//       : "guest-cart";

//     const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
//     const existing = cart.find(item => item.id === product.id);

//     if (existing) existing.qty += 1;
//     else {
//       cart.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         qty: 1,
//         image: product.image,
//         strength: product.strength
//       });
//     }

//     localStorage.setItem(cartKey, JSON.stringify(cart));
//     window.dispatchEvent(new Event("bio-cart-updated"));
//   };

//   return (
//     <>
//       <Navbar />
//       {/* DRAWER BUTTON */}
// <button
//   onClick={() => setDrawerOpen(true)}
//   className="
//     fixed right-0 top-1/2 -translate-y-1/2 z-50
//     flex items-center justify-center
//     bg-gradient-to-b from-bioBlue to-bioGreen
//     text-white shadow-lg
//     cursor-pointer
//     h-36 w-10 rounded-l-xl
//   "
// >
//   <span
//     className="
//       text-s font-semibold tracking-widest
//       [writing-mode:vertical-rl]
//     "
//   >
//     Product List
//   </span>
// </button>


//       <main className="min-h-screen bg-white pt-4 md:pt-10 pb-20">
//         {/* BACK */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2">
//           <Link href="/" className="text-bioBlue underline text-sm">
//             {t?.back}
//           </Link>
//         </div>

//         {/* PRODUCT */}
//         <section className="max-w-7xl mx-auto px-0 sm:px-6 mt-4 md:mt-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-14 p-6 sm:p-10 ">

//             {/* IMAGE */}
//             <div className="flex flex-col gap-6 w-full max-w-[450px] mx-auto">
//               <div
//   onClick={() => setPreviewOpen(true)}
//   className="
//   relative
//   h-[360px] sm:h-[420px] md:h-[500px] lg:h-[560px]
//   p-4 sm:p-6
//   cursor-zoom-in
//   flex items-center justify-center
// "

// >
//   {/* BOTTOM SHADOW */}
//   <div
//     className="
//       absolute 
//       bottom-12 
//       w-[55%] 
//       h-[30px] 
//       bg-black/30 
//       blur-2xl 
//       rounded-full
//     "
//   />

//   {/* PRODUCT IMAGE */}
// <Image
//   src={product.image}
//   alt={product.name}
//   fill
//   priority
//   sizes="(max-width: 640px) 100vw,
//          (max-width: 1024px) 50vw,
//          450px"
//   className="object-contain p-2 relative z-10"
// />


// </div>

//               {/* BADGES */}
//               <div className="flex flex-wrap justify-center gap-2 text-[11px] font-medium">
//                 <span className="px-3 py-1 border ">
//                   {t?.badges.hplc}
//                 </span>
//                 <span className="px-3 py-1 border ">
//                   {product.purity}
//                 </span>
//                 <span className="px-3 py-1 border ">
//                   {t?.badges.research}
//                 </span>
//                 <span className="px-3 py-1 border ">
//                   {t?.badges.coa}
//                 </span>
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="flex flex-col gap-6 sm:gap-8">
//               <h1 className="text-4xl font-bold text-black">
//                 {product.name}
//               </h1>

//               <p className="text-sm font-bold  p-2 text-black border-l-4 border-black pl-3">
//                 {t?.tagline}
//               </p>

//               <p className="text-black text-sm  leading-relaxed max-w-xl">
//                {t?.description?.p0?.replace("{name}", product.name)}
//                 <br /><br />
//                 {t?.description.p1.replace("{name}", product.name)}
//                 <br /><br />
//                 {t?.description.p2.replace("{name}", product.name)}
//               </p>

//               {/* PRICE */}
//               <div className=" p-6 max-w-xs ">
//                 <p className="text-4xl font-semibold text-black">
//                   ${product.price}
//                 </p>
//                 <p className="text-xs text-black">
//                   {t?.priceNote}
//                 </p>

//                 <button
//                   onClick={handleAddToCart}
//                   className="mt-4 w-full py-3 font-semibold text-white bg-[linear-gradient(to_right,#185b30,#55a045,#66b4d8,#1a4a7d)]
// "
//                 >
//                   {t?.addToCart}
//                 </button>
//               </div>

//               {/* SPECS */}
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 {[
//                   [t?.specs.category, product.category],
//                   [t?.specs.purity, product.purity],
//                   [t?.specs.size, product.size],
//                   [t?.specs.cas, product.cas || "N/A"]
//                 ].map(([label, value]) => (
//                   <div key={label} className="border p-4 ">
//                     <p className="text-[11px] text-gray-500">{label}</p>
//                     <p className="font-semibold text-black">{value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         <ProductContent product={product} />
//       </main>
//       {/* IMAGE PREVIEW MODAL */}
// {previewOpen && (
//   <div
//     className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center px-4"
//     onClick={() => setPreviewOpen(false)}
//   >
//     {/* STOP PROPAGATION */}
//     <div
//       className="relative w-full max-w-3xl bg-white p-6"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* CLOSE BUTTON */}
//       <button
//         onClick={() => setPreviewOpen(false)}
//         className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-black cursor-pointer"
//       >
//         ✕
//       </button>

//       {/* IMAGE */}
//       <div className="relative w-full h-[70vh]">
//         {/* <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-contain"
//           priority
//         /> */}
//         <Image
//   src={product.image}
//   alt={product.name}
//   fill
//   className="object-contain p-2 relative z-10"
//   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
//   priority
// />

//       </div>
//     </div>
//   </div>
// )}
// <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

//       <Footer />
//     </>
//   );
// }








