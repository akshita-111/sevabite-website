import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

const API_BASE = "http://localhost:5000/api";

function Donate() {
  const [form, setForm] = useState({ name: "", email: "", amount: "", message: "" });
  const [status, setStatus] = useState({ text: "", ok: false });

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: "Submitting...", ok: false });
    try {
      const res = await fetch(`${API_BASE}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setStatus({ text: data.message, ok: true });
      setForm({ name: "", email: "", amount: "", message: "" });
    } catch (error) {
      setStatus({ text: error.message, ok: false });
    }
  };

  return (
    <section className="section-container rounded-[2.5rem] bg-gradient-to-br from-[#3a1c14] via-[#472014] to-[#4b3413]">
      <SectionHeader eyebrow="Donate" title="Fuel meaningful change" description="Your support powers food access, education, and emergency interventions." />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="glass interactive-card mx-auto max-w-2xl rounded-3xl p-6 shadow-premium md:p-8"
      >
        <div className="grid gap-4">
          <input className="rounded-xl border border-orange-200/30 bg-black/20 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-orange-300" name="name" value={form.name} onChange={onChange} placeholder="Full Name" required />
          <input className="rounded-xl border border-orange-200/30 bg-black/20 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-orange-300" name="email" value={form.email} onChange={onChange} placeholder="Email Address" type="email" required />
          <input className="rounded-xl border border-orange-200/30 bg-black/20 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-orange-300" name="amount" value={form.amount} onChange={onChange} placeholder="Donation Amount" type="number" min="1" required />
          <textarea className="rounded-xl border border-orange-200/30 bg-black/20 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-orange-300" name="message" value={form.message} onChange={onChange} placeholder="Message (optional)" rows={5} />
          <button className="rounded-full bg-gradient-to-r from-redSoft via-orangeSoft to-greenSoft px-6 py-3 font-bold text-white transition hover:scale-[1.02]" type="submit">
            Submit Donation
          </button>
          {status.text && <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-500"}`}>{status.text}</p>}
        </div>
      </motion.form>
    </section>
  );
}

export default Donate;
