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
      {/* 🔴 PASTE YOUR FULL JSX CONTENT HERE (UNCHANGED) */}
    </main>
  );
}
