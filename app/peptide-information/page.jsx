//peptides\app\peptide-information\page.jsx




"use client";

import Image from "next/image";
import Link from "next/link";
// import { INFO_ARTICLES } from "@/data/information";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";


export default function PeptideInformationPage() {
  const { translations, loading } = useLanguage();
if (loading) return null;

const articles = translations.peptideInfo.articles;


  return (
    <>
    <Navbar/>
    <PeptideInfoSubNav />
    <Breadcrumbs/>
 


      {/* HERO BANNER */}
  <div className="max-w-7xl mx-auto px-6 py-10">
  <div className="flex items-center gap-6">
    {/* Search */}
<div className="flex items-center border border-gray-300 px-3 py-2 w-64">

  <input
    type="text"
    placeholder="Search ..."
    className="w-full outline-none text-sm"
  />
</div>


    {/* Title */}
    <h1 className="text-4xl font-bold text-black">
      {translations.peptideInfo.page.title}
    </h1>
  </div>

  {/* Divider */}
  <div className="mt-6 border-b border-gray-300"></div>
  {/* FEATURED HERO ARTICLE */}
<div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

  {/* Image */}
  <div className="relative aspect-[4/3] w-72 md:ml-auto">

    <Image
      src="/images/peptideinfo.jpg"
      alt="Peptide Purity"
      fill
      className="object-cover"
    />
  </div>

  {/* Content */}
  <div>
    <h2 className="text-2xl font-bold text-black mb-3">
      Peptide Purity
    </h2>

    <p className="text-gray-700 text-sm leading-relaxed">
      How is Peptide Purity Achieved and Verified? At peptidesciences.com,
      we provide peptides that exceed 99% purity. Using state-of-the-art
      solution and solid phase peptide synthetic technology, Peptide Sciences
      is able to offer the finest quality peptides and proteins fit for any
      research study or application. Peptide purity is achieved and verified
      through uncompromising manufacturing and production…
    </p>

    <p className="mt-4 text-xs text-gray-500">
      By Peptide Information &nbsp;•&nbsp; Oct 21, 2023
    </p>
  </div>

</div>

</div>



      {/* MAIN BODY */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-14">

        {/* LEFT SIDEBAR */}
<aside className="lg:col-span-3 space-y-4 sticky top-28 h-max">

  {/* Peptide Glossary */}
  <h3 className="text-lg font-semibold text-bioBlue">
    Peptide Glossary
  </h3>

  {/* Glossary List */}
  <ul className="space-y-1 text-sm leading-relaxed">
    {Object.entries(articles).map(([id, a]) => (
      <li key={id}>
        <Link
          href={`/peptide-information/${id}`}
          className="block hover:text-bioBlue"
        >
          {a.title}
        </Link>
      </li>
    ))}
  </ul>

  {/* Divider */}
  <div className="border-t border-gray-200 pt-4" />

  {/* Combo */}
  <Image
    src="/images/combo.png"
    alt="Peptides Combo"
    width={200}
    height={200}
    className="mx-auto"
  />

  {/* Button */}
  <Link
    href="/all-peptides"
    className="block text-center bg-bioBlue text-white px-5 py-2 text-sm font-semibold"
  >
    All Peptides
  </Link>

</aside>

        {/* RIGHT CONTENT — ALL CARDS SAME LAYOUT */}
        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-10">


          {Object.entries(articles).map(([id, a]) => (
<Link
  key={id}
  href={`/peptide-information/${id}`}
  className="group block border-b border-gray-200 pb-6"
>
  <div className="grid md:grid-cols-2 gap-6 items-center">
    {/* Image */}
    <div className="relative aspect-square">

      <Image
        src={a.img}
        alt={a.title}
        fill
        className="object-cover"
      />
    </div>

    {/* Text */}
    <div>
      <h2 className="text-xl font-bold text-black group-hover:text-bioBlue">
        {a.title}
      </h2>

      <p className="mt-2 text-gray-700 text-sm leading-relaxed">
        {a.preview}
      </p>

      <span className="inline-block mt-2 text-bioBlue font-semibold">
        {translations.peptideInfo.page.readMore}
      </span>
    </div>
  </div>
</Link>

))}
        </div>

      </div>
    
    <div/>
    <Footer/>
    </>
  );
}





















// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { INFO_ARTICLES } from "@/data/information";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";

// export default function PeptideInformationPage() {
//   return (
//     <>
//     <Navbar/>
//     <Breadcrumbs/>
//     <main className="min-h-screen bg-white text-gray-800">

//       {/* HERO BANNER */}
//       <section className="relative w-full h-[260px] md:h-[320px] overflow-hidden">
//         <Image
//           src="/peptide-info/banner.jpg"
//           alt="Peptide Info Banner"
//           fill
//           className="object-cover brightness-[0.55]"
//         />

//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl">
//             Peptide Information
//           </h1>
//           <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">
//             Research-focused knowledge, peptide science, and educational insights.
//           </p>
//         </div>
//       </section>

//       {/* MAIN BODY */}
//       <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-4 gap-14">

//         {/* LEFT SIDEBAR */}
// <aside className="space-y-10 lg:sticky lg:top-32 lg:h-max">

//   {/* GLOSSARY LINKS */}
//   <div>
//     <h3 className="text-xl font-semibold text-bioBlue mb-3">Peptide Glossary</h3>

//     <ul className="space-y-2 text-gray-700 text-sm">
//       {INFO_ARTICLES.map(a => (
//         <li key={a.id}>
//           <Link
//             href={`/peptide-information/${a.id}`}
//             className="hover:text-bioBlue transition"
//           >
//             {a.title}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>

// </aside>


//         {/* RIGHT CONTENT — ALL CARDS SAME LAYOUT */}
//         <div className="lg:col-span-3 space-y-10">

//           {INFO_ARTICLES.map(a => (
//             <Link
//               key={a.id}
//               href={`/peptide-information/${a.id}`}
//               className="group block rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-xl transition"
//             >
//               <div className="grid md:grid-cols-2 gap-6">

//                 {/* Left Image */}
//                 <div className="relative h-48 md:h-56">
//                   <Image
//                     src={a.img}
//                     alt={a.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition duration-300"
//                   />
//                 </div>

//                 {/* Right Text */}
//                 <div className="p-6 flex flex-col justify-center">
//                   <h2 className="text-2xl font-bold text-[#0d2d47] group-hover:text-bioBlue transition">
//                     {a.title}
//                   </h2>

//                   <p className="mt-3 text-gray-700 text-[15px] line-clamp-3">
//                     {a.preview}
//                   </p>

//                   <span className="text-bioBlue mt-4 inline-block font-semibold">
//                     Read More →
//                   </span>
//                 </div>

//               </div>
//             </Link>
//           ))}

//         </div>

//       </div>
//     </main>
//     <Footer/>
//     </>
//   );
// }
