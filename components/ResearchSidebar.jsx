// peptides/components/ResearchSidebar.jsx
"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResearchSidebar({ currentSlug }) {
  const router = useRouter();
  const { translations, loading } = useLanguage();

  if (loading || !translations?.research) return null;

  // ✅ Convert object → array
  const articles = Object.values(translations.research);

  return (
    <nav className="sticky top-28">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
        {translations.researchPage?.sidebarTitle || "Research Articles"}
      </h3>

      <ul className="space-y-3 border-l border-gray-200 pl-4">
        {articles.map(article => {
          const active = currentSlug === article.slug;

          return (
            <li key={article.slug}>
              <button
                onClick={() =>
                  router.push(`/peptide-research/${article.slug}`)
                }
                className={`
                  block w-full text-left py-1.5
                  text-[14.5px] leading-6 transition-colors
                  ${
                    active
                      ? "font-semibold text-bioBlue"
                      : "text-gray-700 hover:text-bioBlue"
                  }
                `}
              >
                {article.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}





// //peptides\components\ResearchSidebar.jsx
// "use client";

// import { useRouter } from "next/navigation";
// import { RESEARCH_PAGES } from "@/data/researchPages";
// import { useLanguage } from "@/contexts/LanguageContext";

// export default function ResearchSidebar({ currentSlug }) {
//   const router = useRouter();
//   const { translations } = useLanguage();

//   if (!translations?.research) return null;

//   return (
//     <nav className="sticky top-28">
//       <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
//         Research Articles
//       </h3>

//       <ul className="space-y-3 border-l border-gray-200 pl-4">
//         {RESEARCH_PAGES.map(article => {
//           const active = currentSlug === article.slug;

//           // 🔤 translated title (fallback to English)
//           const translatedTitle =
//             translations.research?.[article.slug]?.title || article.title;

//           return (
//             <li key={article.slug}>
//               <button
//                 onClick={() =>
//                   router.push(`/peptide-research/${article.slug}`)
//                 }
//                 className={`
//                   block w-full text-left py-1.5
//                   text-[14.5px] leading-6 transition-colors
//                   ${
//                     active
//                       ? "font-semibold text-bioBlue"
//                       : "text-gray-700 hover:text-bioBlue"
//                   }
//                 `}
//               >
//                 {translatedTitle}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }











