// contexts/LanguageContext.jsx
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  const loadLanguage = useCallback(async (langCode) => {
    try {
      setLoading(true);
      const module = await import(`../data1/languages/${langCode}`);
      setTranslations(module.default || module[langCode]);
      setLanguage(langCode);
      localStorage.setItem("bio-lang", langCode);
      document.documentElement.lang = langCode;
      document.documentElement.dir = (module.default?.dir || 'ltr');
    } catch (error) {
      console.error('Language load failed, falling back to en');
      const enModule = await import(`../data1/languages/en`);
      setTranslations(enModule.default || enModule.en);
      setLanguage('en');
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("bio-lang") || 'en';
    loadLanguage(savedLang);
  }, [loadLanguage]);

  return (
    <LanguageContext.Provider value={{ 
      translations, 
      language, 
      loadLanguage,
      loading,
      dir: translations?.dir || 'ltr'
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};


// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// import en from "../data1/languages/en";
// import es from "../data1/languages/es";
// import pt from "../data1/languages/pt";
// import zh from "../data1/languages/zh";
// import ar from "../data1/languages/ar";
// import de from "../data1/languages/de";
// import fr from "../data1/languages/fr";
// import ja from "../data1/languages/ja";
// import nl from "../data1/languages/nl";

// const LANGUAGES = {
//   en, es, pt, zh, ar, de, fr, ja, nl,
// };

// const LanguageContext = createContext();

// export function LanguageProvider({ children }) {
//   // 1. Initialize with a default, but check localStorage on mount
//   const [lang, setLang] = useState("en");

//   // 2. Persist Language Selection (Optional but Recommended)
//   useEffect(() => {
//     const saved = localStorage.getItem("app-lang");
//     if (saved && LANGUAGES[saved]) {
//       setLang(saved);
//     }
//   }, []);

//   const changeLanguage = (code) => {
//     setLang(code);
//     localStorage.setItem("app-lang", code); // Save preference
//   };

//   return (
//     <LanguageContext.Provider
//       value={{
//         language: lang,      // Expose as 'language' to match Navbar
//         changeLanguage,      // Expose as 'changeLanguage' to match Navbar
//         t: LANGUAGES[lang],  // The actual data object
//       }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export const useLanguage = () => useContext(LanguageContext);