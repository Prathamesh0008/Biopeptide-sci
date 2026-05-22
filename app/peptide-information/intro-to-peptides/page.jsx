



// peptides/app/peptide-information/intro-to-peptides/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
import PeptideInfoSidebar from "@/components/PeptideInfoSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";


export default function IntroToPeptidesPage() {
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

  const t =
    translations?.peptideInformation?.introToPeptides;

  if (!t) return null;

  return (
    <>
      <Navbar />
      <PeptideInfoSubNav />
      <Breadcrumbs />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {t.title}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          {t.meta}
        </p>

        {/* DISCLAIMER */}
        <div className="bg-gray-100 border border-gray-300 p-4 text-sm text-gray-700 mb-8">
          <strong>{t.disclaimer.title}</strong>
          <br />
          {t.disclaimer.text}
        </div>

        {/* CONTENT */}
        {/* CONTENT */}
<div className="text-gray-800 leading-relaxed space-y-8">

  {/* WHAT IS */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.whatIs.title}
    </h2>
    <p className="mb-3">{t.sections.whatIs.paragraph1}</p>
    <p>{t.sections.whatIs.paragraph2}</p>
  </section>

  {/* FORMATION */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.formation.title}
    </h2>
    <p className="mb-3">{t.sections.formation.paragraph1}</p>
    <p>{t.sections.formation.paragraph2}</p>
  </section>

  {/* HISTORY */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.history.title}
    </h2>
    <p>{t.sections.history.paragraph}</p>
  </section>

  {/* TERMINOLOGY */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.terminology.title}
    </h2>
    <ul className="list-disc pl-6 space-y-2">
      {t.sections.terminology.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </section>

  {/* CLASSIFICATION */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.classification.title}
    </h2>
    <p>{t.sections.classification.paragraph}</p>
  </section>

  {/* IMPORTANT TERMS */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.importantTerms.title}
    </h2>
    <ul className="list-disc pl-6 space-y-2">
      {t.sections.importantTerms.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </section>

  {/* CLOSING */}
  <p className="text-gray-700 italic mt-6">
    {t.closing}
  </p>

</div>
      </main>

      <Footer />
    </>
  );
}
