import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import MacWindow from "./MacWindow";

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="pb-16">
      <motion.div
        className="container-shell"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MacWindow title={t("common.contactWindowTitle")}>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {t("common.contactTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-stone">{t("common.contactText")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="focus-ring rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              {t("common.discussProject")}
            </Link>
          </div>
        </MacWindow>
      </motion.div>
    </section>
  );
}
