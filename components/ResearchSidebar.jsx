

//peptides\components\ResearchSidebar.jsx
"use client";

import { useRouter } from "next/navigation";
import { RESEARCH_PAGES } from "@/data/researchPages";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResearchSidebar({ currentSlug }) {
  const router = useRouter();
  const { translations } = useLanguage();

  if (!translations?.research) return null;

  return (
    <nav className="sticky top-28">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
        Research Articles
      </h3>

      <ul className="space-y-3 border-l border-gray-200 pl-4">
        {RESEARCH_PAGES.map(article => {
          const active = currentSlug === article.slug;

          // 🔤 translated title (fallback to English)
          const translatedTitle =
            translations.research?.[article.slug]?.title || article.title;

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
                {translatedTitle}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}











