import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "services", label: "Services" },
  { to: "donate", label: "Donate" },
  { to: "contact", label: "Contact" }
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
      { threshold: 0.45 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
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
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                active === item.to ? "bg-orange-500/30 text-orange-300" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
