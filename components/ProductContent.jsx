







// components/ProductContent.jsx
"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";


export default function ProductContent({ product }) {
  const { translations } = useLanguage();

  const tc = translations?.productContent || {};
const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="
      max-w-7xl mx-auto 
      px-4 sm:px-6 
      mt-16 sm:mt-24 
      grid grid-cols-1 lg:grid-cols-4 
      gap-12 lg:gap-16
    ">
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <Sidebar />
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="lg:col-span-3 space-y-10 sm:space-y-12">

        {/* IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/images/info.jpg"
            width={420}
            height={420}
            alt={product.name}
            className="object-contain w-full max-w-[420px]"
          />
        </div>

        {/* OVERVIEW */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-[#0d2d47]">
            {product.name} – {tc.overviewTitle}
          </h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            {product.name}{" "}
            {tc.overviewDescription1}
            <br /><br />
            {tc.overviewDescription2}
          </p>
        </div>

        <Divider />

        {/* MECHANISM */}
        <Section title={tc.mechanism}>
          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-1">
            {tc.mechanismPoints?.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* RESEARCH APPLICATIONS */}
        <Section title={tc.researchApplicationsTitle}>
          <ul className="list-disc ml-6 text-[15px] leading-relaxed text-gray-700 space-y-1">
            {tc.researchApplications?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* SCIENTIFIC BACKGROUND */}
        <Section title={tc.scientificBackgroundTitle}>
          <p className="text-[15px] leading-relaxed text-gray-700">
            {tc.scientificBackground1}
            <br /><br />
            {product.name} {tc.scientificBackground2}
          </p>
        </Section>

        <Divider />

        {/* STABILITY */}
        <Section title={tc.stabilityTitle}>
          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-1">
            {tc.stabilityPoints?.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* SOLUBILITY */}
        <Section title={tc.solubilityTitle}>
          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-1">
            {tc.solubilityPoints?.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* TECH SPECS */}
        <Section title={tc.techSpecsTitle}>
          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
            <li><b>CAS:</b> {product.cas || "N/A"}</li>
            <li><b>{tc.purityLabel}:</b> {product.purity || "≥99%"}</li>
            <li><b>{tc.unitSizeLabel}:</b> {product.size || tc.defaultUnit}</li>
            <li><b>{tc.formLabel}:</b> {tc.formValue}</li>
            <li><b>{tc.synthesisLabel}:</b> {tc.synthesisValue}</li>
            <li><b>{tc.analysisLabel}:</b> {tc.analysisValue}</li>
          </ul>
        </Section>

        <Divider />

        {/* MOLECULAR */}
        <Section title={tc.molecularTitle}>
          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
            {tc.molecularPoints?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* VALIDATION */}
        <Section title={tc.validationTitle}>
          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
            {tc.validationPoints?.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Section>

        <Divider />

        {/* REGULATORY */}
        <Section title={tc.regulatoryTitle}>
          <p className="text-[15px] leading-relaxed text-gray-700">
            {tc.regulatoryText}
          </p>
        </Section>

        <Divider />


{/* FAQ */}
<Section title={tc.faq}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
    {tc.faqItems?.map((f, i) => {
      const isOpen = openFaq === i;

      return (
        <div
          key={i}
          className={`border rounded-xl bg-white transition-all duration-300
            ${isOpen ? "shadow-md" : "shadow-sm"}
          `}
        >
          {/* QUESTION */}
          <button
            type="button"
            onClick={() => setOpenFaq(isOpen ? null : i)}
            className="w-full flex justify-between items-center text-left p-4"
          >
            <span className="font-semibold text-gray-800">
              {f.q}
            </span>

            {/* ARROW */}
            <span
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* ANSWER */}
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
              ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <p className="px-4 pb-4 text-gray-700 leading-relaxed">
              {f.a}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</Section>
        {/* DISCLAIMER */}
        <p className="text-[14px] text-red-700 leading-relaxed">
          <b>{tc.disclaimerLabel}:</b> {tc.disclaimer}
        </p>

      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

const Divider = () => (
  <div className="h-[1px] bg-[#dbe9f3]" />
);

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-2xl font-bold text-[#0d2d47]">
      {title}
    </h2>
    {children}
  </div>
);




