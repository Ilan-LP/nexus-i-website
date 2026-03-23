import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CONTACT_EMAIL, CONTACT_PHONE } from "../data/site";
import LogoPlaceholder from "./LogoPlaceholder";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container-shell py-12">
        <div>
          <div className="flex items-center gap-3">
            <LogoPlaceholder variant="fill" className="h-9 w-9" />
            <p className="font-display text-xl font-semibold tracking-tight">{t("brand")}</p>
          </div>
          <p className="mt-2 text-sm text-stone">{t("footer.slogan")}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone">
          <p><a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>
          <p><a href={`telto:${CONTACT_PHONE}`} className="underline">{CONTACT_PHONE}</a></p>
          <p>{t("footer.rights")}</p>
          <Link className="focus-ring rounded hover:text-ink" to="/legal-notice">
            {t("footer.legal")}
          </Link>
          <Link className="focus-ring rounded hover:text-ink" to="/privacy-policy">
            {t("footer.privacy")}
          </Link>
          <p>
            {new Date().getFullYear()} {t("brand")}
          </p>
        </div>
      </div>
    </footer>
  );
}
