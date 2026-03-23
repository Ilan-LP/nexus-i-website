export default function WindowContent({ children, className = "" }) {
  return <div className={`p-6 sm:p-8 ${className}`.trim()}>{children}</div>;
}
