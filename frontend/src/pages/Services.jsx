import { useTranslation } from "react-i18next";
import ServiceCard from "../components/ServiceCard";
import CTASection from "../components/CTASection";
import SectionContainer from "../components/SectionContainer";

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <SectionContainer title={t("servicesPage.title")} subtitle={t("servicesPage.subtitle")} className="pt-16">
        <div className="grid gap-6">
          {(() => {
            const services = [
              t("servicesPage.simpleWebsite", { returnObjects: true }),
              t("servicesPage.complexWebsite", { returnObjects: true }),
              t("servicesPage.shopWebsite", { returnObjects: true }),
              t("servicesPage.automation", { returnObjects: true }),
            ];

            return services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ));
          })()}
        </div>
      </SectionContainer>

      <CTASection/>
    </>
  );
}
