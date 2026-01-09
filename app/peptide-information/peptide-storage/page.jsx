//peptides\app\peptide-information\peptide-storage\page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";

export default function PeptideStoragePage() {
  return (
    <>
      <Navbar />
      <PeptideInfoSubNav />
      <Breadcrumbs />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Peptide Storage
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          By BioPeptide Research Team • September 15, 2023
        </p>

        {/* DISCLAIMER */}
        <div className="bg-gray-100 border border-gray-300 p-4 text-sm text-gray-700 mb-8">
          <strong>Important Notice:</strong><br />
          All articles and product information provided on this website are for
          informational and educational purposes only. Products supplied by
          BioPeptide are intended strictly for laboratory research and in-vitro
          studies. These products are not medicines or drugs and have not been
          evaluated or approved by the U.S. Food and Drug Administration.
        </div>

        {/* CONTENT */}
        <div className="prose prose-gray max-w-none text-gray-800">

          <h2>Best Practices for Storing Peptides</h2>
          <p>
            To preserve the integrity of experimental results, proper peptide
            storage is essential. Correct storage practices help prevent
            contamination, oxidation, and degradation, ensuring peptides remain
            stable and reliable for research applications.
          </p>

          <p>
            Once peptides are received, they should be kept cold and protected
            from light. Short-term refrigeration at temperatures below 4°C (39°F)
            is generally acceptable if peptides will be used within days or
            weeks.
          </p>

          <p>
            For long-term storage spanning months or years, peptides should be
            stored in a freezer at approximately -80°C (-112°F). Freezing is the
            optimal method to maintain peptide stability over extended periods.
          </p>

          <h2>Avoiding Freeze–Thaw Damage</h2>
          <p>
            Repeated freeze–thaw cycles can significantly reduce peptide
            stability. Researchers should avoid frost-free freezers, as
            temperature fluctuations during defrost cycles can accelerate
            degradation.
          </p>

          <h2>Preventing Oxidation and Moisture Contamination</h2>
          <p>
            Exposure to air and moisture should be minimized at all times. Before
            opening a peptide vial removed from cold storage, allow it to reach
            room temperature to prevent moisture condensation.
          </p>

          <p>
            After removing the required amount of peptide, resealing the vial
            under an inert gas atmosphere such as nitrogen or argon can reduce
            oxidation risk. Peptides containing cysteine, methionine, or
            tryptophan are particularly susceptible to oxidation.
          </p>

          <h2>Aliquoting for Stability</h2>
          <p>
            Many researchers prefer to aliquot peptides into separate vials based
            on experimental requirements. This approach minimizes repeated
            exposure to air and temperature changes, significantly extending
            peptide shelf life.
          </p>

          <h2>Storing Peptides in Solution</h2>
          <p>
            Peptides stored in solution have a much shorter shelf life than
            lyophilized peptides and are more susceptible to bacterial
            degradation. If storage in solution is unavoidable, sterile buffers
            at pH 5–6 should be used.
          </p>

          <p>
            Peptide solutions should be aliquoted and stored at 4°C (39°F) for no
            longer than 30 days unless the peptide is known to be unstable, in
            which case freezing is recommended.
          </p>

          <h2>Peptide Storage Containers</h2>
          <p>
            Storage containers should be clean, chemically resistant, and
            appropriately sized. Both glass and polypropylene vials are commonly
            used. Glass vials provide excellent chemical resistance, while
            polypropylene vials offer durability and reduced breakage risk.
          </p>

          <h2>General Peptide Storage Guidelines</h2>
          <ul>
            <li>Store peptides in a cold, dry, dark environment</li>
            <li>Avoid repeated freezing and thawing</li>
            <li>Minimize exposure to air and light</li>
            <li>Avoid long-term storage in solution</li>
            <li>Aliquot peptides according to experimental needs</li>
          </ul>

          <p className="mt-6">
            Following these best practices will help ensure that BioPeptide
            research peptides maintain their integrity and reliability for
            scientific investigation.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
