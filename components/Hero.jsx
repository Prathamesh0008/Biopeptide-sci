//peptides/components/Hero.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // ⭐ FIX: import router

export default function Hero() {
  const router = useRouter(); // ⭐ FIX: define router

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
          <div className="
              bg-white/80 backdrop-blur-md rounded-3xl shadow-lg
              px-5 py-6               /* mobile padding */
              sm:px-8 sm:py-8         /* small screens */
              md:px-10 md:py-10       /* desktop */
              w-[90%] max-w-xl        /* responsive width */
              text-center
            ">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bioGreen mb-1">
              BioPeptide Research Capsules
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Research Peptide Capsules
            </h2>

            <p className="text-sm text-gray-600 mt-3 mb-5">
              High-purity BioPeptide capsules designed for scientific research.
            </p>

          <button
  onClick={() => router.push("/peptide-information")}
  className="
    px-6 py-2 rounded-full
    text-sm font-semibold text-white
    bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
    hover:brightness-110
    transition
  "
>
  Learn More
</button>



          </div>
        </div>
      </div>
    </section>
  );
}
