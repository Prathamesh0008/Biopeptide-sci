// peptides/components/Hero.jsx
"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

const banners = [
  "/images/banner1.1.jpg",
  "/images/bannerhero1.jpg",
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
  "/images/combo3.png",
];

export default function Hero() {
  const { translations, loading } = useLanguage();
  const [current, setCurrent] = useState(0);

  const hero = translations?.home?.hero;

  // ✅ SUPPORT BOTH FORMATS (CRITICAL)
  const whiteBoxes = useMemo(() => {
    if (!hero) return [];

    // NEW FORMAT: hero.slides[]
    if (Array.isArray(hero.slides)) {
      return hero.slides.map((slide, index) => ({
        title: slide.title,
        subtitle: slide.subtitle,
        button: slide.button,
        link: slideLinks[index],
        image: slideImages[index],
      }));
    }

    // OLD FORMAT: hero.title, title2, title3
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
        image: "/images/combo3.png",
      },
    ].filter(Boolean);
  }, [hero]);

  // 🔁 ROTATION
  useEffect(() => {
    if (loading || whiteBoxes.length < 2) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % whiteBoxes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [loading, whiteBoxes.length]);

  // 🔒 RESET ON LANGUAGE CHANGE
  useEffect(() => {
    if (whiteBoxes.length > 0) setCurrent(0);
  }, [whiteBoxes.length]);

  if (whiteBoxes.length === 0) {
    return (
      <section className="relative border-b border-gray-200">
        <div className="w-full h-[420px] md:h-[520px] bg-gray-100" />
      </section>
    );
  }

  const activeBox = whiteBoxes[current];

  return (
    <section className="relative border-b border-gray-200 overflow-hidden">
      <div className="relative w-full h-[420px] md:h-[520px]">

        {/* BACKGROUND */}
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

        {/* CARD */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/55 backdrop-blur-md rounded-3xl shadow-xl px-5 py-3 sm:px-7 sm:py-5 md:px-12 md:py-7 w-[92%] max-w-4xl">
            <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 items-center">

              {/* TEXT */}
              <div className="relative z-20 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {activeBox.title}
                </h2>

                <p className="text-sm md:text-base text-gray-600 mt-3 mb-6">
                  {activeBox.subtitle}
                </p>

                <Link
                  href={activeBox.link}
                  className="inline-block px-7 py-2.5 rounded-full text-sm font-semibold text-white bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)] hover:opacity-90"
                >
                  {activeBox.button}
                </Link>
              </div>

              {/* IMAGE */}
              <div className="relative z-10 w-full max-w-[310px] h-[160px] sm:h-[220px] md:h-[340px] flex justify-center md:justify-end">
                <Image
                  src={activeBox.image}
                  alt="BioPeptide Product"
                  fill
                  className="object-contain scale-190 md:scale-250 -translate-y-1"
                  priority
                />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}














