"use client";

export default function TermsPage() {
  return (
    <main className="bg-white">
      {/* HEADER */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-[#f6fdfc] to-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Please read these Terms and Conditions carefully before using the
            BioPeptide™ website or purchasing any products.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-14 space-y-14 text-gray-700 text-sm leading-relaxed">
        {/* INTRO */}
        <Section title="General Terms and Conditions of Use Agreement">
          <p>
            These Terms and Conditions govern all users of{" "}
            <strong>www.biopeptide.com</strong>. These terms must be agreed upon
            before any purchases can be made.
          </p>
        </Section>

        {/* PAYMENTS */}
        <Section title="Payments & Authorization">
          <p>
            All e-Check / ACH payments will be made payable to BioPeptide™. By
            placing an order, you authorize BioPeptide™ to initiate a single
            ACH/electronic debit to your account in the amount of your order.
          </p>
          <p className="mt-3">
            Payments made after 11:00 PM Pacific Time will be applied as of the
            next business day. Once payment is authorized, no changes or
            corrections can be made.
          </p>
          <p className="mt-3">
            We recommend printing and retaining a copy of this authorization for
            your records.
          </p>
        </Section>

        {/* WEBSITE USE */}
        <Section title="Use of Our Website">
          <p>
            Your use of this website is governed by these Terms and Conditions
            and our Privacy Policy. You may not modify, distribute, reproduce,
            publish, license, transfer, or sell any content obtained from this
            website without express written consent.
          </p>
          <p className="mt-3">
            You may download or print content for personal, non-commercial use
            only, provided that all copyright and proprietary notices are
            preserved.
          </p>
        </Section>

        {/* PRODUCT USE */}
        <Section title="Product Use & Research Disclaimer">
          <p className="font-semibold text-gray-900">
            ALL PRODUCTS SOLD BY BIOPEPTIDE™ ARE FOR IN-VITRO LABORATORY RESEARCH
            USE ONLY.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>NOT for human or animal consumption</li>
            <li>NOT intended to diagnose, treat, cure, or prevent disease</li>
            <li>NOT approved by the FDA for medical use</li>
            <li>NOT to be used as food, drugs, or cosmetics</li>
          </ul>
          <p className="mt-4">
            All articles and product information are provided for educational
            and informational purposes only.
          </p>
        </Section>

        {/* AGE */}
        <Section title="Age Requirement">
          <p className="font-semibold text-gray-900">
            You must be at least 21 years of age to purchase or use this website.
          </p>
        </Section>

        {/* RISK */}
        <Section title="Risk Acknowledgement">
          <p>
            By purchasing any product, you acknowledge that there are inherent
            risks associated with the handling and use of research chemicals.
          </p>
          <p className="mt-3">
            All customers represent and warrant that they are knowledgeable
            about:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Proper in-vitro research use</li>
            <li>Applicable government regulations</li>
            <li>Health and safety hazards</li>
            <li>Proper warning and handling procedures</li>
          </ul>
        </Section>

        {/* SALES */}
        <Section title="Sales Policy">
          <p className="font-semibold text-gray-900">
            Due to the nature of these products, ALL SALES ARE FINAL.
          </p>
          <p className="mt-3">
            BioPeptide™ reserves the right to limit or refuse sales to any
            unqualified individual or entity.
          </p>
        </Section>

        {/* LIABILITY */}
        <Section title="Limitation of Liability">
          <p>
            BioPeptide™ shall not be liable for any direct, indirect,
            incidental, consequential, or punitive damages arising from the use
            or misuse of products or website content.
          </p>
          <p className="mt-3">
            The purchaser agrees to indemnify and hold BioPeptide™ harmless from
            all claims, losses, and liabilities arising from product use.
          </p>
        </Section>

        {/* INTELLECTUAL */}
        <Section title="Trademarks & Intellectual Property">
          <p>
            All content on this website, including text, graphics, logos,
            images, and software, is the property of BioPeptide™ and protected
            by intellectual property laws.
          </p>
          <p className="mt-3">
            No content may be copied or distributed without written permission.
          </p>
        </Section>

        {/* SECURITY */}
        <Section title="Security">
          <p>
            We use industry-standard encryption technologies to protect sensitive
            information. All transactions are processed through secure systems.
          </p>
        </Section>

        {/* GOVERNING LAW */}
        <Section title="Governing Law">
          <p>
            These Terms shall be governed and construed in accordance with
            applicable laws. You are responsible for compliance with laws in
            your jurisdiction.
          </p>
        </Section>

        {/* AGREEMENT */}
        <Section title="Entire Agreement">
          <p>
            These Terms constitute the entire agreement between you and
            BioPeptide™. By placing an order and clicking “I Agree,” you accept
            all Terms, Conditions, and related policies.
          </p>
          <p className="mt-3 font-semibold text-gray-900">
            If you do not agree with these terms, DO NOT purchase from us.
          </p>
        </Section>
      </section>
    </main>
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
