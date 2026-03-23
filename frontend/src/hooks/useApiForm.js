import { useState } from "react";

export function useApiForm(initialValues, submitter) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const reset = () => {
    setValues(initialValues);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await submitter(values);
      setStatus("success");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error?.message || "Request failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    status,
    errorMessage,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  };
}
