import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../../locales/en/translate.json";
import translationPT from "../../locales/pt/translate.json";

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
