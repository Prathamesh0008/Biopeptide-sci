// components/ProductContent.jsx
"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductContent({ product }) {
  const { translations } = useLanguage();

  // ✅ SAFE TRANSLATION ACCESS
  const t = (path) =>
    path
      .split(".")
      .reduce((obj, key) => obj?.[key], translations) || "";

  return (
    <section
      className="
        max-w-7xl mx-auto 
        px-4 sm:px-6 
        mt-16 sm:mt-24 
        grid grid-cols-1 lg:grid-cols-4 
        gap-12 lg:gap-16
      "
    >
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
            {product.name} – {t("productContent.overviewTitle") || "Overview"}
          </h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            {product.name} is a high-precision research peptide synthesized using
            solid-phase peptide synthesis (SPPS). Each batch undergoes extensive
            analytical validation including HPLC and Mass Spectrometry to ensure
            structural integrity, purity, and batch-to-batch consistency.
            <br /><br />
            Commonly utilized in biochemical pathway analysis, receptor-binding
            assays, regenerative cell modeling, and protein–peptide interaction
            studies within controlled laboratory environments.
          </p>
        </div>

        <div className="h-px bg-[#dbe9f3] my-8 sm:my-10" />


        {/* MECHANISM */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.mechanism") || "Mechanism of Action"}
          </h2>

          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-1">
            <li>• Modulation of cellular signaling pathways</li>
            <li>• Growth factor sensitivity enhancement</li>
            <li>• Gene expression regulation</li>
            <li>• Mitochondrial ATP production influence</li>
            <li>• Enzymatic activation support</li>
          </ul>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* RESEARCH APPLICATIONS */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.researchApplicationsTitle") ||
              "Primary Research Applications"}
          </h2>

          <ul className="list-disc ml-6 text-[15px] leading-relaxed text-gray-700 space-y-1">
            <li>Regenerative cell biology</li>
            <li>Protein expression analysis</li>
            <li>Receptor binding studies</li>
            <li>Mitochondrial metabolic research</li>
            <li>Enzymatic sensitivity experiments</li>
            <li>Matrix remodeling assays</li>
          </ul>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* SCIENTIFIC BACKGROUND */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.scientificBackgroundTitle") ||
              "Scientific Background"}
          </h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            Synthetic peptides play a critical role in modern biochemical and
            biomedical research by enabling precise modulation of cellular
            communication, molecular signaling, and metabolic behavior.
            <br /><br />
            {product.name} offers strong molecular stability, high binding
            affinity, predictable degradation profiles, and excellent
            reproducibility across experimental conditions.
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* STABILITY */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.stabilityTitle") || "Stability Profile"}
          </h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            • Stable when lyophilized and stored at −20°C  
            <br />
            • Sensitive to moisture and prolonged light exposure  
            <br />
            • Predictable degradation above room temperature  
            <br />
            • Reconstituted solutions stable for 24–48 hours under refrigeration
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* SOLUBILITY */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.solubilityTitle") ||
              "Solubility & Reconstitution"}
          </h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            Commonly compatible with:
            <br /><br />
            • Bacteriostatic water  
            <br />
            • Sterile saline  
            <br />
            • Acidic buffers  
            <br />
            • Organic analytical solvents
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* TECH SPECS */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.techSpecsTitle") ||
              "Technical Specifications"}
          </h2>

          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
            <li><b>CAS:</b> {product.cas || "N/A"}</li>
            <li><b>Purity:</b> {product.purity || "≥99%"}</li>
            <li><b>Unit Size:</b> {product.size || "Research vial"}</li>
            <li><b>Form:</b> Lyophilized powder</li>
            <li><b>Synthesis:</b> Solid-Phase Peptide Synthesis (SPPS)</li>
            <li><b>Analysis:</b> HPLC, MS, UV</li>
            <li><b>Endotoxin Testing:</b> Completed</li>
            <li><b>Microbial Testing:</b> Completed</li>
          </ul>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* MOLECULAR CHARACTERISTICS */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.molecularTitle") ||
              "Molecular Characteristics"}
          </h2>

          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
            <li><b>Molecular Type:</b> Synthetic research peptide</li>
            <li><b>Structure:</b> Linear peptide chain</li>
            <li><b>Molecular Weight:</b> Sequence-dependent</li>
            <li><b>Stability:</b> High when stored appropriately</li>
          </ul>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* ANALYTICAL VALIDATION */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.validationTitle") ||
              "Analytical Validation"}
          </h2>

          <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
            <li>• High-Performance Liquid Chromatography (HPLC)</li>
            <li>• Mass Spectrometry (MS)</li>
            <li>• UV Spectrophotometry</li>
            <li>• Batch purity and identity verification</li>
            <li>• Endotoxin & microbial screening</li>
          </ul>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* REGULATORY */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.regulatoryTitle") ||
              "Regulatory & Compliance"}
          </h2>

          <p className="text-[15px] leading-relaxed text-gray-700">
            This product is supplied strictly for laboratory research and
            scientific investigation. It is not approved as a drug, food,
            cosmetic, or medical product.
            <br /><br />
            Documentation such as Certificate of Analysis (COA) and Material
            Safety Data Sheet (MSDS) is available upon request.
          </p>
        </div>

        <div className="h-[1px] bg-[#dbe9f3]" />

        {/* FAQ */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#0d2d47]">
            {t("productContent.faq") || "FAQ"}
          </h2>

          <div className="space-y-4 text-[15px] text-gray-700">
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
              <p className="font-semibold">How should it be stored?</p>
              <p>Sealed and frozen at −20°C.</p>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <p className="text-[14px] text-red-700 leading-relaxed">
          <b>Disclaimer:</b> This product is intended strictly for laboratory
          research purposes only. It is not intended for human or veterinary
          consumption, diagnosis, treatment, or prevention of any disease.
          Improper use may result in serious health risks. The manufacturer and
          distributor assume no liability for misuse.
        </p>
      </div>
    </section>
  );
}




