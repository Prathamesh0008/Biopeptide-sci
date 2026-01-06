"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const { translations, loading } = useLanguage();
  if (loading) return null;

  const t = translations.privacy;

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
            <p className="mt-4 text-gray-600 text-base max-w-3xl">
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-5xl mx-auto px-6 py-14 space-y-12 text-gray-700 text-sm leading-relaxed">
          {/* INTRO */}
          <div>
            <p><strong>{t.intro.site}</strong></p>
            <p className="mt-3">
              {t.intro.contact}{" "}
              <a
                href="mailto:support@biopeptide.com"
                className="text-bioBlue font-medium hover:underline"
              >
                support@biopeptide.com
              </a>
              .
            </p>
            <p className="mt-3">{t.intro.importance}</p>
          </div>

          <PolicySection title={t.sections.logFiles.title}>
            <p>{t.sections.logFiles.p1}</p>
            <p className="mt-3">{t.sections.logFiles.p2}</p>
          </PolicySection>

          <PolicySection title={t.sections.cookies.title}>
            <p>{t.sections.cookies.p1}</p>
            <p className="mt-3">{t.sections.cookies.p2}</p>
            <p className="mt-3">{t.sections.cookies.p3}</p>
          </PolicySection>

          <PolicySection title={t.sections.disclosure.title}>
            <p>{t.sections.disclosure.p1}</p>
          </PolicySection>

          <PolicySection title={t.sections.personal.title}>
            <p>{t.sections.personal.p1}</p>
            <p className="mt-3">{t.sections.personal.p2}</p>
            <p className="mt-3">{t.sections.personal.p3}</p>
            <p className="mt-3">{t.sections.personal.p4}</p>
            <p className="mt-3">
              {t.sections.personal.p5}{" "}
              <a
                href="mailto:support@biopeptide.com"
                className="text-bioBlue font-medium hover:underline"
              >
                support@biopeptide.com
              </a>
            </p>
          </PolicySection>

          <PolicySection title={t.sections.thirdParty.title}>
            <p>{t.sections.thirdParty.p1}</p>
          </PolicySection>

          <PolicySection title={t.sections.security.title}>
            <p>{t.sections.security.p1}</p>
            <p className="mt-3">{t.sections.security.p2}</p>
          </PolicySection>
        </section>
      </main>

      <Footer />
    </>
  );
}

function PolicySection({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}











// "use client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function PrivacyPolicyPage() {
//   return (
//     <>
//     <Navbar/>
//     <main className="bg-white">
//       {/* PAGE HEADER */}
//       <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
//         <div className="max-w-5xl mx-auto px-6 py-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Privacy Policy
//           </h1>
//           <p className="mt-4 text-gray-600 text-base max-w-3xl">
//             This Privacy Policy explains how BioPeptide™ collects, uses, and
//             protects your information when you visit our website.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="max-w-5xl mx-auto px-6 py-14 space-y-12 text-gray-700 text-sm leading-relaxed">
//         {/* INTRO */}
//         <div>
//           <p>
//             Privacy Policy for <strong>www.biopeptide.com</strong> (BioPeptide™)
//           </p>
//           <p className="mt-3">
//             If you require any more information or have any questions about our
//             privacy policy, please feel free to contact us by email at{" "}
//             <a
//               href="mailto:support@biopeptide.com"
//               className="text-bioBlue font-medium hover:underline"
//             >
//               support@biopeptide.com
//             </a>
//             .
//           </p>
//           <p className="mt-3">
//             At BioPeptide™, the privacy of our visitors is of extreme importance
//             to us. This privacy policy document outlines the types of personal
//             information that are received and collected by BioPeptide™ and how
//             it is used.
//           </p>
//         </div>

//         {/* LOG FILES */}
//         <PolicySection title="Log Files">
//           <p>
//             Like many other websites, BioPeptide™ makes use of log files. The
//             information inside the log files includes internet protocol (IP)
//             addresses, browser type, Internet Service Provider (ISP), date and
//             time stamps, referring/exit pages, and number of clicks.
//           </p>
//           <p className="mt-3">
//             This information is used to analyze trends, administer the site,
//             track users’ movement around the site, and gather demographic
//             information. IP addresses and other such information are not linked
//             to any information that is personally identifiable.
//           </p>
//         </PolicySection>

//         {/* COOKIES */}
//         <PolicySection title="Cookies and Web Beacons">
//           <p>
//             BioPeptide™ uses cookies to store information about visitors’
//             preferences, record user-specific information on which pages the
//             user accesses or visits, and customize web page content based on
//             visitors’ browser type or other information that the visitor sends
//             via their browser.
//           </p>
//           <p className="mt-3">
//             If you wish to disable cookies, you may do so through your individual
//             browser options. More detailed information about cookie management
//             with specific web browsers can be found on the browsers’ respective
//             websites.
//           </p>
//           <p className="mt-3">
//             Our website also uses cookies to help keep track of items you place
//             in your shopping cart, including when you have abandoned your cart.
//             This information may be used to determine when to send cart reminder
//             messages via SMS.
//           </p>
//         </PolicySection>

//         {/* DISCLOSURE */}
//         <PolicySection title="Disclosure of Your Information">
//           <p>
//             All of the above categories exclude text messaging originator opt-in
//             data and consent. This information will not be shared with any third
//             parties, excluding aggregators and providers of the text messaging
//             services.
//           </p>
//         </PolicySection>

//         {/* EMAIL & PERSONAL INFO */}
//         <PolicySection title="Email and Personal Information">
//           <p>
//             BioPeptide™ collects information about the use of our website to
//             provide a secure and personalized experience. This may include your
//             name, email address, purchasing records, and shopping patterns.
//           </p>
//           <p className="mt-3">
//             We collect this information when you place an order or interact with
//             our website.
//           </p>
//           <p className="mt-3">
//             We do not sell, rent, or loan your personal information to third
//             parties without your permission. We do not sell email addresses or
//             other personal information to mass marketers.
//           </p>
//           <p className="mt-3">
//             BioPeptide™ may contact you with special offers and information
//             related to our products and services.
//           </p>
//           <p className="mt-3">
//             If you are receiving emails or newsletters from us and would like to
//             stop receiving them, you may unsubscribe at any time or contact us
//             at{" "}
//             <a
//               href="mailto:support@biopeptide.com"
//               className="text-bioBlue font-medium hover:underline"
//             >
//               support@biopeptide.com
//             </a>
//             .
//           </p>
//         </PolicySection>

//         {/* THIRD PARTY */}
//         <PolicySection title="Third-Party Content">
//           <p>
//             BioPeptide™ does not partner with or use any third-party advertising
//             services or external content delivery services.
//           </p>
//         </PolicySection>

//         {/* SECURITY */}
//         <PolicySection title="Security">
//           <p>
//             We use industry-standard security measures to protect the
//             information submitted to us. When transferring sensitive data,
//             users are redirected to a secure environment.
//           </p>
//           <p className="mt-3">
//             Sensitive information may include payment details or other private
//             data. While no system is 100% secure, we take appropriate steps to
//             safeguard your information.
//           </p>
//         </PolicySection>
//       </section>
//     </main>
//     <Footer/>
//     </>
//   );
// }

// /* ---------- Helper Component ---------- */
// function PolicySection({ title, children }) {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-900 mb-3">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );
// }
