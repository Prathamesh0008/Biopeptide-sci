//peptides\app\peptide-information\intro-to-peptides\page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
import { useState } from "react";
import PeptideInfoSidebar from "@/components/PeptideInfoSidebar";
import { useLanguage } from "@/contexts/LanguageContext";



export default function IntroToPeptidesPage() {
  return (
    <>
      <Navbar />
      <PeptideInfoSubNav />
      <Breadcrumbs />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Intro to Peptides
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          By BioPeptide Research Team • October 20, 2023
        </p>

        {/* DISCLAIMER */}
        <div className="bg-gray-100 border border-gray-300 p-4 text-sm text-gray-700 mb-8">
          <strong>Important Notice:</strong><br />
          All articles and product information on this website are provided
          strictly for educational and informational purposes only. Products
          sold by BioPeptide are intended for laboratory research and in-vitro
          studies only. These products are not approved for human or veterinary
          use and have not been evaluated by the U.S. FDA.
        </div>

        {/* CONTENT */}
        <div className="prose prose-gray max-w-none text-gray-800">

          <h2>What Is a Peptide?</h2>
          <p>
            A peptide is a naturally occurring chemical compound composed of two
            or more amino acids linked together by peptide bonds. These bonds
            form when the carboxyl group of one amino acid reacts with the amino
            group of another, releasing a molecule of water in a condensation
            reaction.
          </p>

          <p>
            Peptides are fundamental components of biological systems and play
            essential roles in biochemical research. Thousands of peptides occur
            naturally in humans and animals, while many more are synthesized in
            laboratory environments for research applications.
          </p>

          <h2>How Are Peptides Formed?</h2>
          <p>
            Peptides can be formed naturally within living organisms or produced
            synthetically under controlled laboratory conditions. Biological
            systems generate peptides through ribosomal and non-ribosomal
            pathways, while modern laboratories utilize advanced synthesis
            techniques.
          </p>

          <p>
            Solid Phase Peptide Synthesis (SPPS) is the most widely used method
            today due to its efficiency, reproducibility, and scalability.
          </p>

          <h2>Historical Background</h2>
          <p>
            The first synthetic peptide was reported in 1901 by Emil Fischer.
            Later, in 1953, oxytocin became the first polypeptide hormone to be
            synthesized, marking a major milestone in peptide research.
          </p>

          <h2>Peptide Terminology</h2>
          <ul>
            <li><strong>Dipeptide:</strong> Two amino acids</li>
            <li><strong>Tripeptide:</strong> Three amino acids</li>
            <li><strong>Oligopeptide:</strong> Fewer than ten amino acids</li>
            <li><strong>Polypeptide:</strong> More than ten amino acids</li>
          </ul>

          <h2>Classification of Peptides</h2>
          <p>
            Peptides may be classified based on how they are produced. Ribosomal
            peptides originate from mRNA translation, while non-ribosomal
            peptides are synthesized by specialized enzymes and often exhibit
            cyclic structures.
          </p>

          <h2>Important Peptide Terms</h2>
          <ul>
            <li><strong>Amino Acids</strong> – Building blocks of peptides</li>
            <li><strong>Peptide Bond</strong> – Covalent bond linking amino acids</li>
            <li><strong>Peptide Sequence</strong> – Order of amino acids</li>
            <li><strong>Peptide Mapping</strong> – Sequence identification method</li>
            <li><strong>Peptide Library</strong> – Collection of peptide variants</li>
          </ul>

          <p className="mt-6">
            BioPeptide supplies high-purity research peptides designed exclusively
            for laboratory investigation and scientific development.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
