
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CustomerServicePage() {
  const { translations, loading } = useLanguage();
  if (loading) return null;

  const t = translations.customerService;

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
          
          {/* SHIPPING */}
          <ServiceSection title={t.sections.shipping.title}>
            <ul className="list-disc pl-6 space-y-2">
              {t.sections.shipping.bullets.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">{t.sections.shipping.note}</p>
          </ServiceSection>

          {/* PRIVACY */}
          <ServiceSection title={t.sections.privacy.title}>
            <p>{t.sections.privacy.p1}</p>
            <p className="mt-3">{t.sections.privacy.p2}</p>
            <p className="mt-3 font-medium text-gray-900">
              {t.sections.privacy.p3}
            </p>
          </ServiceSection>

          {/* RETURNS */}
          <ServiceSection title={t.sections.returns.title}>
            <p className="font-semibold text-gray-900">
              {t.sections.returns.p1}
            </p>
            <p className="mt-3">{t.sections.returns.p2}</p>
          </ServiceSection>

          {/* ORDERING */}
          <ServiceSection title={t.sections.ordering.title}>
            <p>{t.sections.ordering.p1}</p>
            <p className="mt-3">{t.sections.ordering.p2}</p>
            <p className="mt-3">{t.sections.ordering.p3}</p>
          </ServiceSection>

          {/* PAYMENTS */}
          <ServiceSection title={t.sections.payments.title}>
            <ul className="list-disc pl-6 space-y-2">
              {t.sections.payments.bullets.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-4">{t.sections.payments.note}</p>
          </ServiceSection>

          {/* ORDER STATUS */}
          <ServiceSection title={t.sections.status.title}>
            <ul className="list-disc pl-6 space-y-2">
              {t.sections.status.bullets.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t.sections.status.note}</p>
          </ServiceSection>

          {/* SATISFACTION */}
          <ServiceSection title={t.sections.satisfaction.title}>
            <p>{t.sections.satisfaction.p1}</p>
            <p className="mt-3">{t.sections.satisfaction.p2}</p>
          </ServiceSection>

          {/* CONTACT */}
          <div className="rounded-2xl border border-gray-200 bg-[#f6fdfc] p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t.contact.title}
            </h3>
            <p className="text-gray-700">
              📧 Email:{" "}
              <a
                href="mailto:support@biopeptide.com"
                className="text-bioBlue font-medium hover:underline"
              >
                support@biopeptide.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* -------- SECTION COMPONENT -------- */
function ServiceSection({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}




// //peptides\app\shipping-payments\page.jsx

// "use client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";


// export default function CustomerServicePage() {
//   return (
//     <>
//     <Navbar/>
//     <main className="bg-white">
//       {/* HEADER */}
//       <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
//         <div className="max-w-5xl mx-auto px-6 py-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Customer Service
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-3xl">
//             At BioPeptide™, we are committed to providing reliable service,
//             secure transactions, and timely delivery for all research orders.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="max-w-5xl mx-auto px-6 py-14 space-y-14 text-gray-700 text-sm leading-relaxed">
//         {/* SHIPPING */}
//         <ServiceSection title="Shipping & Delivery">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>Multiple shipping options available</li>
//             <li>FREE shipping on orders over $200 (grand total)</li>
//             <li>USPS Priority, FedEx 2-Day, FedEx Overnight</li>
//             <li>FedEx Overnight (Signature Required)</li>
//             <li>FedEx Saturday Delivery for eligible Friday orders</li>
//           </ul>

//           <p className="mt-4">
//             Orders placed, paid, and processed before <strong>12:00 PM PST</strong>{" "}
//             typically ship the same business day. Orders placed after this time,
//             on weekends, or holidays ship the next business day.
//           </p>
//         </ServiceSection>

//         {/* PRIVACY */}
//         <ServiceSection title="Privacy & Security">
//           <p>
//             All orders submitted through our website are protected by{" "}
//             <strong>256-bit SSL (Secure Socket Layer) encryption</strong>.
//           </p>
//           <p className="mt-3">
//             We take your privacy seriously and comply with all applicable
//             federal and state privacy regulations. Your personal and order
//             information is used <strong>only</strong> to process and fulfill
//             your order.
//           </p>
//           <p className="mt-3 font-medium text-gray-900">
//             We do not sell, share, or disclose your information to third parties.
//           </p>
//         </ServiceSection>

//         {/* RETURNS */}
//         <ServiceSection title="Returns & Replacements">
//           <p className="font-semibold text-gray-900">
//             Due to regulatory restrictions, returns are not permitted.
//           </p>
//           <p className="mt-3">
//             If an order is shipped incorrectly or the items received do not
//             match your order, please contact us immediately. We will review
//             the issue and issue a replacement when applicable.
//           </p>
//         </ServiceSection>

//         {/* ORDERING */}
//         <ServiceSection title="Ordering">
//           <p>
//             Orders can be placed through our secure website{" "}
//             <strong>24 hours a day, 7 days a week</strong>.
//           </p>
//           <p className="mt-3">
//             Once your order is submitted, approved, and payment is received,
//             it will be properly packaged and shipped using a reputable carrier.
//           </p>
//           <p className="mt-3">
//             You will receive shipping confirmation once your order has been
//             dispatched.
//           </p>
//         </ServiceSection>

//         {/* PAYMENTS */}
//         <ServiceSection title="Payment, Pricing & Promotions">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>We accept all major credit cards</li>
//             <li>Individual and bulk pricing available</li>
//             <li>Quantity discounts listed on product pages</li>
//           </ul>

//           <p className="mt-4">
//             For large bulk or wholesale inquiries, please contact our support
//             team directly.
//           </p>
//         </ServiceSection>

//         {/* ORDER STATUS */}
//         <ServiceSection title="Viewing Order Status">
//           <p>
//             During checkout, you may register for an account or proceed as a
//             guest.
//           </p>
//           <ul className="list-disc pl-6 mt-3 space-y-2">
//             <li>Registered users can view order history and status</li>
//             <li>Update account information easily</li>
//             <li>Faster checkout for future purchases</li>
//           </ul>
//           <p className="mt-3">
//             If you checked out as a guest and have questions about your order,
//             please contact us by email.
//           </p>
//         </ServiceSection>

//         {/* SATISFACTION */}
//         <ServiceSection title="Satisfaction Guaranteed">
//           <p>
//             We are committed to delivering outstanding quality and service.
//           </p>
//           <p className="mt-3">
//             If you have any questions, concerns, or service-related issues,
//             please contact us. Our team responds to{" "}
//             <strong>all inquiries</strong> and is here to help.
//           </p>
//         </ServiceSection>

//         {/* CONTACT */}
//         <div className="rounded-2xl border border-gray-200 bg-[#f6fdfc] p-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-3">
//             Contact Customer Support
//           </h3>
//           <p className="text-gray-700">
//             📧 Email:{" "}
//             <a
//               href="mailto:support@biopeptide.com"
//               className="text-bioBlue font-medium hover:underline"
//             >
//               support@biopeptide.com
//             </a>
//           </p>
//         </div>
//       </section>
//     </main>
//     <Footer/>
//     </>
//   );
// }

// /* -------- SECTION COMPONENT -------- */
// function ServiceSection({ title, children }) {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );
// }
