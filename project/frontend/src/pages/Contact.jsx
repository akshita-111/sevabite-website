import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

const API_BASE = "http://localhost:5000/api";

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
    <section className="section-container rounded-[2.5rem] bg-gradient-to-br from-[#2a2c2e] via-[#2a2d2a] to-[#283122]">
      <SectionHeader eyebrow="Contact" title="Let us co-create impact" description="Share your campaign goals and our team will help you launch quickly." />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="glass interactive-card mx-auto max-w-2xl rounded-3xl p-6 shadow-premium md:p-8"
      >
        <div className="grid gap-4">
          <input className="rounded-xl border border-orange-200/30 bg-black/20 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-green-300" name="name" value={form.name} onChange={onChange} placeholder="Full Name" required />
          <input className="rounded-xl border border-orange-200/30 bg-black/20 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-green-300" name="email" value={form.email} onChange={onChange} placeholder="Email Address" type="email" required />
          <textarea className="rounded-xl border border-orange-200/30 bg-black/20 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-green-300" name="message" value={form.message} onChange={onChange} placeholder="Your message" rows={6} required />
          <button className="rounded-full bg-gradient-to-r from-greenSoft via-orangeSoft to-redSoft px-6 py-3 font-bold text-white transition hover:scale-[1.02]" type="submit">
            Send Message
          </button>
          {status.text && <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-500"}`}>{status.text}</p>}
        </div>
      </motion.form>
    </section>
  );
}

export default Contact;
