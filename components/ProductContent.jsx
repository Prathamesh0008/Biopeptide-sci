"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";

export default function ProductContent({ product }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-24 grid grid-cols-1 lg:grid-cols-4 gap-16">

      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <Sidebar />
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="lg:col-span-3 space-y-20">

        {/* HERO IMAGE — clean, same style as top */}
        <div className="flex justify-center">
          <Image
            src="/images/info.jpg"
            width={420}
            height={420}
            alt={product.name}
            className="object-contain"
          />
        </div>

        {/* ------------------------------
            OVERVIEW
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-[#0d2d47]">
            {product.name} – Overview
          </h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            {product.name} is a high-precision BioPeptide synthesized using 
            advanced solid-phase peptide synthesis (SPPS). Each batch undergoes 
            analytical-grade purification including HPLC, MS, and structural 
            validation to ensure consistency and stability.
            <br /><br />
            Used across biochemical pathway studies, receptor-binding assays, 
            regenerative cell modeling, tissue response research, 
            and peptide–protein interaction experiments.
          </p>
        </div>

        {/* SECTION DIVIDER */}
        <div className="h-[1px] bg-[#dbe9f3] w-full"></div>

        {/* ------------------------------
            MECHANISM OF ACTION
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">Mechanism of Action</h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            {product.name} interacts with peptide-binding receptors and 
            intracellular pathways influencing:
            <br /><br />
            • Growth factor sensitivity  
            • Regenerative signaling  
            • Gene expression patterns  
            • Mitochondrial ATP production  
            • Enzymatic activation  
            <br /><br />
            Its sequence produces reliable receptor-ligand engagement, allowing 
            high-accuracy pathway observation in vitro.
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3] w-full"></div>

        {/* ------------------------------
            RESEARCH APPLICATIONS
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">Primary Research Applications</h2>

          <ul className="list-disc ml-6 text-[15px] leading-relaxed text-gray-700 space-y-1">
            <li>Regenerative cell biology</li>
            <li>Protein expression analysis</li>
            <li>Receptor binding studies</li>
            <li>Mitochondrial metabolic research</li>
            <li>Enzymatic sensitivity experiments</li>
            <li>Matrix remodeling assays</li>
            <li>Cell stress-response modeling</li>
            <li>Peptide half-life computation</li>
          </ul>
        </div>

        <div className="h-[1px] bg-[#dbe9f3] w-full"></div>

        {/* ------------------------------
            SCIENTIFIC BACKGROUND
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">Scientific Background</h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            Modern peptide research highlights the role of synthetic analogs in 
            modulating cellular communication, regenerative cycles, and 
            metabolic adaptation.  
            <br /><br />
            {product.name} demonstrates:
            <br /><br />
            • Strong structural stability  
            • High binding affinity  
            • Predictable degradation  
            • Excellent reproducibility  
            • Cross-platform assay compatibility  
            <br /><br />
            These attributes make it a preferred candidate for molecular 
            simulation, biochemical modeling, and precision pathway research.
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3] w-full"></div>

        {/* ------------------------------
            STABILITY PROFILE
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">Stability Profile</h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            • Stable lyophilized at −20°C  
            • Sensitive to moisture and light  
            • Predictable decay above room temp  
            • Reconstituted solution stable 24–48h  
            • Retains molecular integrity when sealed  
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3] w-full"></div>

        {/* ------------------------------
            SOLUBILITY
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">Solubility & Reconstitution</h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            Common laboratory solvents:
            <br /><br />
            • Bacteriostatic water  
            • Sterile saline  
            • Mild acidic buffers  
            • Organic blends for analytical precision  
            <br /><br />
            Gentle reconstitution is recommended to maintain structural stability.
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3] w-full"></div>

        {/* ------------------------------
            TECHNICAL SPECIFICATIONS
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">Technical Specifications</h2>

          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
            <li><b>CAS:</b> {product.cas || "N/A"}</li>
            <li><b>Purity:</b> {product.purity}</li>
            <li><b>Unit Size:</b> {product.size}</li>
            <li><b>Form:</b> Lyophilized powder</li>
            <li><b>Synthesis:</b> SPPS</li>
            <li><b>Analysis:</b> HPLC, MS, UV</li>
            <li><b>Endotoxin Testing:</b> Completed</li>
            <li><b>Microbial Testing:</b> Completed</li>
            <li><b>Storage:</b> −20°C</li>
          </ul>
        </div>

        <div className="h-[1px] bg-[#dbe9f3] w-full"></div>

        {/* ------------------------------
            FAQ
        ------------------------------ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">Frequently Asked Questions</h2>

          <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed">
            <div>
              <p className="font-semibold">Is this peptide for human use?</p>
              <p>No. Laboratory research only.</p>
            </div>
            <div>
              <p className="font-semibold">Does it include COA?</p>
              <p>Yes. Each batch includes HPLC + MS validation.</p>
            </div>
            <div>
              <p className="font-semibold">Is it sterile?</p>
              <p>Not until reconstituted.</p>
            </div>
            <div>
              <p className="font-semibold">How to store?</p>
              <p>Keep sealed and frozen at −20°C.</p>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <p className="text-[14px] text-red-700">
          <b>Disclaimer:</b> Not for human or veterinary use. Laboratory research only.
        </p>

      </div>
    </section>
  );
}
