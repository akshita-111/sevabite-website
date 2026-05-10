import { motion } from "framer-motion";

function Card3D({ title, text, icon, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay, 
        duration: 0.6, 
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -8,
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      className="interactive-card group rounded-3xl p-6 transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400/20 to-green-400/20 text-3xl shadow-lg transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-3 text-2xl font-black text-white">{title}</h3>
      <p className="text-slate-300 font-medium leading-relaxed text-base">{text}</p>
      <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-orange-400 to-green-500 transition-all duration-700 group-hover:w-full opacity-50" />
    </motion.article>
  );
}

export default Card3D;
