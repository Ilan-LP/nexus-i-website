import { Component } from "react";
import { withTranslation } from "react-i18next";
import MacWindow from "./MacWindow";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Keep this as console output for quick triage in client-only failures.
    console.error("Unhandled UI error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { t } = this.props;

      return (
        <section className="flex min-h-screen items-center justify-center bg-mist px-6 text-ink">
          <MacWindow title="error.json" className="w-full max-w-md">
            <div className="p-6">
              <h1 className="font-display text-2xl font-semibold">{t("error.title")}</h1>
              <p className="mt-3 text-stone">{t("error.message")}</p>
              <button
                type="button"
                onClick={this.handleReload}
                className="focus-ring mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
              >
                {t("error.reload")}
              </button>
              <span className="mx-4 text-stone">{t("error.or")}</span>
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="focus-ring mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
              >
                {t("error.returnHome")}
              </button>
            </div>
          </MacWindow>
        </section>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
