/**
 * arx-demo-shell — Shared State Machine
 *
 * Single Zustand store consumed by ALL portals.
 * Portals never import from each other — they only import from @/store/demoStore
 * or use the useDemoState() / usePatientCase() bridge hooks in @/hooks/.
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ── Types ─────────────────────────────────────────────────────────────────────

export type FlowType = "Fax_QS_PA_Approved" | "Fax_PAP_Audit" | "CoA_DTP";
export type Portal = "HUB" | "Patient" | "Provider" | "Field" | "Analytics";

export interface DemoState {
  // identity
  id: string;
  patientName: string;
  patientDob: string;
  drugName: string;
  rxNumber: string;
  payer: string;
  npi: string;
  phone: string;
  email: string;
  deliveryAddress: string;

  // workflow
  flowType: FlowType;
  workflowStep: number;

  // status fields
  enrollmentStatus: "pending" | "enrolled";
  consentStatus: "pending" | "confirmed" | "declined";
  biStatus: "none" | "running" | "complete";
  biResult: "coverage_found" | "no_coverage" | "no_insurance" | null;
  paStatus: "none" | "submitted" | "approved" | "denied";
  qsStatus: "none" | "active" | "discontinued";
  papStatus: "none" | "active" | "audit_pending" | "discontinued";
  pharmacyStatus: "none" | "processing" | "shipped" | "delivered";

  // timestamps
  paSubmittedAt: string | null;
  paApprovedAt: string | null;
  updatedAt: string;
  updatedBy: Portal | "system" | null;

  // event log
  events: DemoEvent[];
}

export interface DemoEvent {
  id: string;
  eventType: string;
  portal: Portal;
  flowType: FlowType;
  workflowStep: number;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface DemoActions {
  // enrollment
  enrollPatient: () => void;
  // benefits investigation
  runBI: () => void;
  completeBI: (result: DemoState["biResult"]) => void;
  // prior auth / CoA / PAP
  submitPA: (metadata?: Record<string, unknown>) => void;
  approvePA: () => void;
  denyPA: () => void;
  // quick start
  activateQS: () => void;
  discontinueQS: () => void;
  // PAP
  enrollPAP: () => void;
  auditPAP: () => void;
  discontinuePAP: () => void;
  // pharmacy
  fillRx: () => void;
  shipRx: () => void;
  deliverRx: () => void;
  // flow
  changeFlow: (flow: FlowType) => void;
  resetDemo: (flow?: FlowType) => void;
  // internal
  _logEvent: (type: string, portal: Portal, meta?: Record<string, unknown>) => void;
  _deriveStep: () => number;
}

export type DemoStore = DemoState & DemoActions;

// ── Seed data ─────────────────────────────────────────────────────────────────

export const SEED: DemoState = {
  id: "demo",
  patientName: "Keanu Dixon",
  patientDob: "09/19/1981",
  drugName: "Jascayd 10mg",
  rxNumber: "40002500",
  payer: "Commercial",
  npi: "1234567890",
  phone: "(555) 310-4200",
  email: "keanu.dixon@email.com",
  deliveryAddress: "123 Main Street, Orlando, FL 32801",

  flowType: "Fax_QS_PA_Approved",
  workflowStep: 1,

  enrollmentStatus: "pending",
  consentStatus: "pending",
  biStatus: "none",
  biResult: null,
  paStatus: "none",
  qsStatus: "none",
  papStatus: "none",
  pharmacyStatus: "none",

  paSubmittedAt: null,
  paApprovedAt: null,
  updatedAt: new Date().toISOString(),
  updatedBy: null,

  events: [],
};

// ── Step derivation ───────────────────────────────────────────────────────────

export function deriveStep(s: Partial<DemoState>): number {
  if (s.pharmacyStatus === "delivered") return 6;
  if (s.pharmacyStatus === "processing" || s.pharmacyStatus === "shipped") return 5;
  if (s.paStatus === "approved" || s.paStatus === "denied") return 4;
  if (
    s.paStatus === "submitted" ||
    s.qsStatus === "active" ||
    s.papStatus === "active"
  )
    return 3;
  if (s.enrollmentStatus === "enrolled") return 2;
  return 1;
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      ...SEED,

      _deriveStep(): number {
        return deriveStep(get());
      },

      _logEvent(type, portal, meta = {}): void {
        const event: DemoEvent = {
          id: crypto.randomUUID(),
          eventType: type,
          portal,
          flowType: get().flowType,
          workflowStep: get().workflowStep,
          metadata: meta,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ events: [...s.events, event] }));
      },

      enrollPatient(): void {
        const now = new Date().toISOString();
        set({ enrollmentStatus: "enrolled", consentStatus: "confirmed", updatedAt: now, updatedBy: "Patient" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("consent_confirmed", "Patient");
      },

      runBI(): void {
        const now = new Date().toISOString();
        set({ biStatus: "running", updatedAt: now, updatedBy: "HUB" });
        get()._logEvent("bi_initiated", "HUB");
      },

      completeBI(result): void {
        const now = new Date().toISOString();
        set({ biStatus: "complete", biResult: result, updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("bi_complete", "HUB", { result });
      },

      submitPA(metadata = {}): void {
        const now = new Date().toISOString();
        set({ paStatus: "submitted", paSubmittedAt: now, updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pa_submitted", "Provider", metadata);
      },

      approvePA(): void {
        const now = new Date().toISOString();
        set({ paStatus: "approved", paApprovedAt: now, updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pa_approved", "Provider");
      },

      denyPA(): void {
        const now = new Date().toISOString();
        set({ paStatus: "denied", updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pa_denied", "Provider");
      },

      activateQS(): void {
        const now = new Date().toISOString();
        set({ qsStatus: "active", paStatus: "submitted", paSubmittedAt: now, updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("qs_authorized", "Provider");
      },

      discontinueQS(): void {
        set({ qsStatus: "discontinued", updatedAt: new Date().toISOString(), updatedBy: "Provider" });
        get()._logEvent("qs_discontinued", "Provider");
      },

      enrollPAP(): void {
        const now = new Date().toISOString();
        set({ papStatus: "active", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pap_enrolled", "HUB");
      },

      auditPAP(): void {
        set({ papStatus: "audit_pending", updatedAt: new Date().toISOString(), updatedBy: "HUB" });
        get()._logEvent("pap_audit_initiated", "HUB");
      },

      discontinuePAP(): void {
        set({ papStatus: "discontinued", updatedAt: new Date().toISOString(), updatedBy: "HUB" });
        get()._logEvent("pap_discontinued", "HUB");
      },

      fillRx(): void {
        const now = new Date().toISOString();
        set({ pharmacyStatus: "processing", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("rx_filled", "HUB");
      },

      shipRx(): void {
        const now = new Date().toISOString();
        set({ pharmacyStatus: "shipped", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("rx_shipped", "HUB");
      },

      deliverRx(): void {
        const now = new Date().toISOString();
        set({ pharmacyStatus: "delivered", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("rx_delivered", "HUB");
      },

      changeFlow(flow): void {
        set({ flowType: flow });
        get()._logEvent("flow_changed", "HUB", { flow });
      },

      resetDemo(flow): void {
        const current = get();
        set({
          ...SEED,
          flowType: flow ?? current.flowType,
          workflowStep: 1,
          updatedAt: new Date().toISOString(),
          events: [],
        });
        get()._logEvent("demo_reset", "HUB");
      },
    }),
    {
      name: "arx-demo-shell",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
