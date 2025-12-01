import Image from "next/image";
import { INFO_ARTICLES } from "@/data/information";

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params; // <-- NOW VALID because function is async

  const article = INFO_ARTICLES.find((a) => a.id === slug);

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Article Not Found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
        <Image
          src={article.img}
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
        <p className="text-gray-500 text-sm">{article.date}</p>

        <div className="text-[17px] text-gray-700 leading-[1.9] space-y-4">
          {article.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <a
          href="/peptide-information"
          className="inline-block mt-10 text-bioBlue font-semibold hover:underline"
        >
          ← Back to Peptide Information
        </a>
      </div>
    </main>
  );
}
