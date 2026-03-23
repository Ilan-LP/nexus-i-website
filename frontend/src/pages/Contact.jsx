import { useTranslation } from "react-i18next";
import ContactForm from "../components/ContactForm";
import MeetingForm from "../components/MeetingForm";
import SectionContainer from "../components/SectionContainer";
import { CONTACT_EMAIL, CONTACT_PHONE } from "../data/site";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <SectionContainer title={t("contactPage.title")} subtitle={t("contactPage.subtitle")} className="pt-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <ContactForm />
        <MeetingForm />
      </div>

      <aside className="mt-8 rounded-3xl border border-black/10 bg-[#fafafa] p-6">
        <p className="text-sm uppercase tracking-[0.12em] text-stone">
          {t("contactPage.replyTime")}
        </p>
        <p className="mt-2 text-stone">{t("contactPage.replyText")}</p>
        <p className="mt-4 font-medium text-ink"><a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>
        <p className="mt-2 font-medium text-ink"><a href={`telto:${CONTACT_PHONE}`} className="underline">{CONTACT_PHONE}</a></p>
      </aside>
    </SectionContainer>
  );
}
