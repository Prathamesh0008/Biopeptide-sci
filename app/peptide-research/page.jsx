// peptides/app/peptide-research/page.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import ResearchSidebar from "@/components/ResearchSidebar";
import { useEffect } from "react";
import { RESEARCH_PAGES } from "@/data/researchPages";

export default function PeptideResearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = RESEARCH_PAGES.length;
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(pageFromUrl, 1), totalPages);
  const current = RESEARCH_PAGES[currentPage - 1];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/peptide-research?${params.toString()}`);
  };

  const getPagination = () => {
    let pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const paginationNumbers = getPagination();

  return (
    <main className="min-h-screen bg-white">

      {/* ---------------------- HERO ---------------------- */}
      <section className="relative w-full h-[320px] md:h-[360px] border-b overflow-hidden flex items-center justify-center text-center bg-gray-50">
        <Image
          src="/images/reasearchpeptide.jpg"
          alt="Peptide Research Background"
          fill
          priority
          className="object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/70 backdrop-blur-sm" />

        <div className="relative z-10 px-6 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0d2d47] drop-shadow-sm">
            Peptide Science Research Library
          </h1>
          <p className="text-sm md:text-lg text-gray-700 mt-4 leading-relaxed">
            Explore deep scientific insights into peptide biology, laboratory applications,
            regenerative physiology, molecular signaling, and advanced biomedical research.
          </p>
        </div>
      </section>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 2xl:px-32 py-14 grid grid-cols-1 lg:grid-cols-4 gap-14">

        {/* SIDEBAR (DESKTOP) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
           <ResearchSidebar />
          </div>
        </aside>

        {/* ARTICLE CONTENT */}
        <div className="lg:col-span-3 space-y-16">

          {/* PAGE HEADER */}
          <article className="space-y-10">
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              Research Article — Page {currentPage} of {totalPages}
            </p>

            <header className="space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d2d47]">
                {current.title}
              </h2>
              <p className="text-[17px] md:text-[19px] text-gray-700 leading-relaxed">
                {current.subtitle}
              </p>
            </header>

            {/* Divider */}
            <div className="h-[3px] w-full bg-gradient-to-r from-bioBlue to-bioGreen rounded-full" />

            {/* Highlight Box */}
            {current.bullets?.length > 0 && (
              <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 border border-bioBlue/20 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0d2d47] mb-3">
                  Key Research Insights
                </h3>

                <ul className="list-disc ml-6 text-[16px] space-y-2 text-gray-700">
                  {current.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* CONTENT */}
            <div className="space-y-8 text-[17px] leading-snug md:leading-[1.95] text-gray-800">
             {current.paragraphs.map((p, i) => (
                <p key={i} className="text-left md:text-justify">{p}</p>
              ))}
            </div>
          </article>

          {/* ---------------------- PAGINATION ---------------------- */}
          <div className="pt-10 border-t">
            <p className="text-xs sm:text-sm text-gray-600 mb-4 text-center">
              You are reading page {currentPage} of {totalPages}.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">

              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  currentPage === 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:border-bioBlue hover:text-bioBlue"
                }`}
              >
                ← Previous
              </button>

              {/* PAGINATION NUMBERS */}
              {paginationNumbers.map((num, index) =>
                num === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="px-2 text-gray-400 select-none"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={num}
                    onClick={() => goToPage(num)}
                    className={`w-10 h-10 rounded-full text-sm border flex items-center justify-center transition ${
                      num === currentPage
                        ? "bg-gradient-to-r from-bioBlue to-bioGreen text-white border-transparent"
                        : "border-gray-300 text-gray-700 hover:border-bioBlue hover:text-bioBlue"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  currentPage === totalPages
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:border-bioBlue hover:text-bioBlue"
                }`}
              >
                Next →
              </button>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
