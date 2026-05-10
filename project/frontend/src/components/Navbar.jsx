import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { to: "home", label: "Home" },
  { to: "about", label: "Our Mission" },
  { to: "services", label: "What We Do" },
  { to: "donate", label: "Donate Food" },
  { to: "contact", label: "Join Us" }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.to))
      .filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.25 } // Lower threshold for better detection
    );
    
    sections.forEach((s) => observer.observe(s));

    // Handle scroll back to top specifically for "Home"
    const handleScroll = () => {
      if (window.scrollY < 100) setActive("home");
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id); // Set active immediately for instant feedback
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
        <button onClick={() => scrollTo("home")} className="text-2xl font-black tracking-tight text-white">
          Seva<span className="gradient-text">Bite</span>
        </button>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
        </button>

        <div className={`${open ? "flex" : "hidden"} glass absolute right-4 top-16 flex-col gap-1 rounded-2xl p-2 shadow-glass md:static md:flex md:flex-row md:bg-transparent md:p-0 md:shadow-none`}>
          {links.map((item) => (
            <button
              key={item.to}
              onClick={() => scrollTo(item.to)}
              className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                active === item.to ? "text-orange-400" : "text-slate-300 hover:text-white"
              }`}
            >
              {active === item.to && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-orange-500/20 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
