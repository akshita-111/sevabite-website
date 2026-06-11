import { motion } from "framer-motion";

/**
 * DemoBanner – A subtle, design-consistent notice component.
 *
 * Variants:
 *   "inline"  → compact label that sits inside a section (default)
 *   "banner"  → wider info-bar style, used at the top of a page/section
 *
 * @param {string}  message    – the notice text
 * @param {"inline"|"banner"} variant
 * @param {string}  icon       – emoji / character prefix (default: ℹ️)
 * @param {string}  className  – extra classes to merge
 */
function DemoBanner({ message, variant = "inline", icon = "ℹ️", className = "" }) {
  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`demo-banner ${className}`}
      >
        <span className="demo-banner__icon">{icon}</span>
        <span>{message}</span>
      </motion.div>
    );
  }

  // inline (default)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`demo-badge ${className}`}
    >
      <span className="demo-badge__icon">{icon}</span>
      <span>{message}</span>
    </motion.div>
  );
}

export default DemoBanner;
