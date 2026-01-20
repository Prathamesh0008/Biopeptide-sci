"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";


export default function RewardsProgramTermsPage() {
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

  const t = translations.rewardsTerms;

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
          <Section title={t.sections.overview.title}>
            <p>{t.sections.overview.p1}</p>
          </Section>

          <Section title={t.sections.eligibility.title}>
            <ul className="list-disc pl-6 space-y-2">
              {t.sections.eligibility.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Section>

          <Section title={t.sections.earning.title}>
            <p>{t.sections.earning.p1}</p>
            <p className="mt-3">{t.sections.earning.p2}</p>
          </Section>

          <Section title={t.sections.redeeming.title}>
            <p>{t.sections.redeeming.p1}</p>
            <p className="mt-3">{t.sections.redeeming.p2}</p>
          </Section>

          <Section title={t.sections.expiration.title}>
            <p>{t.sections.expiration.p1}</p>
          </Section>

          <Section title={t.sections.misuse.title}>
            <p>{t.sections.misuse.p1}</p>
          </Section>

          <Section title={t.sections.changes.title}>
            <p>{t.sections.changes.p1}</p>
          </Section>

          <Section title={t.sections.liability.title}>
            <p>{t.sections.liability.p1}</p>
          </Section>

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



// //peptides\app\accessibility\rewards-terms\page.jsx
// "use client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function RewardsProgramTermsPage() {
//   return (
//     <>
//     <Navbar/>
//     <main className="bg-white">
//       {/* HEADER */}
//       <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
//         <div className="max-w-5xl mx-auto px-6 py-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Reward Program Terms
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-3xl">
//             These terms govern participation in the BioPeptide™ Loyalty &
//             Rewards Program.
//           </p>
//         </div>
//       </section>

//       {/* CONTENT */}
//       <section className="max-w-5xl mx-auto px-6 py-14 space-y-14 text-gray-700 text-sm leading-relaxed">
//         <Section title="Program Overview">
//           <p>
//             The BioPeptide™ Loyalty Program allows eligible customers to earn
//             reward points through qualifying purchases and promotional
//             activities. Participation in the program constitutes acceptance of
//             these terms.
//           </p>
//         </Section>

//         <Section title="Eligibility">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>Participants must be at least 21 years of age</li>
//             <li>A valid customer account may be required</li>
//             <li>Program participation is void where prohibited by law</li>
//           </ul>
//         </Section>

//         <Section title="Earning Reward Points">
//           <p>
//             Reward points may be earned through eligible purchases or other
//             qualifying actions as determined by BioPeptide™.
//           </p>
//           <p className="mt-3">
//             Points have no cash value, are non-transferable, and may not be
//             exchanged for cash or credit.
//           </p>
//         </Section>

//         <Section title="Redeeming Rewards">
//           <p>
//             Reward points may be redeemed for discounts or promotional offers,
//             subject to availability and additional conditions.
//           </p>
//           <p className="mt-3">
//             BioPeptide™ reserves the right to modify or discontinue any reward,
//             redemption threshold, or promotional offer at any time without
//             notice.
//           </p>
//         </Section>

//         <Section title="Expiration & Forfeiture">
//           <p>
//             Reward points may expire after a period of inactivity or upon
//             termination of an account. Points may also be forfeited if program
//             terms are violated.
//           </p>
//         </Section>

//         <Section title="Account Misuse">
//           <p>
//             BioPeptide™ reserves the right to suspend or terminate any account
//             that engages in fraud, abuse, manipulation, or misuse of the reward
//             program.
//           </p>
//         </Section>

//         <Section title="Program Changes or Termination">
//           <p>
//             BioPeptide™ may modify, suspend, or terminate the Loyalty Program or
//             these terms at any time without prior notice. Continued
//             participation constitutes acceptance of any changes.
//           </p>
//         </Section>

//         <Section title="Limitation of Liability">
//           <p>
//             BioPeptide™ is not responsible for lost, stolen, or misused reward
//             points, nor for system errors, technical issues, or unauthorized
//             access affecting reward balances.
//           </p>
//         </Section>

//         <Section title="Contact Information">
//           <p>
//             For questions regarding the Loyalty Program or reward points,
//             please contact our support team.
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
