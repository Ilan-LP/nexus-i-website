export default function SectionContainer({
  as: Element = "section",
  id,
  title,
  subtitle,
  children,
  className = "",
  contentClassName = "",
}) {
  return (
    <Element id={id} className={`pb-16 ${className}`.trim()}>
      <div className="container-shell">
        {title ? (
          <header className="mb-10">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {subtitle ? <p className="mt-4 text-lg text-stone">{subtitle}</p> : null}
          </header>
        ) : null}
        <div className={contentClassName}>{children}</div>
      </div>
    </Element>
  );
}
