// // peptides/app/about/page.jsx
// "use client";

// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext";
// import DrawerProducts from "@/components/DrawerProducts";
// import { useState, useCallback, useMemo } from "react";

// const countryImages = [
//   "/bg/germanybg.png",
//   "/bg/francebg.png",
//   "/bg/netherlandsbg.png",
//   "/bg/italybg.png",
//   "/bg/spainbg.png",
// ];

// export default function AboutPage() {
//   const { translations, loading } = useLanguage();
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const t = useCallback(
//   (path) => {
//     try {
//       return path
//         .split(".")
//         .reduce((obj, key) => obj?.[key], translations?.about || {});
//     } catch {
//       return "";
//     }
//   },
//   [translations]
// );

// const about = useMemo(() => translations?.about || {}, [translations]);

// const countries = useMemo(
//   () => Array.isArray(about?.companyOverview?.countries)
//     ? about.companyOverview.countries
//     : [],
//   [about]
// );

// if (loading) {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen" />
//       <Footer />
//     </>
//   );
// }


//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs />

//       {/* DRAWER BUTTON */}
//       <button
//         onClick={() => setDrawerOpen(true)}
//         className="
//           fixed right-0 top-1/2 -translate-y-1/2 z-50
//           flex items-center justify-center
//           bg-gradient-to-b from-bioBlue to-bioGreen
//           text-white shadow-lg
//           cursor-pointer
//           h-36 w-10 rounded-l-xl
//         "
//       >
//         <span
//           className="
//             text-xs font-semibold tracking-widest
//             [writing-mode:vertical-rl]
//           "
//         >
//           Product List
//         </span>
//       </button>

//       {/* DRAWER (PAGE LEVEL ONLY) */}
//       <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

//       <main className="min-h-screen bg-white text-gray-800">
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

//             {/* <p>{t("companyOverview.description1")}</p>
//             <p>{t("companyOverview.description2")}</p> */}

//   {countries.map((country, i) => (

//     <div
//       key={i}
//       className="grid lg:grid-cols-2 gap-12 items-center pt-16"
//     >
//       {/* TEXT */}
//       <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
//         <h3 className="text-2xl font-bold text-[#0d2d47]">
//           {country.heading}
//         </h3>

//         <p className="text-lg font-medium text-bioBlue">
//           {country.subheading}
//         </p>

//         {country.paragraphs.map((para, idx) => (
//           <p key={idx}>{para}</p>
//         ))}

//         <h4 className="text-lg font-semibold mt-4">
//           {country.bulletHeading}
//         </h4>

//         <ul className="list-disc list-inside space-y-1">
//           {country.bullets.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//       </div>

//       {/* IMAGE */}
//  <div
//   className={`relative w-full h-[360px] rounded-xl overflow-hidden flex items-center justify-center ${
//     i % 2 !== 0 ? "lg:order-1" : ""
//   }`}
// >

// {countryImages[i] && (
//  <Image
//   src={countryImages[i]}
//   alt={country.heading}
//   fill
//   unoptimized
//   className="object-contain"
//   priority={i === 0}
// />
// )}

// </div>
//     </div>
//   ))}
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
//              {Array.isArray(t("whyChooseUs.features")) &&
//   t("whyChooseUs.features").map((item, i) => (
//     <div key={i} className="p-6 border rounded-xl">
//       {item}
//     </div>
//   ))}
//   </div>
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
























// peptides/app/about/page.jsx
"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import DrawerProducts from "@/components/DrawerProducts";
import { useState } from "react";

const countryImages = [
  "/bg/germanybg.png",
  "/bg/francebg.png",
  "/bg/netherlandsbg.png",
  "/bg/italybg.png",
  "/bg/spainbg.png",
];

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

            {/* <p>{t("companyOverview.description1")}</p>
            <p>{t("companyOverview.description2")}</p> */}

     {Array.isArray(t("companyOverview.countries")) &&
  t("companyOverview.countries").map((country, i) => (
    <div
      key={i}
      className="grid lg:grid-cols-2 gap-12 items-center pt-16"
    >
      {/* TEXT */}
      <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
        <h3 className="text-2xl font-bold text-[#0d2d47]">
          {country.heading}
        </h3>

        <p className="text-lg font-medium text-bioBlue">
          {country.subheading}
        </p>

        {country.paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}

        <h4 className="text-lg font-semibold mt-4">
          {country.bulletHeading}
        </h4>

        <ul className="list-disc list-inside space-y-1">
          {country.bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* IMAGE */}
      <div
  className={`relative aspect-[16/9] w-full rounded-xl overflow-hidden flex items-center justify-center ${
    i % 2 !== 0 ? "lg:order-1" : ""
  }`}
>
  <Image
    src={countryImages[i]}
    alt={country.heading}
    fill
    sizes="(max-width: 1024px) 100vw, 50vw"
    className="object-contain"
  />
</div>

    </div>
  ))}


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
             {Array.isArray(t("whyChooseUs.features")) &&
  t("whyChooseUs.features").map((item, i) => (
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













