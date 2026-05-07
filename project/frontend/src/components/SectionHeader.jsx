import { motion } from "framer-motion";

function SectionHeader({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-2xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-300">{eyebrow}</p>
      <h2 className="text-3xl font-black md:text-5xl">{title}</h2>
      <p className="mt-4 text-slate-300">{description}</p>
    </motion.div>
  );
}

export default SectionHeader;
