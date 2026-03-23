import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import MacWindow from "../components/MacWindow";
import { CONTACT_EMAIL } from "../data/site";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <section className="section-space">
      <div className="container-shell max-w-4xl">
        <SectionHeading title={t("privacyPage.title")} subtitle={t("privacyPage.intro")} />
        <MacWindow title={t("privacyPage.windowTitle")} className="mt-8">
          <ul className="space-y-3 text-stone">
            {t("privacyPage.points", { returnObjects: true }).map((point) => (
              <li key={point} className="rounded-2xl border border-black/10 bg-mist px-4 py-3">
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-stone">{t("privacyPage.contact")} <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>
        </MacWindow>
      </div>
    </section>
  );
}
