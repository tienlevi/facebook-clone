import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEnglish from "../locale/en.json";
import translationFrance from "../locale/fr.json";
import translationVienamese from "../locale/vi.json";
import translationItalian from "../locale/it.json";
import translationJapanese from "../locale/ja.json";
import translationGerman from "../locale/de.json";
import translationKorean from "../locale/ko.json";
import translationSpainese from "../locale/es.json";
import translationChinese from "../locale/zh.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: translationEnglish,
  },
  fr: {
    translation: translationFrance,
  },
  vi: {
    translation: translationVienamese,
  },
  de: {
    translation: translationGerman,
  },
  it: {
    translation: translationItalian,
  },
  ko: {
    translation: translationKorean,
  },
  ja: {
    translation: translationJapanese,
  },
  es: {
    translation: translationSpainese,
  },
  zh: { translation: translationChinese },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("en") || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
