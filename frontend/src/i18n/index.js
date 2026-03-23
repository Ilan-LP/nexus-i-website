import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, fr } from "./translations";

const storedLanguage = localStorage.getItem("nexus-i-lang");

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: storedLanguage || "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem("nexus-i-lang", language);
});

export default i18n;
