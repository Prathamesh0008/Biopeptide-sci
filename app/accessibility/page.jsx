"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AccessibilityStatementPage() {
  return (
    <>
    <Navbar/>
    <main className="bg-white">
      {/* HEADER */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Accessibility Statement
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            BioPeptide™ is committed to ensuring digital accessibility for all
            users, including individuals with disabilities.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-14 space-y-14 text-gray-700 text-sm leading-relaxed">
        {/* COMMITMENT */}
        <Section title="Our Commitment">
          <p>
            BioPeptide™ strives to make our website accessible and usable for
            everyone. We are continually improving the user experience for all
            visitors and applying relevant accessibility standards.
          </p>
        </Section>

        {/* STANDARDS */}
        <Section title="Accessibility Standards">
          <p>
            Our goal is to conform to applicable accessibility standards,
            including the Web Content Accessibility Guidelines (WCAG) 2.1,
            Level AA, wherever reasonably possible.
          </p>
          <p className="mt-3">
            We regularly review our website to identify areas that may require
            improvement and make updates to enhance accessibility.
          </p>
        </Section>

        {/* ONGOING EFFORTS */}
        <Section title="Ongoing Accessibility Efforts">
          <ul className="list-disc pl-6 space-y-2">
            <li>Improving keyboard navigation and screen reader compatibility</li>
            <li>Enhancing color contrast and text readability</li>
            <li>Ensuring clear structure and consistent navigation</li>
            <li>Optimizing content for assistive technologies</li>
          </ul>
        </Section>

        {/* LIMITATIONS */}
        <Section title="Limitations and Alternatives">
          <p>
            While we aim to make our website fully accessible, some content or
            functionality may not yet be fully optimized for all assistive
            technologies. We appreciate your patience as we continue to make
            improvements.
          </p>
        </Section>

        {/* FEEDBACK */}
        <Section title="Feedback & Assistance">
          <p>
            If you experience any difficulty accessing content on our website
            or have suggestions for improvement, we encourage you to contact
            us. Your feedback helps us improve accessibility for everyone.
          </p>
          <p className="mt-3 font-medium text-gray-900">
            📧 support@biopeptide.com
          </p>
        </Section>
      </section>
    </main>
    <Footer/>
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
