"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
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
            Contact BioPeptide
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-700">
            We're here to support researchers, laboratories, and scientific teams.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-20 py-16">

        <div className="grid lg:grid-cols-2 gap-14">

          {/* ========== LEFT SIDE: CONTACT FORM ========== */}
          <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-6">

            <h2 className="text-3xl font-bold text-[#0d2d47] mb-2">
              Get In Touch
            </h2>
            <p className="text-gray-700 text-[16px] leading-relaxed">
              Fill out the form below and our support team will respond within 24 hours.
            </p>

            {/* FORM */}
            <form className="space-y-5">

              <FormInput label="Full Name" type="text" />
              <FormInput label="Email Address" type="email" />
              <FormInput label="Subject" type="text" />

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Message
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
                Send Message
              </button>

            </form>
          </div>

          {/* ========== RIGHT SIDE: DETAILS BOX ========== */}
          <div className="bg-gradient-to-br from-bioBlue/10 to-bioGreen/10 border border-bioBlue/30 rounded-xl p-10 space-y-6 shadow-md">

            <h3 className="text-3xl font-bold text-[#0d2d47]">
              Contact Information
            </h3>

            <p className="text-gray-700 leading-relaxed text-[16px]">
              Our team is available Monday–Saturday to assist with research
              inquiries, documentation, and order support.
            </p>

            <div className="space-y-4 text-[16px]">
              <InfoBlock title="Email" value="support@biopeptide.com" />
              <InfoBlock title="Phone" value="+1 (800) 000-0000" />
              <InfoBlock title="Working Hours" value="Mon–Sat: 9:00 AM – 7:00 PM" />
              <InfoBlock title="Research Support" value="research@biopeptide.com" />
            </div>

          </div>
        </div>

        {/* ========== BOTTOM INFO BOXES ========== */}
        <div className="grid md:grid-cols-3 gap-10 mt-30">

          <BottomBox
            title="High Purity Peptides"
            desc="Every batch is tested with HPLC and Mass Spectrometry for accuracy."
            img="/peptide-info/section-quality.jpg"
          />

          <BottomBox
            title="Fast Worldwide Shipping"
            desc="Orders are prepared and shipped quickly for urgent research needs."
            img="/peptide-info/section-storage.jpg"
          />

          <BottomBox
            title="Expert Research Support"
            desc="Our team helps with product data, documents, and lab handling."
            img="/peptide-info/section-reconstitution.jpg"
          />

        </div>

      </section>

    </main>
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
