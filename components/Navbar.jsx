//peptides/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");   // <-- SEARCH STATE
  const router = useRouter();

  const handleNavigate = (href) => {
    setLoading(true);
    setTimeout(() => {
      router.push(href);
      setLoading(false);
      setMenuOpen(false);
    }, 600);
  };

  // 🔍 SEARCH HANDLER — ON ENTER PRESS
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/search?query=${query}`);
      setMenuOpen(false);
      setQuery(""); // clear input
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 relative">

      {/* LOADER */}
      {loading && (
        <div className="
          fixed inset-0 
          bg-white/90 backdrop-blur-sm
          flex items-center justify-center 
          z-[9999]
        ">
          <div className="flex gap-2">
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
            <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
          </div>
        </div>
      )}

      {/* TOP : TAGLINE */}
      <div className="w-full h-10 bg-gradient-to-r from-bioGreen via-bioGreen/80 to-bioBlue 
                      flex items-center justify-center text-white text-sm md:text-base">
        <p className="text-[11px] sm:text-[12px] md:text-[14px] font-medium whitespace-nowrap">
          Premium Research Peptides • High Purity • Fast Shipping
        </p>
      </div>

      {/* MAIN BAR */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* LOGO */}
        <div
          onClick={() => handleNavigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="h-10 w-10 rounded-full bg-bioGreen/90 flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="text-xl font-semibold tracking-tight text-gray-900">
            BIOPEPTIDE
          </span>
        </div>

        {/* DESKTOP SEARCH BAR */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Search products or pages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm 
                         focus:ring-2 focus:ring-bioBlue/80 outline-none"
            />
          </div>
        </div>

        {/* ICONS DESKTOP */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-800">
          <button onClick={() => handleNavigate("/login")} className="flex items-center gap-2 hover:text-bioBlue">
            <FaUser className="text-gray-800" />
            <span>Sign in</span>
          </button>

          <button onClick={() => handleNavigate("/cart")} className="flex items-center gap-2 hover:text-bioBlue">
            <FaShoppingCart className="text-gray-800" />
            <span>My Cart</span>
          </button>
        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-gray-800 text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* DESKTOP LINKS */}
      <div className="border-t border-gray-200 hidden md:block">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-8 text-[15px] text-gray-700">
          <MenuItem title="All Peptides" onClick={() => handleNavigate("/all-peptides")} />
          <MenuItem title="Popular Peptides" onClick={() => handleNavigate("/popular-peptides")} />
          <MenuItem title="Bundle & Save" onClick={() => handleNavigate("/bundle-save")} />
          <MenuItem title="Peptide Research" onClick={() => handleNavigate("/peptide-research")} />
          <MenuItem title="Peptide Information" onClick={() => handleNavigate("/peptide-information")} />
          <MenuItem title="Research Videos" onClick={() => window.open("https://www.youtube.com/@yourchannel", "_blank")} />
          <MenuItem title="Our Company" onClick={() => handleNavigate("/about")} />
          <MenuItem title="Contact Us" onClick={() => handleNavigate("/contact")} />
        </nav>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-4">

          {/* MOBILE SEARCH BAR */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Search products or pages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm 
                         focus:ring-2 focus:ring-bioBlue/80 outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 text-gray-700 text-[16px]">
            <MenuItem title="All Peptides" onClick={() => handleNavigate("/all-peptides")} />
            <MenuItem title="Popular Peptides" onClick={() => handleNavigate("/popular-peptides")} />
            <MenuItem title="Bundle & Save" onClick={() => handleNavigate("/bundle-save")} />
            <MenuItem title="Peptide Research" onClick={() => handleNavigate("/peptide-research")} />
            <MenuItem title="Peptide Information" onClick={() => handleNavigate("/peptide-information")} />
            <MenuItem title="Research Videos" onClick={() => window.open("https://www.youtube.com/@yourchannel", "_blank")} />
            <MenuItem title="Our Company" onClick={() => handleNavigate("/about")} />
            <MenuItem title="Contact Us" onClick={() => handleNavigate("/contact")} />
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            <button onClick={() => handleNavigate("/login")} className="flex items-center gap-2 hover:text-bioBlue">
              <FaUser className="text-gray-800" />
              <span>Sign in</span>
            </button>

            <button onClick={() => handleNavigate("/cart")} className="flex items-center gap-2 hover:text-bioBlue">
              <FaShoppingCart className="text-gray-800" />
              <span>My Cart</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuItem({ title, onClick }) {
  return (
    <button onClick={onClick} className="hover:text-bioBlue transition-colors">
      {title}
    </button>
  );
}
