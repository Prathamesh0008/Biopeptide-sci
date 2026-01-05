// peptides/components/Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaTruck,
  FaMapMarkerAlt,
} from "react-icons/fa";



export default function Footer() {
  const { translations } = useLanguage();

const t = (path) => {
  try {
    return path
      .split(".")
      .reduce((obj, key) => obj?.[key], translations?.footer || {});
  } catch {
    return "";
  }
};

  return (
    <footer
  className="
    relative mt-16 text-white
    bg-white text-gray-700

  "
>


      {/* ===== NEWSLETTER (BLUE GRADIENT CARD) ===== */}
<div className="relative max-w-6xl mx-auto px-6 py-14 text-center">
  <div
    className="
      bg-[linear-gradient(to_bottom,#65b4d7,#1a497c)]
      backdrop-blur-lg
      border border-white/20
      rounded-2xl
      p-10
      max-w-3xl mx-auto
      shadow-xl
    "
  >
    <h2 className="text-2xl sm:text-3xl font-bold text-white">
     {t("newsletter.title")}
    </h2>

    <p className="text-white/80 mt-2 text-sm sm:text-base">
      {t("newsletter.subtitle")}

    </p>

    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
      <input
        type="email"
        placeholder={t("newsletter.placeholder")}
        className="
          w-full sm:w-96
          px-5 py-3 text-sm
          rounded-lg sm:rounded-l-lg
          bg-white/90
          text-gray-900
          placeholder-gray-500
          focus:ring-2 focus:ring-[#65b4d7]/60
          outline-none
        "
      />

      <button
  className="
    px-6 py-3
    rounded-lg sm:rounded-none sm:rounded-r-lg
    text-sm font-semibold text-white
    bg-[linear-gradient(to_right,#145b2f,#559f45)]
    hover:brightness-110
    transition
  "
>
 {t("newsletter.button")}
</button>

    </div>
  </div>
</div>



      {/* ===== FOOTER CONTENT ===== */}
     <div className="border-t border-gray-200">
  <div
    className="
      max-w-6xl mx-auto px-6 py-14
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
gap-10 sm:gap-12 lg:gap-12
justify-items-start

    "
  >

    {/* BRAND */}
    <div className="space-y-4 lg:col-span-2 lg:pr-6">

      <Link href="/" aria-label="Go to homepage">
  <Image
    src="/images/logo1.png"
    alt="BioPeptide Logo"
    width={260}
    height={70}
    className="object-contain cursor-pointer"
    priority
  />
</Link>


      <p className="text-sm text-gray-600 leading-relaxed">
        {t("brand.description")}
      </p>
    </div>
{/* ALL OTHER COLUMNS */}
<div className="lg:col-span-4 lg:-ml-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12">
    {/* INFORMATION */}
   <FooterColumn title={t("columns.information.title")} >

      <FooterLink text={t("columns.information.links.0")} href="/all-peptides" />
      <FooterLink text={t("columns.information.links.1")} href="/bundle-save" />
      <FooterLink text={t("columns.information.links.2")} href="/peptide-research" />
      <FooterLink text={t("columns.information.links.3")} href="/lab-testing" />
      <FooterLink text={t("columns.information.links.4")} href="/about" />
      <FooterLink text={t("columns.information.links.5")} href="/contact" />
    </FooterColumn>

    {/* BUY PEPTIDES */}
    <FooterColumn title={t("columns.shop.title")} >

      <FooterLink text={t("columns.shop.links.0")} href="/category/capsules" />
      <FooterLink text={t("columns.shop.links.1")} href="/category/blends" />
      <FooterLink text={t("columns.shop.links.2")} href="/category/igf-1-proteins" />
      <FooterLink text={t("columns.shop.links.3")} href="/category/melanotan" />
      <FooterLink text={t("columns.shop.links.4")} href="/category/bioregulators" />
      <FooterLink text={t("columns.shop.links.5")} href="/category/cosmetic-peptides" />
    </FooterColumn>

    {/* LEGAL */}
    <FooterColumn title={t("columns.legal.title")} >

      <FooterLink text={t("columns.legal.links.0")} href="/privacy-policy" />
      <FooterLink text={t("columns.legal.links.1")} href="/terms" />
      <FooterLink text={t("columns.legal.links.2")} href="/shipping-payments" />
      <FooterLink text={t("columns.legal.links.3")} href="/accessibility" />
      <FooterLink text={t("columns.legal.links.4")} href="/rewards-terms" />
    </FooterColumn>

    

    {/* CONTACT */}
   <div className="space-y-3  ">

  <h3 className="font-semibold text-gray-900">
    {t("columns.contact.title")}
  </h3>

  <div className="space-y-4 text-sm text-gray-700">

      <div className="flex gap-3">
        <FaPhoneAlt className="text-bioBlue mt-1" />
        <div>
          <p className="font-semibold">Phone</p>
          <p>1-800-986-6401</p>
          <p className="text-xs text-gray-500">{t("contact.hours")}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <FaEnvelope className="text-bioBlue mt-1" />
        <div>
          <p className="font-semibold">Email</p>
          <p>support@biopeptide.com</p>
        </div>
      </div>

      <div className="flex gap-3">
        <FaTruck className="text-bioBlue mt-1" />
        <div>
          <p className="font-semibold">Shipping Days</p>
          <p className="text-sm">Mon–Fri (Except Holidays)</p>
        </div>
      </div>

      <div className="flex gap-3">
        <FaMapMarkerAlt className="text-bioBluemt-1" />
        <div>
          <p className="font-semibold">Mailing Address</p>
          <p>BioPeptide Labs</p>
          <p>Boca Raton, FL, USA</p>
        </div>
      </div>
    </div>
    </div>

  </div>
</div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-200 py-8 px-6 text-xs text-gray-500 leading-relaxed">
  <div className="max-w-6xl mx-auto space-y-3 text-center">

    <p className="font-medium text-gray-700">
      {t("disclaimer.copyrightLine")}
    </p>

    <p>{t("disclaimer.researchOnly")}</p>

    <p>{t("disclaimer.fda")}</p>

    <p>{t("disclaimer.legalStatus")}</p>

  </div>
</div>

      </div>
    </footer>
  );
}

/* COLUMN */
function FooterColumn({ title, children, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>

      <h3 className="font-semibold text-gray-900">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}



/* LINK */
function FooterLink({ text, href }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-600 hover:text-bioBlue transition"
      >
        {text}
      </Link>
    </li>
  );
}












// // peptides/components/Footer.jsx
// import Link from "next/link";

// export default function Footer() {
//   return (
//     <footer
//   className="
//     relative mt-16 text-white
//     bg-[linear-gradient(to_bottom,#559f45,#145b2f)]
//   "
// >


//       {/* ===== NEWSLETTER (BLUE GRADIENT CARD) ===== */}
// <div className="relative max-w-6xl mx-auto px-6 py-14 text-center">
//   <div
//     className="
//       bg-[linear-gradient(to_bottom,#65b4d7,#1a497c)]
//       backdrop-blur-lg
//       border border-white/20
//       rounded-2xl
//       p-10
//       max-w-3xl mx-auto
//       shadow-xl
//     "
//   >
//     <h2 className="text-2xl sm:text-3xl font-bold text-white">
//       Stay Updated with BioPeptide
//     </h2>

//     <p className="text-white/80 mt-2 text-sm sm:text-base">
//       Research updates, product launches & exclusive offers.
//     </p>

//     <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
//       <input
//         type="email"
//         placeholder="your email"
//         className="
//           w-full sm:w-96
//           px-5 py-3 text-sm
//           rounded-lg sm:rounded-l-lg
//           bg-white/90
//           text-gray-900
//           placeholder-gray-500
//           focus:ring-2 focus:ring-[#65b4d7]/60
//           outline-none
//         "
//       />

//       <button
//   className="
//     px-6 py-3
//     rounded-lg sm:rounded-none sm:rounded-r-lg
//     text-sm font-semibold text-white
//     bg-[linear-gradient(to_right,#145b2f,#559f45)]
//     hover:brightness-110
//     transition
//   "
// >
//   Subscribe
// </button>

//     </div>
//   </div>
// </div>



//       {/* ===== FOOTER CONTENT ===== */}
//       <div className="border-t border-white/15">
//         <div
//   className="
//     max-w-6xl mx-auto px-6 py-14
//     grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
//     gap-12
//     text-center sm:text-left
//   "
// >


//           {/* BRAND */}
//           <div className="space-y-4 flex flex-col items-center sm:items-start">
//             <div className="flex items-center gap-3">
//               <div className="
//                 h-12 w-12 rounded-full
//                 bg-gradient-to-br from-[#145b2f] to-[#65b4d7]
//                 flex items-center justify-center
//                 text-white text-xl font-bold
//               ">
//                 B
//               </div>
//               <span className="text-2xl font-bold">
//                 BIOPEPTIDE
//               </span>
//             </div>

//             <p className="text-white/80 text-sm">
//               High-purity research peptides trusted by laboratories worldwide.
//             </p>
//           </div>

//           {/* INFORMATION */}
//           <FooterColumn title="Information">
//             <FooterLink text="All Peptides" href="/all-peptides" />
//             <FooterLink text="Bundle & Save" href="/bundle-save" />
//             <FooterLink text="Research Articles" href="/peptide-research" />
//             <FooterLink text="Lab Testing" href="/lab-testing" />
//             <FooterLink text="Our Company" href="/about" />
//             <FooterLink text="Contact" href="/contact" />
//           </FooterColumn>

//           {/* SHOP */}
//           <FooterColumn title="Shop">
//             <FooterLink text="Peptide Capsules" href="/category/capsules" />
//             <FooterLink text="Peptide Blends" href="/category/blends" />
//             <FooterLink text="IGF-1 Proteins" href="/category/igf-1-proteins" />
//             <FooterLink text="Melanotan Peptides" href="/category/melanotan" />
//             <FooterLink text="Bioregulators" href="/category/bioregulators" />
//             <FooterLink text="Cosmetic Peptides" href="/category/cosmetic-peptides" />
//           </FooterColumn>

//           {/* LEGAL */}
//           <FooterColumn title="Legal">
//             <FooterLink text="Privacy Policy" href="/privacy-policy" />
//             <FooterLink text="Terms of Use" href="/terms" />
//             <FooterLink text="Shipping & Payments" href="/shipping-payments" />
            
//             <FooterLink text="Accessibility" href="/accessibility" />
//             <FooterLink text="Reward Program Terms" href="/rewards-terms" />
//           </FooterColumn>

//           {/* CONTACT */}
//           <div className="space-y-3 text-sm text-white/80 flex flex-col items-center sm:items-start">
//             <p><span className="font-medium text-white">📞 Phone</span><br />1-800-986-6401</p>
//             <p className="text-white/60 text-xs">Mon–Fri, 9AM–4PM</p>

//             <p><span className="font-medium text-white">✉️ Email</span><br />support@biopeptide.com</p>

//             <p><span className="font-medium text-white">📍 Address</span><br />
//               BioPeptide Labs<br />Boca Raton, FL
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* COPYRIGHT */}
//       <div className="border-t border-white/15 py-6 text-center text-sm text-white/60 px-4">
//         © {new Date().getFullYear()} BioPeptide. All Rights Reserved.
//       </div>
//     </footer>
//   );
// }

// /* COLUMN */
// function FooterColumn({ title, children }) {
//   return (
//     <div className="space-y-3 flex flex-col items-center sm:items-start">
//       <h3 className="font-semibold text-white">{title}</h3>
//       <ul className="space-y-2 text-sm">{children}</ul>
//     </div>
//   );
// }


// /* LINK */
// function FooterLink({ text, href }) {
//   return (
//     <li>
//       <Link
//         href={href}
//         className="text-white/80 hover:text-[#65b4d7] transition"
//       >
//         {text}
//       </Link>
//     </li>
//   );
// }
