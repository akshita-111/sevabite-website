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

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e) => {
      const interactive = e.target.closest("button,a,input,textarea,.interactive-card");
      setExpanded(Boolean(interactive));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div
        style={{ left: tx, top: ty }}
        className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/60 shadow-[0_0_18px_rgba(251,146,60,0.65)]"
      />
      <motion.div
        style={{ left: sx, top: sy, scale: expanded ? 1.6 : 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 text-xl drop-shadow-[0_0_14px_rgba(249,115,22,0.55)]"
      >
        🍴
      </motion.div>
      <motion.div
        style={{ left: tx, top: ty }}
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/90"
      />
    </div>
  );
}

export default CustomCursor;
