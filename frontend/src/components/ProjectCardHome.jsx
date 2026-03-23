import MacWindow from "./MacWindow";

export default function ProjectCardHome({ windowTitle, name, description, technologies, previewImage }) {
  return (
    <MacWindow
      title={windowTitle}
      className="group h-full transition hover:-translate-y-1"
      delay={0.05}
      contentClassName="flex h-full flex-col"
    >
      <h3 className="font-display text-2xl font-semibold tracking-tight">{name}</h3>
      <p className="mt-3 text-stone">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone"
          >
            {tech}
          </span>
        ))}
      </div>

      {previewImage && (
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-neutral-100">
          <img
            src={previewImage}
            alt={`Apercu du projet ${name}`}
            className="h-44 w-full object-cover"
          />
        </div>
      )}
    </MacWindow>
  );
}