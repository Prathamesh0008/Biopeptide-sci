//peptides\components\Hero.jsx
"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

/* ================= STATIC DATA ================= */

const banners = [
  "/images/bannerhero1.jpg",
  "/images/ban2.jpg",
  "/images/bannerhero2.jpg",
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
      <div className="relative w-full h-[450px] md:h-[550px]">

        {/* ========== BACKGROUND SLIDES ========== */}
        {banners.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="BioPeptide Research Banner"
            fill
            priority={index === 0}
            className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/20" />

        {/* ========== CONTENT CARD ========== */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="
           bg-white/45 backdrop-blur-sm
            rounded-3xl shadow-xl
        px-8 py-1 md:py-1.5
            w-[90%] max-w-4xl
          ">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-5 items-center">

              {/* ===== TEXT ===== */}
              <div className="relative z-20 text-left w-full">
                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900">
                  {activeBox.title}
                </h2>

                <p className="text-sm md:text-base lg:text-lg text-gray-700 mt-2 mb-4">
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
                  h-[260px] sm:h-[320px] md:h-[420px] lg:h-[480px]
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
                    object-contain
                    scale-[1.3]
                    sm:scale-[1.5]
                    md:scale-[1.8]
                    lg:scale-[2]
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
