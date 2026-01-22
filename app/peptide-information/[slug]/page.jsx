"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useParams } from "next/navigation"; // ✅ IMPORTANT
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
import Loader from "@/components/Loader";
import PeptideInfoLeftSidebar from "@/components/PeptideInfoLeftSidebar"; // Import the Left Sidebar

export default function ArticleDetailPage() {
  const { slug } = useParams();

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

  const article = translations?.peptideInfo?.articles?.[slug];
  console.log(article);

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {translations.peptideInfo.page.notFound}
      </main>
    );
  }

  // Prepare the sidebar items (same as in PeptideInformationPage)
  const sidebarItems = Object.entries(translations.peptideInfo.articles).map(([id, a]) => ({
    id,
    title: a.title,
  }));

  return (
    <>
      <Navbar />
      <PeptideInfoSubNav />
      <Breadcrumbs />

      <main className="min-h-screen bg-white text-gray-800 ">
        <div className="max-w-[1180px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT — SIDEBAR */}
            <div className="order-2 lg:order-1 lg:col-span-3">
              <PeptideInfoLeftSidebar
                title="Peptide Glossary"
                items={sidebarItems}
                ctaText="All Peptides"
                ctaHref="/all-peptides"
              />
            </div>

            {/* RIGHT — CONTENT */}
            <section className="order-1 lg:order-2 lg:col-span-9 space-y-4 px-0">
            {/* HERO */}
<div className="relative w-full h-[230px] md:h-[200px] overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center ">
    <h1 className="text-4xl md:text-5xl font-bold text-bioBlue drop-shadow-lg text-center px-6">
      {article.title}
    </h1>
  </div>
</div>
              {/* BODY */}
              <div className="text-[16px] text-gray-700 leading-[1.5] space-y-3">
                {article.content.map((p, i) => (
                  <p key={i}>{p}</p> // No border on content paragraphs
                ))}

                {/* Render Sections */}
                {article.sections &&
                  article.sections.map((section, idx) => (
                    <div key={idx} className="mt-6 border-b pb-4">
                      <h2 className="text-lg font-semibold">{section.heading}</h2>

                      {section.content && section.content.map((para, i) => (
                        <p key={i} className="mt-2">{para}</p> // No border on content paragraphs
                      ))}

                      {/* Render Subsections with Bullet Points */}
                      {section.subSections &&
                        section.subSections.map((subSection, idx) => (
                          <div key={idx} className="mt-4 border-b pb-4">
                            <h3 className="text-md font-semibold">{subSection.heading}</h3>

                            {subSection.bulletPoints && (
                              <ul className="list-disc pl-6 space-y-1">
                                {subSection.bulletPoints.map((point, i) => (
                                  <li key={i} className="text-gray-600">{point}</li>
                                ))}
                              </ul>
                            )}

                            {subSection.content && subSection.content.map((para, i) => (
                              <p key={i} className="mt-2">{para}</p> // No border on content paragraphs
                            ))}
                          </div>
                        ))}
                    </div>
                  ))}

                {/* Additional Content (New Sections) */}
                {article.additionalContent && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold">{article.additionalContent.heading}</h2>
                    {article.additionalContent.paragraphs.map((para, idx) => (
                      <p key={idx} className="mt-2">{para}</p> // No border on additional content paragraphs
                    ))}

                    {article.additionalContent.subSections && article.additionalContent.subSections.map((section, idx) => (
                      <div key={idx} className="mt-4 border-b pb-4">
                        <h3 className="text-md font-semibold">{section.heading}</h3>
                        {section.content && section.content.map((para, idx) => (
                          <p key={idx} className="mt-2">{para}</p> // No border on content paragraphs
                        ))}
                        {section.bulletPoints && (
                          <ul className="list-disc pl-6 space-y-1">
                            {section.bulletPoints.map((point, idx) => (
                              <li key={idx} className="text-gray-600">{point}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* FAQ Section */}
                {article.faqSection && (
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold">{article.faqSection.heading}</h2>
                    {article.faqSection.faqs.map((faq, idx) => (
                      <div key={idx} className="mt-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* FAQ Section (From Sections) */}
                {article.sections?.find((sec) => sec.heading === "FAQ’s") && (
                  <div className="mt-8 border-b pb-4">
                    <h2 className="text-lg font-semibold">FAQ’s</h2>
                    {article.sections
                      .find((sec) => sec.heading === "FAQ’s")
                      .faqs.map((faq, idx) => (
                        <div key={idx} className="mt-2 border-b pb-4">
                          <h3 className="font-semibold">{faq.question}</h3>
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <a
                href="/peptide-information"
                className="inline-block mt-8 text-bioBlue font-semibold hover:underline"
              >
                {translations.peptideInfo.page.back}
              </a>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}











// "use client";

// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { useParams } from "next/navigation"; // ✅ IMPORTANT
// import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
// import Loader from "@/components/Loader";
// import PeptideInfoLeftSidebar from "@/components/PeptideInfoLeftSidebar"; // Import the Left Sidebar

// export default function ArticleDetailPage() {
//   const { slug } = useParams();

//   const { translations, loading } = useLanguage();
//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <main className="min-h-screen bg-white flex items-center justify-center">
//           <Loader />
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   const article = translations?.peptideInfo?.articles?.[slug];
//   console.log(article);

//   if (!article) {
//     return (
//       <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//         {translations.peptideInfo.page.notFound}
//       </main>
//     );
//   }

//   // Prepare the sidebar items (same as in PeptideInformationPage)
//   const sidebarItems = Object.entries(translations.peptideInfo.articles).map(([id, a]) => ({
//     id,
//     title: a.title,
//   }));

//   return (
//     <>
//       <Navbar />
//       <PeptideInfoSubNav />
//       <Breadcrumbs />

//       <main className="min-h-screen bg-white text-gray-800 ">
//         <div className="max-w-[1180px] mx-auto px-6 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
//             {/* LEFT — SIDEBAR */}
//             <div className="order-2 lg:order-1 lg:col-span-3">
//               <PeptideInfoLeftSidebar
//                 title="Peptide Glossary"
//                 items={sidebarItems}
//                 ctaText="All Peptides"
//                 ctaHref="/all-peptides"
//               />
//             </div>

//             {/* RIGHT — CONTENT */}
//             <section className="order-1 lg:order-2 lg:col-span-9 space-y-4 px-0">
//               {/* HERO */}
//               <div className="relative w-full  overflow-hidden">
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/25">
//                   <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center px-6">
//                     {article.title}
//                   </h1>
//                 </div>
//               </div>

//               {/* BODY */}
//               <div className="text-[16px] text-gray-700 leading-[1.5] space-y-3">
//                 {article.content.map((p, i) => (
//                   <p key={i}>{p}</p> // No border on content paragraphs
//                 ))}

//                 {/* Render Sections */}
//                 {article.sections &&
//                   article.sections.map((section, idx) => (
//                     <div key={idx} className="mt-6 border-b pb-4">
//                       <h2 className="text-lg font-semibold">{section.heading}</h2>

//                       {section.content && section.content.map((para, i) => (
//                         <p key={i} className="mt-2">{para}</p> // No border on content paragraphs
//                       ))}

//                       {/* Render Subsections with Bullet Points */}
//                       {section.subSections &&
//                         section.subSections.map((subSection, idx) => (
//                           <div key={idx} className="mt-4 border-b pb-4">
//                             <h3 className="text-md font-semibold">{subSection.heading}</h3>

//                             {subSection.bulletPoints && (
//                               <ul className="list-disc pl-6 space-y-1">
//                                 {subSection.bulletPoints.map((point, i) => (
//                                   <li key={i} className="text-gray-600">{point}</li>
//                                 ))}
//                               </ul>
//                             )}

//                             {subSection.content && subSection.content.map((para, i) => (
//                               <p key={i} className="mt-2">{para}</p> // No border on content paragraphs
//                             ))}
//                           </div>
//                         ))}
//                     </div>
//                   ))}

//                 {/* Additional Content (New Sections) */}
//                 {article.additionalContent && (
//                   <div className="mt-6">
//                     <h2 className="text-lg font-semibold">{article.additionalContent.heading}</h2>
//                     {article.additionalContent.paragraphs.map((para, idx) => (
//                       <p key={idx} className="mt-2">{para}</p> // No border on additional content paragraphs
//                     ))}

//                     {article.additionalContent.subSections && article.additionalContent.subSections.map((section, idx) => (
//                       <div key={idx} className="mt-4 border-b pb-4">
//                         <h3 className="text-md font-semibold">{section.heading}</h3>
//                         {section.content && section.content.map((para, idx) => (
//                           <p key={idx} className="mt-2">{para}</p> // No border on content paragraphs
//                         ))}
//                         {section.bulletPoints && (
//                           <ul className="list-disc pl-6 space-y-1">
//                             {section.bulletPoints.map((point, idx) => (
//                               <li key={idx} className="text-gray-600">{point}</li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* FAQ Section */}
//                 {article.faqSection && (
//                   <div className="mt-8">
//                     <h2 className="text-lg font-semibold">{article.faqSection.heading}</h2>
//                     {article.faqSection.faqs.map((faq, idx) => (
//                       <div key={idx} className="mt-2">
//                         <h3 className="font-semibold">{faq.question}</h3>
//                         <p className="text-gray-700">{faq.answer}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* FAQ Section (From Sections) */}
//                 {article.sections?.find((sec) => sec.heading === "FAQ’s") && (
//                   <div className="mt-8 border-b pb-4">
//                     <h2 className="text-lg font-semibold">FAQ’s</h2>
//                     {article.sections
//                       .find((sec) => sec.heading === "FAQ’s")
//                       .faqs.map((faq, idx) => (
//                         <div key={idx} className="mt-2 border-b pb-4">
//                           <h3 className="font-semibold">{faq.question}</h3>
//                           <p className="text-gray-700">{faq.answer}</p>
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               <a
//                 href="/peptide-information"
//                 className="inline-block mt-8 text-bioBlue font-semibold hover:underline"
//               >
//                 {translations.peptideInfo.page.back}
//               </a>
//             </section>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }





// //peptides\app\peptide-information\[slug]\page.jsx
// "use client";

// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { useParams } from "next/navigation"; // ✅ IMPORTANT
// import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
// import Loader from "@/components/Loader";
// import PeptideInfoLeftSidebar from "@/components/PeptideInfoLeftSidebar"; // Import the Left Sidebar

// export default function ArticleDetailPage() {
//   const { slug } = useParams();

//   const { translations, loading } = useLanguage();
//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <main className="min-h-screen bg-white flex items-center justify-center">
//           <Loader />
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   const article = translations?.peptideInfo?.articles?.[slug];
// console.log(article); 

//   if (!article) {
//     return (
//       <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//         {translations.peptideInfo.page.notFound}
//       </main>
//     );
//   }

//   // Prepare the sidebar items (same as in PeptideInformationPage)
//   const sidebarItems = Object.entries(translations.peptideInfo.articles).map(([id, a]) => ({
//     id,
//     title: a.title,
//   }));

//   return (
//     <>
//       <Navbar />
//       <PeptideInfoSubNav />
//       <Breadcrumbs />

//       <main className="min-h-screen bg-white text-gray-800 ">
//         <div className="max-w-[1180px] mx-auto px-6 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
//             {/* LEFT — SIDEBAR */}
//             <div className="order-2 lg:order-1 lg:col-span-3">
//               <PeptideInfoLeftSidebar
//                 title="Peptide Glossary"
//                 items={sidebarItems}
//                 ctaText="All Peptides"
//                 ctaHref="/all-peptides"
//               />
//             </div>

//             {/* RIGHT — CONTENT */}
//             <section className="order-1 lg:order-2 lg:col-span-9 space-y-8 px-0">
              {/* HERO */}
              {/* <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
                <Image
                  src="/peptide-info/banner.jpg"
                  alt={article.title}
                  fill
                  className="object-cover brightness-[0.45]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center px-6">
                    {article.title}
                  </h1>
                </div>
              </div> */}


//                <div className="relative w-full  overflow-hidden">
                
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/25">
//                   <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center px-6">
//                     {article.title}
//                   </h1>
//                 </div>
//               </div>

//               {/* BODY */}
//               <div className="text-[17px] text-gray-700 leading-[1.9] space-y-4">
//                 {article.content.map((p, i) => (
//                   <p key={i}>{p}</p> // No border on content paragraphs
//                 ))}

//                 {/* Render Sections */}
//                 {article.sections &&
//                   article.sections.map((section, idx) => (
//                     <div key={idx} className="mt-8 border-b pb-6">
//                       <h2 className="text-xl font-semibold">{section.heading}</h2>

//                       {section.content && section.content.map((para, i) => (
//                         <p key={i} className="mt-2">{para}</p> // No border on content paragraphs
//                       ))}

//                       {/* Render Subsections with Bullet Points */}
//                       {section.subSections &&
//                         section.subSections.map((subSection, idx) => (
//                           <div key={idx} className="mt-6 border-b pb-6">
//                             <h3 className="text-lg font-semibold">{subSection.heading}</h3>

//                             {subSection.bulletPoints && (
//                               <ul className="list-disc pl-6 space-y-2">
//                                 {subSection.bulletPoints.map((point, i) => (
//                                   <li key={i} className="text-gray-600">{point}</li>
//                                 ))}
//                               </ul>
//                             )}

//                             {subSection.content && subSection.content.map((para, i) => (
//                               <p key={i} className="mt-2">{para}</p> // No border on content paragraphs
//                             ))}
//                           </div>
//                         ))}
//                     </div>
//                   ))}

//                 {/* Additional Content (New Sections) */}
//                 {article.additionalContent && (
//                   <div className="mt-8">
//                     <h2 className="text-xl font-semibold">{article.additionalContent.heading}</h2>
//                     {article.additionalContent.paragraphs.map((para, idx) => (
//                       <p key={idx} className="mt-2">{para}</p> // No border on additional content paragraphs
//                     ))}

//                     {article.additionalContent.subSections && article.additionalContent.subSections.map((section, idx) => (
//                       <div key={idx} className="mt-6 border-b pb-6">
//                         <h3 className="text-lg font-semibold">{section.heading}</h3>
//                         {section.content && section.content.map((para, idx) => (
//                           <p key={idx} className="mt-2">{para}</p> // No border on content paragraphs
//                         ))}
//                         {section.bulletPoints && (
//                           <ul className="list-disc pl-6 space-y-2">
//                             {section.bulletPoints.map((point, idx) => (
//                               <li key={idx} className="text-gray-600">{point}</li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* FAQ Section */}
//                 {article.faqSection && (
//                   <div className="mt-10 ">
//                     <h2 className="text-xl font-semibold">{article.faqSection.heading}</h2>
//                     {article.faqSection.faqs.map((faq, idx) => (
//                       <div key={idx} className="mt-4 ">     
//                         <h3 className="font-semibold">{faq.question}</h3>
//                         <p className="text-gray-700">{faq.answer}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* FAQ Section (From Sections) */}
//                 {article.sections?.find((sec) => sec.heading === "FAQ’s") && (
//                   <div className="mt-10 border-b pb-6">
//                     <h2 className="text-xl font-semibold">FAQ’s</h2>
//                     {article.sections
//                       .find((sec) => sec.heading === "FAQ’s")
//                       .faqs.map((faq, idx) => (
//                         <div key={idx} className="mt-4 border-b pb-6">
//                           <h3 className="font-semibold">{faq.question}</h3>
//                           <p className="text-gray-700">{faq.answer}</p>
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               <a
//                 href="/peptide-information"
//                 className="inline-block mt-10 text-bioBlue font-semibold hover:underline"
//               >
//                 {translations.peptideInfo.page.back}
//               </a>
//             </section>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }










