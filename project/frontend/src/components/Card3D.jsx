import { motion } from "framer-motion";

function Card3D({ title, text, icon, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55 }}
      whileHover={{ y: -10, scale: 1.03, rotateX: 4, rotateY: -3 }}
      className="glass interactive-card group rounded-3xl border border-white/20 p-6 shadow-premium transition"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-redSoft via-orangeSoft to-greenSoft text-xl shadow-lg">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-100">{title}</h3>
      <p className="text-slate-300">{text}</p>
      <div className="mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-redSoft to-greenSoft transition-all duration-500 group-hover:w-24" />
    </motion.article>
  );
}

export default Card3D;
