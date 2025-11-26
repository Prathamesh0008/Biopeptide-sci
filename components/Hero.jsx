//peptides\components\Hero.jsx
"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative border-b border-gray-200">
      <div className="relative w-full h-[340px] md:h-[420px]">
        <Image
          src="/images/hero.jpg"
          alt="BioPeptide Research"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl px-10 py-10 max-w-xl shadow-lg">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bioGreen mb-1">
              BioPeptide Research Capsules
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Research Peptide Capsules
            </h2>
            <p className="text-sm text-gray-600 mt-3 mb-5">
              High-purity BioPeptide capsules designed for scientific research.
            </p>

            <button className="px-6 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-bioBlue to-bioGreen text-white hover:opacity-90 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
