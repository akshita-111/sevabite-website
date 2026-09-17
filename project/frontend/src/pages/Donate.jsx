import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import DemoBanner from "../components/DemoBanner";

const API_BASE = "/api";

const PRESET_FOOD_TYPES = [
  "Cooked Rice & Lentils (Dal)",
  "Fresh Mixed Vegetables",
  "Curry & Bread / Roti",
  "Packaged Dry Goods",
  "Bakery & Breads",
  "Dairy / Paneer Dishes"
];

const TIME_OPTIONS = [
  "Just cooked / Fresh (< 1 hour)",
  "1 - 2 hours ago",
  "3 - 4 hours ago",
  "5 - 8 hours ago",
  "Yesterday (> 12 hours ago)"
];

const STORAGE_OPTIONS = [
  "Hot held (above 60°C / 140°F)",
  "Refrigerated (below 4°C / 40°F)",
  "Room temperature (ambient)",
  "Frozen (below 0°C / 32°F)",
  "Sealed dry pantry storage"
];

const STATUS_CONFIG = {
  "Suitable for Donation": {
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    badgeIcon: "✅",
    barColor: "from-emerald-500 to-teal-400"
  },
  "Needs Verification": {
    color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    badgeIcon: "⚠️",
    barColor: "from-amber-500 to-yellow-400"
  },
  "Not Recommended": {
    color: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    badgeIcon: "🛑",
    barColor: "from-rose-500 to-red-400"
  }
};

const PRIORITY_CONFIG = {
  High: "bg-red-500/20 text-red-300 border-red-500/30",
  Medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Low: "bg-sky-500/20 text-sky-300 border-sky-500/30"
};

const ROUTE_ICONS = {
  NGO: "🏛️",
  "Community Kitchen": "🍲",
  "Animal Feeding": "🐾",
  Composting: "🌱"
};

