// peptides/app/peptide-information/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
import PeptideInfoLeftSidebar from "@/components/PeptideInfoLeftSidebar";
import DrawerProducts from "@/components/DrawerProducts";
import { useState } from "react";


export default function PeptideInformationPage() {
  const { translations, loading } = useLanguage();
  if (loading) return null;

  const articles = translations.peptideInfo.articles;
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredArticles = Object.entries(articles).filter(([_, a]) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  const sidebarItems = filteredArticles.map(([id, a]) => ({
    id,
    title: a.title,
  }));

  return (
    <>
      <Navbar />
      <PeptideInfoSubNav />
      <Breadcrumbs />

      {/* DRAWER BUTTON */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
          bg-gradient-to-b from-bioBlue to-bioGreen
          text-white shadow-lg
          cursor-pointer
          h-36 w-10 rounded-l-xl
        "
      >
        <span
          className="
            text-xs font-semibold tracking-widest
            [writing-mode:vertical-rl]
          "
        >
          Product List
        </span>
      </button>

      {/* DRAWER (PAGE LEVEL ONLY) */}
      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      {/* MAIN CONTENT */}
    <div className="max-w-[1180px] mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT — SIDEBAR */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            <PeptideInfoLeftSidebar
              title="Peptide Glossary"
              searchValue={query}
              onSearchChange={e => setQuery(e.target.value)}
              items={sidebarItems}
              ctaText="All Peptides"
              ctaHref="/all-peptides"
            />
          </div>

          {/* RIGHT — CONTENT */}
          <section className="order-1 lg:order-2 lg:col-span-9 space-y-8 px-0">
            {/* PAGE TITLE */}
           <h1 className="text-[34px] font-extrabold tracking-tight text-black">
  {translations.peptideInfo.page.title}
</h1>


           {/* FEATURED ARTICLE */}
<div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
  {/* IMAGE */}
  <div className="md:col-span-2">
    <div className="relative aspect-[4/3] w-full max-w-[340px]">
      <Image
        src="/images/peptideinfo.jpg"
        alt="Peptide Purity"
        fill
        className="object-cover"
      />
    </div>
  </div>

  {/* TEXT */}
  <div className="md:col-span-3">
    <Link
      href="/peptide-information/purity"
      className="block text-[22px] font-extrabold text-black hover:text-bioBlue"
    >
      {translations.peptideInfo.articles.purity.title}
    </Link>

    <p className="mt-2 text-[15px] text-gray-700 leading-relaxed">
      {translations.peptideInfo.articles.purity.preview}
    </p>

    <p className="mt-3 text-xs text-gray-500">
     {translations.peptideInfo.page.title} • Oct 21, 2023
    </p>
  </div>
</div>


            {/* ARTICLE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
              {filteredArticles.map(([id, a]) => (
              <Link
  key={id}
  href={`/peptide-information/${id}`}
  className="group block py-2"
>

                  <div className="flex gap-4 items-start">
                    <div className="relative w-[72px] h-[72px] flex-shrink-0">
                      <Image
                        src={a.img}
                        alt={a.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div>
                     <h2 className="text-[16px] font-bold text-black group-hover:text-bioBlue">
                        {a.title}
                      </h2>

                    <span className="inline-block mt-1 text-[13px] font-semibold text-bioBlue">
                        {translations.peptideInfo.page.readMore}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}










