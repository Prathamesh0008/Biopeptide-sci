//peptides\components\Hero.jsx
"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

/* ================= STATIC DATA ================= */

const banners = [
  "/images/bannerhero1.jpg",
  "/images/bannerhero1.jpg",
  "/images/bannerhero1.jpg",
];

const slideLinks = [
  "/peptide-information",
  "/all-peptides",
  "/bundle-save",
];

const slideImages = [
  "/images/combo.png",
  "/images/combo2.png",
  "/images/combo.png",
];

/* ================= COMPONENT ================= */

export default function Hero() {
  const { translations, loading } = useLanguage();
  const [current, setCurrent] = useState(0);

  const hero = translations?.home?.hero;

  /* ===== SLIDES (NEW + OLD FORMAT SUPPORT) ===== */
  const whiteBoxes = useMemo(() => {
    if (!hero) return [];

    // NEW FORMAT
    if (Array.isArray(hero.slides)) {
      return hero.slides.map((slide, index) => ({
        title: slide.title,
        subtitle: slide.subtitle,
        button: slide.button,
        link: slideLinks[index],
        image: slideImages[index],
      }));
    }

    // OLD FORMAT (BACKWARD COMPATIBLE)
    return [
      {
        title: hero.title,
        subtitle: hero.subtitle,
        button: hero.button,
        link: "/peptide-information",
        image: "/images/combo.png",
      },
      {
        title: hero.title2,
        subtitle: hero.subtitle2,
        button: hero.button2,
        link: "/all-peptides",
        image: "/images/combo2.png",
      },
      {
        title: hero.title3,
        subtitle: hero.subtitle3,
        button: hero.button3,
        link: "/bundle-save",
        image: "/images/combo.png",
      },
    ].filter(Boolean);
  }, [hero]);

  /* ===== AUTO ROTATION ===== */
  useEffect(() => {
    if (loading || whiteBoxes.length < 2) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % whiteBoxes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [loading, whiteBoxes.length]);

  /* ===== RESET ON LANGUAGE CHANGE ===== */
  useEffect(() => {
    if (whiteBoxes.length > 0) setCurrent(0);
  }, [whiteBoxes.length]);

  if (whiteBoxes.length === 0) {
    return (
      <section className="relative border-b border-gray-200">
        <div className="w-full h-[450px] md:h-[550px] bg-gray-100" />
      </section>
    );
  }

  const activeBox = whiteBoxes[current];

  return (
    <section className="relative border-b border-gray-200 overflow-hidden">
     <div className="relative w-full min-h-[380px] md:min-h-[450px] py-10">


        {/* ========== BACKGROUND SLIDES ========== */}
        {banners.map((src, index) => (
          <Image
         key={index}
            src={src}
            alt="BioPeptide Research Banner"
            fill
            priority={index === 0}
            className={`absolute inset-0 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/20" />

        {/* ========== CONTENT CARD ========== */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="
  bg-white/60 backdrop-blur-md
  rounded-2xl shadow-lg
  px-4 py-3 md:px-6 md:py-4
  w-[92%] max-w-3xl
">

            <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4 items-center">

              {/* ===== TEXT ===== */}
              <div className="relative z-20 text-left w-full">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  {activeBox.title}
                </h2>

                <p className="text-xs md:text-sm text-gray-700 mt-1.5 mb-3">
                  {activeBox.subtitle}
                </p>

                <Link
                  href={activeBox.link}
                  className="
                    inline-block
                   px-7 py-2 md:px-8 md:py-2.5
                    rounded-md
                    text-sm md:text-base font-semibold
                    text-white
                    bg-gradient-to-r from-[#145b2f] via-[#559f45] to-[#1a497c]
                    transition-all duration-300
                    hover:opacity-90
                  "
                >
                  {activeBox.button}
                </Link>
              </div>

              {/* ===== IMAGE (EXTRA BIG) ===== */}
              <div
                className="
                  relative z-10
                  w-full
               h-[150px] sm:h-[180px] md:h-[220px] lg:h-[260px]
                  flex justify-center items-center
                  overflow-visible
                  order-first md:order-last
                "
              >
                <Image
                  src={activeBox.image}
                  alt="BioPeptide Product"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 700px"
                  className="
                    object-cover
                    scale-[1.15]
sm:scale-[1.25]
md:scale-[1.4]
lg:scale-[1.55]

                    drop-shadow-2xl
                    transition-transform duration-500
                  "
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
