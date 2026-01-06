// peptides/app/about/page.jsx
"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import DrawerProducts from "@/components/DrawerProducts";
import { useState } from "react";

export default function AboutPage() {
  const { translations, loading } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const t = (path) => {
    try {
      return path
        .split(".")
        .reduce((obj, key) => obj?.[key], translations?.about || {});
    } catch {
      return "";
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <>
      <Navbar />
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

      <main className="min-h-screen bg-white text-gray-800">
        {/* CONTENT */}
        <section className="max-w-[1300px] mx-auto px-6 py-20 space-y-24">
          {/* COMPANY OVERVIEW */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-bioBlue to-bioGreen rounded-full" />
              <span className="text-sm font-semibold text-bioBlue uppercase">
                {t("companyOverview.sectionTitle")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0d2d47]">
              {t("companyOverview.title")}
            </h2>

            <p>{t("companyOverview.description1")}</p>
            <p>{t("companyOverview.description2")}</p>
          </div>

          {/* MISSION & VISION */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8 border rounded-xl">
              <h3 className="text-2xl font-semibold">
                {t("mission.title")}
              </h3>
              <p>{t("mission.description")}</p>
            </div>

            <div className="p-8 border rounded-xl">
              <h3 className="text-2xl font-semibold">
                {t("vision.title")}
              </h3>
              <p>{t("vision.description")}</p>
            </div>
          </div>

          {/* QUALITY */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">
                {t("qualitySection.title")}
              </h3>
              <p>{t("qualitySection.description1")}</p>
              <p>{t("qualitySection.description2")}</p>
            </div>

            <div className="relative h-[360px] rounded-xl overflow-hidden">
              <Image
                src="/images/aboutus.jpg"
                alt="Lab Research"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="space-y-10">
            <h3 className="text-3xl font-bold">
              {t("whyChooseUs.title")}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t("whyChooseUs.features")?.map((item, i) => (
                <div key={i} className="p-6 border rounded-xl">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ETHICS */}
          <div className="p-8 border rounded-xl bg-gray-50">
            <h3 className="text-2xl font-semibold">
              {t("ethics.title")}
            </h3>
            <p>{t("ethics.description")}</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}






// //peptides\app\about\page.jsx
// "use client";

// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext";

// export default function AboutPage() {
//   const { translations, loading } = useLanguage();

//   const t = (path) => {
//     try {
//       return path
//         .split(".")
//         .reduce((obj, key) => obj?.[key], translations?.about || {});
//     } catch {
//       return "";
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Loading...
//       </div>
//     );

//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs />

//       <main className="min-h-screen bg-white text-gray-800">

//         {/* HERO */}
//         {/* <section className="relative w-full h-[330px] md:h-[420px] flex items-center justify-center overflow-hidden">
//           <Image
//             src="/images/aboutus.jpg"
//             alt="About BioPeptide"
//             fill
//             priority
//             className="object-cover opacity-50"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-bioGreen/20" />

//           <div className="relative z-10 max-w-4xl px-6 text-center">
//             <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d2d47]">
//               {t("hero.title")}
//             </h1>
//             <p className="mt-4 text-lg md:text-xl text-gray-700">
//               {t("hero.description")}
//             </p>
//           </div>
//         </section> */}

//         {/* CONTENT */}
//         <section className="max-w-[1300px] mx-auto px-6 py-20 space-y-24">

//           {/* COMPANY OVERVIEW */}
//           <div className="space-y-10">
//             <div className="flex items-center gap-3">
//               <div className="h-1 w-12 bg-gradient-to-r from-bioBlue to-bioGreen rounded-full" />
//               <span className="text-sm font-semibold text-bioBlue uppercase">
//                 {t("companyOverview.sectionTitle")}
//               </span>
//             </div>

//             <h2 className="text-3xl md:text-4xl font-bold text-[#0d2d47]">
//               {t("companyOverview.title")}
//             </h2>

//             <p>{t("companyOverview.description1")}</p>
//             <p>{t("companyOverview.description2")}</p>
//           </div>

//           {/* MISSION & VISION */}
//           <div className="grid md:grid-cols-2 gap-10">
//             <div className="p-8 border rounded-xl">
//               <h3 className="text-2xl font-semibold">
//                 {t("mission.title")}
//               </h3>
//               <p>{t("mission.description")}</p>
//             </div>

//             <div className="p-8 border rounded-xl">
//               <h3 className="text-2xl font-semibold">
//                 {t("vision.title")}
//               </h3>
//               <p>{t("vision.description")}</p>
//             </div>
//           </div>

//           {/* QUALITY */}
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-6">
//               <h3 className="text-3xl font-bold">
//                 {t("qualitySection.title")}
//               </h3>
//               <p>{t("qualitySection.description1")}</p>
//               <p>{t("qualitySection.description2")}</p>
//             </div>

//             <div className="relative h-[360px] rounded-xl overflow-hidden">
//               <Image
//                 src="/images/aboutus.jpg"
//                 alt="Lab Research"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>

//           {/* WHY CHOOSE US */}
//           <div className="space-y-10">
//             <h3 className="text-3xl font-bold">
//               {t("whyChooseUs.title")}
//             </h3>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {t("whyChooseUs.features")?.map((item, i) => (
//                 <div key={i} className="p-6 border rounded-xl">
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ETHICS */}
//           <div className="p-8 border rounded-xl bg-gray-50">
//             <h3 className="text-2xl font-semibold">
//               {t("ethics.title")}
//             </h3>
//             <p>{t("ethics.description")}</p>
//           </div>

//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }














// "use client";

// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";

// export default function AboutPage() {
//   return (
//     <>
//     <Navbar/>
//     <Breadcrumbs/>
//     <main className="min-h-screen bg-white text-gray-800">

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative w-full h-[330px] md:h-[420px] overflow-hidden flex items-center justify-center">
//         <Image
//           src="/images/aboutus.jpg"
//           alt="About BioPeptide"
//           fill
//           priority
//           className="object-cover opacity-50"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-bioGreen/20 backdrop-blur-sm" />

//         {/* Hero Content */}
//         <div className="relative z-10 max-w-4xl px-6 text-center animate-fadeIn">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d2d47] leading-tight drop-shadow">
//             About BioPeptide Research Labs
//           </h1>
//           <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
//             Advancing peptide innovation through scientific precision, analytical excellence,
//             and responsible research practices.
//           </p>
//         </div>
//       </section>

//       {/* ================= MAIN CONTENT ================= */}
//       <section className="max-w-[1300px] mx-auto px-6 md:px-10 xl:px-20 2xl:px-28 py-20 space-y-24">

//         {/* ------------ COMPANY OVERVIEW ------------ */}
//         <div className="space-y-10">
//           <div className="flex items-center gap-3">
//             <div className="h-1 w-12 bg-gradient-to-r from-bioBlue to-bioGreen rounded-full" />
//             <span className="text-sm font-semibold text-bioBlue tracking-widest uppercase">
//               About Us
//             </span>
//           </div>

//           <h2 className="text-3xl md:text-4xl font-bold text-[#0d2d47]">
//             Our Company
//           </h2>

//           <p className="text-[18px] leading-[1.95] text-gray-700">
//             BioPeptide is a biotechnology-focused research organization built upon precision,
//             transparency, and scientific integrity. We specialize in providing high-value
//             research-grade peptide materials crafted to support laboratory investigations across
//             biological sciences, molecular physiology, biochemistry, and regenerative systems.
//           </p>

//           <p className="text-[18px] leading-[1.95] text-gray-700">
//             Our analytical-first approach ensures uncompromised purity, traceability, and
//             reproducibility—empowering researchers to achieve reliable results and accelerated
//             discovery through well-characterized peptide tools.
//           </p>
//         </div>

//         {/* ------------ MISSION + VISION ------------ */}
//         <div className="grid md:grid-cols-2 gap-10">

//           {/* Mission Card */}
//           <div className="rounded-xl p-8 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//             <h3 className="text-2xl font-semibold text-[#0d2d47] mb-3">
//               Our Mission
//             </h3>
//             <p className="text-[17px] leading-[1.9] text-gray-700">
//               To empower global scientific communities with high-purity peptides backed by
//               advanced analytical documentation—enabling reproducible research,
//               high-precision experimentation, and meaningful scientific progress.
//             </p>
//           </div>

//           {/* Vision Card */}
//           <div className="rounded-xl p-8 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//             <h3 className="text-2xl font-semibold text-[#0d2d47] mb-3">
//               Our Vision
//             </h3>
//             <p className="text-[17px] leading-[1.9] text-gray-700">
//               To become a global benchmark for peptide research materials by championing
//               scientific responsibility, quality excellence, and innovation in molecular sciences.
//             </p>
//           </div>

//         </div>

//         {/* ------------ QUALITY SECTION ------------ */}
//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* Text Block */}
//           <div className="space-y-8">
//             <h3 className="text-3xl font-bold text-[#0d2d47]">
//               Quality • Precision • Research Integrity
//             </h3>

//             <p className="text-[18px] leading-[1.95] text-gray-700">
//               Every BioPeptide product undergoes strict analytical validation including
//               HPLC purity profiling, Mass Spectrometry identity confirmation, stability
//               review, and batch-specific documentation to ensure experimental confidence.
//             </p>

//             <p className="text-[18px] leading-[1.95] text-gray-700">
//               Our labs maintain controlled environments, optimized synthesis workflows,
//               and rigorous quality protocols—delivering peptide materials that meet the
//               demands of modern research methodologies.
//             </p>
//           </div>

//           {/* Image */}
//           <div className="relative h-[340px] md:h-[380px] rounded-xl overflow-hidden shadow-lg">
//             <Image
//               src="/images/aboutus.jpg"
//               alt="Lab Research"
//               fill
//               className="object-cover scale-[1.03] hover:scale-100 transition-transform duration-500"
//             />
//           </div>
//         </div>

//         {/* ------------ WHY CHOOSE US ------------ */}
//         <div className="space-y-10">
//           <h3 className="text-3xl font-bold text-[#0d2d47]">Why Researchers Choose BioPeptide</h3>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

//             {[
//               "High-purity research-grade peptide materials",
//               "Transparent HPLC & Mass Spectrometry documentation",
//               "Reliable batch traceability & reproducibility",
//               "Ethical, research-only compliance framework",
//               "Clean, controlled laboratory processes",
//               "Responsive support for scientific inquiries",
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition"
//               >
//                 <p className="text-[16px] leading-relaxed">{item}</p>
//               </div>
//             ))}

//           </div>
//         </div>

//         {/* ------------ ETHICS SECTION ------------ */}
//         <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-8 rounded-xl shadow-sm space-y-6">
//           <h3 className="text-2xl font-semibold text-[#0d2d47]">
//             Ethical & Responsible Research Commitment
//           </h3>
//           <p className="text-[18px] leading-[1.95] text-gray-700">
//             BioPeptide materials are strictly intended for laboratory research. We provide
//             high-accuracy peptide tools for academic institutions, scientific organizations,
//             and certified research facilities—ensuring all work aligns with ethical,
//             regulatory, and scientific integrity standards.
//           </p>
//         </div>

//       </section>
//     </main>
//     <Footer/>
//     </>
//   );
// }
