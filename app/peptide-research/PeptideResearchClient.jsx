//peptides\app\peptide-research\PeptideResearchClient.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ResearchSidebar from "@/components/ResearchSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PeptideResearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { translations, loading } = useLanguage();

  const RESEARCH_PAGES = translations?.research
    ? Object.values(translations.research)
    : [];

  const totalPages = RESEARCH_PAGES.length;
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(pageFromUrl, 1), totalPages || 1);
  const current = RESEARCH_PAGES[currentPage - 1];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading || !RESEARCH_PAGES.length || !current) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading research content…
      </div>
    );
  }

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/peptide-research?${params.toString()}`);
  };

  const getPagination = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 3)
      return [1, 2, 3, "...", totalPages - 1, totalPages];

    if (currentPage >= totalPages - 2)
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const paginationNumbers = getPagination();

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* SIDEBAR */}
        <aside className="md:col-span-1">
          <div className="sticky top-28">
            <ResearchSidebar currentPage={currentPage} />
          </div>
        </aside>

        {/* CONTENT */}
        <section className="md:col-span-3">
          <article
            className="
              bg-white
              rounded-2xl
              border border-gray-200
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              p-10 md:p-14
            "
          >
            {/* TITLE */}
            <h1
              className="
                text-[34px] md:text-[42px]
                font-semibold
                tracking-tight
                leading-[1.15]
                text-gray-900
                max-w-[680px]
              "
            >
              {current.title}
            </h1>

            {/* SUBTITLE */}
            {current.subtitle && (
              <p className="mt-6 text-[17px] text-gray-600 max-w-[680px]">
                {current.subtitle}
              </p>
            )}

            {/* DIVIDER */}
            <div className="my-14 h-px bg-gray-200/70 max-w-[680px]" />

            {/* PARAGRAPHS */}
            <div className="space-y-12 max-w-[680px]">
              {current.paragraphs.map((para, i) => (
                <div
                  key={i}
                  className={`
                    relative pl-6
                    ${
                      i === 0
                        ? "border-l-[5px] border-bioBlue bg-gradient-to-r from-bioBlue/10 to-transparent rounded-r-xl py-5"
                        : "border-l border-gray-200"
                    }
                  `}
                >
                  <p className="text-[16.5px] leading-[1.8] text-gray-800">
                    {para}
                  </p>
                </div>
              ))}
            </div>

            {/* FINDINGS */}
            {current.bullets?.length > 0 && (
              <>
                <div className="my-16 h-px bg-gray-200/70 max-w-[680px]" />

                <div
                  className="
                    bg-[#f9fafb]
                    border border-gray-200
                    rounded-xl
                    p-8
                    max-w-[680px]
                  "
                >
                  <h2 className="text-[18px] font-semibold text-gray-900 mb-6">
                    Key Scientific Findings
                  </h2>

                  <ul className="space-y-4">
                    {current.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-gray-800 leading-relaxed"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-bioBlue flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </article>

          {/* PAGINATION */}
          <div className="mt-20 flex items-center justify-center gap-3 flex-wrap max-w-[680px] mx-auto">

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border text-sm ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              ← Previous
            </button>

            {paginationNumbers.map((num, index) =>
              num === "..." ? (
                <span
                  key={index}
                  className="px-3 py-2 text-gray-400 text-sm"
                >
                  …
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => goToPage(num)}
                  className={`px-4 py-2 rounded-md border text-sm ${
                    currentPage === num
                      ? "bg-bioBlue text-white border-bioBlue"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md border text-sm ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}






// //peptides\app\peptide-research\PeptideResearchClient.jsx

// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import ResearchSidebar from "@/components/ResearchSidebar";
// import { useEffect } from "react";
// import { useLanguage } from "@/contexts/LanguageContext";

// export default function PeptideResearchClient() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { translations, loading } = useLanguage();

//   const RESEARCH_PAGES = translations?.research
//     ? Object.values(translations.research)
//     : [];

//   const totalPages = RESEARCH_PAGES.length;
//   const pageFromUrl = Number(searchParams.get("page")) || 1;
//   const currentPage = Math.min(
//     Math.max(pageFromUrl, 1),
//     totalPages || 1
//   );

//   const current = RESEARCH_PAGES[currentPage - 1];

