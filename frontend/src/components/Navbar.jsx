import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LogoPlaceholder from "./LogoPlaceholder";

const navLinkClass = ({ isActive }) =>
  [
    "focus-ring rounded-full px-4 py-2 text-sm transition",
    isActive ? "bg-[#111] text-white" : "text-ink/80 hover:text-ink",
  ].join(" ");

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith("fr") ? "en" : "fr");
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.projects"), path: "/projects" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link to="/" className="focus-ring inline-flex items-center gap-3 rounded-md pr-2">
          <LogoPlaceholder variant="transparent" className="h-9 w-9" />
          <span className="font-display text-xl font-semibold tracking-tight">{t("brand")}</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label={t("nav.primaryAria")}>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="focus-ring rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-ink hover:border-black"
          >
            {i18n.language.startsWith("fr") ? "EN" : "FR"}
          </button>
          <Link
            to="/contact"
            className="focus-ring rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition hover:bg-black"
          >
            {t("common.discussProject")}
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring rounded-md border border-black/10 p-2 md:hidden"
          onClick={() => setIsOpen((state) => !state)}
          aria-expanded={isOpen}
          aria-label={t("nav.toggleMenuAria")}
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="mt-1 block h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {isOpen ? (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-shell mb-4 grid gap-2 rounded-2xl border border-black/10 bg-white p-4 md:hidden"
          aria-label={t("nav.mobileAria")}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={toggleLanguage}
            className="focus-ring rounded-full border border-black/10 px-4 py-2 text-left text-sm font-medium"
          >
            {i18n.language.startsWith("fr") ? t("nav.switchToEnglish") : t("nav.switchToFrench")}
          </button>
        </motion.nav>
      ) : null}
    </header>
  );
}
