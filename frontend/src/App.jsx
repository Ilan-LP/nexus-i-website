import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainLayout from "./layouts/MainLayout";
import { seoByPath } from "./data/seo";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://nexus-i.fr").replace(/\/$/, "");

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property='${name}']` : `meta[name='${name}']`;
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    if (property) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLink({ rel, href, hreflang }) {
  let selector = `link[rel='${rel}']`;

  if (hreflang) {
    selector += `[hreflang='${hreflang}']`;
  }

  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);

    if (hreflang) {
      element.setAttribute("hreflang", hreflang);
    }

    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function RouteMeta() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const language = i18n.language?.startsWith("en") ? "en" : "fr";
    const defaults = seoByPath["/"][language];
    const currentSeo = seoByPath[location.pathname]?.[language] || defaults;
    const pathname = location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");
    const canonicalUrl = `${SITE_URL}${pathname}`;
    const ogLocale = language === "fr" ? "fr_FR" : "en_US";
    const ogLocaleAlternate = language === "fr" ? "en_US" : "fr_FR";
    const ogImage = `${SITE_URL}/og-default.svg`;

    document.documentElement.lang = language;
    document.title = currentSeo.title;
    setMeta("description", currentSeo.description);
    setMeta("og:title", currentSeo.title, true);
    setMeta("og:description", currentSeo.description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:locale", ogLocale, true);
    setMeta("og:locale:alternate", ogLocaleAlternate, true);
    setMeta("og:image", ogImage, true);
    setMeta("twitter:title", currentSeo.title);
    setMeta("twitter:description", currentSeo.description);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:url", canonicalUrl);

    setLink({ rel: "canonical", href: canonicalUrl });
    setLink({ rel: "alternate", hreflang: "fr", href: `${canonicalUrl}?lang=fr` });
    setLink({ rel: "alternate", hreflang: "en", href: `${canonicalUrl}?lang=en` });
    setLink({ rel: "alternate", hreflang: "x-default", href: canonicalUrl });
  }, [i18n.language, location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteMeta />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