// //components\ProductContent.jsx
// "use client";

// import Image from "next/image";
// import Sidebar from "@/components/Sidebar";
// import { useLanguage } from "@/contexts/LanguageContext";


// export default function ProductContent({ product }) {
//   const { translations } = useLanguage();
// const t = (path) => path.split(".").reduce((obj, key) => obj?.[key], translations);


//   return (
//     <section
//       className="
//       max-w-7xl mx-auto 
//       px-4 sm:px-6 
//       mt-16 sm:mt-24 
//       grid grid-cols-1 lg:grid-cols-4 
//       gap-12 lg:gap-16
//     "
//     >
//       {/* LEFT SIDEBAR */}
//       <aside className="hidden lg:block">
//         <div className="sticky top-24">
//           <Sidebar />
//         </div>
//       </aside>

//       {/* RIGHT CONTENT */}
//       <div className="lg:col-span-3 space-y-16 sm:space-y-20">
        
//         {/* IMAGE */}
//         <div className="flex justify-center">
//           <Image
//             src="/images/info.jpg"
//             width={420}
//             height={420}
//             alt={product.name}
//             className="object-contain w-full max-w-[420px]"
//           />
//         </div>

//         {/* OVERVIEW */}
//         <div className="space-y-3">
//           <h2 className="text-3xl font-bold text-[#0d2d47]">
//   {product.name} – {t("productContent.overviewTitle") || "Overview"}
// </h2>

//           <p className="text-[15px] leading-relaxed text-gray-700">
//             {product.name} is a high-precision BioPeptide synthesized using
//             solid-phase peptide synthesis (SPPS). Each batch undergoes HPLC,
//             MS, and structural validation to ensure consistency and purity.
//             <br /><br />
//             Used in biochemical pathway studies, receptor-binding assays,
//             regenerative cell modeling, and protein–peptide interaction
//             experiments.
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* MECHANISM */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">
//   {t("productContent.mechanism") || "Mechanism of Action"}
// </h2>
//           <ul className="text-[15px] leading-relaxed text-gray-700">
//             {product.name} influences:
//             <br /><br />
//             <li>• Growth factor sensitivity  </li>
//             <li>• Regenerative signaling</li>  
//             <li>• Gene expression  </li>
//             <li>• ATP mitochondrial production </li> 
//             <li>• Enzymatic activation  </li>
//           </ul>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* RESEARCH APPLICATIONS */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">
//   {t("productContent.researchApplicationsTitle") || "Primary Research Applications"}
// </h2>

