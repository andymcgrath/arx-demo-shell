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
  incomeStatus: "none" | "verified" | "ineligible";
  pharmacyStatus: "none" | "processing" | "shipped" | "delivered";

  // timestamps
  paSubmittedAt: string | null;
  paApprovedAt: string | null;
  updatedAt: string;
  updatedBy: Portal | "system" | null;

  // event log
  events: DemoEvent[];

  // UI tab state
  enrollmentFormTabOpen: boolean;
  welcomeDismissed: boolean;

  // patient has dismissed the enrollment-complete screen
  enrollmentAcknowledged: boolean;
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
  sendEnrollmentInvite: () => void;
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
  // income qualification
  verifyIncome: () => void;
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
  undoLast: () => void;
  closeEnrollmentFormTab: () => void;
  openEnrollmentFormTab: () => void;
  dismissWelcome: () => void;
  acknowledgeEnrollment: () => void;
  // internal
  _snapshot: () => void;
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
  incomeStatus: "none",
  pharmacyStatus: "none",

  paSubmittedAt: null,
  paApprovedAt: null,
  updatedAt: new Date().toISOString(),
  updatedBy: null,

  events: [],

  enrollmentFormTabOpen: false,
  welcomeDismissed: false,
  enrollmentAcknowledged: false,
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
      _snapshots: [] as DemoState[],

      _deriveStep(): number {
        return deriveStep(get());
      },

      _snapshot(): void {
        const { _snapshots, ...state } = get() as DemoStore & { _snapshots: DemoState[] };
        const snapshots = [...(_snapshots ?? []), state as DemoState];
        set({ _snapshots: snapshots.slice(-20) } as Partial<DemoStore>);
      },

      undoLast(): void {
        const { _snapshots } = get() as DemoStore & { _snapshots: DemoState[] };
        if (!_snapshots || _snapshots.length === 0) return;
        const prev = _snapshots[_snapshots.length - 1];
        const remaining = _snapshots.slice(0, -1);
        set({ ...prev, _snapshots: remaining } as Partial<DemoStore>);
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

      sendEnrollmentInvite(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ enrollmentStatus: "enrolled", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("enrollment_invited", "HUB");
      },

      enrollPatient(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ enrollmentStatus: "enrolled", consentStatus: "confirmed", updatedAt: now, updatedBy: "Patient" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("consent_confirmed", "Patient");
      },

      runBI(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ biStatus: "running", updatedAt: now, updatedBy: "HUB" });
        get()._logEvent("bi_initiated", "HUB");
      },

      completeBI(result): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ biStatus: "complete", biResult: result, updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("bi_complete", "HUB", { result });
      },

      submitPA(metadata = {}): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ paStatus: "submitted", paSubmittedAt: now, updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pa_submitted", "Provider", metadata);
      },

      approvePA(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ paStatus: "approved", paApprovedAt: now, updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pa_approved", "Provider");
      },

      denyPA(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ paStatus: "denied", updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pa_denied", "Provider");
      },

      activateQS(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ qsStatus: "active", paStatus: "submitted", paSubmittedAt: now, updatedAt: now, updatedBy: "Provider" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("qs_authorized", "Provider");
      },

      discontinueQS(): void {
        get()._snapshot();
        set({ qsStatus: "discontinued", updatedAt: new Date().toISOString(), updatedBy: "Provider" });
        get()._logEvent("qs_discontinued", "Provider");
      },

      verifyIncome(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ incomeStatus: "verified", papStatus: "active", updatedAt: now, updatedBy: "Patient" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("income_verified", "Patient", { threshold: 38000, result: "Eligible" });
      },

      enrollPAP(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ papStatus: "active", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("pap_enrolled", "HUB");
      },

      auditPAP(): void {
        get()._snapshot();
        set({ papStatus: "audit_pending", updatedAt: new Date().toISOString(), updatedBy: "HUB" });
        get()._logEvent("pap_audit_initiated", "HUB");
      },

      discontinuePAP(): void {
        get()._snapshot();
        set({ papStatus: "discontinued", updatedAt: new Date().toISOString(), updatedBy: "HUB" });
        get()._logEvent("pap_discontinued", "HUB");
      },

      fillRx(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ pharmacyStatus: "processing", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("rx_filled", "HUB");
      },

      shipRx(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ pharmacyStatus: "shipped", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("rx_shipped", "HUB");
      },

      deliverRx(): void {
        get()._snapshot();
        const now = new Date().toISOString();
        set({ pharmacyStatus: "delivered", updatedAt: now, updatedBy: "HUB" });
        set({ workflowStep: get()._deriveStep() });
        get()._logEvent("rx_delivered", "HUB");
      },

      closeEnrollmentFormTab(): void {
        set({ enrollmentFormTabOpen: false });
      },

      openEnrollmentFormTab(): void {
        set({ enrollmentFormTabOpen: true });
      },

      dismissWelcome(): void {
        set({ welcomeDismissed: true });
      },

      acknowledgeEnrollment(): void {
        set({ enrollmentAcknowledged: true });
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
          incomeStatus: "none",
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
