//Biopeptide-sci\app\research-videos\page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { PlayCircle, Video, Calendar, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DrawerProducts from "@/components/DrawerProducts";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function ResearchVideosPage() {
  const { translations, loading } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

const t = (path, fallback = "") => {
  try {
    const value = path
      .split(".")
      .reduce((obj, key) => obj?.[key], translations?.researchVideos || {});
    return value || fallback;
  } catch {
    return fallback;
  }
};

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

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      {/* DRAWER BUTTON */}
      {/* <button
        onClick={() => setDrawerOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
          bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
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
      </button> */}

      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <main className="bg-white text-gray-800">
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-20 py-16">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 p-4 rounded-full">
                <PlayCircle className="w-16 h-16 text-bioBlue" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0d2d47] mb-4">
             {t("title")}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#52c3c6] to-[#0978a7] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Coming Soon Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 - Educational Content */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <Video className="w-8 h-8 text-bioBlue" />
              </div>
              <h3 className="text-xl font-bold text-[#0d2d47] mb-3">
              {t("educational.title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("educational.description")}
              </p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-bioBlue/10 text-bioBlue text-xs font-semibold rounded-full">
                 {t("comingSoon")}
                </span>
              </div>
            </div>

            {/* Card 2 - Webinars */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <Calendar className="w-8 h-8 text-bioBlue" />
              </div>
              <h3 className="text-xl font-bold text-[#0d2d47] mb-3">
              {t("webinars.title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("webinars.description")}
              </p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-bioBlue/10 text-bioBlue text-xs font-semibold rounded-full">
                  {t("comingSoon") || "Coming Soon"}
                </span>
              </div>
            </div>

            {/* Card 3 - Updates */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <Bell className="w-8 h-8 text-bioBlue" />
              </div>
              <h3 className="text-xl font-bold text-[#0d2d47] mb-3">
               {t("updates.title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("updates.description")}
              </p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-bioBlue/10 text-bioBlue text-xs font-semibold rounded-full">
                  {t("comingSoon")}
                </span>
              </div>
            </div>
          </div>

          {/* Notification Section */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-bioBlue/5 to-bioGreen/5 border border-bioBlue/20 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[#0d2d47] mb-3">
                {t("notification.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("notification.description")}
              </p>
              
              {/* Email Subscription Form */}
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                 placeholder={t("notification.placeholder")}
                  className="
                    flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm
                    focus:ring-2 focus:ring-bioBlue focus:border-transparent outline-none
                  "
                />
                <button
                  type="submit"
                  className="
                    px-6 py-3 rounded-lg text-white font-semibold text-sm
                    bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
                    hover:opacity-90 transition-all shadow-md
                    cursor-pointer whitespace-nowrap
                  "
                >
                  {t("notification.button")}
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                {t("notification.note")}
              </p>
            </div>
          </div>

          {/* Explore Products Button */}
          <div className="text-center mt-12">
            <a
              href="/all-peptides"
              className="
                inline-block px-8 py-3 rounded-lg text-white font-semibold
                bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
                hover:opacity-90 transition-all shadow-md
                cursor-pointer
              "
            >
              {t("exploreButton")}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}