import { motion } from "framer-motion";
import BackgroundDecor from "../components/BackgroundDecor";
import SectionHeader from "../components/SectionHeader";
import Card3D from "../components/Card3D";

const features = [
  { title: "Campaign Studio", text: "Launch premium donation campaigns with clarity and trust.", icon: "📈" },
  { title: "Impact Tracking", text: "Track every contribution with transparent, real-time reports.", icon: "✨" },
  { title: "Community Network", text: "Connect NGOs, volunteers, and donors in one smooth platform.", icon: "🤝" }
];

function Home() {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section className="section-container relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-br from-[#123024] via-[#1a2f22] to-[#352312]">
        <BackgroundDecor />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 font-semibold uppercase tracking-widest text-orange-300">Future of Giving</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
              Build social impact with a <span className="gradient-text">premium digital experience</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-300">
              SevaBite blends modern design with meaningful outcomes. Inspire action, collect support, and showcase transparency.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => goTo("donate")} className="rounded-full bg-gradient-to-r from-[#1f5f39] via-orangeSoft to-[#2dcf73] px-6 py-3 font-semibold text-white shadow-premium transition hover:scale-105">
                Start Donating
              </button>
              <button onClick={() => goTo("services")} className="rounded-full border border-orange-300/40 bg-white/10 px-6 py-3 font-semibold text-orange-200 transition hover:bg-orange-500/20">
                Explore Services
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative min-h-[24rem]"
          >
            <motion.div className="absolute right-10 top-6 h-56 w-56 rounded-full bg-gradient-to-br from-orange-300/70 to-orange-500/70 blur-[2px]" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5 }} />
            <motion.div className="glass absolute left-10 top-2/4 z-10 w-44 -translate-y-2/4 rounded-3xl p-4 shadow-premium" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity }}>
              <p className="text-xs text-slate-300">Meals Sponsored</p>
              <p className="text-2xl font-black">12,450+</p>
            </motion.div>
            <div className="absolute bottom-4 right-0 grid gap-3">
              {[
                { label: "Active Donors", value: "1,280+" },
                { label: "Fund Utilization", value: "98%" }
              ].map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4">
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="text-2xl font-black text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-container bg-gradient-to-b from-[#13281e] to-[#14221a]">
        <SectionHeader
          eyebrow="Why SevaBite"
          title="Designed like a startup, built for social good"
          description="Elegant UI, fast flows, and rich interactions that make giving effortless."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, index) => (
            <Card3D key={f.title} {...f} delay={index * 0.12} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
