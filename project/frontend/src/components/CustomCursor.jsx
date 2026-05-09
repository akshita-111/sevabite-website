import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 22, stiffness: 280 });
  const sy = useSpring(y, { damping: 22, stiffness: 280 });
  const tx = useSpring(x, { damping: 28, stiffness: 120 });
  const ty = useSpring(y, { damping: 28, stiffness: 120 });
  const [expanded, setExpanded] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e) => {
      const interactive = e.target.closest("button,a,input,textarea,.interactive-card");
      setExpanded(Boolean(interactive));
    };
    const onDown = () => setGrabbing(true);
    const onUp = () => setGrabbing(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      {/* Outer glow ring — scales up on hover, rotates on click */}
      <motion.div
        style={{ left: tx, top: ty }}
        animate={{ scale: expanded ? 1.7 : 1, rotate: grabbing ? 15 : 0 }}
        transition={{ type: "spring", damping: 18, stiffness: 220 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border-2 border-orange-400/60 shadow-[0_0_20px_rgba(251,146,60,0.4)]"
      />

      {/* Pan hand emoji — switches between open hand and grabbing */}
      <motion.div
        style={{ left: sx, top: sy }}
        animate={{ scale: grabbing ? 0.85 : 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl select-none drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]"
      >
        {grabbing ? "✊" : expanded ? "👆" : "🖐️"}
      </motion.div>

      {/* Tiny center dot */}
      <motion.div
        style={{ left: tx, top: ty }}
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300"
      />
    </div>
  );
}

export default CustomCursor;
