import { motion } from "framer-motion";

function Card3D({ title, text, icon, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, rotateZ: -15, rotateY: 25, y: 100, scale: 0.85 }}
      whileInView={{ 
        opacity: 1, 
        rotateZ: 0, 
        rotateY: 0, 
        y: 0, 
        scale: 1 
      }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        delay, 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ 
        y: -15, 
        rotateY: 8, 
        rotateX: -5,
        scale: 1.05,
        transition: { duration: 0.4 }
      }}
      className="interactive-card group rounded-3xl p-6 shadow-premium transition-colors"
      style={{
        background: "rgba(10, 15, 30, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Floating inner wrapper for idle motion */}
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 0.5, 0, -0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-redSoft via-orangeSoft to-greenSoft text-3xl shadow-lg transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-3 text-2xl font-black text-white">{title}</h3>
        <p className="text-slate-300 font-medium leading-relaxed text-base">{text}</p>
        <div className="mt-6 h-1.5 w-0 rounded-full bg-gradient-to-r from-redSoft to-greenSoft transition-all duration-700 group-hover:w-full" />
      </motion.div>
    </motion.article>
  );
}

export default Card3D;
