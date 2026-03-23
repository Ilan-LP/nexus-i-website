import MacWindow from "./MacWindow";
import { useTranslation } from "react-i18next";

export default function ServiceCard({ windowTitle, title, problem, solution, benefits, useCases, previewImage }) {
  const { t } = useTranslation();

  return (
    <MacWindow title={windowTitle}>
      <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-start">
        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight">{title}</h3>
          <div className="mt-6 space-y-4 text-sm text-stone sm:text-base">
            <p>
              <span className="font-semibold text-ink">{t("servicesPage.labels.problem")}</span>{" "}
              {problem}
            </p>
            <p>
              <span className="font-semibold text-ink">{t("servicesPage.labels.solution")}</span>{" "}
              {solution}
            </p>
          </div>
        </div>

        {previewImage && (
          <div className="overflow-hidden rounded-xl border border-black/10 bg-neutral-100 lg:justify-self-end">
            <img
              src={previewImage}
              alt={title}
              className="h-40 w-full object-cover lg:w-[220px]"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone">
            {t("servicesPage.labels.benefits")}
          </h4>
          <ul className="space-y-2 text-sm text-ink/90">
            {benefits.map((item) => (
              <li key={item} className="rounded-lg border border-black/10 bg-[#fafafa] px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone">
            {t("servicesPage.labels.useCases")}
          </h4>
          <ul className="space-y-2 text-sm text-ink/90">
            {useCases.map((item) => (
              <li key={item} className="rounded-lg border border-black/10 bg-[#fafafa] px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MacWindow>
  );
}