//   // ✅ HOOK MUST ALWAYS RUN
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   // ✅ SAFE EARLY RETURNS (AFTER HOOKS)
//   if (loading || !RESEARCH_PAGES.length || !current) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
//         Loading research content…
//       </div>
//     );
//   }

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", String(page));
//     router.push(`/peptide-research?${params.toString()}`);
//   };
// const getPagination = () => {
//   if (totalPages <= 7) {
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   }

//   if (currentPage <= 3) {
//     return [1, 2, 3, "...", totalPages - 1, totalPages];
//   }

//   if (currentPage >= totalPages - 2) {
//     return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
//   }

//   return [
//     1,
//     "...",
//     currentPage - 1,
//     currentPage,
//     currentPage + 1,
//     "...",
//     totalPages,
//   ];
// };

// const paginationNumbers = getPagination();

//   return (
//     <main className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

//         {/* SIDEBAR */}
//         <aside className="md:col-span-1">
//           <ResearchSidebar currentPage={currentPage} />
//         </aside>
// {/* CONTENT */}
// <section className="md:col-span-3">

//   {/* RESEARCH CARD */}
//   <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">

//     {/* HEADER */}
//     <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
//       {current.title}
//     </h1>

//     {current.subtitle && (
//       <p className="mt-4 text-lg text-gray-600 max-w-4xl">
//         {current.subtitle}
//       </p>
//     )}

//     {/* DIVIDER */}
//     <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

//     {/* PARAGRAPHS */}
//     <div className="space-y-10 max-w-4xl">

//       {current.paragraphs.map((para, i) => (
//         <div
//           key={i}
//           className={`
//             relative
//             pl-6
//             ${
//               i === 0
//                 ? "border-l-4 border-bioBlue bg-bioBlue/5 rounded-r-xl py-4"
//                 : "border-l-2 border-gray-200"
//             }
//           `}
//         >
//           <p className="text-[16.5px] leading-relaxed text-gray-800">
//             {para}
//           </p>
//         </div>
//       ))}

//     </div>

//     {/* FINDINGS */}
//     {current.bullets?.length > 0 && (
//       <>
//         <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

//         <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 max-w-4xl">
//           <h2 className="text-xl font-semibold text-gray-900 mb-5">
//             Key Scientific Findings
//           </h2>

//           <ul className="space-y-4">
//             {current.bullets.map((b, i) => (
//               <li
//                 key={i}
//                 className="flex gap-3 text-gray-800 leading-relaxed"
//               >
//                 <span className="mt-1 h-2 w-2 rounded-full bg-bioBlue flex-shrink-0" />
//                 <span>{b}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </>
//     )}

//   </div>
//   {/* PAGINATION */}
// <div className="md:col-span-3 flex justify-center">
//   <div className="mt-16 flex items-center justify-center gap-2 flex-wrap max-w-4xl">

//     {/* PREVIOUS */}
//     <button
//       onClick={() => goToPage(currentPage - 1)}
//       disabled={currentPage === 1}
//       className={`px-4 py-2 rounded-md border text-sm ${
//         currentPage === 1
//           ? "text-gray-400 border-gray-200 cursor-not-allowed"
//           : "text-gray-700 border-gray-300 hover:bg-gray-100"
//       }`}
//     >
//       ← Previous
//     </button>

//     {/* PAGE NUMBERS */}
//     {paginationNumbers.map((num, index) =>
//       num === "..." ? (
//         <span
//           key={index}
//           className="px-3 py-2 text-gray-400 text-sm"
//         >
//           …
//         </span>
//       ) : (
//         <button
//           key={index}
//           onClick={() => goToPage(num)}
//           className={`px-4 py-2 rounded-md border text-sm ${
//             currentPage === num
//               ? "bg-bioBlue text-white border-bioBlue"
//               : "text-gray-700 border-gray-300 hover:bg-gray-100"
//           }`}
//         >
//           {num}
//         </button>
//       )
//     )}

//     {/* NEXT */}
//     <button
//       onClick={() => goToPage(currentPage + 1)}
//       disabled={currentPage === totalPages}
//       className={`px-4 py-2 rounded-md border text-sm ${
//         currentPage === totalPages
//           ? "text-gray-400 border-gray-200 cursor-not-allowed"
//           : "text-gray-700 border-gray-300 hover:bg-gray-100"
//       }`}
//     >
//       Next →
//     </button>

