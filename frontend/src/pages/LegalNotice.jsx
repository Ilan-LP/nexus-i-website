import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import MacWindow from "../components/MacWindow";
import { CONTACT_EMAIL } from "../data/site";

export default function LegalNotice() {
  const { t } = useTranslation();

  return (
    <section className="section-space">
      <div className="container-shell max-w-4xl">
        <SectionHeading title={t("legalPage.title")} />
        <MacWindow title={t("legalPage.windowTitle")} className="mt-8">
          <p>
            <strong className="text-ink">{t("legalPage.labels.companyName")}</strong>{" "}
            {t("legalPage.companyName")}
          </p>
          <p className="mt-3">
            <strong className="text-ink">{t("legalPage.labels.owner")}</strong>{" "}
            {t("legalPage.owner")}
          </p>
          <p className="mt-3">
            <strong className="text-ink">{t("legalPage.labels.domain")}</strong>{" "}
            <a href={"https://" + t("legalPage.domain")} className="underline">{t("legalPage.domain")}</a>
          </p>
          <p className="mt-3">
            <strong className="text-ink">{t("legalPage.contact")}</strong>{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
          </p>
          <p className="mt-3">
            <strong className="text-ink">{t("legalPage.labels.address")}</strong>{" "}
            {t("legalPage.companyAddress")}
          </p>
          <p className="mt-3">
            <strong className="text-ink">{t("legalPage.labels.siret")}</strong>{" "}
            {t("legalPage.registration")}
          </p>

          <hr className="my-4" />

          <p className="mt-3">
            <strong className="text-ink">Propriété intellectuelle</strong>
          </p>
          <p className="mt-2">{t("legalPage.intellectualProperty")}</p>

          <hr className="my-4" />

          <p className="mt-3">
            <strong className="text-ink">{t("legalPage.hostingInfo")}</strong>
          </p>
          <p className="mt-2">{t("legalPage.host")}</p>

          <hr className="my-4" />

          <p className="mt-3">
            <strong className="text-ink">Protection des données (RGPD)</strong>
          </p>
          <p className="mt-2">{t("legalPage.gdpr")}</p>
          <p className="mt-2">{t("legalPage.dataRetention")}</p>

          <hr className="my-4" />

          <p className="mt-3">
            <strong className="text-ink">Cookies</strong>
          </p>
          <p className="mt-2">{t("legalPage.cookiesStatement")}</p>
        </MacWindow>
      </div>
    </section>
  );
}
