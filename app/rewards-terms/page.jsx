"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";


export default function RefundsReturnsPage() {
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

  const t = translations.refundsReturns;

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
          
          {/* NO RETURNS */}
          <Section title={t.sections.noReturns.title}>
            <p className="font-semibold text-gray-900">
              {t.sections.noReturns.p1}
            </p>
            <p className="mt-3">{t.sections.noReturns.p2}</p>
          </Section>

          {/* INCORRECT ORDERS */}
          <Section title={t.sections.incorrect.title}>
            <p>{t.sections.incorrect.p1}</p>
            <p className="mt-3">{t.sections.incorrect.p2}</p>
          </Section>

          {/* ELIGIBILITY */}
          <Section title={t.sections.eligibility.title}>
            <ul className="list-disc pl-6 space-y-2">
              {t.sections.eligibility.bullets.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          {/* NO EXCEPTIONS */}
          <Section title={t.sections.noExceptions.title}>
            <p>{t.sections.noExceptions.p1}</p>
          </Section>

          {/* CONTACT */}
          <Section title={t.sections.contact.title}>
            <p>{t.sections.contact.p1}</p>
            <p className="mt-3 font-medium text-gray-900">
              📧 {t.sections.contact.email}
            </p>
          </Section>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ---------- SECTION COMPONENT ---------- */
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




// //peptides\app\rewards-terms\page.jsx
// "use client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function RefundsReturnsPage() {
//   return (
//     <>
//     <Navbar/>
//     <main className="bg-white">
//       {/* HEADER */}
//       <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
//         <div className="max-w-5xl mx-auto px-6 py-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Refunds & Returns
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-3xl">
//             Our policies regarding refunds, returns, and replacements at
//             BioPeptide™.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="max-w-5xl mx-auto px-6 py-14 space-y-14 text-gray-700 text-sm leading-relaxed">
//         {/* NO RETURNS */}
//         <Section title="No Returns Policy">
//           <p className="font-semibold text-gray-900">
//             Due to the nature of our products, all sales are final.
//           </p>
//           <p className="mt-3">
//             BioPeptide™ products are sold strictly for laboratory research
//             purposes only. As a result, returns are not permitted under any
//             circumstances.
//           </p>
//         </Section>

//         {/* INCORRECT ORDERS */}
//         <Section title="Incorrect or Damaged Orders">
//           <p>
//             If you believe that your order was shipped incorrectly or you
//             received items that differ from what you ordered, please contact
//             us immediately.
//           </p>
//           <p className="mt-3">
//             After verification, we will issue a replacement for the original
//             order. Refunds are not issued for incorrect shipments; replacements
//             are provided instead.
//           </p>
//         </Section>

//         {/* ELIGIBILITY */}
//         <Section title="Replacement Eligibility">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>The issue must be reported promptly after delivery</li>
//             <li>The item received must differ from the item ordered</li>
//             <li>Order details must be verified by our support team</li>
//           </ul>
//         </Section>

//         {/* NO EXCEPTIONS */}
//         <Section title="No Exceptions">
//           <p>
//             Due to regulatory requirements governing the sale of research
//             products, BioPeptide™ cannot accept returns, exchanges, or refunds
//             for reasons other than shipment error.
//           </p>
//         </Section>

//         {/* CONTACT */}
//         <Section title="Need Assistance?">
//           <p>
//             If you have questions regarding your order or believe there was an
//             error in fulfillment, please contact our support team.
//           </p>
//           <p className="mt-3 font-medium text-gray-900">
//             📧 support@biopeptide.com
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