//   </div>
// </div>

// </section>



//       </div>
//     </main>
//   );
// }







// //app\peptide-research\PeptideResearchClient.jsx
// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import ResearchSidebar from "@/components/ResearchSidebar";
// import { useEffect } from "react";
// import { RESEARCH_PAGES } from "@/data/researchPages";
// import { useLanguage } from "@/contexts/LanguageContext";


// export default function PeptideResearchClient() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { translations, loading } = useLanguage();

// if (loading) {
//   return (
//     <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
//       Loading research content…
//     </div>
//   );
// }

// const RESEARCH_PAGES = translations?.research
//   ? Object.values(translations.research)
//   : [];


// if (!RESEARCH_PAGES.length) {
//   return (
//     <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
//       Loading research content…
//     </div>
//   );
// }


// const totalPages = RESEARCH_PAGES.length;
// const pageFromUrl = Number(searchParams.get("page")) || 1;
// const currentPage = Math.min(Math.max(pageFromUrl, 1), totalPages);
// const current = RESEARCH_PAGES[currentPage - 1];

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", String(page));
//     router.push(`/peptide-research?${params.toString()}`);
//   };

//   const getPagination = () => {
//     if (totalPages <= 6) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }
//     if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
//     if (currentPage >= totalPages - 2)
//       return [1, "...", totalPages - 2, totalPages - 1, totalPages];

//     return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
//   };

//   const paginationNumbers = getPagination();

//  return (
//   <main className="min-h-screen bg-white">
//     <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

//       {/* LEFT SIDEBAR */}
//       <aside className="md:col-span-1">
//         <ResearchSidebar currentPage={currentPage} />
//       </aside>

//       {/* RIGHT CONTENT */}
//       <section className="md:col-span-3">

//   {/* TITLE */}
//   <h1 className="text-3xl font-bold mb-2">
//     {current.title}
//   </h1>

//   {/* SUBTITLE */}
//   {current.subtitle && (
//     <p className="text-gray-600 mb-6">
//       {current.subtitle}
//     </p>
//   )}

//   {/* PARAGRAPHS */}
//   <div className="space-y-5 text-gray-800 leading-relaxed">
//     {current.paragraphs.map((para, index) => (
//       <p key={index}>{para}</p>
//     ))}
//   </div>

//   {/* BULLETS */}
//   {current.bullets && current.bullets.length > 0 && (
//     <ul className="mt-8 list-disc pl-6 space-y-2 text-gray-800">
//       {current.bullets.map((point, index) => (
//         <li key={index}>{point}</li>
//       ))}
//     </ul>
//   )}

// {/* PAGINATION */}
// <div className="mt-14 flex items-center justify-center gap-2 flex-wrap">

//   {/* PREVIOUS */}
//   <button
//     onClick={() => goToPage(currentPage - 1)}
//     disabled={currentPage === 1}
//     className={`
//       px-4 py-2 rounded-md border text-sm
//       ${currentPage === 1
//         ? "text-gray-400 border-gray-200 cursor-not-allowed"
//         : "text-gray-700 border-gray-300 hover:bg-gray-100"}
//     `}
//   >
//     ← Previous
//   </button>

//   {/* PAGE NUMBERS */}
//   {paginationNumbers.map((num, index) =>
//     num === "..." ? (
//       <span
//         key={index}
//         className="px-3 py-2 text-gray-400 text-sm"
//       >
//         …
//       </span>
//     ) : (
//       <button
//         key={index}
//         onClick={() => goToPage(num)}
//         className={`
//           px-4 py-2 rounded-md border text-sm
//           ${currentPage === num
//             ? "bg-bioBlue text-white border-bioBlue"
//             : "text-gray-700 border-gray-300 hover:bg-gray-100"}
//         `}
//       >
//         {num}
//       </button>
//     )
//   )}

//   {/* NEXT */}
//   <button
//     onClick={() => goToPage(currentPage + 1)}
//     disabled={currentPage === totalPages}
//     className={`
//       px-4 py-2 rounded-md border text-sm
//       ${currentPage === totalPages
//         ? "text-gray-400 border-gray-200 cursor-not-allowed"
//         : "text-gray-700 border-gray-300 hover:bg-gray-100"}
//     `}
//   >
//     Next →
//   </button>
// </div>

// </section>


//     </div>
//   </main>
// );
// }
