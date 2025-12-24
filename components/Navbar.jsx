//components\Navbar.jsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
const [profileOpen, setProfileOpen] = useState(false);
const profileRef = useRef(null);
const [suggestions, setSuggestions] = useState([]);
const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
const searchRef = useRef(null);




useEffect(() => {
  const stored = localStorage.getItem("bio-user");
  if (stored) {
    setUser(JSON.parse(stored));
  }
}, []);
useEffect(() => {
  function handleClickOutside(e) {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  }

  if (profileOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [profileOpen]);
useEffect(() => {
  function handleOutsideSearch(e) {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  }

  document.addEventListener("mousedown", handleOutsideSearch);
  return () =>
    document.removeEventListener("mousedown", handleOutsideSearch);
}, []);




  const handleNavigate = (href) => {
    setLoading(true);
    setTimeout(() => {
      router.push(href);
      setLoading(false);
      setMenuOpen(false);
    }, 600);
  };

  const handleSearch = (e) => {
  if (e.key === "Enter" && query.trim() !== "") {
    setSuggestions([]);
    router.push(`/search?query=${query}`);
    setMenuOpen(false);
    setQuery("");
  }
};

  const handleSearchChange = (value) => {
  setQuery(value);

  if (!value.trim()) {
    setSuggestions([]);
    return;
  }

  const filtered = PRODUCTS
  .filter((p) =>
    p.name.toLowerCase().includes(value.toLowerCase())
  )
  .slice(0, 6);

  setSuggestions(filtered);
};


  return (
    <header
  className="
    w-full
    sticky top-0 z-[999]
    relative
    bg-white
    border-b border-gray-200
  "
>
      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="flex gap-2">
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
            <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
            <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
          </div>
        </div>
      )}

      {/* TOP TAGLINE */}
      <div className="w-full h-10 bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
                flex items-center justify-center text-white text-sm md:text-base">
  <p className="text-[11px] sm:text-[12px] md:text-[14px] font-medium whitespace-nowrap">
    Premium Research Peptides • High Purity • Fast Shipping
  </p>
</div>


      {/* MAIN NAVBAR */}
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

        {/* DESKTOP SEARCH */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
        <div ref={searchRef} className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
            {suggestions.length > 0 && (
  <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg mt-2 z-50">
    {suggestions.map((item) => (
      <button
        key={item.id}
        onClick={() => {
          setSuggestions([]);
          setQuery("");
          router.push(`/product/${item.slug}`);
        }}
        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
      >
        {item.name}
        <span className="block text-xs text-gray-500">
          {item.strength}
        </span>
      </button>
    ))}
  </div>
)}

            <input
              type="text"
              placeholder="Search products or pages..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm 
                         focus:ring-2 focus:ring-bioBlue/80 outline-none"
            />
          </div>
        </div>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {!user ? (
  <button
    onClick={() => handleNavigate("/login")}
    className="flex items-center gap-2 hover:text-bioBlue cursor-pointer"
  >
    <FaUser className="text-gray-600" />
    <span>Sign in</span>
  </button>
) : (
  <div ref={profileRef} className="relative">
    <button
      onClick={() => setProfileOpen(!profileOpen)}
      className="flex items-center gap-2 hover:text-bioBlue cursor-pointer"
    >
      <FaUser className="text-gray-600" />
      <span className="font-medium">
        {user.name || "Profile"}
      </span>
    </button>

    {profileOpen && (
      <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
        <button
          onClick={() => {
            setProfileOpen(false);
            router.push("/profile");
          }}
          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
        >
          My Profile
        </button>
        <button
  onClick={() => {
    setProfileOpen(false);
    router.push("/orders");
  }}
  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
>
  My Orders
</button>


        <button
          onClick={() => {
            localStorage.removeItem("bio-user");
            setUser(null);
            setProfileOpen(false);
            router.push("/");
          }}
          className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}


          <button onClick={() => handleNavigate("/cart")} 
          className="flex items-center gap-2 hover:text-bioBlue cursor-pointer">
            <FaShoppingCart className="text-gray-600" />

            <span>My Cart</span>
          </button>
        </div>

        {/* MOBILE ICONS — SEARCH + CART */}
        <div className="flex md:hidden items-center gap-4 text-xl text-gray-700">

          {/* SEARCH ICON MOBILE */}
          <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
        <FaSearch className="text-gray-600" />
      </button>

          {/* CART ICON MOBILE */}
          <button onClick={() => handleNavigate("/cart")}>
            <FaShoppingCart className="text-gray-600" />
          </button>

          {/* HAMBURGER ANIMATED */}
          <button
            className="relative w-8 h-8 flex flex-col justify-center items-center md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 
              ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 my-1
              ${menuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 
              ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </button>
        </div>
      </div>
      {/* MOBILE SEARCH BAR — BELOW NAVBAR */}
{mobileSearchOpen && (
  <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 relative z-[998]">
    <div ref={searchRef} className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      <input
        autoFocus
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => handleSearchChange(e.target.value)}
        onKeyDown={handleSearch}
        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm
                   focus:ring-2 focus:ring-bioBlue outline-none"
      />

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg mt-2 z-50">
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSuggestions([]);
                setQuery("");
                setMobileSearchOpen(false);
                router.push(`/product/${item.slug}`);
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
            >
              {item.name}
              <span className="block text-xs text-gray-500">
                {item.strength}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
)}


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

      {/* MOBILE MENU — SLIDE DOWN ANIMATION */}
      <div
  className={`
    md:hidden
    bg-white
    text-gray-700
    overflow-hidden
    border-t border-gray-200
    transition-all duration-300 ease-out
    ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
  `}
>

        <div className="px-6 py-4 space-y-4">

          

          {/* MENU LINKS */}
          <div className="flex flex-col gap-4 text-white text-[16px] items-start text-left">
            <MenuItem title="All Peptides" onClick={() => handleNavigate("/all-peptides")} />
            <MenuItem title="Popular Peptides" onClick={() => handleNavigate("/popular-peptides")} />
            <MenuItem title="Bundle & Save" onClick={() => handleNavigate("/bundle-save")} />
            <MenuItem title="Peptide Research" onClick={() => handleNavigate("/peptide-research")} />
            <MenuItem title="Peptide Information" onClick={() => handleNavigate("/peptide-information")} />
            <MenuItem title="Research Videos" onClick={() => window.open("https://www.youtube.com/@yourchannel", "_blank")} />
            <MenuItem title="Our Company" onClick={() => handleNavigate("/about")} />
            <MenuItem title="Contact Us" onClick={() => handleNavigate("/contact")} />
          </div>

          {/* SIGN IN & CART */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            {!user ? (
  <button
    onClick={() => handleNavigate("/login")}
    className="flex items-center gap-2 hover:text-bioBlue cursor-pointer"
  >
    <FaUser className="text-gray-600" />
    <span>Sign in</span>
  </button>
) : (
  <>
    <button
      onClick={() => handleNavigate("/profile")}
      className="flex items-center gap-2 hover:text-bioBlue"
    >
      <FaUser className="text-gray-600" />
      <span>My Profile</span>
    </button>

    <button
      onClick={() => {
        localStorage.removeItem("bio-user");
        setUser(null);
        handleNavigate("/");
      }}
      className="flex items-center gap-2 text-red-500"
    >
      Logout
    </button>
  </>
)}


            <button onClick={() => handleNavigate("/cart")}
             className="flex items-center gap-2 hover:text-bioBlue cursor-pointer">
             <FaShoppingCart className="text-gray-600" />
<span className="text-gray-700">My Cart</span>
            </button>
          </div>

        </div>
      </div>
      

    </header>
  );
}

function MenuItem({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-gray-700 hover:text-[#65b4d7] transition-colors cursor-pointer"
    >
      {title}
    </button>
  );
}

