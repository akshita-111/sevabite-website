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
      {/* Background emojis removed for cleaner light theme look */}
    </div>
  );
}

export default BackgroundDecor;
