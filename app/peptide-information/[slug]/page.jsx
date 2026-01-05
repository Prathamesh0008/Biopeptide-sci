//peptides\app\peptide-information\[slug]\page.jsx
"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useParams } from "next/navigation"; // ✅ IMPORTANT
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";

export default function ArticleDetailPage() {
  // ✅ Correct way in Client Components
  const { slug } = useParams();

  const { translations, loading } = useLanguage();
  if (loading) return null;

  const article = translations?.peptideInfo?.articles?.[slug];

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {translations.peptideInfo.page.notFound}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <PeptideInfoSubNav />
      <Breadcrumbs />

      <main className="min-h-screen bg-white text-gray-800">
        {/* HERO */}
        <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
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
        </div>

        {/* BODY */}
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 space-y-6">
          <div className="text-[17px] text-gray-700 leading-[1.9] space-y-4">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <a
            href="/peptide-information"
            className="inline-block mt-10 text-bioBlue font-semibold hover:underline"
          >
            {translations.peptideInfo.page.back}
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}












// import Image from "next/image";
// import { INFO_ARTICLES } from "@/data/information";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../../components/Breadcrumbs";

// export default async function ArticleDetailPage({ params }) {
//   const { slug } = await params; // <-- NOW VALID because function is async

//   const article = INFO_ARTICLES.find((a) => a.id === slug);

//   if (!article) {
//     return (
//       <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//         Article Not Found
//       </main>
//     );
//   }

//   return (
//     <>
//     <Navbar/>
//     <Breadcrumbs/>
//     <main className="min-h-screen bg-white text-gray-800">
//       {/* HERO */}
//       <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
//         <Image
//           src={article.img}
//           alt={article.title}
//           fill
//           className="object-cover brightness-[0.45]"
//         />

//         <div className="absolute inset-0 flex items-center justify-center bg-black/25">
//           <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center px-6">
//             {article.title}
//           </h1>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="max-w-4xl mx-auto px-6 md:px-10 py-14 space-y-6">
//         <p className="text-gray-500 text-sm">{article.date}</p>

//         <div className="text-[17px] text-gray-700 leading-[1.9] space-y-4">
//           {article.content.map((p, i) => (
//             <p key={i}>{p}</p>
//           ))}
//         </div>

//         <a
//           href="/peptide-information"
//           className="inline-block mt-10 text-bioBlue font-semibold hover:underline"
//         >
//           ← Back to Peptide Information
//         </a>
//       </div>
//     </main>
//     <Footer/>
//     </>
//   );
// }
