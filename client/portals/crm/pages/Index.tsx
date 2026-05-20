import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Pencil,
  User,
  X,
  Zap,
  Settings,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
} from "lucide-react";

const SF_BLUE = "#0070d2";
const FC_BLUE = "#0176d3";
const SF_BORDER = "#dddbda";
const SF_SECTION_BG = "#f3f3f3";

// ─── Shared SF components ────────────────────────────────────────────────────

function SfButton({
  children,
  split,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  split?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={`flex items-stretch border border-[#dddbda] rounded ${className}`} style={{ borderRadius: 4 }}>
      <button
        onClick={onClick}
        className="px-3 py-1 text-[13px] text-[#3e3e3c] bg-white hover:bg-[#f3f3f3] transition-colors whitespace-nowrap"
        style={{ borderRadius: split ? "4px 0 0 4px" : 4 }}
      >
        {children}
      </button>
      {split && (
        <button
          className="px-2 py-1 bg-white hover:bg-[#f3f3f3] border-l border-[#dddbda] transition-colors"
          style={{ borderRadius: "0 4px 4px 0" }}
        >
          <ChevronDown size={12} className="text-[#3e3e3c]" />
        </button>
      )}
    </div>
  );
}

function SfLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`cursor-pointer hover:underline ${className}`} style={{ color: SF_BLUE }}>
      {children}
    </span>
  );
}

function FieldRow({ label, value, isLink }: { label: string; value?: React.ReactNode; isLink?: boolean }) {
  return (
    <div className="group relative flex flex-col py-2 border-b border-[#dddbda] pr-6 min-h-[44px]">
      <span className="text-[11px] text-[#706e6b] mb-0.5 uppercase tracking-wide font-medium leading-tight">{label}</span>
      {isLink ? (
        <SfLink className="text-[13px]">{value}</SfLink>
      ) : (
        <span className="text-[13px] text-[#3e3e3c]">{value || "\u00a0"}</span>
      )}
      <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1">
        <Pencil size={12} className="text-[#706e6b]" />
      </button>
    </div>
  );
}

