import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

const API_BASE = "/api";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ text: "", ok: false });

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: "Submitting...", ok: false });
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setStatus({ text: data.message, ok: true });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ text: error.message, ok: false });
    }
  };

  return (
    <div className="section-container">
      <SectionHeader eyebrow="Join Us" title="Join The Movement" description="Have extra food, want to volunteer, or partner with us? Let’s build a future with zero food waste together." />
      <motion.form
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0, y: 60, scale: 0.95 },
          show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.12 } }
        }}
        onSubmit={onSubmit}
        className="glass interactive-card mx-auto max-w-2xl rounded-3xl p-6 shadow-premium md:p-8"
      >
        <div className="grid gap-4">
          <motion.input variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-green-400 font-medium" name="name" value={form.name} onChange={onChange} placeholder="Your Name" required />
          <motion.input variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-green-400 font-medium" name="email" value={form.email} onChange={onChange} placeholder="Your Email" type="email" required />
          <motion.textarea variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-green-400 font-medium" name="message" value={form.message} onChange={onChange} placeholder="Tell us how you'd like to help" rows={6} required />
          <motion.button variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } } }} className="rounded-full bg-gradient-to-r from-greenSoft via-orangeSoft to-redSoft px-6 py-3 font-bold text-white transition hover:scale-[1.02]" type="submit">
            Send Message
          </motion.button>
          {status.text && <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-500"}`}>{status.text}</p>}
        </div>
      </motion.form>
    </div>
  );
}

export default Contact;
