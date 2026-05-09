import { motion } from "framer-motion";

function SectionHeader({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-4 text-base font-bold uppercase tracking-[0.3em] text-orange-400">{eyebrow}</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-5xl font-black leading-tight md:text-6xl lg:text-7xl text-white">{title}</motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-6 text-xl text-slate-300 font-medium">{description}</motion.p>
    </motion.div>
  );
}

export default SectionHeader;
