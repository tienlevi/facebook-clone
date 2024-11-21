"use client";
import { createContext } from "react";
import i18n from "@/utils/i18n";

interface Context {
  handleChangeLanguage: (value: string) => void;
  t: (value: string) => void;
  language: string;
}

export const LanguageProvider = createContext({} as Context);

function LanguageContext({ children }: any) {
  const { changeLanguage, t } = i18n;
  const language =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("locale")!)
      : "en";

  const handleChangeLanguage = (value: string) => {
    changeLanguage(value);
    localStorage.setItem("locale", JSON.stringify(value));
    window.location.reload();
  };

  return (
    <LanguageProvider.Provider value={{ handleChangeLanguage, t, language }}>
      {children}
    </LanguageProvider.Provider>
  );
}

export default LanguageContext;
