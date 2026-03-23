import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="section-space">
      <div className="container-shell text-center">
        <h1 className="font-display text-5xl font-bold">404</h1>
        <p className="mt-4 text-lg text-stone">{t("notFound.text")}</p>
        <Link
          to="/"
          className="focus-ring mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          {t("notFound.cta")}
        </Link>
      </div>
    </section>
  );
}
