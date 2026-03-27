

// peptides\app\peptide-information\peptide-storage\page.jsx

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";


export default function PeptideStoragePage() {
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
    translations?.peptideInformation?.peptideStorage;

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

  {/* BEST PRACTICES */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.bestPractices.title}
    </h2>
    <p className="mb-3">{t.sections.bestPractices.paragraph1}</p>
    <p className="mb-3">{t.sections.bestPractices.paragraph2}</p>
    <p>{t.sections.bestPractices.paragraph3}</p>
  </section>

  {/* FREEZE THAW */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.freezeThaw.title}
    </h2>
    <p>{t.sections.freezeThaw.paragraph}</p>
  </section>

  {/* OXIDATION */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.oxidation.title}
    </h2>
    <p className="mb-3">{t.sections.oxidation.paragraph1}</p>
    <p>{t.sections.oxidation.paragraph2}</p>
  </section>

  {/* ALIQUOTING */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.aliquoting.title}
    </h2>
    <p>{t.sections.aliquoting.paragraph}</p>
  </section>

  {/* SOLUTION STORAGE */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.solutionStorage.title}
    </h2>
    <p className="mb-3">{t.sections.solutionStorage.paragraph1}</p>
    <p>{t.sections.solutionStorage.paragraph2}</p>
  </section>

  {/* CONTAINERS */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.containers.title}
    </h2>
    <p>{t.sections.containers.paragraph}</p>
  </section>

  {/* GUIDELINES */}
  <section>
    <h2 className="text-2xl font-semibold mb-3">
      {t.sections.guidelines.title}
    </h2>
    <ul className="list-disc pl-6 space-y-2">
      {t.sections.guidelines.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </section>

  {/* CLOSING */}
  <p className="mt-6 text-gray-700 italic">
    {t.closing}
  </p>

</div>
      </main>

      <Footer />
    </>
  );
}
