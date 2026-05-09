import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BackgroundDecor from "../components/BackgroundDecor";
import SectionHeader from "../components/SectionHeader";
import Card3D from "../components/Card3D";

const features = [
  { title: "Campaign Studio", text: "Launch premium donation campaigns with clarity and trust.", icon: "📈" },
  { title: "Impact Tracking", text: "Track every contribution with transparent, real-time reports.", icon: "✨" },
  { title: "Community Network", text: "Connect NGOs, volunteers, and donors in one smooth platform.", icon: "🤝" }
];

function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={containerRef} className="relative">
      <section className="section-container relative min-h-[90vh] flex flex-col justify-center">
        <BackgroundDecor />
        
        <div className="relative grid items-center gap-10 md:grid-cols-2 z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}>
            <motion.p 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 font-semibold uppercase tracking-widest text-orange-400"
            >
              Future of Giving
            </motion.p>
            <h1 className="text-5xl font-black leading-tight md:text-7xl lg:text-8xl overflow-hidden">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }} className="block">
                Build social impact
              </motion.span>
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }} className="block">
                with a <span className="gradient-text">premium</span>
              </motion.span>
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="block gradient-text">
                digital experience
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="mt-5 max-w-xl text-slate-300 font-medium text-lg md:text-xl">
              SevaBite blends modern design with meaningful outcomes. Inspire action, collect support, and showcase transparency.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => goTo("donate")} className="rounded-full bg-gradient-to-r from-[#1f5f39] via-orangeSoft to-[#2dcf73] px-6 py-3 font-semibold text-white shadow-premium transition hover:scale-105">
                Start Donating
              </button>
              <button onClick={() => goTo("services")} className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 backdrop-blur-md">
                Explore Services
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative min-h-[24rem]"
          >
            <motion.div 
              className="absolute right-10 top-6 h-56 w-56 rounded-full bg-gradient-to-br from-orange-300/40 to-orange-500/40 blur-2xl" 
              animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }} 
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
            />
            
            {/* Floating Glass Stats */}
            <motion.div 
              className="glass absolute left-10 top-2/4 z-10 w-44 -translate-y-2/4 rounded-3xl p-5 shadow-premium" 
              animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-2 h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-xl">🍲</div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Meals Sponsored</p>
              <p className="text-3xl font-black mt-1 text-white">12,450+</p>
            </motion.div>

            <motion.div 
              className="absolute bottom-4 right-0 grid gap-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              {[
                { label: "Active Donors", value: "1,280+", icon: "👥" },
                { label: "Fund Utilization", value: "98%", icon: "📊" }
              ].map((item) => (
                <div key={item.label} className="glass rounded-3xl p-5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{item.label}</p>
                    <p className="text-2xl font-black text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why SevaBite cards - separate, well-spaced area */}
      <section className="section-container relative z-20 pt-0">
        {/* Subtle backdrop to lift cards above the section image */}
        <div
          className="rounded-3xl px-6 py-12 md:px-10"
          style={{
            background: "rgba(5, 10, 25, 0.55)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            backdropFilter: "blur(16px)",
          }}
        >
          <SectionHeader
            eyebrow="Why SevaBite"
            title="Designed like a startup, built for social good"
            description="Elegant UI, fast flows, and rich interactions that make giving effortless."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, index) => (
              <Card3D key={f.title} {...f} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
