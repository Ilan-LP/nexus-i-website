import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LogoPlaceholder from "./LogoPlaceholder";

export default function HeroSection({ title, subtitle, primaryCta }) {
  const { t } = useTranslation();

  return (
    <section className="section-space pt-14 sm:pt-20">
      <div className="container-shell">
        <div>
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 px-3 py-1.5 text-sm text-stone"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LogoPlaceholder variant="transparent" className="h-7 w-7" />
            <span>{t("home.heroBadge")}</span>
          </motion.div>
          <motion.h1
            className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-stone"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Link
              to={primaryCta.to}
              className="focus-ring rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              {primaryCta.label}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
