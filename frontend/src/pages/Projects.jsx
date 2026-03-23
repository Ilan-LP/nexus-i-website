import { useTranslation } from "react-i18next";
import ProjectCardLarge from "../components/ProjectCardLarge";
import CTASection from "../components/CTASection";
import SectionContainer from "../components/SectionContainer";

export default function Projects() {
  const { t } = useTranslation();
  const projects = t("projectsPage.cards", { returnObjects: true });

  return (
    <>
      <SectionContainer title={t("projectsPage.title")} subtitle={t("projectsPage.subtitle")} className="pt-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCardLarge key={project.name} {...project} />
          ))}
        </div>
      </SectionContainer>

      <CTASection/>
    </>
  );
}
