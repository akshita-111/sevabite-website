import { motion } from "framer-motion";

function Card3D({ title, text, icon, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay, 
        duration: 0.5, 
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="interactive-card group rounded-3xl p-6 shadow-premium transition-colors"
      style={{
        background: "rgba(10, 15, 30, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px)",
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
