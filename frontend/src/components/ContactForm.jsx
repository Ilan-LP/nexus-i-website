import { useTranslation } from "react-i18next";
import { useApiForm } from "../hooks/useApiForm";
import { postContact } from "../services/apiClient";
import FormStatus from "./FormStatus";
import MacWindow from "./MacWindow";

const initialValues = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const { t } = useTranslation();
  const { values, handleChange, handleSubmit, status, errorMessage, isSubmitting } = useApiForm(
    initialValues,
    postContact
  );

  return (
    <MacWindow
      title="contact-request.json"
      as="section"
      className="h-full"
      contentClassName="p-6 sm:p-8"
    >
      <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <h3 className="font-display text-3xl font-semibold tracking-tight">
          {t("contactPage.contactFormTitle")}
        </h3>
        <p className="mt-2 text-sm text-stone">{t("contactPage.contactFormText")}</p>

        <label className="mt-6 block text-sm font-medium text-stone">
          {t("contactPage.form.name")}
          <input
            required
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-stone">
          {t("contactPage.form.email")}
          <input
            required
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-stone">
          {t("contactPage.form.message")}
          <textarea
            required
            name="message"
            rows={6}
            value={values.message}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink"
          />
        </label>

        <label className="sr-only" htmlFor="contact-website">
          {t("contactPage.form.website")}
        </label>
        <input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          name="website"
          value={values.website}
          onChange={handleChange}
          className="hidden"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <span
              aria-hidden="true"
              className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-white"
            />
          )}
          {isSubmitting ? t("contactPage.form.sending") : t("contactPage.form.submit")}
        </button>

        <FormStatus
          status={status}
          successMessage={t("contactPage.form.success")}
          errorMessage={errorMessage}
          fallbackErrorMessage={t("contactPage.form.error")}
        />
      </form>
    </MacWindow>
  );
}
