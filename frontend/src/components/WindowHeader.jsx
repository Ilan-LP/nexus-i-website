import WindowButtons from "./WindowButtons";

export default function WindowHeader({ title }) {
  return (
    <header className="relative flex items-center border-b border-black/10 bg-transparent px-4 py-3 sm:px-5">
      <WindowButtons />
      <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium tracking-[0.08em] text-stone/90">
        {title}
      </p>
    </header>
  );
}
