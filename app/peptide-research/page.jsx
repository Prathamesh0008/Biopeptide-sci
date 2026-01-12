
//peptides\app\peptide-research\page.jsx
import AppShell from "@/components/AppShell";
import Link from "next/link";
import { RESEARCH_PAGES } from "@/data/researchPages";
import ResearchSidebar from "@/components/ResearchSidebar";
import { User, Calendar } from "lucide-react";


export const dynamic = "force-dynamic";

export default function PeptideResearchIndexPage() {
  return (
    <AppShell>
      <main className="min-h-screen bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* SIDEBAR */}
          <aside className="md:col-span-1">
            <ResearchSidebar currentSlug={null} />
          </aside>

          {/* CONTENT */}
         <section className="md:col-span-3 max-w-[880px]">

            <h1 className="text-[42px] font-semibold text-gray-900 mb-6">
              Peptide Sciences Research
            </h1>

            <div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-6 mb-14 text-gray-700">
              Peer-informed scientific articles exploring bioregulator peptides,
              cellular signaling, immune balance, and regenerative biology.
            </div>

            <div className="space-y-14">
              {RESEARCH_PAGES.map(article => (
                <div key={article.slug}>
                  <Link
                    href={`/peptide-research/${article.slug}`}
                    className="text-[22px] font-semibold text-bioBlue hover:underline block"
                  >
                    {article.title}
                  </Link>

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

<p className="mt-4 text-[16px] leading-[1.8] text-gray-700">
  {article.excerpt}

  {article.paragraphs?.[0] &&
    article.excerpt.length < 300 && (
      <>
        {" "}
        {article.paragraphs[0].slice(
          0,
          420 - article.excerpt.length
        )}
        …
      </>
    )}
</p>


                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </AppShell>
  );
}





