//peptides/components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-16">

      {/* ===== BACKGROUND GRADIENT + TEXTURE ===== */}
      <div className="
        absolute inset-0 
        bg-gradient-to-b from-white via-[#f6fdfc] to-[#e5f7f5]
        pointer-events-none
      " />

      {/* Soft molecule pattern */}
      <div className="
        absolute inset-0 opacity-[0.08] 
        bg-[url('/patterns/molecule-pattern.png')] 
        bg-repeat 
        pointer-events-none
      " />

      {/* TOP BORDER LIGHT GLOW */}
      <div className="w-full h-[4px] bg-gradient-to-r from-bioBlue to-bioGreen opacity-40" />

      {/* ======= NEWSLETTER ======= */}
      <div className="relative max-w-6xl mx-auto px-6 py-14 text-center">
        <div className="
          bg-white/70 backdrop-blur-md
          border border-gray-200 rounded-2xl
          p-10 shadow-sm
          max-w-3xl mx-auto
        ">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Stay Updated with BioPeptide
          </h2>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Get research updates, promotions & exclusive offers.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                border border-gray-300 px-5 py-3 
                rounded-lg sm:rounded-l-lg 
                w-full sm:w-96 text-sm
                focus:ring-2 focus:ring-bioBlue/50 outline-none
                bg-white/80 backdrop-blur
              "
            />

            <button className="
              bg-gradient-to-r from-bioBlue to-bioGreen 
              hover:opacity-90 transition
              text-white px-6 py-3 
              rounded-lg sm:rounded-none sm:rounded-r-lg 
              font-semibold text-sm
            ">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ============= FOOTER GRID ============= */}
      <div className="relative border-t border-gray-200/70">
        <div className="
          max-w-6xl mx-auto px-6 py-14 
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
          gap-12
        ">

          {/* LOGO + TEXT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="
                h-12 w-12 rounded-full 
                bg-gradient-to-br from-bioBlue to-bioGreen 
                flex items-center justify-center 
                text-white text-xl font-bold shadow-md
              ">
                B
              </div>
              <span className="text-2xl font-bold text-gray-900">
                BIOPEPTIDE
              </span>
            </div>

            <p className="text-gray-600 text-sm">
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
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start space-y-4">
            <h3 className="font-semibold text-bioBlue">Support</h3>

            <ul className="space-y-3 text-gray-700 text-sm">
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
                <p className="text-xs text-gray-500">
                  Orders before 12PM ship next day
                </p>
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

      {/* COPYRIGHT */}
      <div className="relative bg-white/60 backdrop-blur-md border-t border-gray-200 py-6 text-center text-sm text-gray-600 px-4">
        © {new Date().getFullYear()} BioPeptide. All Rights Reserved.
      </div>

    </footer>
  );
}

/* Column */
function FooterColumn({ title, children }) {
  return (
    <div className="text-center sm:text-left space-y-3">
      <h3 className="font-semibold text-bioBlue">{title}</h3>
      <ul className="space-y-2 text-gray-700 text-sm">{children}</ul>
    </div>
  );
}

/* Link */
function FooterLink({ text }) {
  return (
    <li>
      <Link href="#" className="hover:text-bioGreen transition">
        {text}
      </Link>
    </li>
  );
}
