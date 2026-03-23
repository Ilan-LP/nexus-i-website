export default function FormStatus({ status, successMessage, errorMessage, fallbackErrorMessage }) {
  if (status === "idle") {
    return null;
  }

  const isSuccess = status === "success";
  const resolvedErrorMessage = errorMessage || fallbackErrorMessage;

  return (
    <p
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
        isSuccess ? "border-black/10 bg-[#f7f7f7] text-ink" : "border-black/15 bg-white text-stone"
      }`}
    >
      {isSuccess ? successMessage : resolvedErrorMessage}
    </p>
  );
}
