import { motion } from "framer-motion";

function FloatingEmoji({ emoji, className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute text-3xl md:text-5xl ${className}`}
      animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay }}
    >
      {emoji}
    </motion.div>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="floating-blob absolute -left-20 top-16 h-56 w-56 rounded-full bg-redSoft" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 9 }} />
      <motion.div className="floating-blob absolute right-8 top-24 h-64 w-64 rounded-full bg-orangeSoft" animate={{ scale: [1.2, 1, 1.2] }} transition={{ repeat: Infinity, duration: 8 }} />
      <motion.div className="floating-blob absolute bottom-10 right-1/3 h-52 w-52 rounded-full bg-greenSoft" animate={{ y: [0, -16, 0] }} transition={{ repeat: Infinity, duration: 7 }} />
      <FloatingEmoji emoji="🍱" className="left-[8%] top-[20%]" />
      <FloatingEmoji emoji="🥗" className="right-[10%] top-[28%]" delay={0.6} />
      <FloatingEmoji emoji="🚀" className="bottom-[18%] left-[15%]" delay={0.9} />
    </div>
  );
}

export default BackgroundDecor;
