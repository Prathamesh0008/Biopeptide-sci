





 










// contexts/LanguageContext.jsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  const loadLanguage = useCallback(async (langCode) => {
    setLoading(true);

    try {
      const module = await import(`@/data1/languages/${langCode}`);

      if (!module?.default) {
        throw new Error(`Missing default export in ${langCode}`);
      }

      setTranslations(module.default);
      setLanguage(langCode);

      localStorage.setItem("bio-lang", langCode);
      document.documentElement.lang = langCode;
      document.documentElement.dir = module.default.dir || "ltr";
    } catch (error) {
      console.error(
        `❌ Language load failed (${langCode}), falling back to en`,
        error
      );

      const enModule = await import("@/data1/languages/en");

      setTranslations(enModule.default);
      setLanguage("en");

      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedLang =
      typeof window !== "undefined"
        ? localStorage.getItem("bio-lang")
        : null;

    loadLanguage(savedLang || "en");
  }, [loadLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        translations,
        language,
        loadLanguage,
        loading,
        dir: translations?.dir || "ltr",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}





