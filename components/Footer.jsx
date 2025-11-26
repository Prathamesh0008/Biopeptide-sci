//peptides\components\Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 mt-16">

      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">Stay Updated with BioPeptide</h2>
        <p className="text-gray-600 mt-2">Get research updates, promotions & exclusive offers.</p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 px-5 py-3 rounded-lg sm:rounded-l-lg w-full sm:w-96"
          />

          <button className="bg-gradient-to-r from-bioBlue to-bioGreen hover:opacity-90 
                             text-white px-6 py-3 rounded-lg sm:rounded-none sm:rounded-r-lg 
                             font-semibold transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Logo + Text */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-bioGreen flex items-center justify-center text-white text-xl font-bold">
                B
              </div>
              <span className="text-2xl font-bold text-gray-900">BIOPEPTIDE</span>
            </div>

            <p className="text-gray-600 mt-4">
              High-purity research peptides, trusted by labs & professionals worldwide.
            </p>
          </div>

          {/* Information */}
          <FooterColumn title="Information">
            <FooterLink text="All Peptides" />
            <FooterLink text="Bundle & Save" />
            <FooterLink text="Research Articles" />
            <FooterLink text="Lab Testing" />
            <FooterLink text="Our Company" />
          </FooterColumn>

          {/* Shop */}
          <FooterColumn title="Shop">
            <FooterLink text="Peptide Capsules" />
            <FooterLink text="Research Peptides" />
            <FooterLink text="Peptide Blends" />
            <FooterLink text="Amino Acids" />
            <FooterLink text="Proteins" />
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title="Legal">
            <FooterLink text="Privacy Policy" />
            <FooterLink text="Terms of Use" />
            <FooterLink text="Shipping Policy" />
            <FooterLink text="Refunds" />
            <FooterLink text="Accessibility" />
          </FooterColumn>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-bioGreen mb-3">Support</h3>

            <ul className="space-y-4 text-gray-700 text-sm">

              <li>
                <p className="font-medium">📞 Phone</p>
                <p>1-800-986-6401</p>
                <p className="text-xs text-gray-500">Mon–Fri, 9AM–4PM</p>
              </li>

              <li>
                <p className="font-medium">✉️ Email</p>
                <p>support@biopeptide.com</p>
              </li>

              <li>
                <p className="font-medium">📦 Shipping</p>
                <p className="text-xs text-gray-500">Orders before 12PM ship next day</p>
              </li>

              <li>
                <p className="font-medium">📍 Address</p>
                <p>BioPeptide Labs</p>
                <p>Boca Raton, FL</p>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-600 px-4">
        © {new Date().getFullYear()} BioPeptide. All Rights Reserved.
      </div>

    </footer>
  );
}

/* Short reusable footer column component */
function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold text-bioGreen mb-3">{title}</h3>
      <ul className="space-y-2 text-gray-700 text-sm">{children}</ul>
    </div>
  );
}

/* Short link component */
function FooterLink({ text }) {
  return (
    <li>
      <Link href="#" className="hover:text-bioBlue transition">
        {text}
      </Link>
    </li>
  );
}
