import { motion } from "framer-motion";
import WindowContent from "./WindowContent";
import WindowHeader from "./WindowHeader";

export default function MacWindow({
  title,
  children,
  className = "",
  contentClassName = "",
  delay = 0,
  as: Element = "article",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Element
        className={`overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft ${className}`.trim()}
      >
        <WindowHeader title={title} />
        <WindowContent className={contentClassName}>{children}</WindowContent>
      </Element>
    </motion.div>
  );
}
