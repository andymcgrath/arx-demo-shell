import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBarChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z" />
      <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── SectionTitle with tooltip ───────────────────────────────────────────────

function SectionTitle({ children, tip }: { children: React.ReactNode; tip: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex items-center gap-1.5 mb-4 group">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{children}</div>
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="flex-shrink-0 text-muted-foreground/50 hover:text-teal transition-colors focus:outline-none"
        aria-label={`Info: ${children}`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>
      {show && (
        <div
          className="absolute left-0 top-full mt-2 z-50 w-64 rounded-lg px-3 py-2.5 text-xs text-white/90 leading-relaxed shadow-xl pointer-events-none"
          style={{ background: "hsl(220 55% 14%)", border: "1px solid hsl(220 35% 28%)" }}
        >
          <div className="absolute -top-1.5 left-3 w-3 h-3 rotate-45" style={{ background: "hsl(220 55% 14%)", borderTop: "1px solid hsl(220 35% 28%)", borderLeft: "1px solid hsl(220 35% 28%)" }} />
          {tip}
        </div>
      )}
    </div>
  );
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const DASH_TABS = [
  { label: "Call Reason Intelligence", icon: <IconBarChart /> },
  { label: "Patient Journey Insights", icon: <IconUsers /> },
  { label: "Scheduling & Coverage", icon: <IconCalendar /> },
  { label: "Exact Transcription", icon: <IconZap /> },
  { label: "Playback & Compliance", icon: <IconFileText /> },
  { label: "Genie AI", icon: <IconSparkles /> },
];

// ─── Shared KPI Tile ──────────────────────────────────────────────────────────

function KpiTile({ label, value, goal, status }: { label: string; value: string; goal?: string; status?: string }) {
  const borderColor = status === "green" ? "border-t-emerald-500" : status === "amber" ? "border-t-amber-400" : status === "blue" ? "border-t-teal" : "border-t-navy-light";
  const valueColor = status === "green" ? "text-emerald-400" : status === "amber" ? "text-amber-400" : "text-teal";
  return (
    <div className={`rounded-xl border border-navy-light border-t-2 ${borderColor} p-4`} style={{ background: "hsl(220 55% 10%)" }}>
      <div className="text-xs text-muted-foreground mb-1 leading-tight">{label}</div>
      <div className={`text-2xl font-black ${valueColor} mb-1`}>{value}</div>
      {goal && <div className="text-xs text-muted-foreground">Goal {goal}</div>}
    </div>
  );
}

// ─── Tab 1 — Call Reason Intelligence ────────────────────────────────────────

const CALL_REASONS = [
  { label: "Prior Authorization Support", pct: 34, color: "bg-teal" },
  { label: "Refill Assistance", pct: 22, color: "bg-blue-500" },
  { label: "Copay / Financial Support", pct: 18, color: "bg-violet-500" },
  { label: "Enrollment & Onboarding", pct: 14, color: "bg-amber-500" },
  { label: "Side Effect / Clinical Question", pct: 8, color: "bg-orange-500" },
  { label: "Other", pct: 4, color: "bg-slate-500" },
];

const KPI_TILES_1 = [
  { label: "Avg Handle Time", value: "4:12", goal: "≤5:00", status: "green" },
  { label: "First Call Resolution", value: "82%", goal: "80%", status: "green" },
  { label: "Patient CSAT", value: "9.1/10", goal: "9.0", status: "green" },
  { label: "Script Adherence", value: "94%", goal: "90%", status: "green" },
  { label: "Escalation Rate", value: "4%", goal: "<5%", status: "green" },
  { label: "PA Verbatim Accuracy", value: "97%", goal: "95%", status: "green" },
];

function Tab1CallReasons() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-3">
        <SectionTitle tip="Percentage breakdown of all patient calls by primary reason, derived from AI transcription analysis across 100% of recorded calls this month.">Call Volume Breakdown</SectionTitle>
        {CALL_REASONS.map(({ label, pct: p, color }) => (
          <div key={label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-white/80 font-medium">{label}</span>
              <span className="text-sm font-bold text-white">{p}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(220 55% 10%)" }}>
              <div className={`h-full ${color} rounded-full`} style={{ width: `${p}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="lg:w-80 xl:w-96">
        <SectionTitle tip="Key performance indicators for the JASCAYD patient support center, each measured against an established program goal. Green = at or above goal.">Performance KPIs</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {KPI_TILES_1.map(t => <KpiTile key={t.label} {...t} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2 — Patient Journey Insights ────────────────────────────────────────

const FUNNEL_STAGES = [
  { stage: "Referrals Received", count: 312, trend: "+8%", up: true },
  { stage: "Enrolled in Program", count: 278, trend: "+5%", up: true },
  { stage: "PA Approved", count: 241, trend: "→ flat", up: null },
  { stage: "First Fill Dispensed", count: 198, trend: "-3%", up: false },
];

const KPI_TILES_2 = [
  { label: "Time to First Fill", value: "4.2 days", goal: "≤5 days", status: "green" },
  { label: "PA Approval Rate", value: "87%", goal: "85%", status: "green" },
  { label: "90-Day Refill Adherence", value: "73%", goal: "80%", status: "amber" },
  { label: "Days to Enrollment", value: "2.1", goal: "≤3 days", status: "green" },
  { label: "Abandonment Rate", value: "11%", goal: "<10%", status: "amber" },
  { label: "Patient Satisfaction", value: "9.1", goal: "9.0", status: "green" },
];

function Tab2Journey() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-56 xl:w-64 flex-shrink-0">
        <SectionTitle tip="Volume of patients at each stage of the JASCAYD program journey, from initial referral through first fill dispensed. Trend arrows compare to prior month.">Patient Journey Funnel</SectionTitle>
        <div className="relative pl-6">
          <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-teal/20" />
          <div className="space-y-6">
            {FUNNEL_STAGES.map(({ stage, count, trend, up }, i) => (
              <div key={stage} className="flex items-start gap-3 relative">
                <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center flex-shrink-0 text-navy text-[10px] font-black z-10">
                  {i + 1}
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-none">{count.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stage}</div>
                  <div className={`inline-flex items-center gap-1 text-xs font-semibold mt-1 px-1.5 py-0.5 rounded ${
                    up === true ? "text-emerald-400 bg-emerald-500/10" : up === false ? "text-red-400 bg-red-500/10" : "text-muted-foreground bg-white/5"
                  }`}>
                    {trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <SectionTitle tip="Program outcome KPIs measuring efficiency, adherence, and patient satisfaction across the JASCAYD patient population. Amber = below goal but within tolerance.">Outcome Metrics</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {KPI_TILES_2.map(t => <KpiTile key={t.label} {...t} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3 — Scheduling & Coverage ───────────────────────────────────────────

const AGENTS = [
  {
    name: "Martinez, Sofia",
    shift: "8:00 AM – 5:00 PM",
    blocks: [
      { start: 60, end: 135, color: "bg-emerald-500", label: "Patient calls" },
      { start: 135, end: 150, color: "bg-blue-400", label: "Break" },
      { start: 150, end: 300, color: "bg-emerald-500", label: "Patient calls" },
      { start: 300, end: 330, color: "bg-amber-400", label: "Lunch" },
      { start: 330, end: 540, color: "bg-emerald-500", label: "Patient calls" },
    ],
  },
  {
    name: "Nguyen, David",
    shift: "9:00 AM – 6:00 PM",
    blocks: [
      { start: 120, end: 300, color: "bg-emerald-500", label: "Patient calls" },
      { start: 300, end: 330, color: "bg-amber-400", label: "Lunch" },
      { start: 330, end: 540, color: "bg-emerald-500", label: "Patient calls" },
    ],
  },
  {
    name: "Patel, Priya",
    shift: "7:00 AM – 4:00 PM",
    blocks: [
      { start: 0, end: 180, color: "bg-emerald-500", label: "Patient calls" },
      { start: 180, end: 195, color: "bg-blue-400", label: "Break" },
      { start: 195, end: 240, color: "bg-emerald-500", label: "Patient calls" },
      { start: 240, end: 270, color: "bg-amber-400", label: "Lunch" },
      { start: 270, end: 420, color: "bg-emerald-500", label: "Patient calls" },
    ],
  },
];

const TIMELINE_TOTAL = 720;
function pct(minutes: number) { return `${(minutes / TIMELINE_TOTAL) * 100}%`; }

function Tab3Scheduling() {
  const hours = Array.from({ length: 13 }, (_, i) => i + 7);
  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <span className="text-white font-semibold text-sm">Mon, May 19 · JASCAYD Patient Support · GMT-4</span>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Patient Calls</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" /> Break</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> Lunch</div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-navy-light" style={{ background: "hsl(220 55% 10%)" }}>
        <div className="min-w-[640px]">
          <div className="flex border-b border-navy-light">
            <div className="w-40 flex-shrink-0 px-3 py-2 text-xs text-muted-foreground font-medium">Agent</div>
            <div className="flex-1 relative h-8">
              {hours.map((h, i) => (
                <div key={h} className="absolute top-0 bottom-0 flex items-center" style={{ left: pct(i * 60) }}>
                  <span className="text-[11px] text-muted-foreground -translate-x-1/2">
                    {h > 12 ? `${h - 12}PM` : h === 12 ? "12PM" : `${h}AM`}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {AGENTS.map(agent => (
            <div key={agent.name} className="flex border-b border-navy-light last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <div className="w-40 flex-shrink-0 px-3 py-3">
                <div className="text-sm text-white font-medium leading-tight">{agent.name}</div>
                <div className="text-xs text-muted-foreground">{agent.shift}</div>
              </div>
              <div className="flex-1 relative h-14 my-1.5">
                {hours.map((_, i) => (
                  <div key={i} className="absolute top-0 bottom-0 w-px bg-navy-light/50" style={{ left: pct(i * 60) }} />
                ))}
                {agent.blocks.map((block, bi) => (
                  <div
                    key={bi}
                    className={`absolute top-1 bottom-1 ${block.color} rounded opacity-80 hover:opacity-100 transition-opacity`}
                    style={{ left: pct(block.start), width: pct(block.end - block.start) }}
                    title={block.label}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {[
          { label: "Volume", value: "847 calls" },
          { label: "Service Level", value: "91%" },
          { label: "Headcount", value: "12 agents" },
          { label: "Avg Occupancy", value: "84%" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg px-4 py-2 border border-navy-light" style={{ background: "hsl(220 48% 13%)" }}>
            <span className="text-muted-foreground">{label}: </span>
            <span className="text-white font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 4 — Exact Transcription ─────────────────────────────────────────────

const CONFIDENCE_BRACKETS = [
  { range: "95–100%", pct: 61 },
  { range: "90–94%", pct: 24 },
  { range: "85–89%", pct: 10 },
  { range: "<85%", pct: 5 },
];

const LEARNED_TERMS = [
  { term: "JASCAYD", uses: "4,203" },
  { term: "Prior Authorization", uses: "3,847" },
  { term: "Specialty Pharmacy", uses: "2,941" },
  { term: "Hub Services", uses: "2,105" },
  { term: "Copay Assistance", uses: "1,892" },
  { term: "PA Appeal", uses: "1,447" },
  { term: "Free Drug Program", uses: "1,203" },
  { term: "Benefits Verification", uses: "984" },
];

const ACCURACY_DAYS = [
  { day: "Mon", val: "97.1%" },
  { day: "Tue", val: "97.3%" },
  { day: "Wed", val: "97.0%" },
  { day: "Thu", val: "97.6%" },
  { day: "Fri", val: "97.4%" },
  { day: "Sat", val: "97.8%" },
  { day: "Sun", val: "97.2%" },
];

function Tab4Transcription() {
  return (
    <div className="space-y-6">
      {/* Stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KpiTile label="Transcription Accuracy" value="97.4%" status="blue" />
        <KpiTile label="Custom Terms Learned" value="1,847" status="blue" />
        <KpiTile label="Calls Processed (MTD)" value="4,203" status="blue" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left — Confidence */}
        <div className="flex-1 rounded-xl border border-navy-light p-5" style={{ background: "hsl(220 55% 10%)" }}>
          <SectionTitle tip="Distribution of AI transcription confidence scores across all calls processed this month. Higher brackets indicate greater word-level accuracy before human review.">Confidence Score Distribution</SectionTitle>
          <div className="space-y-3">
            {CONFIDENCE_BRACKETS.map(({ range, pct: p }) => (
              <div key={range}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white/80 font-medium">{range}</span>
                  <span className="text-sm font-bold text-teal">{p}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "hsl(220 45% 16%)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${p}%`,
                      background: "linear-gradient(90deg, hsl(172 70% 35%), hsl(172 70% 50%))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Learned Terms */}
        <div className="flex-1 rounded-xl border border-navy-light p-5" style={{ background: "hsl(220 55% 10%)" }}>
          <SectionTitle tip="Custom terminology the Exact Transcription Bot has learned from JASCAYD-specific calls. Terms are weighted by usage frequency and improve model accuracy over time.">Top Learned Terms — This Month</SectionTitle>
          <div className="space-y-2">
            {LEARNED_TERMS.map(({ term, uses }) => (
              <div key={term} className="flex items-center justify-between py-1.5 border-b border-navy-light/40 last:border-0">
                <span className="text-sm text-white font-medium">{term}</span>
                <span className="text-xs font-semibold text-teal bg-teal/10 px-2 py-0.5 rounded-full">{uses} uses</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom — 7-day accuracy */}
      <div className="rounded-xl border border-navy-light p-5" style={{ background: "hsl(220 55% 10%)" }}>
        <SectionTitle tip="Daily transcription accuracy rate over the past 7 days, calculated as the percentage of transcribed words matching verified ground truth for sampled calls.">7-Day Accuracy Trend</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {ACCURACY_DAYS.map(({ day, val }) => (
            <div key={day} className="flex-1 min-w-[70px] rounded-lg border border-navy-light text-center py-2.5" style={{ background: "hsl(220 45% 16%)" }}>
              <div className="text-xs text-muted-foreground mb-1">{day}</div>
              <div className="text-sm font-bold text-teal">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 5 — Playback Summary + PII Redaction (combined) ───────────────────

const PHI_BREAKDOWN = [
  { type: "Patient Name", pct: 38 },
  { type: "Date of Birth", pct: 22 },
  { type: "Insurance ID", pct: 19 },
  { type: "SSN Fragment", pct: 11 },
  { type: "Phone Number", pct: 7 },
  { type: "Other", pct: 3 },
];

const REDACTION_LOG = [
  { id: "#8841", agent: "Martinez, Sofia", duration: "4:23", fields: "Name, DOB, Ins. ID" },
  { id: "#8840", agent: "Nguyen, David", duration: "6:11", fields: "Name, SSN" },
  { id: "#8839", agent: "Patel, Priya", duration: "3:48", fields: "Name, DOB" },
  { id: "#8838", agent: "Martinez, Sofia", duration: "5:02", fields: "Ins. ID, Phone" },
  { id: "#8837", agent: "Nguyen, David", duration: "4:37", fields: "Name, DOB, Ins. ID" },
  { id: "#8836", agent: "Patel, Priya", duration: "7:14", fields: "Name, SSN, Phone" },
];

function Tab5PlaybackAndCompliance() {
  return (
    <div className="space-y-6">
      {/* Stat tiles — combined */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiTile label="Avg Summary Read Time" value="28 sec" status="blue" />
        <KpiTile label="Review Time Saved (MTD)" value="847 hrs" status="green" />
        <KpiTile label="Summaries Generated" value="4,203" status="blue" />
        <KpiTile label="PHI Events Redacted" value="14,203" status="green" />
        <KpiTile label="Avg PHI / Call" value="3.2" status="green" />
        <KpiTile label="Compliance Coverage" value="100%" status="green" />
      </div>

      {/* Row 1 — Playback Summary */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 rounded-xl border border-navy-light p-5" style={{ background: "hsl(220 55% 10%)" }}>
          <SectionTitle tip="Comparison of average supervisor call review time before AI summaries (full playback) vs. after (reading the structured summary). Represents an 80% time reduction per call.">Productivity Impact</SectionTitle>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-white/70">Before — Avg call review time</span>
                <span className="text-sm font-bold text-white/60">5.2 min</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "hsl(220 45% 16%)" }}>
                <div className="h-full w-full rounded-full" style={{ background: "hsl(220 35% 30%)" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-white font-medium">After — Avg summary review time</span>
                <span className="text-sm font-bold text-teal">28 sec</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "hsl(220 45% 16%)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: "9%", background: "linear-gradient(90deg, hsl(172 70% 35%), hsl(172 70% 50%))" }}
                />
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-teal/20 bg-teal/5 px-4 py-3 text-center">
              <span className="text-teal font-bold text-lg">80% reduction</span>
              <span className="text-muted-foreground text-sm"> in review time per call</span>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-xl border border-navy-light p-5" style={{ background: "hsl(220 55% 10%)" }}>
          <SectionTitle tip="An example of a structured call summary produced by the Playback Summary Bot. Each summary captures intent, sentiment, outcome, and action items — readable in under 30 seconds.">Sample AI-Generated Summary</SectionTitle>
          <div
            className="rounded-xl border-l-4 border-teal p-4"
            style={{ background: "hsl(220 48% 8%)", fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace" }}
          >
            <div className="text-xs text-muted-foreground mb-3">
              Call #8841 · May 14, 2026 · 4:23 duration<br />
              Agent: Martinez, Sofia
            </div>
            <div className="text-xs font-bold text-teal uppercase tracking-widest mb-2">Summary</div>
            <p className="text-sm text-white/85 leading-relaxed mb-4">
              Patient called regarding prior authorization status for JASCAYD.
              Expressed frustration with 3-day delay. Agent confirmed PA submitted
              and escalated to PA specialist team. Patient agreed to callback
              by EOD. No PHI issues flagged.
            </p>
            <div className="space-y-1.5 border-t border-navy-light pt-3">
              <div className="text-xs"><span className="text-teal font-semibold">OUTCOME: </span><span className="text-white/80">Escalated — PA Specialist follow-up required</span></div>
              <div className="text-xs"><span className="text-amber-400 font-semibold">SENTIMENT: </span><span className="text-white/80">Frustrated → Resolved</span></div>
              <div className="text-xs"><span className="text-emerald-400 font-semibold">ACTION ITEM: </span><span className="text-white/80">PA team callback before 5 PM</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "hsl(220 35% 22%)" }} />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold" style={{ borderColor: "hsl(220 35% 28%)", color: "hsl(220 15% 55%)" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          PII Redaction & Compliance
        </div>
        <div className="flex-1 h-px" style={{ background: "hsl(220 35% 22%)" }} />
      </div>

      {/* Row 2 — PII Redaction */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80 xl:w-96 flex-shrink-0 rounded-xl border border-navy-light p-5" style={{ background: "hsl(220 55% 10%)" }}>
          <SectionTitle tip="Percentage breakdown of Protected Health Information types automatically identified and redacted from call recordings by the PII Redaction Bot.">PHI Field Breakdown</SectionTitle>
          <div className="space-y-3">
            {PHI_BREAKDOWN.map(({ type, pct: p }) => (
              <div key={type}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-white/80 font-medium">{type}</span>
                  <span className="text-sm font-bold text-emerald-400">{p}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(220 45% 16%)" }}>
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 rounded-xl border border-navy-light p-5" style={{ background: "hsl(220 55% 10%)" }}>
          <SectionTitle tip="Audit log of the most recent calls processed by the PII Redaction Bot, confirming which PHI fields were removed before recordings were stored.">Recent Call Redaction Log</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-navy-light">
                  {["Call ID", "Agent", "Duration", "PHI Fields Removed", "Status"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-muted-foreground pb-2 pr-4 last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REDACTION_LOG.map(row => (
                  <tr key={row.id} className="border-b border-navy-light/30 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 pr-4 font-mono text-xs text-muted-foreground">{row.id}</td>
                    <td className="py-2.5 pr-4 text-white font-medium">{row.agent}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{row.duration}</td>
                    <td className="py-2.5 pr-4 text-white/70 text-xs">{row.fields}</td>
                    <td className="py-2.5">
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">✓ Clean</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 6 — Genie AI ─────────────────────────────────────────────────────────

const GENIE_QA = [
  {
    q: "What percentage of PA calls resulted in escalation this month?",
    a: "23% of PA-related calls (284 of 1,231) were escalated to a specialist.",
  },
  {
    q: "Show me patients who mentioned side effects in the last 30 days.",
    a: "47 calls flagged · Top terms: fatigue (18), nausea (14), injection site (9)",
  },
  {
    q: "What is the average handle time for enrollment calls vs. PA calls?",
    a: "Enrollment: 5.8 min avg · PA Support: 6.4 min avg",
  },
  {
    q: "How many calls ended without resolution last week?",
    a: "62 calls (11.4%) — most common reason: patient requested callback",
  },
];

function Tab6GenieAI() {
  return (
    <div className="space-y-6">
      {/* Stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KpiTile label="Queries This Month" value="312" status="blue" />
        <KpiTile label="Avg Time to Insight" value="1.4 sec" status="blue" />
        <KpiTile label="Data Records Queried" value="4.2M" status="blue" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left — Q&A pairs */}
        <div className="flex-1 space-y-3">
          <SectionTitle tip="Natural language questions submitted by analysts to Genie AI this month, with the structured answers returned. Average response time is 1.4 seconds across 4.2M data records.">Recent Queries & Answers</SectionTitle>
          {GENIE_QA.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-xl border-l-4 border-teal/60 p-4"
              style={{ background: "hsl(220 55% 10%)", borderTopRightRadius: "12px", borderBottomRightRadius: "12px", border: "1px solid hsl(220 35% 22%)", borderLeft: "4px solid hsl(172 70% 45% / 0.6)" }}
            >
              <div className="text-xs font-semibold text-teal/80 mb-1">Q:</div>
              <p className="text-sm text-white/70 mb-2 leading-snug">{q}</p>
              <div className="text-xs font-semibold text-muted-foreground mb-1">A:</div>
              <p className="text-sm text-white font-medium leading-snug">{a}</p>
            </div>
          ))}
        </div>

        {/* Right — Decorative query input */}
        <div className="lg:w-72 xl:w-80 flex-shrink-0">
          <SectionTitle tip="Genie AI accepts plain-English questions across all JASCAYD call data — no dashboards, SQL, or data exports required. Results are returned as structured analysis.">Natural Language Query</SectionTitle>
          <div className="rounded-xl border border-navy-light p-4" style={{ background: "hsl(220 55% 10%)" }}>
            <div className="rounded-lg border border-teal/30 p-3 mb-3" style={{ background: "hsl(220 48% 8%)" }}>
              <div className="text-sm text-muted-foreground mb-2">Ask anything about JASCAYD calls...</div>
              <div className="text-sm text-white/80 italic">"Show refill adherence trend for patients on JASCAYD in Q2..."</div>
              <div className="flex justify-end mt-3">
                <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center text-navy">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Powered by Genie AI · AssistRx</p>
          </div>

          {/* Quick stat summary */}
          <div className="mt-4 rounded-xl border border-navy-light p-4 space-y-3" style={{ background: "hsl(220 55% 10%)" }}>
            <SectionTitle tip="Distribution of analyst query topics submitted to Genie AI this month, showing where program teams are focusing their analysis and reporting efforts.">Top Query Categories</SectionTitle>
            {[
              { cat: "PA Status & Escalation", share: 31 },
              { cat: "Refill & Adherence", share: 26 },
              { cat: "Enrollment Trends", share: 21 },
              { cat: "Side Effect Reports", share: 14 },
              { cat: "Other", share: 8 },
            ].map(({ cat, share }) => (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">{cat}</span>
                  <span className="text-teal font-bold">{share}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(220 45% 16%)" }}>
                  <div className="h-full rounded-full bg-teal/60" style={{ width: `${share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab panels array ─────────────────────────────────────────────────────────

const TAB_PANELS = [
  Tab1CallReasons,
  Tab2Journey,
  Tab3Scheduling,
  Tab4Transcription,
  Tab5PlaybackAndCompliance,
  Tab6GenieAI,
];

// ─── NavRail (tab-based) ──────────────────────────────────────────────────────

function NavRail({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (i: number) => void }) {
  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col z-50"
      style={{ background: "hsl(220 55% 8%)", borderRight: "1px solid hsl(220 35% 22%)" }}
    >
      {/* Brand */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "hsl(220 35% 22%)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="hsl(220 55% 10%)">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">JASCAYD</div>
            <div className="text-xs" style={{ color: "hsl(220 15% 55%)" }}>Program Intelligence</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-3" style={{ color: "hsl(220 15% 45%)" }}>Dashboards</p>
        {DASH_TABS.slice(0, 3).map((tab, i) => {
          const isActive = activeTab === i;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left mb-0.5 ${
                isActive
                  ? "text-teal bg-teal/10 border-l-2 border-teal"
                  : "hover:bg-white/5"
              }`}
              style={{ color: isActive ? undefined : "hsl(220 15% 55%)" }}
            >
              <span className={isActive ? "text-teal" : ""}>{tab.icon}</span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          );
        })}

        <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-3 mt-5" style={{ color: "hsl(220 15% 45%)" }}>AI Capabilities</p>
        {DASH_TABS.slice(3).map((tab, i) => {
          const idx = i + 3;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left mb-0.5 ${
                isActive
                  ? "text-teal bg-teal/10 border-l-2 border-teal"
                  : "hover:bg-white/5"
              }`}
              style={{ color: isActive ? undefined : "hsl(220 15% 55%)" }}
            >
              <span className={isActive ? "text-teal" : ""}>{tab.icon}</span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "hsl(220 35% 22%)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal animate-pulse flex-shrink-0" />
          <span className="text-xs font-semibold text-teal">Live Data · AssistRx</span>
        </div>
      </div>
    </aside>
  );
}

// ─── Mobile Top Bar ───────────────────────────────────────────────────────────

function MobileTopBar({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (i: number) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 z-40 lg:hidden"
        style={{ background: "hsl(220 55% 8%)", borderBottom: "1px solid hsl(220 35% 22%)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-teal flex items-center justify-center flex-shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="hsl(220 55% 10%)">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white">JASCAYD</span>
          <span className="text-xs hidden sm:block" style={{ color: "hsl(220 15% 55%)" }}>· {DASH_TABS[activeTab].label}</span>
        </div>
        <button onClick={() => setOpen(true)} className="hover:text-white transition-colors" style={{ color: "hsl(220 15% 55%)" }}>
          <IconMenu />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-0 bottom-0 w-72 flex flex-col"
            style={{ background: "hsl(220 55% 8%)", borderLeft: "1px solid hsl(220 35% 22%)" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "hsl(220 35% 22%)" }}>
              <span className="text-white font-semibold">Navigation</span>
              <button onClick={() => setOpen(false)} className="hover:text-white transition-colors" style={{ color: "hsl(220 15% 55%)" }}>
                <IconX />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-2" style={{ color: "hsl(220 15% 45%)" }}>Dashboards</p>
              {DASH_TABS.slice(0, 3).map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => { setActiveTab(i); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all text-left mb-0.5 ${
                    activeTab === i ? "text-teal bg-teal/10 border-l-2 border-teal" : "hover:bg-white/5"
                  }`}
                  style={{ color: activeTab === i ? undefined : "hsl(220 15% 55%)" }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-2 mt-4" style={{ color: "hsl(220 15% 45%)" }}>AI Capabilities</p>
              {DASH_TABS.slice(3).map((tab, i) => {
                const idx = i + 3;
                return (
                  <button
                    key={tab.label}
                    onClick={() => { setActiveTab(idx); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all text-left mb-0.5 ${
                      activeTab === idx ? "text-teal bg-teal/10 border-l-2 border-teal" : "hover:bg-white/5"
                    }`}
                    style={{ color: activeTab === idx ? undefined : "hsl(220 15% 55%)" }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Dashboard Header ─────────────────────────────────────────────────────────

function DashboardHeader({ activeTab }: { activeTab: number }) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 border-b flex-wrap gap-3"
      style={{ borderColor: "hsl(220 35% 22%)", background: "hsl(220 48% 11%)" }}
    >
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="text-xs font-semibold text-teal uppercase tracking-widest">Live · Contact Center Intelligence</span>
        </div>
        <h1 className="text-lg font-black text-white leading-tight">JASCAYD Program Intelligence</h1>
        <p className="text-xs mt-0.5" style={{ color: "hsl(220 15% 55%)" }}>
          Powered by contact center speech analytics · AssistRx
          <span className="mx-2 opacity-40">·</span>
          <span className="text-white/60">{DASH_TABS[activeTab].label}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="text-xs font-medium px-3 py-1.5 rounded-lg border border-navy-light" style={{ color: "hsl(220 15% 55%)" }}>
          MTD · May 2026
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal/10 border border-teal/30 text-teal">
          4,203 calls analyzed
        </div>
      </div>
    </div>
  );
}

// ─── Tab Strip ────────────────────────────────────────────────────────────────

function TabStrip({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: (i: number) => void }) {
  return (
    <div
      className="flex overflow-x-auto border-b scrollbar-none"
      style={{ borderColor: "hsl(220 35% 22%)", background: "hsl(220 48% 11%)" }}
    >
      {DASH_TABS.map((tab, i) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(i)}
          className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
            activeTab === i ? "text-teal" : "hover:text-white"
          }`}
          style={{ color: activeTab === i ? undefined : "hsl(220 15% 50%)" }}
        >
          <span className={activeTab === i ? "text-teal" : ""}>{tab.icon}</span>
          <span>{tab.label}</span>
          {activeTab === i && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal" />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Main Dashboard App ───────────────────────────────────────────────────────

export default function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const ActivePanel = TAB_PANELS[activeTab];

  return (
    <div className="min-h-screen font-sans" style={{ background: "hsl(220 55% 8%)" }}>
      <NavRail activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileTopBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="lg:pl-64 pt-14 lg:pt-0 flex flex-col h-screen overflow-hidden">
        <DashboardHeader activeTab={activeTab} />
        <TabStrip activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 overflow-y-auto p-5 lg:p-6" style={{ background: "hsl(220 50% 9%)" }}>
          <ActivePanel />
        </div>
      </main>
    </div>
  );
}
