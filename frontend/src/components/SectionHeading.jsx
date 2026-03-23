import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-10 max-w-3xl"
    >
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-lg text-stone">{subtitle}</p> : null}
    </motion.div>
  );
}
