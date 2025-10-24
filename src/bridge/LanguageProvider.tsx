// © Quantum Charts – Language Provider
// File: src/bridge/LanguageProvider.tsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserLang, t } from "./i18nBridge";

interface LangCtx {
  lang: string;
  setLang: (v: string) => void;
  translate: (key: string) => Promise<string>;
}

const LangContext = createContext<LangCtx>({
  lang: "en-US",
  setLang: () => {},
  translate: async (key) => key,
});

export const useLang = () => useContext(LangContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState(getUserLang());

  async function translate(key: string) {
    return await t(key, lang);
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, translate }}>
      {children}
    </LangContext.Provider>
  );
};
