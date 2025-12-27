




//peptides\app\contact\page.jsx
"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";




export default function ContactPage() {
  const { translations, loading } = useLanguage();

  const t = (path) => {
    try {
      return path
        .split(".")
        .reduce((obj, key) => obj?.[key], translations?.contact || {});
    } catch {
      return "";
    }
  };

  if (loading) return null;

  return (
    <>
    <Navbar/>
    <Breadcrumbs/>
    <main className="min-h-screen bg-white text-gray-800">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[260px] md:h-[320px] flex items-center justify-center overflow-hidden">

        <Image
          src="/peptide-info/banner.jpg"
          alt="Contact BioPeptide"
          fill
          className="object-cover brightness-[0.35] group-hover:brightness-[0.30] transition"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d2d47] drop-shadow-sm">
            {t("hero.title")}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-700">
           {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-20 py-16">

        <div className="grid lg:grid-cols-2 gap-14">

          {/* ========== LEFT SIDE: CONTACT FORM ========== */}
          <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-6">

            <h2 className="text-3xl font-bold text-[#0d2d47] mb-2">
              {t("form.title")}
            </h2>
            <p className="text-gray-700 text-[16px] leading-relaxed">
             {t("form.description")}
            </p>

            {/* FORM */}
            <form className="space-y-5">

              <FormInput label={t("form.fields.name")} type="text" />
          <FormInput label={t("form.fields.email")} type="email" />
          <FormInput label={t("form.fields.subject")} type="text" />



              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                 {t("form.fields.message")}
                </label>
                <textarea
                  className="
                    w-full h-32 border border-gray-300 rounded-lg p-3 text-sm
                    focus:ring-2 focus:ring-bioBlue outline-none
                  "
                ></textarea>
              </div>

              <button
                type="submit"
                className="
                  w-full py-3 rounded-full text-white font-semibold 
                  bg-gradient-to-r from-bioBlue to-bioGreen 
                  hover:opacity-90 transition-all shadow-md
                "
              >
                {t("form.button")}

              </button>

            </form>
          </div>

          {/* ========== RIGHT SIDE: DETAILS BOX ========== */}
          <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 border border-bioBlue/30 rounded-xl p-10 space-y-6 shadow-md">

            <h3 className="text-3xl font-bold text-[#0d2d47]">
              {t("info.title")}
            </h3>

            <p className="text-gray-700 leading-relaxed text-[16px]">
              {t("info.description")}
            </p>

            <div className="space-y-4 text-[16px]">
             <InfoBlock title={t("info.email")} value="support@biopeptide.com" />
        <InfoBlock title={t("info.phone")} value="+1 (800) 000-0000" />
        <InfoBlock title={t("info.hours")} value="Mon–Sat: 9:00 AM – 7:00 PM" />
        <InfoBlock title={t("info.research")} value="research@biopeptide.com" />


            </div>

          </div>
        </div>

        {/* ========== BOTTOM INFO BOXES ========== */}
        <div className="grid md:grid-cols-3 gap-10 mt-30">

          {t("highlights")?.map((item, i) => (
  <BottomBox
    key={i}
    title={item.title}
    desc={item.desc}
    img={[
      "/peptide-info/section-quality.jpg",
      "/peptide-info/section-storage.jpg",
      "/peptide-info/section-reconstitution.jpg",
    ][i]}
  />
))}


        </div>

      </section>

    </main>
    <Footer/>
    </>
  );
}

/* =====================================================
   FORM INPUT COMPONENT
===================================================== */
function FormInput({ label, type }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        className="
          w-full border border-gray-300 rounded-lg p-3 text-sm
          focus:ring-2 focus:ring-bioBlue outline-none
        "
      />
    </div>
  );
}

/* =====================================================
   INFO BLOCK COMPONENT
===================================================== */
function InfoBlock({ title, value }) {
  return (
    <div>
      <p className="font-semibold text-[#0d2d47]">{title}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}

/* =====================================================
   BOTTOM BOX COMPONENT
===================================================== */
function BottomBox({ title, desc, img }) {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden shadow-md group cursor-pointer">

      <Image
        src={img}
        alt={title}
        fill
        className="object-cover brightness-[0.55] group-hover:brightness-[0.45] transition"
      />

      <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
        <h4 className="text-xl font-semibold drop-shadow">{title}</h4>
        <p className="text-white/90 text-sm mt-2 leading-relaxed drop-shadow">
          {desc}
        </p>
      </div>

    </div>
  );
}
