// components/ProductContent.jsx
"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductContent({ product }) {
  const { translations } = useLanguage();

  const tc = translations?.productContent || {};

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
          <div className="space-y-4 text-[15px] text-gray-700">
            {tc.faqItems?.map((f, i) => (
              <div key={i}>
                <p className="font-semibold">{f.q}</p>
                <p>{f.a}</p>
              </div>
            ))}
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




// // components/ProductContent.jsx
// "use client";

// import Image from "next/image";
// import Sidebar from "@/components/Sidebar";
// import { useLanguage } from "@/contexts/LanguageContext";

// export default function ProductContent({ product }) {
//   const { translations } = useLanguage();

//   const tc = translations?.productContent || {};

//   return (
//     <section className="
//       max-w-7xl mx-auto 
//       px-4 sm:px-6 
//       mt-16 sm:mt-24 
//       grid grid-cols-1 lg:grid-cols-4 
//       gap-12 lg:gap-16
//     ">
//       {/* LEFT SIDEBAR */}
//       <aside className="hidden lg:block">
//         <div className="sticky top-24">
//           <Sidebar />
//         </div>
//       </aside>

//       {/* RIGHT CONTENT */}
//       <div className="lg:col-span-3 space-y-10 sm:space-y-12">

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
//             {product.name} – {tc.overviewTitle}
//           </h2>

//           <p className="text-[15px] leading-relaxed text-gray-700">
//             {product.name}{" "}
//             {tc.overviewDescription1}
//             <br /><br />
//             {tc.overviewDescription2}
//           </p>
//         </div>

//         <Divider />

//         {/* MECHANISM */}
//         <Section title={tc.mechanism}>
//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-1">
//             {tc.mechanismPoints?.map((item, i) => (
//               <li key={i}>• {item}</li>
//             ))}
//           </ul>
//         </Section>

//         <Divider />

//         {/* RESEARCH APPLICATIONS */}
//         <Section title={tc.researchApplicationsTitle}>
//           <ul className="list-disc ml-6 text-[15px] leading-relaxed text-gray-700 space-y-1">
//             {tc.researchApplications?.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </Section>

//         <Divider />

//         {/* SCIENTIFIC BACKGROUND */}
//         <Section title={tc.scientificBackgroundTitle}>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             {tc.scientificBackground1}
//             <br /><br />
//             {product.name} {tc.scientificBackground2}
//           </p>
//         </Section>

//         <Divider />

//         {/* STABILITY */}
//         <Section title={tc.stabilityTitle}>
//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-1">
//             {tc.stabilityPoints?.map((item, i) => (
//               <li key={i}>• {item}</li>
//             ))}
//           </ul>
//         </Section>

//         <Divider />

//         {/* SOLUBILITY */}
//         <Section title={tc.solubilityTitle}>
//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-1">
//             {tc.solubilityPoints?.map((item, i) => (
//               <li key={i}>• {item}</li>
//             ))}
//           </ul>
//         </Section>

//         <Divider />

//         {/* TECH SPECS */}
//         <Section title={tc.techSpecsTitle}>
//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
//             <li><b>CAS:</b> {product.cas || "N/A"}</li>
//             <li><b>{tc.purityLabel}:</b> {product.purity || "≥99%"}</li>
//             <li><b>{tc.unitSizeLabel}:</b> {product.size || tc.defaultUnit}</li>
//             <li><b>{tc.formLabel}:</b> {tc.formValue}</li>
//             <li><b>{tc.synthesisLabel}:</b> {tc.synthesisValue}</li>
//             <li><b>{tc.analysisLabel}:</b> {tc.analysisValue}</li>
//           </ul>
//         </Section>

//         <Divider />

//         {/* MOLECULAR */}
//         <Section title={tc.molecularTitle}>
//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
//             {tc.molecularPoints?.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </Section>

//         <Divider />

//         {/* VALIDATION */}
//         <Section title={tc.validationTitle}>
//           <ul className="text-[15px] leading-relaxed text-gray-700 space-y-2">
//             {tc.validationPoints?.map((item, i) => (
//               <li key={i}>• {item}</li>
//             ))}
//           </ul>
//         </Section>

//         <Divider />

//         {/* REGULATORY */}
//         <Section title={tc.regulatoryTitle}>
//           <p className="text-[15px] leading-relaxed text-gray-700">
//             {tc.regulatoryText}
//           </p>
//         </Section>

//         <Divider />

//         {/* FAQ */}
//         <Section title={tc.faq}>
//           <div className="space-y-4 text-[15px] text-gray-700">
//             {tc.faqItems?.map((f, i) => (
//               <div key={i}>
//                 <p className="font-semibold">{f.q}</p>
//                 <p>{f.a}</p>
//               </div>
//             ))}
//           </div>
//         </Section>

//         {/* DISCLAIMER */}
//         <p className="text-[14px] text-red-700 leading-relaxed">
//           <b>{tc.disclaimerLabel}:</b> {tc.disclaimer}
//         </p>

//       </div>
//     </section>
//   );
// }

// /* ---------- Helpers ---------- */

// const Divider = () => (
//   <div className="h-[1px] bg-[#dbe9f3]" />
// );

// const Section = ({ title, children }) => (
//   <div className="space-y-3">
//     <h2 className="text-2xl font-bold text-[#0d2d47]">
//       {title}
//     </h2>
//     {children}
//   </div>
// );





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
