//peptides\app\contact\page.jsx
"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import DrawerProducts from "@/components/DrawerProducts";
import { useState } from "react";
import Loader from "@/components/Loader";
import emailjs from "@emailjs/browser";


export default function ContactPage() {
  const { translations, loading } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ✅ HOOKS MUST BE INSIDE COMPONENT
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoadingSubmit(true);

  const templateParams = {
    name: form.name,
    email: form.email,
    subject: form.subject,
    message: form.message,
  };

  try {
    const adminRes = await emailjs.send(
      "service_jcnoyfe",
      "template_uowxayr",
      templateParams,
      "W6oyvSvHsLD85n4A3"
    );

    console.log("Admin Email Sent:", adminRes.status, adminRes.text);

    const userRes = await emailjs.send(
      "service_jcnoyfe",
      "template_74yy82u",
      templateParams,
      "W6oyvSvHsLD85n4A3"
    );

    console.log("User Email Sent:", userRes.status, userRes.text);

    setSuccess(true);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  } catch (error) {
    console.error("Email Error Status:", error?.status);
    console.error("Email Error Text:", error?.text);
    console.error("Raw Error:", error);
    alert("Email sending failed. Please try later.");
  }

  setLoadingSubmit(false);
};
  const t = (path) => {
    try {
      return path
        .split(".")
        .reduce((obj, key) => obj?.[key], translations?.contact || {});
    } catch {
      return "";
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
      <button
        onClick={() => setDrawerOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
          bg-gradient-to-b from-bioBlue to-bioGreen
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
      </button>

      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <main className=" bg-white text-gray-800">
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-20 pt-16 pb-0">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* LEFT: FORM */}
            <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-6">
              <h2 className="text-3xl font-bold text-[#0d2d47]">
                {t("form.title")}
              </h2>

              <p className="text-gray-700 text-[16px] leading-relaxed">
                {t("form.description")}
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <FormInput
                  label={t("form.fields.name")}
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <FormInput
                  label={t("form.fields.email")}
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <FormInput
                  label={t("form.fields.subject")}
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                />

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    {t("form.fields.message")}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="
                      w-full h-32 border border-gray-300 rounded-lg p-3 text-sm
                      focus:ring-2 focus:ring-bioBlue outline-none
                    "
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingSubmit}
                  className="
                    w-full py-3 rounded-full text-white font-semibold
                    bg-gradient-to-r from-bioBlue to-bioGreen
                    hover:opacity-90 transition-all shadow-md
                  "
                >
                  {loadingSubmit ? "Sending..." : t("form.button")}
                </button>

                {success && (
                  <p className="text-green-600 text-sm font-semibold">
                    ✅ Thank you! We’ll contact you shortly.
                  </p>
                )}
              </form>
            </div>

            {/* RIGHT: INFO */}
            <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 border border-bioBlue/30 rounded-xl p-10 space-y-6 shadow-md">
              <h3 className="text-3xl font-bold text-[#0d2d47]">
                {t("info.title")}
              </h3>

              <p className="text-gray-700 leading-relaxed text-[16px]">
                {t("info.description")}
              </p>

              <div className="space-y-4 text-[16px]">
                {/* <InfoBlock title={t("info.email")} value="support@biopeptide.com" /> */}
                {/* <InfoBlock title={t("info.phone")} value="+1 (800) 000-0000" /> */}
               
                <InfoBlock title={t("info.research")} value="info@bio-peptides.com" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- COMPONENTS ---------------- */

function FormInput({ label, type, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="
          w-full border border-gray-300 rounded-lg p-3 text-sm
          focus:ring-2 focus:ring-bioBlue outline-none
        "
      />
    </div>
  );
}

function InfoBlock({ title, value }) {
  return (
    <div>
      <p className="font-semibold text-[#0d2d47]">{title}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}




















