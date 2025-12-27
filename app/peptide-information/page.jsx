//peptides\app\peptide-information\page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { INFO_ARTICLES } from "@/data/information";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function PeptideInformationPage() {
  return (
    <>
    <Navbar/>
    <Breadcrumbs/>
    <main className="min-h-screen bg-white text-gray-800">

      {/* HERO BANNER */}
      <section className="relative w-full h-[260px] md:h-[320px] overflow-hidden">
        <Image
          src="/peptide-info/banner.jpg"
          alt="Peptide Info Banner"
          fill
          className="object-cover brightness-[0.55]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl">
            Peptide Information
          </h1>
          <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">
            Research-focused knowledge, peptide science, and educational insights.
          </p>
        </div>
      </section>

      {/* MAIN BODY */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-4 gap-14">

        {/* LEFT SIDEBAR */}
<aside className="space-y-10 lg:sticky lg:top-32 lg:h-max">

  {/* GLOSSARY LINKS */}
  <div>
    <h3 className="text-xl font-semibold text-bioBlue mb-3">Peptide Glossary</h3>

    <ul className="space-y-2 text-gray-700 text-sm">
      {INFO_ARTICLES.map(a => (
        <li key={a.id}>
          <Link
            href={`/peptide-information/${a.id}`}
            className="hover:text-bioBlue transition"
          >
            {a.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>

</aside>


        {/* RIGHT CONTENT — ALL CARDS SAME LAYOUT */}
        <div className="lg:col-span-3 space-y-10">

          {INFO_ARTICLES.map(a => (
            <Link
              key={a.id}
              href={`/peptide-information/${a.id}`}
              className="group block rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-xl transition"
            >
              <div className="grid md:grid-cols-2 gap-6">

                {/* Left Image */}
                <div className="relative h-48 md:h-56">
                  <Image
                    src={a.img}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Right Text */}
                <div className="p-6 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-[#0d2d47] group-hover:text-bioBlue transition">
                    {a.title}
                  </h2>

                  <p className="mt-3 text-gray-700 text-[15px] line-clamp-3">
                    {a.preview}
                  </p>

                  <span className="text-bioBlue mt-4 inline-block font-semibold">
                    Read More →
                  </span>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </main>
    <Footer/>
    </>
  );
}
