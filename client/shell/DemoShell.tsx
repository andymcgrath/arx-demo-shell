/**
 * DemoShell — presenter-controlled layout for the ArxConnect demo
 *
 * Layout modes
 * ────────────
 *  Single   one portal, full width
 *  Split 2  two portals side-by-side (each 50 %)
 *  Split 3  three portals side-by-side (~33 % each)
 *
 * Each portal panel is an isolated scroll container. The key trick:
 *   transform: translateZ(0)
 * on the panel forces any position:fixed child (e.g. the patient portal's
 * fixed header) to be positioned relative to the panel, not the viewport.
 * This keeps the shell chrome consistent across all views.
 *
 * State is always shared — all panels read from the same Zustand store, so
 * switching a panel from Patient to Analytics shows the same workflow step.
 */
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDemoStore, type FlowType } from "@/store/demoStore";
import {
  RefreshCw, Undo2, ChevronDown,
  LayoutTemplate, LayoutPanelLeft, LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Portal registry ───────────────────────────────────────────────────────────

import CrmPortal      from "@/portals/crm/index";
import PatientPortal  from "@/portals/patient/index";
import AnalyticsPortal from "@/portals/analytics/index";
import FieldPortal    from "@/portals/field/index";
import ProviderPortal from "@/portals/provider/index";

export type PortalId = "crm" | "patient" | "analytics" | "field" | "provider";

const PORTAL_SLUG: Record<PortalId, string> = {
  crm: "hub",
  patient: "patient",
  analytics: "analytics",
  field: "field",
  provider: "provider",
};

const SLUG_TO_PORTAL: Record<string, PortalId> = {
  hub: "crm",
  patient: "patient",
  analytics: "analytics",
  field: "field",
  provider: "provider",
};

const PORTALS: { id: PortalId; label: string; color: string }[] = [
  { id: "crm",       label: "HUB / CRM",    color: "#0176d3" },
  { id: "patient",   label: "Patient",       color: "#16a34a" },
  { id: "analytics", label: "Analytics",     color: "#d97706" },
  { id: "provider",  label: "Provider",      color: "#7c3aed" },
];

/** Renders the portal component for the given id */
function PortalComponent({ id }: { id: PortalId }) {
  switch (id) {
    case "crm":       return <CrmPortal />;
    case "patient":   return <PatientPortal />;
    case "analytics": return <AnalyticsPortal />;
    case "field":     return <FieldPortal />;
    case "provider":  return <ProviderPortal />;
  }
}

// ── Layout types ──────────────────────────────────────────────────────────────

type LayoutMode = "1up" | "2up" | "3up";

interface PanelState {
  portal: PortalId;
}

const DEFAULT_PANELS: Record<LayoutMode, PanelState[]> = {
  "1up": [{ portal: "crm" }],
  "2up": [{ portal: "crm" }, { portal: "patient" }],
  "3up": [{ portal: "crm" }, { portal: "patient" }, { portal: "analytics" }],
};

// ── Flow options ──────────────────────────────────────────────────────────────

const FLOW_OPTIONS: { value: FlowType; label: string }[] = [
  { value: "Fax_QS_PA_Approved", label: "Fax QS / PA Approved" },
  { value: "Fax_PAP_Audit",      label: "Fax PAP Audit" },
  { value: "CoA_DTP",            label: "CoA Direct to Patient" },
];

// ── Step progress bar ─────────────────────────────────────────────────────────

const STEP_LABELS = [
  "Referral Received",
  "Patient Enrolled",
  "PA / Auth Submitted",
  "PA / Auth Approved",
  "Rx Processing",
  "Rx Delivered",
];

function StepBar() {
  const workflowStep = useDemoStore((s) => s.workflowStep);
  return (
    <div className="flex items-center gap-0 px-4 pb-0 pt-1">
      {STEP_LABELS.map((label, i) => {
        const n      = i + 1;
        const done   = workflowStep > n;
        const active = workflowStep === n;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-0.5">
              <div
                className={cn(
                  "w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center border transition-all",
                  done   && "bg-white text-[#0f172a] border-white",
                  active && "bg-white/30 text-white border-white scale-110",
                  !done && !active && "bg-transparent text-white/40 border-white/25"
                )}
              >
                {done ? "✓" : n}
              </div>
              <span
                className={cn(
                  "text-[9px] whitespace-nowrap hidden md:block",
                  active && "text-white font-semibold",
                  done   && "text-white/70",
                  !done && !active && "text-white/30"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 mx-1 mb-3 transition-all",
                  workflowStep > n ? "bg-white/60" : "bg-white/15"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Panel — isolated scroll container ────────────────────────────────────────

interface PanelProps {
  portal: PortalId;
  onChangePortal: (id: PortalId) => void;
  showSelector: boolean;   // only in multi-panel modes
  headerHeight: number;
}

function Panel({ portal, onChangePortal, showSelector, headerHeight }: PanelProps) {
  const info = PORTALS.find((p) => p.id === portal)!;

  return (
    <div className="flex flex-col flex-1 min-w-0 border-r border-slate-700/50 last:border-r-0">
      {/* Per-panel portal selector (multi-panel mode only) */}
      {showSelector && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/50 shrink-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: info.color }}
          />
          <select
            value={portal}
            onChange={(e) => onChangePortal(e.target.value as PortalId)}
            className="flex-1 text-[11px] bg-transparent text-white/80 border-0 focus:outline-none cursor-pointer"
          >
            {PORTALS.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#1e293b] text-white">
                {p.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/*
       * Isolated scroll container.
       * `transform: translateZ(0)` creates a new stacking context — any
       * position:fixed descendant (e.g. the patient portal's fixed Header)
       * is painted relative to this box, not the viewport.
       * This keeps the shell chrome always visible at the top.
       */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden bg-white"
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <PortalComponent id={portal} />
      </div>
    </div>
  );
}

// ── DemoShell ─────────────────────────────────────────────────────────────────

export default function DemoShell() {
  const { flowType, resetDemo, undoLast } = useDemoStore();
  const _snapshots = useDemoStore((s) => (s as Record<string, unknown>)._snapshots as unknown[]);
  const canUndo = Array.isArray(_snapshots) && _snapshots.length > 0;

  const navigate = useNavigate();
  const location = useLocation();
  const urlSlug = location.pathname.slice(1) || "hub";
  const urlPortal: PortalId = SLUG_TO_PORTAL[urlSlug] ?? "crm";

  // Layout state
  const [layout, setLayout] = useState<LayoutMode>("1up");
  const [panels, setPanels] = useState<PanelState[]>([{ portal: urlPortal }]);

  // Measure shell header height so panels can fill the remaining viewport
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(80);

  useEffect(() => {
    if (!headerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, []);

  function switchLayout(next: LayoutMode) {
    setLayout(next);
    const current = urlPortal;
    const defaults = DEFAULT_PANELS[next];
    setPanels([{ portal: current }, ...defaults.slice(1)]);
  }

  function updatePanel(index: number, portalId: PortalId) {
    if (layout === "1up" && index === 0) {
      navigate(`/${PORTAL_SLUG[portalId]}`);
    } else {
      setPanels((prev) => prev.map((p, i) => (i === index ? { portal: portalId } : p)));
    }
  }

  const handleUndo = () => {
    undoLast();
  };

  const showSelector = layout !== "1up";

  // In 1up mode, always derive the active portal from the URL
  const activePanels = layout === "1up" ? [{ portal: urlPortal }] : panels;

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] overflow-hidden">
      {/* ── Shell header ─────────────────────────────────────────────────── */}
      <header ref={headerRef} className="bg-[#0f172a] text-white shrink-0 shadow-lg">
        {/* Top row */}
        <div className="flex items-stretch">
          {/* Logo */}
          <div className="flex items-center px-4 py-2 border-r border-white/10 shrink-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/43a31f0116d6fcfd042b6234bd85d7fff2c5a73b?width=468"
              alt="AssistRx"
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Portal tabs (single-panel mode: clicking selects that portal) */}
          <nav className="flex items-stretch flex-1 overflow-x-auto">
            {PORTALS.map((tab) => {
              const isActive = layout === "1up" && urlPortal === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (layout === "1up") navigate(`/${PORTAL_SLUG[tab.id]}`);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium border-b-2 transition-all whitespace-nowrap",
                    isActive
                      ? "text-white border-indigo-400 bg-white/5"
                      : layout === "1up"
                        ? "text-white/50 border-transparent hover:text-white/80 hover:bg-white/5 cursor-pointer"
                        : "text-white/30 border-transparent cursor-default"
                  )}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: isActive ? tab.color : "rgba(255,255,255,0.2)" }}
                  />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2 px-3 py-2 shrink-0 border-l border-white/10">
            {/* Layout mode */}
            <div className="flex items-center rounded overflow-hidden border border-white/20">
              {(
                [
                  { id: "1up" as LayoutMode, Icon: LayoutTemplate,  tip: "Single" },
                  { id: "2up" as LayoutMode, Icon: LayoutPanelLeft, tip: "Split 2" },
                  { id: "3up" as LayoutMode, Icon: LayoutGrid,      tip: "Split 3" },
                ] as const
              ).map(({ id, Icon, tip }) => (
                <button
                  key={id}
                  title={tip}
                  onClick={() => switchLayout(id)}
                  className={cn(
                    "flex items-center justify-center w-7 h-7 transition-colors",
                    layout === id
                      ? "bg-indigo-500 text-white"
                      : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                  )}
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>

            {/* Flow selector */}
            <div className="relative">
              <select
                value={flowType}
                onChange={(e) => resetDemo(e.target.value as FlowType)}
                className="appearance-none text-[11px] bg-white/10 border border-white/20 text-white rounded px-2 py-1.5 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-400"
              >
                {FLOW_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#0f172a]">
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
            </div>

            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className="flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 border border-white/20 text-white px-2.5 py-1.5 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Undo2 size={12} />
              <span className="hidden sm:inline">Undo</span>
            </button>

            <button
              onClick={() => resetDemo()}
              className="flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 border border-white/20 text-white px-2.5 py-1.5 rounded transition-colors"
            >
              <RefreshCw size={12} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Step progress bar */}
        <div className="px-2 pb-2">
          <StepBar />
        </div>
      </header>

      {/* ── Portal panels ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {activePanels.map((panel, i) => (
          <Panel
            key={i}
            portal={panel.portal}
            onChangePortal={(id) => updatePanel(i, id)}
            showSelector={showSelector}
            headerHeight={headerHeight}
          />
        ))}
      </div>
    </div>
  );
}
