
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";


export default function TermsPage() {
  const { translations, loading } = useLanguage();
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

  const t = translations.terms;

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* HEADER */}
        <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl">
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-5xl mx-auto px-6 py-14 space-y-14 text-gray-700 text-sm leading-relaxed">
          <Section title={t.sections.general.title}>
            <p>{t.sections.general.p1}</p>
          </Section>

          <Section title={t.sections.payments.title}>
            <p>{t.sections.payments.p1}</p>
            <p className="mt-3">{t.sections.payments.p2}</p>
            <p className="mt-3">{t.sections.payments.p3}</p>
          </Section>

          <Section title={t.sections.websiteUse.title}>
            <p>{t.sections.websiteUse.p1}</p>
            <p className="mt-3">{t.sections.websiteUse.p2}</p>
          </Section>

          <Section title={t.sections.productUse.title}>
            <p className="font-semibold text-gray-900">
              {t.sections.productUse.warning}
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {t.sections.productUse.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <p className="mt-4">{t.sections.productUse.p1}</p>
          </Section>

          <Section title={t.sections.age.title}>
            <p className="font-semibold text-gray-900">
              {t.sections.age.p1}
            </p>
          </Section>

          <Section title={t.sections.risk.title}>
            <p>{t.sections.risk.p1}</p>
            <p className="mt-3">{t.sections.risk.p2}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              {t.sections.risk.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Section>

          <Section title={t.sections.sales.title}>
            <p className="font-semibold text-gray-900">
              {t.sections.sales.p1}
            </p>
            <p className="mt-3">{t.sections.sales.p2}</p>
          </Section>

          <Section title={t.sections.liability.title}>
            <p>{t.sections.liability.p1}</p>
            <p className="mt-3">{t.sections.liability.p2}</p>
          </Section>

          <Section title={t.sections.intellectual.title}>
            <p>{t.sections.intellectual.p1}</p>
            <p className="mt-3">{t.sections.intellectual.p2}</p>
          </Section>

          <Section title={t.sections.security.title}>
            <p>{t.sections.security.p1}</p>
          </Section>

          <Section title={t.sections.law.title}>
            <p>{t.sections.law.p1}</p>
          </Section>

          <Section title={t.sections.agreement.title}>
            <p>{t.sections.agreement.p1}</p>
            <p className="mt-3 font-semibold text-gray-900">
              {t.sections.agreement.p2}
            </p>
          </Section>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}




// //peptides\app\terms\page.jsx
// "use client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function TermsPage() {
//   return (
//     <>
//     <Navbar/>
//     <main className="bg-white">
//       {/* HEADER */}
//       <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
//         <div className="max-w-5xl mx-auto px-6 py-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Terms & Conditions
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-3xl">
//             Please read these Terms and Conditions carefully before using the
//             BioPeptide™ website or purchasing any products.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="max-w-5xl mx-auto px-6 py-14 space-y-14 text-gray-700 text-sm leading-relaxed">
//         {/* INTRO */}
//         <Section title="General Terms and Conditions of Use Agreement">
//           <p>
//             These Terms and Conditions govern all users of{" "}
//             <strong>www.biopeptide.com</strong>. These terms must be agreed upon
//             before any purchases can be made.
//           </p>
//         </Section>

//         {/* PAYMENTS */}
//         <Section title="Payments & Authorization">
//           <p>
//             All e-Check / ACH payments will be made payable to BioPeptide™. By
//             placing an order, you authorize BioPeptide™ to initiate a single
//             ACH/electronic debit to your account in the amount of your order.
//           </p>
//           <p className="mt-3">
//             Payments made after 11:00 PM Pacific Time will be applied as of the
//             next business day. Once payment is authorized, no changes or
//             corrections can be made.
//           </p>
//           <p className="mt-3">
//             We recommend printing and retaining a copy of this authorization for
//             your records.
//           </p>
//         </Section>

//         {/* WEBSITE USE */}
//         <Section title="Use of Our Website">
//           <p>
//             Your use of this website is governed by these Terms and Conditions
//             and our Privacy Policy. You may not modify, distribute, reproduce,
//             publish, license, transfer, or sell any content obtained from this
//             website without express written consent.
//           </p>
//           <p className="mt-3">
//             You may download or print content for personal, non-commercial use
//             only, provided that all copyright and proprietary notices are
//             preserved.
//           </p>
//         </Section>

//         {/* PRODUCT USE */}
//         <Section title="Product Use & Research Disclaimer">
//           <p className="font-semibold text-gray-900">
//             ALL PRODUCTS SOLD BY BIOPEPTIDE™ ARE FOR IN-VITRO LABORATORY RESEARCH
//             USE ONLY.
//           </p>
//           <ul className="list-disc pl-6 mt-4 space-y-2">
//             <li>NOT for human or animal consumption</li>
//             <li>NOT intended to diagnose, treat, cure, or prevent disease</li>
//             <li>NOT approved by the FDA for medical use</li>
//             <li>NOT to be used as food, drugs, or cosmetics</li>
//           </ul>
//           <p className="mt-4">
//             All articles and product information are provided for educational
//             and informational purposes only.
//           </p>
//         </Section>

//         {/* AGE */}
//         <Section title="Age Requirement">
//           <p className="font-semibold text-gray-900">
//             You must be at least 21 years of age to purchase or use this website.
//           </p>
//         </Section>

//         {/* RISK */}
//         <Section title="Risk Acknowledgement">
//           <p>
//             By purchasing any product, you acknowledge that there are inherent
//             risks associated with the handling and use of research chemicals.
//           </p>
//           <p className="mt-3">
//             All customers represent and warrant that they are knowledgeable
//             about:
//           </p>
//           <ul className="list-disc pl-6 mt-3 space-y-2">
//             <li>Proper in-vitro research use</li>
//             <li>Applicable government regulations</li>
//             <li>Health and safety hazards</li>
//             <li>Proper warning and handling procedures</li>
//           </ul>
//         </Section>

//         {/* SALES */}
//         <Section title="Sales Policy">
//           <p className="font-semibold text-gray-900">
//             Due to the nature of these products, ALL SALES ARE FINAL.
//           </p>
//           <p className="mt-3">
//             BioPeptide™ reserves the right to limit or refuse sales to any
//             unqualified individual or entity.
//           </p>
//         </Section>

//         {/* LIABILITY */}
//         <Section title="Limitation of Liability">
//           <p>
//             BioPeptide™ shall not be liable for any direct, indirect,
//             incidental, consequential, or punitive damages arising from the use
//             or misuse of products or website content.
//           </p>
//           <p className="mt-3">
//             The purchaser agrees to indemnify and hold BioPeptide™ harmless from
//             all claims, losses, and liabilities arising from product use.
//           </p>
//         </Section>

//         {/* INTELLECTUAL */}
//         <Section title="Trademarks & Intellectual Property">
//           <p>
//             All content on this website, including text, graphics, logos,
//             images, and software, is the property of BioPeptide™ and protected
//             by intellectual property laws.
//           </p>
//           <p className="mt-3">
//             No content may be copied or distributed without written permission.
//           </p>
//         </Section>

//         {/* SECURITY */}
//         <Section title="Security">
//           <p>
//             We use industry-standard encryption technologies to protect sensitive
//             information. All transactions are processed through secure systems.
//           </p>
//         </Section>

//         {/* GOVERNING LAW */}
//         <Section title="Governing Law">
//           <p>
//             These Terms shall be governed and construed in accordance with
//             applicable laws. You are responsible for compliance with laws in
//             your jurisdiction.
//           </p>
//         </Section>

//         {/* AGREEMENT */}
//         <Section title="Entire Agreement">
//           <p>
//             These Terms constitute the entire agreement between you and
//             BioPeptide™. By placing an order and clicking “I Agree,” you accept
//             all Terms, Conditions, and related policies.
//           </p>
//           <p className="mt-3 font-semibold text-gray-900">
//             If you do not agree with these terms, DO NOT purchase from us.
//           </p>
//         </Section>
//       </section>
//     </main>
//     <Footer/>
//     </>
//   );
// }

// /* ---------- SECTION COMPONENT ---------- */
// function Section({ title, children }) {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );
// }