//           <ul className="list-disc ml-6 text-[15px] leading-relaxed text-gray-700 space-y-1">
//             <li>Regenerative cell biology</li>
//             <li>Protein expression analysis</li>
//             <li>Receptor binding studies</li>
//             <li>Mitochondrial metabolic research</li>
//             <li>Enzymatic sensitivity experiments</li>
//             <li>Matrix remodeling assays</li>
//           </ul>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* SCIENTIFIC BACKGROUND */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">
//   {t("productContent.scientificBackgroundTitle") || "Scientific Background"}
// </h2>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             Synthetic peptides modulate cellular communication and metabolic
//             behavior.  
//             <br /><br />
//             {product.name} delivers:
//             <br /><br />
//             • Strong stability  
//             • High binding affinity  
//             • Predictable degradation  
//             • Excellent reproducibility  
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* STABILITY */}
//         <div className="space-y-3">
//          <h2 className="text-2xl font-bold text-[#0d2d47]">
//   {t("productContent.stabilityTitle") || "Stability Profile"}
// </h2>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             • Stable lyophilized at −20°C  
//             • Sensitive to moisture & light  
//             • Predictable decay above room temp  
//             • Reconstituted solution stable 24–48h  
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* SOLUBILITY */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">
//   {t("productContent.solubilityTitle") || "Solubility & Reconstitution"}
// </h2>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             Works well with:
//             <br /><br />
//             • Bacteriostatic water  
//             • Sterile saline  
//             • Acidic buffers  
//             • Organic analytical blends  
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* TECH SPECS */}
//         <div className="space-y-3">
//         <h2 className="text-2xl font-bold text-[#0d2d47]">
//   {t("productContent.techSpecsTitle") || "Technical Specifications"}
// </h2>

//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
//             <li><b>CAS:</b> {product.cas || "N/A"}</li>
//             <li><b>Purity:</b> {product.purity}</li>
//             <li><b>Unit Size:</b> {product.size}</li>
//             <li><b>Form:</b> Lyophilized powder</li>
//             <li><b>Synthesis:</b> SPPS</li>
//             <li><b>Analysis:</b> HPLC, MS, UV</li>
//             <li><b>Endotoxin Testing:</b> Completed</li>
//             <li><b>Microbial Testing:</b> Completed</li>
//           </ul>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* FAQ */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">
//   {t("productContent.faq") || "FAQ"}
// </h2>

//           <div className="space-y-4 text-[15px] text-gray-700">
//             <div>
//               <p className="font-semibold">Is this peptide for human use?</p>
//               <p>No. Laboratory research only.</p>
//             </div>
//             <div>
//               <p className="font-semibold">Does it include COA?</p>
//               <p>Yes. Each batch includes HPLC + MS validation.</p>
//             </div>
//             <div>
//               <p className="font-semibold">Is it sterile?</p>
//               <p>Not until reconstituted.</p>
//             </div>
//             <div>
//               <p className="font-semibold">How to store?</p>
//               <p>Keep sealed and frozen at −20°C.</p>
//             </div>
//           </div>
//         </div>

//         {/* DISCLAIMER */}
//         <p className="text-[14px] text-red-700">
//           <b>Disclaimer:</b> Not for human or veterinary use. Laboratory research only.
//         </p>
//       </div>
//     </section>
//   );
// }















// //components\ProductContent.jsx
// "use client";

// import Image from "next/image";
// import Sidebar from "@/components/Sidebar";

// export default function ProductContent({ product }) {
//   return (
//     <section
//       className="
//       max-w-7xl mx-auto 
//       px-4 sm:px-6 
//       mt-16 sm:mt-24 
//       grid grid-cols-1 lg:grid-cols-4 
//       gap-12 lg:gap-16
//     "
//     >
//       {/* LEFT SIDEBAR */}
//       <aside className="hidden lg:block">
//         <div className="sticky top-24">
//           <Sidebar />
//         </div>
//       </aside>

//       {/* RIGHT CONTENT */}
//       <div className="lg:col-span-3 space-y-16 sm:space-y-20">
        
