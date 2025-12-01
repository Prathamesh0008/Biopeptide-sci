"use client";

import { RESEARCH_PAGES } from "@/data/researchPages";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResearchSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const goToPage = (page) => {
    router.push(`/peptide-research?page=${page}`);
  };

  return (
    <div className="sticky top-24 bg-white border border-gray-200 rounded-xl shadow-sm p-5 max-h-[80vh] overflow-y-auto">

      <h3 className="text-lg font-semibold text-[#0d2d47] mb-4">
        Research Index
      </h3>

      <ul className="space-y-3">
        {RESEARCH_PAGES.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => goToPage(index + 1)}
              className={`text-left w-full text-[15px] leading-tight transition p-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-gradient-to-r from-bioBlue to-bioGreen text-white"
                  : "text-gray-700 hover:text-bioBlue hover:bg-gray-50"
              }`}
            >
              {index + 1}. {item.title}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}
