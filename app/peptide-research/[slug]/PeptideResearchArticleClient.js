


//peptides\app\peptide-research\[slug]\PeptideResearchArticleClient.js
"use client";


import ResearchSidebar from "@/components/ResearchSidebar";
import { User, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";



export default function PeptideResearchArticleClient({ slug }) {
  const { translations, loading } = useLanguage();
  if (loading) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader />
      </main>
      <Footer />
    </>
  );
}

  const article = translations.research?.[slug];

  if (!article) {
    return (
      <div className="text-gray-600">
        Article not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* SIDEBAR */}
        <aside className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <ResearchSidebar currentSlug={slug} />
          </div>
        </aside>

        {/* CONTENT */}
        <section className="md:col-span-3 max-w-[880px]">
          <article>

            <h2 className="text-[36px] font-semibold text-gray-900 mb-6">
              {translations.researchPage?.title || "Peptide Sciences Research"}
            </h2>

            {article.subtitle && (
              <div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-6 mb-10 text-gray-700">
                {article.subtitle}
              </div>
            )}

            <h1 className="text-[26px] font-semibold text-bioBlue mb-4">
              {article.title}
            </h1>

            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User size={14} />
                <span className="font-medium">{article.author}</span>
              </span>

              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {article.date}
              </span>
            </div>
{/* TOP IMAGE */}
{article.images?.[0] && (
 <div className="relative w-full max-w-[420px] aspect-square mx-auto rounded-xl  mt-10 mb-14">
  <Image
    src={article.images[0]}
    alt={`${article.title} image 1`}
    fill
    className="object-contain"
    sizes="420px"
    priority
  />
</div>

)}


            {/* PARAGRAPHS */}
<div className="space-y-8 py-12">
  {article.paragraphs?.map((p, i) => (
    <div key={i}>
      <p className="text-[16.5px] leading-[1.85] text-gray-800">
        {p}
      </p>

      {/* MIDDLE IMAGE AFTER 4th PARAGRAPH */}
      {i === 3 && article.images?.[1] && (
        <div className="relative w-full max-w-[420px] aspect-square mx-auto rounded-xl  my-14">
  <Image
    src={article.images[1]}
    alt={`${article.title} image 2`}
    fill
    className="object-contain"
    sizes="420px"
  />
</div>

      )}
    </div>
  ))}
</div>


            {/* BULLETS */}
            {article.bullets && (
              <>
                <div className="my-16 h-px bg-gray-200" />
                <ul className="space-y-4">
                  {article.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-gray-800">
                      <span className="mt-2 h-2 w-2 rounded-full bg-bioBlue" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

          </article>
        </section>
      </div>
    </main>
  );
}















// //peptides\app\peptide-research\[slug]\PeptideResearchArticleClient.js
// "use client";


// import ResearchSidebar from "@/components/ResearchSidebar";
// import { User, Calendar } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import Loader from "@/components/Loader";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Image from "next/image";



// export default function PeptideResearchArticleClient({ slug }) {
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

//   const article = translations.research?.[slug];

//   if (!article) {
//     return (
//       <div className="text-gray-600">
//         Article not found
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#f8fafc]">
//       <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

//         {/* SIDEBAR */}
//         <aside className="md:col-span-1">
//           <div className="bg-white border border-gray-200 rounded-xl p-6">
//             <ResearchSidebar currentSlug={slug} />
//           </div>
//         </aside>

//         {/* CONTENT */}
//         <section className="md:col-span-3 max-w-[880px]">
//           <article>

//             <h2 className="text-[36px] font-semibold text-gray-900 mb-6">
//               {translations.researchPage?.title || "Peptide Sciences Research"}
//             </h2>

//             {article.subtitle && (
//               <div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-6 mb-10 text-gray-700">
//                 {article.subtitle}
//               </div>
//             )}

//             <h1 className="text-[26px] font-semibold text-bioBlue mb-4">
//               {article.title}
//             </h1>

//             <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
//               <span className="flex items-center gap-1">
//                 <User size={14} />
//                 <span className="font-medium">{article.author}</span>
//               </span>

//               <span className="flex items-center gap-1">
//                 <Calendar size={14} />
//                 {article.date}
//               </span>
//             </div>

//             {/* PARAGRAPHS */}
//             <div className="space-y-8 py-12">
//               {article.paragraphs?.map((p, i) => (
//                 <p
//                   key={i}
//                   className="text-[16.5px] leading-[1.85] text-gray-800"
//                 >
//                   {p}
//                 </p>
//               ))}
//             </div>

//             {/* BULLETS */}
//             {article.bullets && (
//               <>
//                 <div className="my-16 h-px bg-gray-200" />
//                 <ul className="space-y-4">
//                   {article.bullets.map((b, i) => (
//                     <li key={i} className="flex gap-3 text-gray-800">
//                       <span className="mt-2 h-2 w-2 rounded-full bg-bioBlue" />
//                       <span>{b}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}

//           </article>
//         </section>
//       </div>
//     </main>
//   );
// }