//         {/* IMAGE */}
//         <div className="flex justify-center">
//           <Image
//             src="/images/info.jpg"
//             width={420}
//             height={420}
//             alt={product.name}
//             className="object-contain w-full max-w-[420px]"
//           />
//         </div>

//         {/* OVERVIEW */}
//         <div className="space-y-3">
//           <h2 className="text-3xl font-bold text-[#0d2d47]">
//             {product.name} – Overview
//           </h2>

//           <p className="text-[15px] leading-relaxed text-gray-700">
//             {product.name} is a high-precision BioPeptide synthesized using
//             solid-phase peptide synthesis (SPPS). Each batch undergoes HPLC,
//             MS, and structural validation to ensure consistency and purity.
//             <br /><br />
//             Used in biochemical pathway studies, receptor-binding assays,
//             regenerative cell modeling, and protein–peptide interaction
//             experiments.
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* MECHANISM */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">Mechanism of Action</h2>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             {product.name} influences:
//             <br /><br />
//             • Growth factor sensitivity  
//             • Regenerative signaling  
//             • Gene expression  
//             • ATP mitochondrial production  
//             • Enzymatic activation  
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* RESEARCH APPLICATIONS */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">Primary Research Applications</h2>

//           <ul className="list-disc ml-6 text-[15px] leading-relaxed text-gray-700 space-y-1">
//             <li>Regenerative cell biology</li>
//             <li>Protein expression analysis</li>
//             <li>Receptor binding studies</li>
//             <li>Mitochondrial metabolic research</li>
//             <li>Enzymatic sensitivity experiments</li>
//             <li>Matrix remodeling assays</li>
//           </ul>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* SCIENTIFIC BACKGROUND */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">Scientific Background</h2>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             Synthetic peptides modulate cellular communication and metabolic
//             behavior.  
//             <br /><br />
//             {product.name} delivers:
//             <br /><br />
//             • Strong stability  
//             • High binding affinity  
//             • Predictable degradation  
//             • Excellent reproducibility  
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* STABILITY */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">Stability Profile</h2>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             • Stable lyophilized at −20°C  
//             • Sensitive to moisture & light  
//             • Predictable decay above room temp  
//             • Reconstituted solution stable 24–48h  
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* SOLUBILITY */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">Solubility & Reconstitution</h2>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             Works well with:
//             <br /><br />
//             • Bacteriostatic water  
//             • Sterile saline  
//             • Acidic buffers  
//             • Organic analytical blends  
//           </p>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* TECH SPECS */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">Technical Specifications</h2>

//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
//             <li><b>CAS:</b> {product.cas || "N/A"}</li>
//             <li><b>Purity:</b> {product.purity}</li>
//             <li><b>Unit Size:</b> {product.size}</li>
//             <li><b>Form:</b> Lyophilized powder</li>
//             <li><b>Synthesis:</b> SPPS</li>
//             <li><b>Analysis:</b> HPLC, MS, UV</li>
//             <li><b>Endotoxin Testing:</b> Completed</li>
//             <li><b>Microbial Testing:</b> Completed</li>
//           </ul>
//         </div>

//         <div className="h-[1px] bg-[#dbe9f3]" />

//         {/* FAQ */}
//         <div className="space-y-3">
//           <h2 className="text-2xl font-bold text-[#0d2d47]">Frequently Asked Questions</h2>

//           <div className="space-y-4 text-[15px] text-gray-700">
//             <div>
//               <p className="font-semibold">Is this peptide for human use?</p>
//               <p>No. Laboratory research only.</p>
//             </div>
//             <div>
//               <p className="font-semibold">Does it include COA?</p>
//               <p>Yes. Each batch includes HPLC + MS validation.</p>
//             </div>
//             <div>
//               <p className="font-semibold">Is it sterile?</p>
//               <p>Not until reconstituted.</p>
//             </div>
//             <div>
//               <p className="font-semibold">How to store?</p>
//               <p>Keep sealed and frozen at −20°C.</p>
//             </div>
//           </div>
//         </div>

//         {/* DISCLAIMER */}
//         <p className="text-[14px] text-red-700">
//           <b>Disclaimer:</b> Not for human or veterinary use. Laboratory research only.
//         </p>
//       </div>
//     </section>
//   );
// }
