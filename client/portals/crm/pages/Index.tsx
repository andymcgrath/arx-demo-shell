import { useState } from "react";
import { Link } from "@/lib/portalRouter";
import {
  ChevronDown,
  ChevronRight,
  Pencil,
  User,
  Bell,
  ArrowUpDown,
  Info,
  Settings,
  PhoneCall,
  Paperclip,
  Building2,
  Pill,
  Users,
  HelpCircle,
  Scale,
  Shield,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { usePatientCase } from "../hooks/usePatientCase";
import { useEnrollPatient } from "../hooks/useEnrollPatient";
import { lazy, Suspense } from "react";
const BIRRecord = lazy(() => import("@crm/components/BIRRecord"));

const SF_BLUE = "#0070d2";
const FC_BLUE = "#0176d3";
const SF_BORDER = "#dddbda";
const SF_SECTION_BG = "#f3f3f3";
const CASE_ID = "demo";

// ─── Shared SF components ───────────────────────────────────────────────────

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

function SectionHeader({ title, collapsed, onToggle, rightContent }: {
  title: string; collapsed: boolean; onToggle: () => void; rightContent?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between px-3 cursor-pointer select-none border-b border-[#dddbda]"
      style={{ background: SF_SECTION_BG, minHeight: 32 }}
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <ChevronDown size={14} className="text-[#706e6b]" />
        <span className="text-[13px] font-semibold text-[#3e3e3c]">{title}</span>
      </div>
      {rightContent}
    </div>
  );
}

// ─── Fulfilment Center tree data ────────────────────────────────────────────

const FC_TREE = [
  { id: "material-items", label: "Material Items" },
  { id: "email", label: "Email" },
  { id: "secure-comms", label: "Secure Communications" },
  {
    id: "consent-comms",
    label: "Consent Communications",
    children: [
      { id: "unsuccessful-contact", label: "Unsuccessful Contact", sublabel: "Unsuccessful_Contact" },
      { id: "electronic-consent", label: "Electronic Consent", sublabel: "ElectronicConsent" },
      { id: "consent-revocation", label: "Consent Revocation", sublabel: "Consent_Revocation" },
      { id: "consent-recap-reminder", label: "Consent Re-capture Reminder", sublabel: "Consent_Recap_Reminder" },
      { id: "consent-recap-confirm", label: "Consent Re-capture Confirmation", sublabel: "Consent_Recap_Confirma…" },
    ],
  },
];

interface RelatedCase {
  id: string;
  serviceType: string;
  status: string;
  subStatus: string;
  created: string;
}

// ─── Fulfilment Center — inline 4-column panel ─────────────────────────────

function FulfilmentCenterPanel({ onSendConsentRequest }: { onSendConsentRequest: () => void }) {
  const [selectedItem, setSelectedItem] = useState("electronic-consent");
  const [treeExpanded, setTreeExpanded] = useState<Record<string, boolean>>({ "consent-comms": true });
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");

  const { data: patientCase, isLoading } = usePatientCase(CASE_ID);
  const enrollMutation = useEnrollPatient();

  const consentStatus = patientCase?.consentStatus ?? "pending";
  const addDisabled = consentStatus !== "pending" || enrollMutation.isPending;
  const sendDisabled = !contactMethod || enrollMutation.isPending;

  const handleSendConsentRequest = () => {
    enrollMutation.mutate({ caseId: CASE_ID, contactMethod });
    onSendConsentRequest();
  };

  const toggleTree = (id: string) =>
    setTreeExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="flex-1" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Sub-header */}
      <div className="border-b border-[#dddbda] px-4 flex items-end" style={{ minHeight: 36 }}>
        <div
          className="text-[13px] font-semibold pb-2 mr-4"
          style={{ color: FC_BLUE, borderBottom: `2px solid ${FC_BLUE}` }}
        >
          Material Catalog
        </div>
      </div>

      {/* 4-column grid */}
      <div className="flex" style={{ minHeight: 380 }}>

        {/* Col 1 — Material Catalog */}
        <div className="border-r border-[#dddbda] p-3 overflow-y-auto" style={{ flexBasis: "21%", minWidth: 160 }}>
          <div className="text-[11px] text-[#706e6b] mb-2 font-medium">Available Material Items</div>
          {FC_TREE.map((group) => {
            const isOpen = treeExpanded[group.id];
            const hasChildren = "children" in group && group.children;
            return (
              <div key={group.id}>
                <div
                  className="flex items-center gap-1 py-1 px-1 cursor-pointer hover:bg-[#f3f2f2] rounded select-none"
                  onClick={() => hasChildren && toggleTree(group.id)}
                >
                  {hasChildren ? (
                    isOpen ? <ChevronDown size={13} className="text-[#706e6b] shrink-0" /> : <ChevronRight size={13} className="text-[#706e6b] shrink-0" />
                  ) : (
                    <ChevronRight size={13} className="text-[#706e6b] shrink-0" />
                  )}
                  <span className="text-[13px] text-[#3e3e3c]">{group.label}</span>
                </div>
                {isOpen && hasChildren && (
                  <div className="pl-4">
                    {group.children!.map((child) => {
                      const isSel = selectedItem === child.id;
                      return (
                        <div
                          key={child.id}
                          className="flex flex-col py-1 px-2 cursor-pointer rounded-sm truncate"
                          style={{
                            borderLeft: isSel ? `3px solid ${FC_BLUE}` : "3px solid transparent",
                            background: isSel ? "#eaf4ff" : undefined,
                          }}
                          onClick={() => setSelectedItem(child.id)}
                          title={`${child.label} (${child.sublabel})`}
                        >
                          <span className="text-[12px] truncate" style={{ color: isSel ? FC_BLUE : "#3e3e3c" }}>
                            {child.label}{" "}
                            <span className="text-[11px]" style={{ color: isSel ? FC_BLUE : "#706e6b" }}>
                              ({child.sublabel})
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Col 2 — Item Details */}
        <div className="border-r border-[#dddbda] p-4 overflow-y-auto" style={{ flexBasis: "29%", minWidth: 200 }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 size={20} className="animate-spin text-[#706e6b]" />
            </div>
          ) : (
            <>
              <div className="text-[11px] text-[#706e6b] uppercase tracking-wider font-medium mb-2">Item Details</div>
              <h2 className="text-[16px] font-bold text-[#3e3e3c] mb-0.5">Communication Consent</h2>
              <div className="text-[12px] text-[#706e6b] mb-0.5">CommunicationConsent</div>
              <div className="text-[12px] text-[#706e6b] mb-3">Communication Consent Capture</div>
              <hr className="border-[#dddbda] mb-3" />
              <div className="flex items-start gap-2 py-1">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#2e844a", fill: "#2e844a", stroke: "white" }} />
                <span className="text-[13px] text-[#3e3e3c]">Patient has valid mobile phone number</span>
              </div>
              <div className="flex items-start gap-2 py-1">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#2e844a", fill: "#2e844a", stroke: "white" }} />
                <span className="text-[13px] text-[#3e3e3c]">Patient communication consent status is pending capture</span>
              </div>
              <hr className="border-[#dddbda] mt-3 mb-4" />
              <div className="flex justify-center">
                <button
                  onClick={handleSendConsentRequest}
                  disabled={sendDisabled}
                  className="flex items-center gap-2 px-5 py-1.5 text-[13px] font-medium rounded text-white transition-opacity"
                  style={{ background: sendDisabled ? "#aaabac" : FC_BLUE, cursor: sendDisabled ? "not-allowed" : "pointer" }}
                >
                  {enrollMutation.isPending && <Loader2 size={13} className="animate-spin" />}
                  Send Consent Request
                </button>
              </div>
            </>
          )}
        </div>

        {/* Col 3 — Account Information */}
        <div className="border-r border-[#dddbda] p-4 overflow-y-auto flex flex-col" style={{ flexBasis: "21%", minWidth: 160 }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 size={20} className="animate-spin text-[#706e6b]" />
            </div>
          ) : (
            <>
              <div className="text-[11px] text-[#706e6b] uppercase tracking-wider font-medium mb-2">Account Information</div>
              <div className="text-[15px] font-bold text-[#3e3e3c] mb-3">{patientCase?.patientName}</div>
              <div className="text-[12px] text-[#c23934] font-medium mb-1">* Contact Method</div>
              <label className="flex items-center gap-2 py-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="fc-contact"
                  value="phone"
                  checked={contactMethod === "phone"}
                  onChange={() => setContactMethod("phone")}
                  className="w-3.5 h-3.5 cursor-pointer"
                  style={{ accentColor: FC_BLUE }}
                />
                <span className="text-[13px] text-[#3e3e3c]">{patientCase?.phone}</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded font-medium" style={{ background: "#e8f0fe", color: FC_BLUE }}>
                  MOBILE
                </span>
              </label>
              <label className="flex items-center gap-2 py-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="fc-contact"
                  value="email"
                  checked={contactMethod === "email"}
                  onChange={() => setContactMethod("email")}
                  className="w-3.5 h-3.5 cursor-pointer"
                  style={{ accentColor: FC_BLUE }}
                />
                <span className="text-[13px] text-[#3e3e3c] truncate">{patientCase?.email}</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded font-medium shrink-0" style={{ background: "#e8f0fe", color: FC_BLUE }}>
                  EMAIL
                </span>
              </label>
              <div className="mt-3 flex flex-col gap-0.5">
                <a href={`mailto:${patientCase?.email}`} className="text-[13px] hover:underline truncate" style={{ color: FC_BLUE }}>
                  {patientCase?.email}
                </a>
                <span className="text-[13px]" style={{ color: FC_BLUE }}>{patientCase?.phone}</span>
              </div>
            </>
          )}
        </div>

        {/* Col 4 — Order Details */}
        <div className="p-4 overflow-y-auto" style={{ flexBasis: "29%", minWidth: 200 }}>
          <div className="text-[11px] text-[#706e6b] uppercase tracking-wider font-medium mb-2">Order Details</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main CRM Record Page ────────────────────────────────────────────────────

const INITIAL_CASES: RelatedCase[] = [
  { id: "00001431", serviceType: "CoAssist Referral", status: "Initiated", subStatus: "Initiated", created: "May 15, 2026" },
];

const NEW_CONSENT_CASE: RelatedCase = {
  id: "00001783",
  serviceType: "Patient Consent",
  status: "Sent",
  subStatus: "1st Attempt",
  created: "May 16, 2026",
};

export default function Index() {
  const { data: patientCase } = usePatientCase(CASE_ID);
  const [activeTab, setActiveTab] = useState("patient");
  const [activeSidebarTab, setActiveSidebarTab] = useState("cases");
  const [accountInfoCollapsed, setAccountInfoCollapsed] = useState(false);
  const [contactInfoCollapsed, setContactInfoCollapsed] = useState(false);
  const [caregiversCollapsed, setCaregiversCollapsed] = useState(false);
  const [relatedCases, setRelatedCases] = useState<RelatedCase[]>(INITIAL_CASES);

  const addConsentCase = () => {
    setRelatedCases((prev) =>
      prev.some((c) => c.id === NEW_CONSENT_CASE.id) ? prev : [...prev, NEW_CONSENT_CASE]
    );
    setActiveTab("patient");
    setActiveSidebarTab("cases");
  };

  const tabs = [
    { id: "patient", label: "Patient Information" },
    { id: "documents", label: "Related Documents" },
    { id: "tasks", label: "Related Tasks" },
    { id: "benefits", label: "Benefits Investigation" },
    { id: "relations", label: "Account Relations" },
    { id: "orders", label: "Orders" },
  ];

  const sidebarTabs = [
    { id: "cases", label: "Patient Cases" },
  ];

  const quickLinks = [
    { icon: PhoneCall, color: "#4bc076", label: "Call Recordings", count: 0 },
    { icon: Paperclip, color: "#e8a201", label: "Notes & Attachments", count: 0 },
    { icon: Building2, color: "#1589ee", label: "HCP Affiliation", count: 1 },
    { icon: Pill, color: "#dd8a00", label: "Pharmacy Referral Histories", count: 0 },
    { icon: Users, color: "#7b5ea7", label: "Caregivers", count: 0 },
    { icon: HelpCircle, color: "#e8a201", label: "Missing Information Details", count: "10+" },
    { icon: Scale, color: "#1589ee", label: "Cases", count: 1 },
    { icon: Shield, color: "#4bc076", label: "Insurance", count: 0 },
  ];

  const isOrdersTab = activeTab === "orders";

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Salesforce Sans', Arial, sans-serif", fontSize: 13 }}>

      {/* ── Top Header Bar ──────────────────────────────────────────────────── */}
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
            <h1 className="text-[20px] font-bold text-[#3e3e3c] truncate">Mary Mackerel</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            <SfButton>+ Follow</SfButton>
            <SfButton>New Task</SfButton>
            <SfButton>Create Case</SfButton>
            <SfButton split>Create Affiliation</SfButton>
          </div>
        </div>
      </div>

      {/* ── Quick-Info Bar ───────────────────────────────────────────────────── */}
      <div className="border-b border-[#dddbda] bg-white px-4 py-3 flex flex-wrap gap-x-8 gap-y-2">
        <div className="flex flex-col min-w-[80px]">
          <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">ARx ID</span>
          <span className="text-[13px] text-[#3e3e3c]">&nbsp;</span>
        </div>
        <div className="flex flex-col min-w-[110px]">
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Phone (2)</span>
            <ChevronDown size={10} className="text-[#706e6b] mt-0.5" />
          </div>
          <SfLink className="text-[13px]">(404) 525-5959</SfLink>
        </div>
        <div className="flex flex-col min-w-[80px]">
          <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Birthdate</span>
          <span className="text-[13px] text-[#3e3e3c]">1/11/1979</span>
        </div>
        <div className="flex flex-col min-w-[160px]">
          <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Mailing Address</span>
          <div className="flex flex-col">
            <SfLink className="text-[13px]">Orlando, FL, USA</SfLink>
            <SfLink className="text-[13px]">Orlando, FL 30309</SfLink>
            <SfLink className="text-[13px]">United States</SfLink>
          </div>
        </div>
        <div className="flex flex-col min-w-[100px]">
          <span className="text-[11px] text-[#706e6b] uppercase tracking-wide font-medium">Account Source</span>
          <span className="text-[13px] text-[#3e3e3c]">&nbsp;</span>
        </div>
      </div>

      {/* ── Full-width Tab Bar ──────────────────────────────────────────────── */}
      <div className="border-b border-[#dddbda] flex bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[13px] whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? "text-[#0070d2] font-semibold" : "text-[#706e6b] hover:text-[#3e3e3c]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: SF_BLUE }} />
            )}
          </button>
        ))}
      </div>

      {/* ── Orders tab: full-width Fulfilment Center ─────────────────────── */}
      {isOrdersTab && (
        <div className="flex flex-col flex-1">
          <FulfilmentCenterPanel onSendConsentRequest={addConsentCase} />
        </div>
      )}

      {/* ── Benefits Investigation tab: full-width BIR ───────────────────── */}
      {activeTab === "benefits" && !isOrdersTab && (
        <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 size={20} className="animate-spin text-[#706e6b]" /></div>}>
          <BIRRecord />
        </Suspense>
      )}

      {/* ── All other tabs: 68/32 two-column layout ──────────────────────── */}
      {!isOrdersTab && activeTab !== "tasks" && (
        <div className="flex min-h-screen">

          {/* Left Content (68%) */}
          <div className="flex-1 min-w-0 border-r border-[#dddbda]" style={{ flexBasis: "68%" }}>
            <div className="p-4">
              {activeTab === "patient" && (
                <div>
                  {/* Account Information */}
                  <div className="border border-[#dddbda] rounded mb-4">
                    <SectionHeader
                      title="Account Information"
                      collapsed={accountInfoCollapsed}
                      onToggle={() => setAccountInfoCollapsed(!accountInfoCollapsed)}
                    />
                    {!accountInfoCollapsed && (
                      <div className="grid grid-cols-2 gap-x-6 px-4 pt-1 pb-2">
                        <div>
                          <FieldRow label="Account Name" value="Mary Mackerel" />
                          <FieldRow label="ARx ID" />
                          <FieldRow label="Birthdate" value="1/11/1979" />
                          <FieldRow label="Preferred Name" />
                          <FieldRow label="Gender" value="Female" />
                          <FieldRow label="Age" value="47" />
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
                          <FieldRow label="Type" />
                          <FieldRow label="Account Source" />
                          <FieldRow label="Account Record Type" value="Patient" />
                          <FieldRow label="Status" value="Active" />
                          <FieldRow label="Territory" />
                          <FieldRow label="External Patient Id" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="border border-[#dddbda] rounded mb-4">
                    <SectionHeader
                      title="Contact Information"
                      collapsed={contactInfoCollapsed}
                      onToggle={() => setContactInfoCollapsed(!contactInfoCollapsed)}
                    />
                    {!contactInfoCollapsed && (
                      <div className="grid grid-cols-2 gap-x-6 px-4 pt-1 pb-2">
                        <div>
                          <FieldRow label="Email" value={patientCase?.email} isLink />
                          <FieldRow label="Phone" />
                          <FieldRow label="Mobile" value="(404) 525-5959" isLink />
                          <FieldRow label="Home Phone" />
                          <FieldRow label="Other Phone" />
                        </div>
                        <div>
                          <FieldRow label="Fax" />
                          <FieldRow label="Mailing Street" />
                          <FieldRow label="Mailing City" value="Orlando" />
                          <FieldRow label="Mailing State/Province" value="FL" />
                          <FieldRow label="Mailing Zip/Postal Code" value="30309" />
                          <FieldRow label="Mailing Country" value="United States" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab !== "patient" && (
                <div className="text-[13px] text-[#706e6b] py-8 text-center">
                  No {tabs.find((t) => t.id === activeTab)?.label} records found.
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar (32%) */}
          <div style={{ flexBasis: "32%", minWidth: 280 }} className="bg-white flex flex-col">
            {/* Sidebar tabs */}
            <div className="border-b border-[#dddbda] flex">
              {sidebarTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSidebarTab(tab.id)}
                  className={`px-4 py-3 text-[13px] whitespace-nowrap transition-colors relative ${
                    activeSidebarTab === tab.id
                      ? "text-[#0070d2] font-semibold"
                      : "text-[#706e6b] hover:text-[#3e3e3c]"
                  }`}
                >
                  {tab.label}
                  {activeSidebarTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: SF_BLUE }} />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col">
              {/* Related Cases */}
              <div className="border-b border-[#dddbda]">
                <div className="px-3 py-2 border-b border-[#dddbda]">
                  <span className="text-[13px] font-semibold text-[#3e3e3c]">Related Cases</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[12px]" style={{ minWidth: 400 }}>
                    <thead>
                      <tr style={{ background: SF_SECTION_BG }}>
                        {[{ label: "Case", sortable: true }, { label: "Service Type" }, { label: "Status" }, { label: "Sub Status" }, { label: "Created", sortable: true }].map((col) => (
                          <th key={col.label} className="text-left px-2 py-1.5 text-[11px] text-[#706e6b] uppercase tracking-wide font-medium border-b border-[#dddbda] whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {col.label}
                              {col.sortable && <ArrowUpDown size={10} className="text-[#706e6b]" />}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {relatedCases.map((c) => (
                        <tr key={c.id} className="hover:bg-[#f3f3f3] transition-colors">
                          <td className="px-2 py-2 border-b border-[#dddbda]"><SfLink className="text-[12px]">{c.id}</SfLink></td>
                          <td className="px-2 py-2 border-b border-[#dddbda] text-[#3e3e3c] whitespace-nowrap">{c.serviceType}</td>
                          <td className="px-2 py-2 border-b border-[#dddbda] text-[#3e3e3c]">{c.status}</td>
                          <td className="px-2 py-2 border-b border-[#dddbda] text-[#3e3e3c]">{c.subStatus}</td>
                          <td className="px-2 py-2 border-b border-[#dddbda] text-[#3e3e3c] whitespace-nowrap">{c.created}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Caregivers */}
              <div className="border-b border-[#dddbda]">
                <div
                  className="flex items-center justify-between px-3 cursor-pointer select-none"
                  style={{ background: SF_SECTION_BG, minHeight: 36 }}
                  onClick={() => setCaregiversCollapsed(!caregiversCollapsed)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown size={14} className="text-[#706e6b]" />
                    <span className="text-[13px] font-semibold text-[#3e3e3c]">Caregivers (0)</span>
                  </div>
                  <button
                    className="border border-[#dddbda] bg-white rounded px-2 py-0.5 hover:bg-[#f3f3f3] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ChevronDown size={12} className="text-[#3e3e3c]" />
                  </button>
                </div>
                {!caregiversCollapsed && (
                  <div className="px-3 py-3 text-[12px] text-[#706e6b]">No caregivers found.</div>
                )}
              </div>

              {/* Related List Quick Links */}
              <div className="border-b border-[#dddbda] flex-1">
                <div className="px-3 py-2 border-b border-[#dddbda] flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold text-[#3e3e3c]">Related List Quick Links</span>
                  <Info size={13} className="text-[#706e6b]" />
                </div>
                <div className="p-3 grid grid-cols-4 gap-2">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <div key={link.label} className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="flex items-center justify-center rounded" style={{ width: 32, height: 32, background: link.color }}>
                          <Icon size={16} className="text-white" />
                        </div>
                        <SfLink className="text-[11px] text-center leading-tight group-hover:underline">
                          {link.label} ({link.count})
                        </SfLink>
                      </div>
                    );
                  })}
                </div>
                <div className="px-3 pb-2 flex justify-end">
                  <SfLink className="text-[12px]">Show All (38)</SfLink>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="px-3 py-2 border-t border-[#dddbda] mt-auto" style={{ background: "#f8f8f8" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[#706e6b]">Filters: All time • All activities • All types</span>
                  <Settings size={13} className="text-[#706e6b] cursor-pointer hover:text-[#3e3e3c]" />
                </div>
                <div className="flex justify-end gap-2">
                  <SfLink className="text-[11px]">Refresh</SfLink>
                  <span className="text-[11px] text-[#dddbda]">•</span>
                  <SfLink className="text-[11px]">Expand All</SfLink>
                  <span className="text-[11px] text-[#dddbda]">•</span>
                  <SfLink className="text-[11px]">View All</SfLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
