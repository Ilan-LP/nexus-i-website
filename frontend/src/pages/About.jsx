import { useTranslation } from "react-i18next";
import CTASection from "../components/CTASection";
import SectionContainer from "../components/SectionContainer";
import MacWindow from "../components/MacWindow";

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <SectionContainer title={t("aboutPage.title")} subtitle={t("aboutPage.subtitle")} className="pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <MacWindow title={t("aboutPage.textWindowTitle")} className="h-full">
            <div className="space-y-4 text-stone">
              {t("aboutPage.text", { returnObjects: true }).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MacWindow>
          <MacWindow title={t("aboutPage.valuesWindowTitle")}>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              {t("aboutPage.valuesTitle")}
            </h3>
            <ul className="mt-5 space-y-3 text-stone">
              {t("aboutPage.values", { returnObjects: true }).map((value) => (
                <li
                  key={value}
                  className="rounded-2xl border border-black/10 bg-[#fafafa] px-4 py-3"
                >
                  {value}
                </li>
              ))}
            </ul>
          </MacWindow>
        </div>
      </SectionContainer>

      <CTASection/>
    </>
  );
}
