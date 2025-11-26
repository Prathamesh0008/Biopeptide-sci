//peptides\components\Navbar.jsx
"use client";

import Link from "next/link";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200">

      {/* Top colored strip with message */}
      <div className="w-full h-10 bg-gradient-to-r from-bioGreen via-bioGreen/80 to-bioBlue flex items-center justify-center text-white text-sm">
        Premium Research Peptides | High Purity • Fast Shipping • Trusted Quality
      </div>

      {/* Row 1: Logo | Search | Sign in + Cart */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-bioGreen/90 flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="text-xl font-semibold tracking-tight text-gray-900">BIOPEPTIDE</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm 
                         focus:ring-2 focus:ring-bioBlue/80 outline-none"
            />
          </div>
        </div>

        {/* Sign In + Cart */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-800">
          <Link href="/login" className="flex items-center gap-2 hover:text-bioBlue">
            <FaUser className="text-gray-800" />
            <span>Sign in</span>
          </Link>

          <Link href="/cart" className="flex items-center gap-2 hover:text-bioBlue">
            <FaShoppingCart className="text-gray-800" />
            <span>My Cart</span>
          </Link>
        </div>

      </div>

      {/* Row 2: Navigation Links */}
      <div className="border-t border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-8 text-[15px] text-gray-700">
          <MenuItem title="All Peptides" href="/all-peptides" />
          <MenuItem title="Popular Peptides" href="/popular-peptides" />
          <MenuItem title="Bundle & Save" href="/bundle-save" />
          <MenuItem title="Peptide Research" href="/peptide-research" />
          <MenuItem title="Peptide Information" href="/peptide-information" />
          <MenuItem title="Research Videos" href="/research-videos" />
          <MenuItem title="Our Company" href="/company" />
          <MenuItem title="Contact Us" href="/contact" />
        </nav>
      </div>

    </header>
  );
}

/* Simple nav link */
function MenuItem({ title, href }) {
  return (
    <Link
      href={href}
      className="hover:text-bioBlue transition-colors whitespace-nowrap"
    >
      {title}
    </Link>
  );
}
