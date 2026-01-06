// components/Navbar.jsx 
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaShoppingCart, FaGlobe } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext"; 
import CartDrawer from "@/components/CartDrawer";
import { usePathname } from "next/navigation";
import ScrollProgressLine from "@/components/ScrollProgressLine";




export default function Navbar() {
  const { loadLanguage, translations } = useLanguage();
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = () => {
  const storedUser = localStorage.getItem("bio-user");
  const key = storedUser
    ? `bio-cart-${JSON.parse(storedUser).email}`
    : "guest-cart";

  const cart = JSON.parse(localStorage.getItem(key) || "[]");

  return cart.reduce((sum, item) => sum + item.qty, 0);
};



const t = (path) => {
  try {
    return path
      .split(".")
      .reduce((obj, key) => obj?.[key], translations?.navbar || {});
  } catch {
    return "";
  }
};

  
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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const languageRef = useRef(null);
  const pathname = usePathname();
  const POPULAR_KEYWORDS = [
  "bpc-157",
  "tb-500",
  "cjc-1295",
  "ipamorelin",
  "tesamorelin",
];


const [searchFocused, setSearchFocused] = useState(false);

  // ✅ ONLY CHANGED: Added loadLanguage call
  const changeLanguage = async (code) => {
    await loadLanguage(code);
    setLanguage(code);
    localStorage.setItem("bio-lang", code);
    setLanguageOpen(false);
  };
  

const LANGUAGES = [
  { code: "en", label: "English", flag: "us" },
  { code: "ar", label: "Arabic", flag: "sa" },
  { code: "de", label: "German", flag: "de" },
  { code: "es", label: "Spanish", flag: "es" },
  { code: "nl", label: "Dutch", flag: "nl" },
  { code: "pt", label: "Portuguese", flag: "pt" },
  { code: "ja", label: "Japanese", flag: "jp" },
  { code: "zh", label: "Chinese", flag: "cn" },
  { code: "fr", label: "French", flag: "fr" },

  // ✅ NEW — Balkans / EU
  { code: "ro", label: "Romanian", flag: "ro" },
  { code: "sq", label: "Albanian", flag: "al" },
  { code: "el", label: "Greek", flag: "gr" },
  { code: "bg", label: "Bulgarian", flag: "bg" },
  { code: "mk", label: "Macedonian", flag: "mk" },
  { code: "sr", label: "Serbian", flag: "rs" },
  { code: "hr", label: "Croatian", flag: "hr" },
  { code: "bs", label: "Bosnian", flag: "ba" },
];


useEffect(() => {
  const updateCount = () => {
    setCartCount(getCartCount());
  };

  updateCount(); // initial load

  window.addEventListener("bio-cart-count-updated", updateCount);

  return () => {
    window.removeEventListener("bio-cart-count-updated", updateCount);
  };
}, []);


  

  useEffect(() => {
  // initial load
  setCartCount(getCartCount());

  const update = () => {
    setCartCount(getCartCount());
  };

  window.addEventListener("bio-cart-updated", update);
  window.addEventListener("storage", update);

  return () => {
    window.removeEventListener("bio-cart-updated", update);
    window.removeEventListener("storage", update);
  };
}, []);


  useEffect(() => {
  if (!menuOpen) setLanguageOpen(false);
}, [menuOpen]);

useEffect(() => {
  const syncUser = () => {
    const stored = localStorage.getItem("bio-user");
    setUser(stored ? JSON.parse(stored) : null);

    // ✅ ADD THIS LINE
    setCartCount(getCartCount());
  };

  syncUser();
  window.addEventListener("storage", syncUser);
  window.addEventListener("bio-user-updated", syncUser);

  return () => {
    window.removeEventListener("storage", syncUser);
    window.removeEventListener("bio-user-updated", syncUser);
  };
}, []);



 useEffect(() => {
  function handleProfileOutside(e) {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  }

  if (profileOpen) {
    document.addEventListener("click", handleProfileOutside);
  }

  return () => {
    document.removeEventListener("click", handleProfileOutside);
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

  useEffect(() => {
    const savedLang = localStorage.getItem("bio-lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    function handleLanguageOutside(e) {
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handleLanguageOutside);
    return () => document.removeEventListener("mousedown", handleLanguageOutside);
  }, [languageOpen]);

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
        text-gray-700
        border-b border-gray-200
      "
    >
      <CartDrawer />

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
      {/* <div className="w-full h-10">
  <div className="max-w-7xl mx-auto h-full flex items-center justify-center px-4">
    <p className="text-grey-700 text-[11px] sm:text-[12px] md:text-[14px] font-medium text-center w-full">
      {t("tagline")}
    </p>
  </div>
</div> */}


      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px3 sm:px-6 py-4 flex items-center justify-between gap-6">

        
        {/* LOGO */}
<div
  onClick={() => handleNavigate("/")}
  className="cursor-pointer flex items-center h-12 w-auto 
           -ml-4 sm:-ml-6 md:-ml-8"

>
  <Link
  href="/"
  className="flex items-center h-12 w-auto 
             -ml-4 sm:-ml-6 md:-ml-8
             cursor-pointer"
>
  <Image
    src="/images/logo1.png"
    alt="BioPeptide Logo"
    width={300}
    height={80}
    className="object-contain"
    priority
  />
</Link>


</div>




        {/* DESKTOP SEARCH */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <div ref={searchRef} className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              {/* {suggestions.length > 0 && (
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
            )} */}

              <input
  type="text"
  placeholder={t("search.desktop")}
  value={query}
  onChange={(e) => handleSearchChange(e.target.value)}
  onKeyDown={handleSearch}
  onFocus={() => setSearchFocused(true)}
  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
  className="w-full border border-gray-300 bg-white text-gray-700 rounded-lg
             pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-bioBlue/80 outline-none"
/>
{searchFocused && (
  <div className="absolute top-full left-0 w-full bg-white border rounded-2xl shadow-xl mt-2 z-50 p-4">

    {/* POPULAR KEYWORDS */}
    {query.trim() === "" && (
      <>
        <p className="text-xs font-semibold text-gray-500 mb-2">
          Popular Keywords
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {POPULAR_KEYWORDS.map((key) => (
            <button
              key={key}
              onClick={() => {
                setQuery(key);
                handleSearchChange(key);
              }}
              className="px-3 py-1.5 text-xs rounded-full bg-gray-100 hover:bg-gray-200"
            >
              {key}
            </button>
          ))}
        </div>
      </>
    )}

    {/* PRODUCT CARDS */}
    {suggestions.length > 0 && (
      <div className="grid grid-cols-1 gap-3">
        {suggestions.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSuggestions([]);
              setQuery("");
              router.push(`/product/${item.slug}`);
            }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 text-left"
          >
            {/* IMAGE */}
            <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={item.image || "/images/placeholder.png"}
                alt={item.name}
                width={56}
                height={56}
                className="object-contain"
              />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">
                {item.strength}
              </p>
            </div>
          </button>
        ))}
      </div>
    )}

  </div>
)}

            </div>
        </div>

        {/* DESKTOP ICONS */}
  <div className="hidden md:flex items-center gap-5 text-sm text-gray-700 font-medium whitespace-nowrap">

          {/* USER PROFILE */}
          {!user ? (
            <button
              onClick={() => handleNavigate("/login")}
              className="flex items-center gap-1.5 text-sm hover:text-bioBlue cursor-pointer"
            >
              <FaUser className="text-gray-700" />
              <span>{t("auth.signIn")}</span>
            </button>
          ) : (
            <div ref={profileRef} className="relative">
              <button
  onClick={(e) => {
    e.stopPropagation();        // 🔥 THIS LINE WAS MISSING
    setProfileOpen((v) => !v);
  }}
  className="flex items-center gap-1.5 text-sm hover:text-bioBlue cursor-pointer"
>

                <FaUser className="text-gray-700" />
                <span className="font-medium">
                  {user.name || "Profile"}
                </span>
              </button>

  {profileOpen && (
  <div
    onClick={(e) => e.stopPropagation()}
    className="
      absolute right-0 mt-3 w-48
      bg-white border rounded-xl shadow-lg
      overflow-hidden z-50
      flex flex-col
    "
  >
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
        window.dispatchEvent(new Event("bio-user-updated"));
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

        {/* ✅ LANGUAGE SWITCHER (GREY STYLE) */}
<div ref={languageRef} className="relative hidden md:block">
  <button
    onClick={() => setLanguageOpen((v) => !v)}
    className="flex items-center  cursor-pointer gap-1 h-8 px-3 rounded-md border border-gray-300 text-gray-700 hover:text-bioBlue hover:bg-bioBlue/10 transition"
  >
    <FaGlobe className="text-gray-700 group-hover:text-bioBlue" />
    <span className="text-sm font-medium">{language.toUpperCase()}</span>
  </button>

  {languageOpen && (
    <div className="absolute right-0 mt-2 w-44 rounded-md bg-white text-black shadow-lg border border-gray-100 z-50">
     {LANGUAGES.map(({ code, label, flag }) => (

        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`block w-full px-4 py-2 text-left text-sm hover:bg-bioBlue/10 ${
            language === code ? "bg-bioBlue/20 text-bioBlue font-semibold" : "text-gray-700"
          }`}
        >
         <span className="flex items-center gap-2 cursor-pointer">
  <img
  src={`https://flagcdn.com/w20/${flag}.png`}
  alt={label}
  className="w-5 h-4 rounded-sm"
/>

  <span>{label}</span>
</span>

        </button>
      ))}
    </div>
  )}
</div>


         <button
  onClick={() => handleNavigate("/cart")}
  className="flex items-center gap-1.5 text-sm hover:text-bioBlue cursor-pointer"
>
  {/* ICON WRAPPER */}
  <div className="relative">
    <FaShoppingCart className="text-gray-600 text-lg" />

    {/* CART COUNT BADGE */}
    {cartCount > 0 && (
      <span
        className="
          absolute -top-2 -right-2
          bg-red-500 text-white
          text-[10px] font-bold
          w-5 h-5
          flex items-center justify-center
          rounded-full
          leading-none
          pointer-events-none
        "
      >
        {cartCount}
      </span>
    )}
  </div>

  {/* TEXT — NEVER OVERLAPPED */}
  <span>{t("cart")}</span>
</button>


        </div>

        {/* MOBILE ICONS — SEARCH + CART */}
        <div className="flex md:hidden items-center gap-4 text-xl text-gray-700">

          {/* SEARCH ICON MOBILE */}
          <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
            <FaSearch className="text-gray-700" />
          </button>

          {/* CART ICON MOBILE */}
<button
  onClick={() => handleNavigate("/cart")}
  className="relative"
>
  <FaShoppingCart className="text-gray-600 text-xl" />

  {/* CART COUNT BADGE */}
  {cartCount > 0 && (
    <span
      className="
        absolute -top-2 -right-2
        bg-red-500 text-white
        text-[10px] font-bold
        w-5 h-5
        flex items-center justify-center
        rounded-full
        leading-none
        pointer-events-none
      "
    >
      {cartCount}
    </span>
  )}
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
        placeholder={t("search.mobile")}
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
<div className="hidden md:block border-t border-gray-200">
  {/* FULL WIDTH BACKGROUND */}
  <div className="w-full ">
    
    {/* CENTERED CONTENT */}
    <nav
  className="
    max-w-7xl mx-auto
    h-[52px]
    px-6
    flex items-center justify-center
    gap-2
    text-grey-700
    text-[15.5px]
    font-semibold
    flex-nowrap overflow-hidden
  "
>


      <MenuItem
  title={t("menu.allPeptides")}
  onClick={() => handleNavigate("/all-peptides")}
  active={pathname === "/all-peptides"}
/>

      <MenuItem title={t("menu.popular")} onClick={() => handleNavigate("/popular-peptides")} active={pathname === "/popular-peptides"} />

<MenuItem title={t("menu.bundle")} onClick={() => handleNavigate("/bundle-save")} active={pathname === "/bundle-save"} />

<MenuItem title={t("menu.research")} onClick={() => handleNavigate("/peptide-research")} active={pathname === "/peptide-research"} />

<MenuItem title={t("menu.information")} onClick={() => handleNavigate("/peptide-information")} active={pathname === "/peptide-information"} />
<MenuItem title={t("menu.videos") || "Research Videos"} onClick={() =>  window.open( "https://www.youtube.com/@yourchannel", "_blank")}/>
  
 
   


<MenuItem title={t("menu.company")} onClick={() => handleNavigate("/about")} active={pathname === "/about"} />

<MenuItem title={t("menu.contact")} onClick={() => handleNavigate("/contact")} active={pathname === "/contact"} />

    </nav>

  </div>
</div>


      {/* MOBILE MENU — SLIDE DOWN ANIMATION */}
      <div
  className={`
    md:hidden
    bg-white
    text-gray-700
    border-t border-gray-200
    transition-all duration-300 ease-out
    ${menuOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}
  `}
>



        <div className="px-6 py-4 space-y-4">


          {/* MENU LINKS */}
<div className="flex flex-col gap-4 text-gray-700 text-[16px] items-start text-left">
  <MenuItem title={t("menu.allPeptides")} onClick={() => handleNavigate("/all-peptides")} />
  <MenuItem title={t("menu.popular")} onClick={() => handleNavigate("/popular-peptides")} />
  <MenuItem title={t("menu.bundle")} onClick={() => handleNavigate("/bundle-save")} />
  <MenuItem title={t("menu.research")} onClick={() => handleNavigate("/peptide-research")} />
  <MenuItem title={t("menu.information")} onClick={() => handleNavigate("/peptide-information")} />
  <MenuItem title={t("menu.videos")} onClick={() => window.open("https://www.youtube.com/@yourchannel", "_blank")} />
  <MenuItem title={t("menu.company")} onClick={() => handleNavigate("/about")} />
  <MenuItem title={t("menu.contact")} onClick={() => handleNavigate("/contact")} />
</div>

{/* 🌍 LANGUAGE (MOBILE DROPDOWN) */}
<div className="pt-4 border-t border-gray-200">
  <button
    onClick={() => setLanguageOpen((v) => !v)}
    className="w-full flex items-center justify-between text-sm text-gray-700"
  >
    <span>Language</span>
    <span className="text-gray-500">{language.toUpperCase()}</span>
  </button>

  {languageOpen && (
    <div className="mt-2 flex flex-col">
      {LANGUAGES.map(({ code, label, flag }) => (

        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`px-3 py-2 text-sm text-left ${
            language === code
              ? "text-bioBlue font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
        <span className="flex items-center gap-2 cursor-pointer">
  <span className="text-lg">{flag}</span>
  <span>{label}</span>
</span>

        </button>
      ))}
    </div>
  )}
</div>


          {/* SIGN IN & CART */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            {!user ? (
              <button
                onClick={() => handleNavigate("/login")}
               className="flex items-center gap-1.5 text-sm hover:text-bioBlue cursor-pointer"
              >
                <FaUser className="text-gray-700" />
                <span>{t("auth.signIn")}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="flex items-center gap-2 hover:text-bioBlue"
                >
                  <FaUser className="text-gray-700" />
                  <span>{t("auth.profile")}</span>
                </button>

                <button
                 onClick={() => {
  localStorage.removeItem("bio-user");

  // 🔥 tell Navbar user is gone
  window.dispatchEvent(new Event("bio-user-updated"));

  setUser(null);
  handleNavigate("/");
}}

                  className="flex items-center gap-2 text-red-500"
                >
                  {t("auth.logout")}
                </button>
              </>
            )}

          <button
  onClick={() => handleNavigate("/cart")}
  className="flex items-center gap-1.5 text-sm hover:text-bioBlue cursor-pointer"
>
  {/* ICON WRAPPER */}
  <div className="relative">
    <FaShoppingCart className="text-gray-600 text-lg" />

    {/* CART COUNT BADGE */}
    {cartCount > 0 && (
      <span
        className="
          absolute -top-2 -right-2
          bg-red-500 text-white
          text-[10px] font-bold
          w-5 h-5
          flex items-center justify-center
          rounded-full
          leading-none
          pointer-events-none
        "
      >
        {cartCount}
      </span>
    )}
  </div>

  {/* TEXT — NEVER OVERLAPPED */}
  <span>{t("cart")}</span>
</button>


          </div>

        </div>
      </div>
      
<ScrollProgressLine />
    </header>
  );
}

function MenuItem({ title, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        px-4 py-2
        whitespace-nowrap
        transition-all duration-200
        cursor-pointer

        ${
          active
            ? "text-bioBlue font-semibold"
            : "hover:text-bioBlue"
        }
      `}
    >
      {title}

      {active && (
        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-bioBlue rounded-full" />
      )}
    </button>
  );
}


























// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import { FaSearch, FaUser, FaShoppingCart, FaGlobe } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { PRODUCTS } from "@/data/products";



// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const router = useRouter();
//   const [user, setUser] = useState(null);
// const [profileOpen, setProfileOpen] = useState(false);
// const profileRef = useRef(null);
// const [suggestions, setSuggestions] = useState([]);
// const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
// const searchRef = useRef(null);
// const [languageOpen, setLanguageOpen] = useState(false);
// const [language, setLanguage] = useState("en");

// const languageRef = useRef(null);





// useEffect(() => {
//   const stored = localStorage.getItem("bio-user");
//   if (stored) {
//     setUser(JSON.parse(stored));
//   }
// }, []);

// useEffect(() => {
//   function handleProfileOutside(e) {
//     if (profileRef.current && !profileRef.current.contains(e.target)) {
//       setProfileOpen(false);
//     }
//   }

//   if (profileOpen) {
//     document.addEventListener("mousedown", handleProfileOutside);
//   }

//   return () => {
//     document.removeEventListener("mousedown", handleProfileOutside);
//   };
// }, [profileOpen]);


// useEffect(() => {
//   function handleOutsideSearch(e) {
//     if (searchRef.current && !searchRef.current.contains(e.target)) {
//       setSuggestions([]);
//     }
//   }

//   document.addEventListener("mousedown", handleOutsideSearch);
//   return () =>
//     document.removeEventListener("mousedown", handleOutsideSearch);
// }, []);

// useEffect(() => {
//   const savedLang = localStorage.getItem("bio-lang");
//   if (savedLang) setLanguage(savedLang);
// }, []);

// useEffect(() => {
//   function handleLanguageOutside(e) {
//     if (languageRef.current && !languageRef.current.contains(e.target)) {
//       setLanguageOpen(false);
//     }
//   }

//   document.addEventListener("mousedown", handleLanguageOutside);
//   return () => document.removeEventListener("mousedown", handleLanguageOutside);
// }, []);




//   const handleNavigate = (href) => {
//     setLoading(true);
//     setTimeout(() => {
//       router.push(href);
//       setLoading(false);
//       setMenuOpen(false);
//     }, 600);
//   };

//   const handleSearch = (e) => {
//   if (e.key === "Enter" && query.trim() !== "") {
//     setSuggestions([]);
//     router.push(`/search?query=${query}`);
//     setMenuOpen(false);
//     setQuery("");
//   }
// };

//   const handleSearchChange = (value) => {
//   setQuery(value);

//   if (!value.trim()) {
//     setSuggestions([]);
//     return;
//   }

//   const filtered = PRODUCTS
//   .filter((p) =>
//     p.name.toLowerCase().includes(value.toLowerCase())
//   )
//   .slice(0, 6);

//   setSuggestions(filtered);
// };

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "ar", label: "Arabic" },
//   { code: "de", label: "German" },
//   { code: "es", label: "Spanish" },
//   { code: "nl", label: "Dutch" },
//   { code: "pt", label: "Portuguese" },
//   { code: "ja", label: "Japanese" },
//   { code: "zh", label: "Chinese" },
//   { code: "fr", label: "French" },
// ];

//   return (
//     <header
//   className="
//     w-full
//     sticky top-0 z-[999]
//     relative
//     bg-white
//     border-b border-gray-200
//   "
// >
//       {/* LOADER */}
//       {loading && (
//         <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-[9999]">
//           <div className="flex gap-2">
//             <div className="w-2 h-10 bg-bioBlue animate-pulse rounded"></div>
//             <div className="w-2 h-10 bg-bioGreen animate-pulse rounded delay-150"></div>
//             <div className="w-2 h-10 bg-bioBlue animate-pulse rounded delay-300"></div>
//           </div>
//         </div>
//       )}

//       {/* TOP TAGLINE */}
//       <div className="w-full h-10 bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
//                 flex items-center justify-center text-white text-sm md:text-base">
//   <p className="text-[11px] sm:text-[12px] md:text-[14px] font-medium whitespace-nowrap">
//     Premium Research Peptides • High Purity • Fast Shipping
//   </p>
// </div>


//       {/* MAIN NAVBAR */}
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
      
//         {/* LOGO */}
//         <div
//           onClick={() => handleNavigate("/")}
//           className="flex items-center gap-2 cursor-pointer"
//         >
//           <div className="h-10 w-10 rounded-full bg-bioGreen/90 flex items-center justify-center text-white font-bold text-lg">
//             B
//           </div>
//           <span className="text-xl font-semibold tracking-tight text-gray-900">
//   BIOPEPTIDE
// </span>


//         </div>

//         {/* DESKTOP SEARCH */}
//         <div className="flex-1 max-w-2xl mx-auto hidden md:block">
//         <div ref={searchRef} className="relative">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
//             {suggestions.length > 0 && (
//   <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg mt-2 z-50">
//     {suggestions.map((item) => (
//       <button
//         key={item.id}
//         onClick={() => {
//           setSuggestions([]);
//           setQuery("");
//           router.push(`/product/${item.slug}`);
//         }}
//         className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
//       >
//         {item.name}
//         <span className="block text-xs text-gray-500">
//           {item.strength}
//         </span>
//       </button>
//     ))}
//   </div>
// )}

//             <input
//               type="text"
//               placeholder="Search products or pages..."
//               value={query}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               onKeyDown={handleSearch}
//               className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm 
//                          focus:ring-2 focus:ring-bioBlue/80 outline-none"
//             />
//           </div>
//         </div>

//         {/* DESKTOP ICONS */}
//         <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
//           {/* LANGUAGE DROPDOWN */}

//           {!user ? (
//   <button
//     onClick={() => handleNavigate("/login")}
//     className="flex items-center gap-2 hover:text-bioBlue cursor-pointer"
//   >
//     <FaUser className="text-gray-600" />
//     <span>Sign in</span>
//   </button>
// ) : (
//   <div ref={profileRef} className="relative">
//     <button
//       onClick={() => setProfileOpen(!profileOpen)}
//       className="flex items-center gap-2 hover:text-bioBlue cursor-pointer"
//     >
//       <FaUser className="text-gray-600" />
//       <span className="font-medium">
//         {user.name || "Profile"}
//       </span>
//     </button>

//     {profileOpen && (
//       <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
//         <button
//           onClick={() => {
//             setProfileOpen(false);
//             router.push("/profile");
//           }}
//           className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
//         >
//           My Profile
//         </button>
//         <button
//   onClick={() => {
//     setProfileOpen(false);
//     router.push("/orders");
//   }}
//   className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
// >
//   My Orders
// </button>


//         <button
//           onClick={() => {
//             localStorage.removeItem("bio-user");
//             setUser(null);
//             setProfileOpen(false);
//             router.push("/");
//           }}
//           className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
//         >
//           Logout
//         </button>
//       </div>
//     )}
//   </div>
// )}

// {/* LANGUAGE DROPDOWN */}
// <div ref={languageRef} className="relative">
//   <button
//     onClick={() => setLanguageOpen(!languageOpen)}
//     className="flex items-center gap-1 hover:text-bioBlue cursor-pointer"
//   >
//     <FaGlobe className="text-gray-600" /> {/* <-- updated here */}
//     <span className="uppercase">{language}</span>
//   </button>

//   {languageOpen && (
//     <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50">
//       {LANGUAGES.map((lang) => (
//         <button
//           key={lang.code}
//           onClick={() => {
//             setLanguage(lang.code);
//             localStorage.setItem("bio-lang", lang.code);
//             setLanguageOpen(false);
//           }}
//           className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//         >
//           {lang.label}
//         </button>
//       ))}
//     </div>
//   )}
// </div>


//           <button onClick={() => handleNavigate("/cart")} 
//           className="flex items-center gap-2 hover:text-bioBlue cursor-pointer">
//             <FaShoppingCart className="text-gray-600" />

//             <span>My Cart</span>
//           </button>
//         </div>

//         {/* MOBILE ICONS — SEARCH + CART */}
//         <div className="flex md:hidden items-center gap-4 text-xl text-gray-700">

//           {/* SEARCH ICON MOBILE */}
//           <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
//         <FaSearch className="text-gray-600" />
//       </button>

//           {/* CART ICON MOBILE */}
//           <button onClick={() => handleNavigate("/cart")}>
//             <FaShoppingCart className="text-gray-600" />
//           </button>

//           {/* HAMBURGER ANIMATED */}
//           <button
//             className="relative w-8 h-8 flex flex-col justify-center items-center md:hidden"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span
//               className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 
//               ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
//             ></span>
//             <span
//               className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 my-1
//               ${menuOpen ? "opacity-0" : "opacity-100"}`}
//             ></span>
//             <span
//               className={`block w-6 h-0.5 bg-gray-800 rounded transition-all duration-300 
//               ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
//             ></span>
//           </button>
//         </div>
//       </div>
//       {/* MOBILE SEARCH BAR — BELOW NAVBAR */}
// {mobileSearchOpen && (
//   <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 relative z-[998]">
//     <div ref={searchRef} className="relative">
//       <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

//       <input
//         autoFocus
//         type="text"
//         placeholder="Search products..."
//         value={query}
//         onChange={(e) => handleSearchChange(e.target.value)}
//         onKeyDown={handleSearch}
//         className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm
//                    focus:ring-2 focus:ring-bioBlue outline-none"
//       />

//       {suggestions.length > 0 && (
//         <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-lg mt-2 z-50">
//           {suggestions.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setSuggestions([]);
//                 setQuery("");
//                 setMobileSearchOpen(false);
//                 router.push(`/product/${item.slug}`);
//               }}
//               className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
//             >
//               {item.name}
//               <span className="block text-xs text-gray-500">
//                 {item.strength}
//               </span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// )}


//       {/* DESKTOP LINKS */}
//       <div className="border-t border-gray-200 hidden md:block">
//         <nav className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-8 text-[15px] text-gray-700">

//           <MenuItem title="All Peptides" onClick={() => handleNavigate("/all-peptides")} />
//           <MenuItem title="Popular Peptides" onClick={() => handleNavigate("/popular-peptides")} />
//           <MenuItem title="Bundle & Save" onClick={() => handleNavigate("/bundle-save")} />
//           <MenuItem title="Peptide Research" onClick={() => handleNavigate("/peptide-research")} />
//           <MenuItem title="Peptide Information" onClick={() => handleNavigate("/peptide-information")} />
//           <MenuItem title="Research Videos" onClick={() => window.open("https://www.youtube.com/@yourchannel", "_blank")} />
//           <MenuItem title="Our Company" onClick={() => handleNavigate("/about")} />
//           <MenuItem title="Contact Us" onClick={() => handleNavigate("/contact")} />
//         </nav>
//       </div>

//       {/* MOBILE MENU — SLIDE DOWN ANIMATION */}
//       <div
//   className={`
//     md:hidden
//     bg-white
//     text-gray-700
//     overflow-hidden
//     border-t border-gray-200
//     transition-all duration-300 ease-out
//     ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
//   `}
// >

//         <div className="px-6 py-4 space-y-4">

          

//           {/* MENU LINKS */}
//           <div className="flex flex-col gap-4 text-white text-[16px] items-start text-left">
//             <MenuItem title="All Peptides" onClick={() => handleNavigate("/all-peptides")} />
//             <MenuItem title="Popular Peptides" onClick={() => handleNavigate("/popular-peptides")} />
//             <MenuItem title="Bundle & Save" onClick={() => handleNavigate("/bundle-save")} />
//             <MenuItem title="Peptide Research" onClick={() => handleNavigate("/peptide-research")} />
//             <MenuItem title="Peptide Information" onClick={() => handleNavigate("/peptide-information")} />
//             <MenuItem title="Research Videos" onClick={() => window.open("https://www.youtube.com/@yourchannel", "_blank")} />
//             <MenuItem title="Our Company" onClick={() => handleNavigate("/about")} />
//             <MenuItem title="Contact Us" onClick={() => handleNavigate("/contact")} />
//           </div>

//           {/* SIGN IN & CART */}
//           <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
//             {!user ? (
//   <button
//     onClick={() => handleNavigate("/login")}
//     className="flex items-center gap-2 hover:text-bioBlue cursor-pointer"
//   >
//     <FaUser className="text-gray-600" />
//     <span>Sign in</span>
//   </button>
// ) : (
//   <>
//     <button
//       onClick={() => handleNavigate("/profile")}
//       className="flex items-center gap-2 hover:text-bioBlue"
//     >
//       <FaUser className="text-gray-600" />
//       <span>My Profile</span>
//     </button>

//     <button
//       onClick={() => {
//         localStorage.removeItem("bio-user");
//         setUser(null);
//         handleNavigate("/");
//       }}
//       className="flex items-center gap-2 text-red-500"
//     >
//       Logout
//     </button>
//   </>
// )}


//             <button onClick={() => handleNavigate("/cart")}
//              className="flex items-center gap-2 hover:text-bioBlue cursor-pointer">
//              <FaShoppingCart className="text-gray-600" />
// <span className="text-gray-700">My Cart</span>
//             </button>
//           </div>

//         </div>
//       </div>
      

//     </header>
//   );
// }



// function MenuItem({ title, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="text-gray-700 hover:text-[#65b4d7] transition-colors cursor-pointer"
//     >
//       {title}
//     </button>
//   );
// }

