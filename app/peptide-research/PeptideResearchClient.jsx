//app\peptide-research\PeptideResearchClient.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import ResearchSidebar from "@/components/ResearchSidebar";
import { useEffect } from "react";
import { RESEARCH_PAGES } from "@/data/researchPages";

export default function PeptideResearchClient() {
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
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const paginationNumbers = getPagination();

 return (
  <main className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

      {/* LEFT SIDEBAR */}
      <aside className="md:col-span-1">
        <ResearchSidebar currentPage={currentPage} />
      </aside>

      {/* RIGHT CONTENT */}
      <section className="md:col-span-3">

  {/* TITLE */}
  <h1 className="text-3xl font-bold mb-2">
    {current.title}
  </h1>

  {/* SUBTITLE */}
  {current.subtitle && (
    <p className="text-gray-600 mb-6">
      {current.subtitle}
    </p>
  )}

  {/* PARAGRAPHS */}
  <div className="space-y-5 text-gray-800 leading-relaxed">
    {current.paragraphs.map((para, index) => (
      <p key={index}>{para}</p>
    ))}
  </div>

  {/* BULLETS */}
  {current.bullets && current.bullets.length > 0 && (
    <ul className="mt-8 list-disc pl-6 space-y-2 text-gray-800">
      {current.bullets.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  )}

</section>


    </div>
  </main>
);
}