function Donate() {
  const [activeTab, setActiveTab] = useState("agent"); // 'agent' | 'direct'

  // AI Agent Form State
  const [agentForm, setAgentForm] = useState({
    foodType: "",
    quantity: "",
    timeSincePrep: TIME_OPTIONS[1],
    storageCondition: STORAGE_OPTIONS[2],
    notes: ""
  });
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentError, setAgentError] = useState("");
  const [agentResult, setAgentResult] = useState(null);

  // Existing Donation Form State
  const [donateForm, setDonateForm] = useState({
    name: "",
    email: "",
    peopleCount: "",
    message: ""
  });
  const [donateStatus, setDonateStatus] = useState({ text: "", ok: false, loading: false });

  // Handle Agent Input changes
  const onAgentChange = (e) => {
    const { name, value } = e.target;
    setAgentForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit to AI Food Donation Agent API
  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    setAgentError("");
    setAgentLoading(true);

    try {
      const res = await fetch(`${API_BASE}/food-agent/assess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentForm)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to analyze food donation");
      }

      setAgentResult(data.data);
    } catch (err) {
      setAgentError(err.message || "Unable to reach AI Agent. Please try again.");
    } finally {
      setAgentLoading(false);
    }
  };

  // Handle Direct Donation input
  const onDonateChange = (e) => {
    setDonateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit Direct Donation Form (original feature preserved)
  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    setDonateStatus({ text: "Submitting donation...", ok: false, loading: true });
    try {
      const res = await fetch(`${API_BASE}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...donateForm, amount: Number(donateForm.peopleCount) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setDonateStatus({ text: data.message, ok: true, loading: false });
      setDonateForm({ name: "", email: "", peopleCount: "", message: "" });
    } catch (error) {
      setDonateStatus({ text: error.message, ok: false, loading: false });
    }
  };

  // Transfer AI-assessed details into Direct Donation form
  const transferToDonateForm = () => {
    // Attempt to extract digits for meal count if possible
    const match = agentForm.quantity.match(/\d+/);
    const count = match ? match[0] : "";
    setDonateForm((prev) => ({
      ...prev,
      peopleCount: count || prev.peopleCount,
      message: `[AI Assessed: ${agentResult?.foodStatus}] Item: ${agentForm.foodType} (${agentForm.quantity}). Route: ${agentResult?.suggestedRoute}. Priority: ${agentResult?.priority}. Notes: ${agentForm.notes || "None"}`
    }));
    setActiveTab("direct");
  };

  return (
    <div className="section-container">
      <SectionHeader
        eyebrow="Donate Food"
        title="Every Donation Creates A Smile"
        description="Our AI Food Donation Agent evaluates surplus food in real time to recommend safe donation routes, priority, and immediate next steps."
      />

      {/* Top Banner */}
      <div className="mx-auto max-w-3xl mb-6">
        <DemoBanner
          variant="banner"
          icon="🤖"
          message="AI Food Donation Agent provides preliminary safety routing. Official confirmation is done by receiving partners."
        />
      </div>

      {/* Tab Selector */}
      <div className="mx-auto max-w-md mb-8 flex p-1.5 glass rounded-2xl border border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab("agent")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === "agent"
              ? "bg-gradient-to-r from-orangeSoft to-redSoft text-white shadow-lg shadow-orange-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span>🤖</span>
          <span>AI Food Agent</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("direct")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === "direct"
              ? "bg-gradient-to-r from-orangeSoft to-redSoft text-white shadow-lg shadow-orange-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span>📦</span>
          <span>Direct Donation</span>
        </button>
      </div>

      {/* Tab 1: AI Food Donation Agent */}
      {activeTab === "agent" && (
        <motion.div
          key="agent-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="glass interactive-card rounded-3xl p-6 shadow-premium md:p-8 border border-white/10">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Smart Food Suitability Assessment</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    AI Agent
                  </span>
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Enter surplus food details to evaluate suitability, recommended routing, and handling priority.
                </p>
              </div>
              {agentResult && (
                <button
                  type="button"
                  onClick={() => setAgentResult(null)}
                  className="text-xs text-slate-400 hover:text-orange-300 underline underline-offset-4"
                >
                  Assess Another Item
                </button>
              )}
            </div>

            <form onSubmit={handleAgentSubmit} className="grid gap-5">
              {/* Food Type with Preset Suggestions */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Food Type <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  name="foodType"
                  value={agentForm.foodType}
                  onChange={onAgentChange}
                  placeholder="e.g. Cooked rice and dal, vegetable curry, fresh bananas"
                  className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-orange-400 font-medium text-sm"
                  required
                />
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PRESET_FOOD_TYPES.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAgentForm((prev) => ({ ...prev, foodType: preset }))}
                      className="text-xs py-1 px-2.5 rounded-lg bg-white/5 hover:bg-orange-500/20 hover:text-orange-300 text-slate-400 border border-white/5 transition-colors"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity / Meals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Quantity / Meals <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={agentForm.quantity}
                    onChange={onAgentChange}
                    placeholder="e.g. 50 meals, 15 kg, 30 boxes"
                    className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-orange-400 font-medium text-sm"
                    required
                  />
                </div>

                {/* Time Since Preparation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Time Since Preparation <span className="text-orange-400">*</span>
                  </label>
                  <select
                    name="timeSincePrep"
                    value={agentForm.timeSincePrep}
                    onChange={onAgentChange}
                    className="w-full rounded-xl border border-white/15 bg-slate-900/90 px-4 py-3 text-white outline-none focus:border-orange-400 font-medium text-sm"
                    required
                  >
                    {TIME_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Storage Condition */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Storage Condition <span className="text-orange-400">*</span>
                </label>
                <select
                  name="storageCondition"
                  value={agentForm.storageCondition}
                  onChange={onAgentChange}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/90 px-4 py-3 text-white outline-none focus:border-orange-400 font-medium text-sm"
                  required
                >
                  {STORAGE_OPTIONS.map((cond) => (
                    <option key={cond} value={cond} className="bg-slate-900 text-white">
                      {cond}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Optional Notes (Packaging, aroma, allergens)
                </label>
                <textarea
                  name="notes"
                  value={agentForm.notes}
                  onChange={onAgentChange}
                  placeholder="e.g. Packed in stainless steel containers, vegetarian, kept covered at all times"
                  rows={3}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-orange-400 font-medium text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={agentLoading}
                className="w-full rounded-full bg-gradient-to-r from-redSoft via-orangeSoft to-greenSoft px-6 py-3.5 font-bold text-white transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
              >
                {agentLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Analyzing Food Safety & Routing...</span>
                  </>
                ) : (
                  <>
                    <span>⚡ Run AI Food Assessment</span>
                  </>
                )}
              </button>

              {/* Error Alert */}
              {agentError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/15 p-4 text-rose-300 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{agentError}</span>
                </div>
              )}
            </form>

            {/* AI Agent Recommendation Output */}
            <AnimatePresence>
              {agentResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 border-t border-white/15 pt-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      AI Agent Assessment
                    </span>
                    <span className="text-xs text-slate-500">Preliminary Decision</span>
                  </div>

                  {/* Recommendation Grid */}
                  <div className="rounded-2xl border border-white/15 bg-slate-950/60 p-5 backdrop-blur-md shadow-glass">
                    {/* Status and Route Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                      {/* Food Status */}
                      <div className="rounded-xl p-3 bg-white/5 border border-white/10">
                        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Food Status
                        </span>
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            STATUS_CONFIG[agentResult.foodStatus]?.color || "bg-slate-800 text-white"
                          }`}
                        >
                          <span>{STATUS_CONFIG[agentResult.foodStatus]?.badgeIcon || "ℹ️"}</span>
                          <span>{agentResult.foodStatus}</span>
                        </div>
                      </div>

                      {/* Suggested Route */}
                      <div className="rounded-xl p-3 bg-white/5 border border-white/10">
                        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Suggested Route
                        </span>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/15">
                          <span>{ROUTE_ICONS[agentResult.suggestedRoute] || "📍"}</span>
                          <span>{agentResult.suggestedRoute}</span>
                        </div>
                      </div>

                      {/* Priority */}
                      <div className="rounded-xl p-3 bg-white/5 border border-white/10">
                        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Priority Urgency
                        </span>
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            PRIORITY_CONFIG[agentResult.priority] || "bg-slate-800 text-white"
                          }`}
                        >
                          <span>⏱️</span>
                          <span>{agentResult.priority} Priority</span>
                        </div>
                      </div>
                    </div>

                    {/* Short Reason */}
                    <div className="mb-4 rounded-xl bg-white/[0.03] border border-white/10 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1 flex items-center gap-1.5">
                        <span>🔍 Reason</span>
                      </h4>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {agentResult.shortReason}
                      </p>
                    </div>

                    {/* Next Action */}
                    <div className="mb-5 rounded-xl bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-greenSoft mb-1 flex items-center gap-1.5">
                        <span>🚀 Next Recommended Action</span>
                      </h4>
                      <p className="text-sm text-slate-100 font-medium leading-relaxed">
                        {agentResult.nextAction}
                      </p>
                    </div>

                    {/* Mandatory Disclaimer */}
                    <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mb-4 text-center">
                      <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
                        ⚠️ <strong>AI assessment is preliminary.</strong> Final food acceptance and safety must be confirmed by the receiving organization.
                      </p>
                    </div>

                    {/* Action button if suitable */}
                    {agentResult.foodStatus === "Suitable for Donation" && (
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={transferToDonateForm}
                          className="w-full md:w-auto rounded-full bg-gradient-to-r from-greenSoft to-teal-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                          <span>Proceed with Direct Donation Form</span>
                          <span>➔</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Existing Direct Donation Form (Preserved fully) */}
      {activeTab === "direct" && (
        <motion.div
          key="direct-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <form
            onSubmit={handleDonateSubmit}
            className="glass interactive-card rounded-3xl p-6 shadow-premium md:p-8 border border-white/10"
          >
            <div className="mb-6 border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Standard Donation Submission</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                  Form
                </span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Provide your details to register this meal donation directly with our distribution team.
              </p>
            </div>

            <div className="grid gap-4">
              <input
                className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-orange-400 font-medium text-sm"
                name="name"
                value={donateForm.name}
                onChange={onDonateChange}
                placeholder="Full Name"
                required
              />
              <input
                className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-orange-400 font-medium text-sm"
                name="email"
                value={donateForm.email}
                onChange={onDonateChange}
                placeholder="Email Address"
                type="email"
                required
              />
              <input
                className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-orange-400 font-medium text-sm"
                name="peopleCount"
                value={donateForm.peopleCount}
                onChange={onDonateChange}
                placeholder="No. of people you want to feed"
                type="number"
                min="1"
                required
              />
              <textarea
                className="rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-orange-400 font-medium text-sm"
                name="message"
                value={donateForm.message}
                onChange={onDonateChange}
                placeholder="Message (optional)"
                rows={4}
              />
              <button
                className="rounded-full bg-gradient-to-r from-redSoft via-orangeSoft to-greenSoft px-6 py-3.5 font-bold text-white transition hover:scale-[1.02] disabled:opacity-50"
                type="submit"
                disabled={donateStatus.loading}
              >
                {donateStatus.loading ? "Submitting..." : "Donate Now"}
              </button>
              {donateStatus.text && (
                <p className={`text-sm ${donateStatus.ok ? "text-green-400" : "text-red-400"}`}>
                  {donateStatus.text}
                </p>
              )}
            </div>
          </form>
        </motion.div>
      )}

      {/* Footer Banner */}
      <div className="mx-auto max-w-2xl mt-6 flex justify-center">
        <DemoBanner
          icon="🛡️"
          message="AI assessment is preliminary. Final food acceptance and safety must be confirmed by the receiving organization."
        />
      </div>
    </div>
  );
}

export default Donate;
