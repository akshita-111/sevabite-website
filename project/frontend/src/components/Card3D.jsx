import { motion } from "framer-motion";

function Card3D({ title, text, icon, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          delay,
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -12,
        scale: 1.05,
        rotateX: -3,
        rotateY: 3,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(34, 197, 94, 0.15)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="interactive-card group relative rounded-3xl p-6 transition-colors duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Floating Inner Content */}
      <motion.div
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 text-3xl shadow-lg transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-3 text-2xl font-black text-white">{title}</h3>
        <p className="text-slate-300 font-medium leading-relaxed text-base">{text}</p>
        <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 group-hover:w-full opacity-60" />
      </motion.div>
    </motion.article>
  );
}

export default Card3D;
