import { motion } from "framer-motion";

function Card3D({ title, text, icon, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -15, scale: 1.05, rotateX: 5, rotateY: -5 }}
      className="interactive-card group rounded-3xl p-6 shadow-premium transition-colors"
      style={{
        background: "rgba(10, 15, 30, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px)",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-redSoft via-orangeSoft to-greenSoft text-3xl shadow-lg transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-black text-white">{title}</h3>
      <p className="text-slate-300 font-medium leading-relaxed text-base">{text}</p>
      <div className="mt-6 h-1.5 w-0 rounded-full bg-gradient-to-r from-redSoft to-greenSoft transition-all duration-700 group-hover:w-full" />
    </motion.article>
  );
}

export default Card3D;