function SectionHeader({
  title,
  collapsed,
  onToggle,
  rightContent,
}: {
  title: string;
  collapsed: boolean;
  onToggle: () => void;
  rightContent?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between px-3 cursor-pointer select-none border-b border-[#dddbda]"
      style={{ background: SF_SECTION_BG, minHeight: 32 }}
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        {collapsed ? (
          <ChevronRight size={14} className="text-[#706e6b]" />
        ) : (
          <ChevronDown size={14} className="text-[#706e6b]" />
        )}
        <span className="text-[13px] font-semibold text-[#3e3e3c]">{title}</span>
      </div>
      {rightContent}
    </div>
  );
}

// ─── Stage data ──────────────────────────────────────────────────────────────

interface StageField {
  label: string;
  value: string | null;
}

interface Stage {
  id: string;
  name: string;
  statusLabel: string;
  statusDetail: string;
  isComplete: boolean;
  isNotStarted: boolean;
  fields: StageField[];
  lastUpdated: string | null;
  lastUpdatedAgo: string | null;
}

const STAGES: Stage[] = [
  {
    id: "EA-14272",
    name: "Enrollment Assistance",
    statusLabel: "Complete",
    statusDetail: "Enrollment Completed",
    isComplete: true,
    isNotStarted: false,
    fields: [
      { label: "Prescriber Notes", value: null },
      { label: "Patient Notes", value: null },
    ],
    lastUpdated: "5/15/2026",
    lastUpdatedAgo: "4 days ago",
  },
  {
    id: "BI-14273",
    name: "Benefits Investigation",
    statusLabel: "Complete",
    statusDetail: "Patient Has Coverage; Prior Authorization Required",
    isComplete: true,
    isNotStarted: false,
    fields: [],
    lastUpdated: "5/19/2026",
    lastUpdatedAgo: "1 days ago",
  },
  {
    id: "PA-14274",
    name: "Prior Authorization",
    statusLabel: "Initiated",
    statusDetail: "Prior authorization initiated",
    isComplete: false,
    isNotStarted: false,
    fields: [],
    lastUpdated: "5/19/2026",
    lastUpdatedAgo: "1 days ago",
  },
  {
    id: "A-14275",
    name: "Appeals",
    statusLabel: "Stage not started",
    statusDetail: "No Status available",
    isComplete: false,
    isNotStarted: true,
    fields: [
      { label: "Pharmacy Notes", value: null },
      { label: "Shipment Date", value: null },
    ],
    lastUpdated: null,
    lastUpdatedAgo: null,
  },
  {
    id: "FA-14276",
    name: "Financial Assistance",
    statusLabel: "Stage not started",
    statusDetail: "No Status available",
    isComplete: false,
    isNotStarted: true,
    fields: [
      { label: "Financial Program", value: null },
      { label: "Effective Date", value: null },
      { label: "Program Approval Date", value: null },
      { label: "Expiration Date", value: null },
      { label: "Program Denial Reason", value: null },
    ],
    lastUpdated: null,
    lastUpdatedAgo: null,
  },
  {
    id: "TP-14277",
    name: "Triage to Pharmacy",
    statusLabel: "Stage not started",
    statusDetail: "No Status available",
    isComplete: false,
    isNotStarted: true,
    fields: [
      { label: "Pharmacy Name", value: null },
      { label: "Pharmacy Phone", value: null },
      { label: "Completed By", value: null },
    ],
    lastUpdated: null,
    lastUpdatedAgo: null,
  },
  {
    id: "PS-14278",
    name: "Pharmacy Status",
    statusLabel: "Stage not started",
    statusDetail: "No Status available",
    isComplete: false,
    isNotStarted: true,
    fields: [],
    lastUpdated: null,
    lastUpdatedAgo: null,
  },
];

// ─── Stage Card ──────────────────────────────────────────────────────────────

function StageCard({ stage, onHeaderClick }: { stage: Stage; onHeaderClick?: (stage: Stage) => void }) {
  const iconBg = stage.isNotStarted ? "#9a9a9a" : FC_BLUE;
  const statusColor = stage.isComplete
    ? "#2e844a"
    : stage.isNotStarted
    ? "#706e6b"
    : "#3e3e3c";

  return (
    <div className="py-3 border-b border-[#dddbda] last:border-b-0">
      <div className="flex items-start gap-2.5">
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 28, height: 28, background: iconBg, borderRadius: 6 }}
        >
          <Zap size={14} className="text-white" fill="white" />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-[13px] font-semibold mb-1 cursor-pointer hover:underline"
            style={{ color: SF_BLUE }}
            onClick={() => onHeaderClick?.(stage)}
          >
            {stage.name} - {stage.id}
          </div>
          <div className="text-[12px] mb-1">
            <span className="font-medium text-[#3e3e3c]">What is the Status: </span>
            <span style={{ color: statusColor }}>
              {stage.statusLabel} - {stage.statusDetail}
            </span>
          </div>
          {stage.fields.map((field) => (
            <div key={field.label} className="text-[12px] mb-0.5">
              <span className="font-medium text-[#3e3e3c]">{field.label}: </span>
              <span className="text-[#706e6b]">{field.value ?? "No Data Available"}</span>
            </div>
          ))}
          <div className="text-[11px] text-[#706e6b] mt-1">
            Last updated:{" "}
            {stage.lastUpdated
              ? `${stage.lastUpdated} ${stage.lastUpdatedAgo}`
              : "No Data Available"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main CRM Record Page ────────────────────────────────────────────────────

const CASE_TABS = [
  { id: "summary", label: "Case Summary" },
  { id: "documents", label: "Related Documents" },
  { id: "doc-mgmt", label: "Document Management" },
  { id: "tasks", label: "Related Tasks" },
  { id: "file-drop", label: "File Drop" },
  { id: "relations", label: "Case Relations" },
];

const RIGHT_TABS = [
  { id: "quick-answers", label: "Quick Answers" },
  { id: "missing-info", label: "Missing Information" },
];

export default function Index() {
  const navigate = useNavigate();
  const [activeCaseTab, setActiveCaseTab] = useState("summary");
  const [activeRightTab, setActiveRightTab] = useState("quick-answers");
  const [caseSummaryCollapsed, setCaseSummaryCollapsed] = useState(false);
  const [stagesCollapsed, setStagesCollapsed] = useState(false);
  const [openStageTabs, setOpenStageTabs] = useState<Stage[]>([]);
  const [activeTopTab, setActiveTopTab] = useState<string>("onboarding");
  const [patientAccountCollapsed, setPatientAccountCollapsed] = useState(false);
  const [patientContactCollapsed, setPatientContactCollapsed] = useState(false);

  const handleOpenStage = (stage: Stage) => {
    setOpenStageTabs((prev) =>
      prev.some((s) => s.id === stage.id) ? prev : [...prev, stage]
    );
    setActiveTopTab(stage.id);
  };

  const handleCloseStageTab = (stageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenStageTabs((prev) => prev.filter((s) => s.id !== stageId));
    if (activeTopTab === stageId) setActiveTopTab("onboarding");
  };

  const activeStage = STAGES.find((s) => s.id === activeTopTab);

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Salesforce Sans', Arial, sans-serif", fontSize: 13 }}
    >
      {/* ── Row 1: Patient Tab Strip ─────────────────────────────────────────── */}
      <div
        className="border-b border-[#dddbda] flex items-end px-2 overflow-x-auto gap-1"
        style={{ background: "#f3f2f2", minHeight: 42 }}
      >
        {/* Keanu Dixon tab */}
        <div
          className="flex items-center gap-2 px-3 py-2 border border-[#dddbda] cursor-pointer select-none shrink-0 transition-colors"
          style={{
            borderRadius: "4px 4px 0 0",
            marginBottom: -1,
            background: activeTopTab === "keanu" ? "#fff" : "#ebe9e9",
            borderBottomColor: activeTopTab === "keanu" ? "#fff" : "#dddbda",
            boxShadow: activeTopTab === "keanu" ? "0 -1px 3px rgba(0,0,0,0.08)" : "none",
          }}
          onClick={() => setActiveTopTab("keanu")}
        >
          <div
            className="flex items-center justify-center rounded-full text-white text-[10px] font-bold shrink-0"
            style={{ width: 20, height: 20, background: "linear-gradient(135deg, #2dbcbb 0%, #16818a 100%)" }}
          >
            KD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] font-semibold text-[#3e3e3c] whitespace-nowrap">Keanu Dixon</span>
            <span className="text-[10px] text-[#706e6b]">DOB: 09/19/1981</span>
          </div>
          <button className="ml-1 p-0.5 rounded hover:bg-[#e5e5e5] transition-colors">
            <X size={11} className="text-[#706e6b]" />
          </button>
        </div>

        {/* Onboarding case tab */}
        <div
          className="flex items-center gap-2 px-3 py-2 border border-[#dddbda] cursor-pointer select-none shrink-0 transition-colors"
          style={{
            borderRadius: "4px 4px 0 0",
            marginBottom: -1,
            background: activeTopTab === "onboarding" ? "#fff" : "#ebe9e9",
            borderBottomColor: activeTopTab === "onboarding" ? "#fff" : "#dddbda",
            boxShadow: activeTopTab === "onboarding" ? "0 -1px 3px rgba(0,0,0,0.08)" : "none",
          }}
          onClick={() => setActiveTopTab("onboarding")}
        >
          <div
            className="flex items-center justify-center rounded text-white font-bold text-[10px] shrink-0"
            style={{ width: 18, height: 18, background: "linear-gradient(135deg, #0176d3 0%, #014486 100%)", borderRadius: 4 }}
          >
            C
          </div>
          <span className="text-[12px] font-semibold text-[#3e3e3c] whitespace-nowrap">Onboarding</span>
          <button className="ml-1 p-0.5 rounded hover:bg-[#e5e5e5] transition-colors">
            <X size={11} className="text-[#706e6b]" />
          </button>
        </div>

        {/* Dynamic stage tabs */}
        {openStageTabs.map((stage) => {
          const isActive = activeTopTab === stage.id;
          const stageIconBg = stage.isNotStarted ? "#9a9a9a" : FC_BLUE;
          return (
            <div
              key={stage.id}
              className="flex items-center gap-2 px-3 py-2 border border-[#dddbda] cursor-pointer select-none shrink-0 transition-colors"
              style={{
                borderRadius: "4px 4px 0 0",
                marginBottom: -1,
                background: isActive ? "#fff" : "#ebe9e9",
                borderBottomColor: isActive ? "#fff" : "#dddbda",
                boxShadow: isActive ? "0 -1px 3px rgba(0,0,0,0.08)" : "none",
              }}
              onClick={() => setActiveTopTab(stage.id)}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 18, height: 18, background: stageIconBg, borderRadius: 4 }}
              >
                <Zap size={10} className="text-white" fill="white" />
              </div>
              <span className="text-[12px] font-semibold text-[#3e3e3c] whitespace-nowrap max-w-[160px] truncate">
                {stage.name} - {stage.id}
              </span>
              <button
                className="ml-1 p-0.5 rounded hover:bg-[#e5e5e5] transition-colors"
                onClick={(e) => handleCloseStageTab(stage.id, e)}
              >
                <X size={11} className="text-[#706e6b]" />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Content area (conditional on active Row 1 tab) ──────────────────── */}
      {activeTopTab === "keanu" ? (
        /* ── Patient Record View ──────────────────────────────────────────── */
        <>
          <div className="border-b border-[#dddbda] bg-white">
            <div className="px-4 pt-2 pb-0">
              <span className="text-[11px] text-[#706e6b]">Person Account</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex items-center justify-center rounded text-white font-bold text-[11px] shrink-0"
                  style={{ width: 36, height: 36, background: "linear-gradient(135deg, #2dbcbb 0%, #16818a 100%)" }}
                >
                  Acco
                </div>
                <h1 className="text-[20px] font-bold text-[#3e3e3c] truncate">Keanu Dixon</h1>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                <SfButton>+ Follow</SfButton>
                <SfButton>New Task</SfButton>
                <SfButton>Create Case</SfButton>
                <SfButton split>Create Affiliation</SfButton>
              </div>
            </div>
          </div>
          <div className="border-b border-[#dddbda] bg-white px-4 py-3 flex flex-wrap gap-x-8 gap-y-2">
            <div className="flex flex-col min-w-[80px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">ARx ID</span>
              <span className="text-[13px] text-[#3e3e3c]">&nbsp;</span>
            </div>
            <div className="flex flex-col min-w-[110px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Phone</span>
              <SfLink className="text-[13px]">(555) 867-5309</SfLink>
            </div>
            <div className="flex flex-col min-w-[80px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Birthdate</span>
              <span className="text-[13px] text-[#3e3e3c]">09/19/1981</span>
            </div>
            <div className="flex flex-col min-w-[160px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Mailing Address</span>
              <SfLink className="text-[13px]">United States</SfLink>
            </div>
            <div className="flex flex-col min-w-[100px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Account Source</span>
              <span className="text-[13px] text-[#3e3e3c]">&nbsp;</span>
            </div>
          </div>
          <div className="p-4">
            <div className="border border-[#dddbda] rounded mb-4">
              <SectionHeader
                title="Account Information"
                collapsed={patientAccountCollapsed}
                onToggle={() => setPatientAccountCollapsed(!patientAccountCollapsed)}
              />
              {!patientAccountCollapsed && (
                <div className="grid grid-cols-2 gap-x-6 px-4 pt-1 pb-2">
                  <div>
                    <FieldRow label="Account Name" value="Keanu Dixon" />
                    <FieldRow label="ARx ID" />
                    <FieldRow label="Birthdate" value="09/19/1981" />
                    <FieldRow label="Preferred Name" />
                    <FieldRow label="Gender" />
                    <FieldRow label="Age" value="44" />
                  </div>
                  <div>
                    <div className="group relative flex flex-col py-2 border-b border-[#dddbda] pr-6 min-h-[44px]">
                      <span className="text-[11px] text-[#706e6b] mb-0.5 uppercase tracking-wide font-medium leading-tight">Account Owner</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center justify-center rounded-full bg-[#ecebea] shrink-0" style={{ width: 18, height: 18 }}>
                          <User size={10} className="text-[#706e6b]" />
                        </div>
                        <SfLink className="text-[13px]">AssistRx QA</SfLink>
                      </div>
                      <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                        <Pencil size={12} className="text-[#706e6b]" />
                      </button>
                    </div>
                    <FieldRow label="Account Record Type" value="Patient" />
                    <FieldRow label="Status" value="Active" />
                    <FieldRow label="Territory" />
                    <FieldRow label="External Patient Id" />
                  </div>
                </div>
              )}
            </div>
            <div className="border border-[#dddbda] rounded">
              <SectionHeader
                title="Contact Information"
                collapsed={patientContactCollapsed}
                onToggle={() => setPatientContactCollapsed(!patientContactCollapsed)}
              />
              {!patientContactCollapsed && (
                <div className="grid grid-cols-2 gap-x-6 px-4 pt-1 pb-2">
                  <div>
                    <FieldRow label="Email" />
                    <FieldRow label="Mobile" value="(555) 867-5309" isLink />
                    <FieldRow label="Home Phone" />
                    <FieldRow label="Other Phone" />
                  </div>
                  <div>
                    <FieldRow label="Fax" />
                    <FieldRow label="Mailing City" />
                    <FieldRow label="Mailing State/Province" />
                    <FieldRow label="Mailing Zip/Postal Code" />
                    <FieldRow label="Mailing Country" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : activeStage ? (
        /* ── Stage Detail View ───────────────────────────────────────────── */
        <div className="p-4 max-w-3xl">
          <div className="border border-[#dddbda] rounded">
            <div
              className="flex items-center gap-3 px-3 border-b border-[#dddbda]"
              style={{ background: SF_SECTION_BG, minHeight: 36 }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 24, height: 24, background: activeStage.isNotStarted ? "#9a9a9a" : FC_BLUE, borderRadius: 5 }}
              >
                <Zap size={12} className="text-white" fill="white" />
              </div>
              <span className="text-[13px] font-semibold text-[#3e3e3c]">
                {activeStage.name} \u2013 {activeStage.id}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 px-4 pt-1 pb-2">
              <div>
                <FieldRow label="Status" value={`${activeStage.statusLabel} \u2013 ${activeStage.statusDetail}`} />
                {activeStage.fields.map((f) => (
                  <FieldRow key={f.label} label={f.label} value={f.value ?? "No Data Available"} />
                ))}
              </div>
              <div>
                <FieldRow label="Stage Type" value={activeStage.name} />
                <FieldRow label="Stage ID" value={activeStage.id} />
                <FieldRow label="Service Type" value="Onboarding" />
                <FieldRow label="Sequence" value="1" />
                <FieldRow
                  label="Last Updated"
                  value={
                    activeStage.lastUpdated
                      ? `${activeStage.lastUpdated} ${activeStage.lastUpdatedAgo}`
                      : "No Data Available"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Case Record Header */}
          <div className="border-b border-[#dddbda] bg-white">
            <div className="px-4 pt-2 pb-0">
              <span className="text-[11px] text-[#706e6b]">Case</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex items-center justify-center rounded text-white font-bold text-[10px] shrink-0"
                  style={{ width: 36, height: 36, background: "linear-gradient(135deg, #0176d3 0%, #014486 100%)" }}
                >
                  Case
                </div>
                <h1 className="text-[20px] font-bold text-[#3e3e3c] truncate">Onboarding</h1>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                <SfButton>Edit</SfButton>
                <SfButton>Delete</SfButton>
                <SfButton split>Change Owner</SfButton>
              </div>
            </div>
          </div>
          {/* Case Quick-Info Bar */}
          <div className="border-b border-[#dddbda] bg-white px-4 py-3 flex flex-wrap gap-x-8 gap-y-2">
            <div className="flex flex-col min-w-[70px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Case Status</span>
              <span className="text-[13px] text-[#3e3e3c]">Open</span>
            </div>
            <div className="flex flex-col min-w-[90px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Case Number</span>
              <span className="text-[13px] text-[#3e3e3c]">0000000</span>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Date/Time Opened</span>
              <span className="text-[13px] text-[#3e3e3c]">5/15/2026 2:31 PM</span>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Date/Time Closed</span>
              <span className="text-[13px] text-[#3e3e3c]">&nbsp;</span>
            </div>
            <div className="flex flex-col min-w-[80px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Case Origin</span>
              <span className="text-[13px] text-[#3e3e3c]">Fax</span>
            </div>
            <div className="flex flex-col min-w-[100px]">
              <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Referral Source</span>
              <span className="text-[13px] text-[#3e3e3c]">HCP</span>
            </div>
          </div>
          {/* Row 2: Case Navigation Tabs */}
          <div className="border-b border-[#dddbda] flex bg-white overflow-x-auto">
            {CASE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCaseTab(tab.id)}
                className={`px-4 py-3 text-[13px] whitespace-nowrap transition-colors relative shrink-0 ${
                  activeCaseTab === tab.id ? "font-semibold" : "text-[#706e6b] hover:text-[#3e3e3c]"
                }`}
                style={{ color: activeCaseTab === tab.id ? SF_BLUE : undefined }}
              >
                {tab.label}
                {activeCaseTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: SF_BLUE }} />
                )}
              </button>
            ))}
          </div>
          {activeCaseTab === "summary" ? (
        <div className="flex" style={{ minHeight: "calc(100vh - 210px)" }}>
          {/* ── Left Panel (68%) ───────────────────────────────────────────── */}
          <div
            className="min-w-0 border-r border-[#dddbda]"
            style={{ flexBasis: "68%" }}
          >
            <div className="p-4">
              {/* Case Summary accordion */}
              <div className="border border-[#dddbda] rounded mb-4">
                <SectionHeader
                  title="Case Summary"
                  collapsed={caseSummaryCollapsed}
                  onToggle={() => setCaseSummaryCollapsed(!caseSummaryCollapsed)}
                />
                {!caseSummaryCollapsed && (
                  <div className="grid grid-cols-2 gap-x-6 px-4 pt-1 pb-2">
                    <div>
                      <FieldRow label="Account Name" value="Keanu Dixon" isLink />
                      <FieldRow label="Service Type" value="Patient Solutions" isLink />
                      <FieldRow label="Case Type" value="Onboarding" />
                      <FieldRow label="Live Status" />
                      <FieldRow label="Referral Source" value="HCP" />
                      <FieldRow label="Interaction" value="HCP241205" />
                      <FieldRow label="Product" value="PP-27305" isLink />
                      <FieldRow label="Transaction Expense Type" />
                    </div>
                    <div>
                      <FieldRow label="Case Date" value="Not Started" />
                      <FieldRow label="Case Record Type" value="Patient Solutions" />
                      <FieldRow label="Program Type" />
                      <div className="group relative flex flex-col py-2 border-b border-[#dddbda] pr-6 min-h-[44px]">
                        <span className="text-[11px] text-[#706e6b] mb-0.5 uppercase tracking-wide font-medium leading-tight">
                          Case Owner
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="flex items-center justify-center rounded-full bg-[#ecebea] shrink-0"
                            style={{ width: 18, height: 18 }}
                          >
                            <User size={10} className="text-[#706e6b]" />
                          </div>
                          <SfLink className="text-[13px]">AssistRx Clin/Fulfillment</SfLink>
                        </div>
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                          <Pencil size={12} className="text-[#706e6b]" />
                        </button>
                      </div>
                      <FieldRow label="Enrollment Date" value="5/15/2026" />
                      <FieldRow label="Enrollment Registration Date" />
                    </div>
                  </div>
                )}
              </div>

              {/* Stages accordion */}
              <div className="border border-[#dddbda] rounded">
                <SectionHeader
                  title="Stages (7)"
                  collapsed={stagesCollapsed}
                  onToggle={() => setStagesCollapsed(!stagesCollapsed)}
                  rightContent={
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1.5 hover:bg-[#e5e5e5] rounded transition-colors">
                        <Settings size={13} className="text-[#706e6b]" />
                      </button>
                      <button className="p-1.5 hover:bg-[#e5e5e5] rounded transition-colors">
                        <RefreshCw size={13} className="text-[#706e6b]" />
                      </button>
                    </div>
                  }
                />
                {!stagesCollapsed && (
                  <>
                    <div className="px-3 py-1.5 text-[11px] text-[#706e6b] border-b border-[#dddbda]">
                      7 items • Sorted by Created Date • Updated a few seconds ago
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[12px]" style={{ minWidth: 700 }}>
                        <thead>
                          <tr style={{ background: SF_SECTION_BG }}>
                            <th className="text-left px-3 py-2 text-[11px] text-[#706e6b] font-medium border-b border-[#dddbda] w-8">#</th>
                            {[
                              { label: "Stage Name", sortable: true },
                              { label: "Record Type Name", sortable: true },
                              { label: "Sequence", sortable: true },
                              { label: "Status", sortable: true },
                              { label: "Sub-Status", sortable: true },
                              { label: "Stage State", sortable: true },
                              { label: "Service Ty...", sortable: true },
                              { label: "Created Date", sortable: true, asc: true },
                            ].map((col) => (
                              <th
                                key={col.label}
                                className="text-left px-3 py-2 text-[11px] text-[#706e6b] font-medium border-b border-[#dddbda] whitespace-nowrap"
                              >
                                <div className="flex items-center gap-1">
                                  {col.label}
                                  {col.asc ? (
                                    <ArrowUp size={10} className="text-[#706e6b]" />
                                  ) : col.sortable ? (
                                    <ArrowUpDown size={10} className="text-[#706e6b]" />
                                  ) : null}
                                </div>
                              </th>
                            ))}
                            <th className="border-b border-[#dddbda] w-8" />
                          </tr>
                        </thead>
                        <tbody>
                          {STAGES.map((stage, i) => {
                            const stageState = stage.isComplete
                              ? "Closed"
                              : stage.isNotStarted
                              ? ""
                              : "Not Started";
                            const statusLabel = stage.isNotStarted ? "" : stage.statusLabel;
                            const subStatus = stage.isNotStarted ? "" : stage.statusDetail;
                            return (
                              <tr key={stage.id} className="hover:bg-[#f3f3f3] transition-colors">
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#706e6b]">
                                  {i + 1}
                                </td>
                                <td className="px-3 py-2 border-b border-[#dddbda]">
                                  <SfLink className="text-[12px]">{stage.id}</SfLink>
                                </td>
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#3e3e3c] whitespace-nowrap">
                                  {stage.name}
                                </td>
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#3e3e3c]">1</td>
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#3e3e3c]">{statusLabel}</td>
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#3e3e3c] max-w-[160px] truncate" title={subStatus}>
                                  {subStatus}
                                </td>
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#3e3e3c]">{stageState}</td>
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#3e3e3c]">Onboarding</td>
                                <td className="px-3 py-2 border-b border-[#dddbda] text-[#3e3e3c] whitespace-nowrap">
                                  5/15/2026 2:31 PM
                                </td>
                                <td className="px-3 py-2 border-b border-[#dddbda]">
                                  <button className="p-0.5 hover:bg-[#e5e5e5] rounded">
                                    <ChevronDown size={13} className="text-[#706e6b]" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-3 py-2 text-center border-t border-[#dddbda]">
                      <SfLink className="text-[12px]">View All</SfLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Right Panel (32%) ──────────────────────────────────────────── */}
          <div
            className="flex flex-col bg-white"
            style={{ flexBasis: "32%", minWidth: 280 }}
          >
            {/* Right tab strip */}
            <div className="border-b border-[#dddbda] flex shrink-0">
              {RIGHT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id)}
                  className={`px-4 py-3 text-[13px] whitespace-nowrap transition-colors relative ${
                    activeRightTab === tab.id ? "font-semibold" : "text-[#706e6b] hover:text-[#3e3e3c]"
                  }`}
                  style={{ color: activeRightTab === tab.id ? SF_BLUE : undefined }}
                >
                  {tab.label}
                  {activeRightTab === tab.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: SF_BLUE }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeRightTab === "quick-answers" && (
                <>
                  {/* Fulfilment Center section */}
                  <div className="border-b border-[#dddbda] p-3">
                    <div className="text-[13px] font-semibold text-[#3e3e3c] mb-2">
                      Fulfilment Center
                    </div>
                    <button
                      onClick={() => navigate("/fulfilment-center")}
                      className="w-full py-1.5 text-[13px] font-medium text-white rounded transition-opacity hover:opacity-90 active:opacity-80"
                      style={{ background: FC_BLUE }}
                    >
                      Open Fulfilment Center
                    </button>
                  </div>

                  {/* Stage Quick View */}
                  <div>
                    <div
                      className="px-3 py-2 border-b border-[#dddbda]"
                      style={{ background: SF_SECTION_BG }}
                    >
                      <span className="text-[13px] font-semibold text-[#3e3e3c]">
                        Stage Quick View
                      </span>
                    </div>
                    <div className="px-3">
                      {STAGES.map((stage) => (
                        <StageCard key={stage.id} stage={stage} onHeaderClick={handleOpenStage} />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeRightTab === "missing-info" && (
                <div className="p-4 text-[13px] text-[#706e6b] text-center py-8">
                  No missing information items.
                </div>
              )}
            </div>
          </div>
        </div>
          ) : (
            <div className="p-8 text-[13px] text-[#706e6b] text-center">
              No {CASE_TABS.find((t) => t.id === activeCaseTab)?.label} records found.
            </div>
          )}
        </>
      )}
    </div>
  );
}
