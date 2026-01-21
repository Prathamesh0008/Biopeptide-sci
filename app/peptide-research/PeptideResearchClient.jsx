"use client";

import Link from "next/link";
import ResearchSidebar from "@/components/ResearchSidebar";
import { User, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function PeptideResearchClient() {
  const { translations, loading } = useLanguage();

  if (
    loading ||
    !translations?.researchPage ||
    !translations?.research
  ) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <Loader />
        </main>
        <Footer />
      </>
    );
  }

  const t = translations.researchPage;
  const articles = Object.values(translations.research);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        <aside className="md:col-span-1">
          <ResearchSidebar currentSlug={null} />
        </aside>

        <section className="md:col-span-3 max-w-[880px]">
          <h1 className="text-[42px] font-semibold text-gray-900 mb-6">
            {t.title}
          </h1>

          <div className="bg-gray-100 border rounded-xl px-6 py-6 mb-14">
            {t.description}
          </div>

          <div className="space-y-14">
            {articles.map((article, index) => (
              <div key={article.slug || index}>
                <Link
                  href={`/peptide-research/${article.slug}`}
                  className="text-[22px] font-semibold text-bioBlue hover:underline"
                >
                  {article.title}
                </Link>

                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {article.date}
                  </span>
                </div>

                <p className="mt-4 text-gray-700">
                  {article.excerpt}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}







// //peptides\app\peptide-research\PeptideResearchClient.jsx"use client";
// "use client";
// import Link from "next/link";
// import ResearchSidebar from "@/components/ResearchSidebar";
// import { User, Calendar } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import Navbar from "@/components/Navbar"
// import Footer from "@/components/Footer"
// import Loader from "../../components/Loader";
// export default function PeptideResearchClient() {
//   const { translations, loading } = useLanguage();
//   if (loading) {
//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-white flex items-center justify-center">
//         <Loader />
//       </main>
//       <Footer />
//     </>
//   );
// }

//   const t = translations.researchPage;

//   // ✅ THIS WAS MISSING (CRITICAL LINE)
//   const articles = Object.values(translations.research || {});

//   return (
//     <main className="min-h-screen bg-[#f8fafc]">
//       <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

//         {/* SIDEBAR */}
//         <aside className="md:col-span-1">
//           <ResearchSidebar currentSlug={null} />
//         </aside>

//         {/* CONTENT */}
//         <section className="md:col-span-3 max-w-[880px]">

//           <h1 className="text-[42px] font-semibold text-gray-900 mb-6">
//             {t.title}
//           </h1>

//           <div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-6 mb-14 text-gray-700">
//             {t.description}
//           </div>

//           <div className="space-y-14">
//             {articles.map(article => (
//               <div key={article.slug}>

//                 <Link
//                   href={`/peptide-research/${article.slug}`}
//                   className="text-[22px] font-semibold text-bioBlue hover:underline block"
//                 >
//                   {article.title}
//                 </Link>

//                 <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
//                   <span className="flex items-center gap-1">
//                     <User size={14} />
//                     <span className="font-medium">{article.author}</span>
//                   </span>

//                   <span className="flex items-center gap-1">
//                     <Calendar size={14} />
//                     {article.date}
//                   </span>
                  
//                 </div>

//                 <p className="mt-4 text-[16px] leading-[1.8] text-gray-700">
//                   {article.excerpt}
//                 </p>

//               </div>
//             ))}
//           </div>

//         </section>
//       </div>
//     </main>
//   );
// }






