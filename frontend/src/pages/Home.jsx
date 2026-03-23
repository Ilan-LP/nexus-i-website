import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectCardHome from "../components/ProjectCardHome";
import CTASection from "../components/CTASection";
import SectionContainer from "../components/SectionContainer";
import ServiceCard from "../components/ServiceCard";
import MacWindow from "../components/MacWindow";

export default function Home() {
  const { t } = useTranslation();
  const stats = t("home.stats", { returnObjects: true });
  const projects = t("projectsPage.cards", { returnObjects: true }).slice(0, 3);

  return (
    <>
      <HeroSection
        title={t("home.heroTitle")}
        subtitle={t("home.heroSubtitle")}
        primaryCta={{ label: t("common.discussProject"), to: "/contact" }}
      />

      <section className="pb-16" aria-label={t("home.keyFactsAria")}>
        <div className="container-shell grid gap-4 sm:grid-cols-3">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="rounded-2xl border border-black/10 bg-[#ffffff00] p-5"
            >
              <p className="font-display text-2xl font-semibold tracking-tight">{item.value}</p>
              <p className="mt-1 text-sm text-stone">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionContainer title={t("home.servicesTitle")} subtitle={t("home.servicesSubtitle")} className="pt-0">
        <div className="grid gap-6">
          <ServiceCard
            windowTitle={t("servicesPage.website.windowTitle")}
            title={t("servicesPage.website.title")}
            previewImage={t("servicesPage.website.previewImage")}
            problem={t("servicesPage.website.problem")}
            solution={t("servicesPage.website.solution")}
            benefits={t("servicesPage.website.benefits", { returnObjects: true })}
            useCases={t("servicesPage.website.useCases", { returnObjects: true })}
          />
          <ServiceCard
            windowTitle={t("servicesPage.automation.windowTitle")}
            title={t("servicesPage.automation.title")}
            previewImage={t("servicesPage.automation.previewImage")}
            problem={t("servicesPage.automation.problem")}
            solution={t("servicesPage.automation.solution")}
            benefits={t("servicesPage.automation.benefits", { returnObjects: true })}
            useCases={t("servicesPage.automation.useCases", { returnObjects: true })}
          />
        </div>
        <Link
          to="/services"
          className="focus-ring mt-8 inline-flex rounded-full border border-black/15 px-6 py-3 text-sm font-medium hover:border-black"
        >
          {t("common.exploreServices")}
        </Link>
      </SectionContainer>

      <SectionContainer
        title={t("home.projectsTitle")}
        subtitle={t("home.projectsSubtitle")}
        className="pt-0"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCardHome key={project.name} {...project} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer
        title={t("home.whyTitle")}
        subtitle={t("home.whySubtitle")}
        className="pt-0"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {t("home.whyItems", { returnObjects: true }).map((item) => (
            <MacWindow title={item[0]}>
              <p className="text-stone">{item[1]}</p>
            </MacWindow>
          ))}
        </div>
      </SectionContainer>

      <CTASection/>
    </>
  );
}
