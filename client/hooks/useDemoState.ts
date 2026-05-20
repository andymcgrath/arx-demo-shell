/**
 * useDemoState — drop-in Zustand bridge
 *
 * This file has the SAME export signature as the Supabase useDemoState.ts
 * used in arx-connect-analytics, arx-prototype-bi-jascayd, arx-prototype-crm, etc.
 *
 * Portal code imports this hook unchanged. The state comes from the shared
 * Zustand store instead of Supabase — so all portals always see the same data.
 *
 * Usage (identical to the Supabase version):
 *   const { state, events, loading, actions } = useDemoState('Analytics')
 */
import { useDemoStore, type DemoState as StoreDemoState, type DemoEvent as StoreDemoEvent, type Portal } from "@/store/demoStore";
import type { FlowType } from "@/store/demoStore";

// ── Re-export types so portals can import them from this file ─────────────────

export type { FlowType, Portal };

/** snake_case shape — matches the Supabase DemoState columns exactly */
export interface DemoState {
  id: string;
  flow_type: FlowType;
  enrollment_status: "pending" | "enrolled";
  consent_status: "pending" | "confirmed" | "declined";
  bi_status: "none" | "running" | "complete";
  bi_result: "coverage_found" | "no_coverage" | "no_insurance" | null;
  pa_status: "none" | "submitted" | "approved" | "denied";
  qs_status: "none" | "active" | "discontinued";
  pap_status: "none" | "active" | "audit_pending" | "discontinued";
  pharmacy_status: "none" | "processing" | "shipped" | "delivered";
  workflow_step: 1 | 2 | 3 | 4 | 5 | 6;
  updated_at: string;
  updated_by: Portal | "system" | null;
}

/** snake_case shape — matches the Supabase demo_events columns exactly */
export interface DemoEvent {
  id: string;
  event_type: string;
  portal: Portal;
  flow_type: FlowType;
  workflow_step: number;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// ── Mapper: camelCase store → snake_case wire format ─────────────────────────

function toSnake(s: StoreDemoState): DemoState {
  return {
    id:                s.id,
    flow_type:         s.flowType,
    enrollment_status: s.enrollmentStatus,
    consent_status:    s.consentStatus,
    bi_status:         s.biStatus,
    bi_result:         s.biResult,
    pa_status:         s.paStatus,
    qs_status:         s.qsStatus,
    pap_status:        s.papStatus,
    pharmacy_status:   s.pharmacyStatus,
    workflow_step:     s.workflowStep as DemoState["workflow_step"],
    updated_at:        s.updatedAt,
    updated_by:        s.updatedBy,
  };
}

function eventToSnake(e: StoreDemoEvent): DemoEvent {
  return {
    id:            e.id,
    event_type:    e.eventType,
    portal:        e.portal,
    flow_type:     e.flowType,
    workflow_step: e.workflowStep,
    metadata:      e.metadata,
    created_at:    e.createdAt,
  };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useDemoState(portal: Portal) {
  const store = useDemoStore();

  const state: DemoState = toSnake(store);
  const events: DemoEvent[] = [...store.events]
    .map(eventToSnake)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 50);

  const actions = {
    enrollPatient:  () => store.enrollPatient(),
    runBI:          () => store.runBI(),
    completeBI:     (result: DemoState["bi_result"]) => store.completeBI(result),
    submitPA:       () => store.submitPA(),
    approvePA:      () => store.approvePA(),
    denyPA:         () => store.denyPA(),
    activateQS:     () => store.activateQS(),
    discontinueQS:  () => store.discontinueQS(),
    enrollPAP:      () => store.enrollPAP(),
    auditPAP:       () => store.auditPAP(),
    discontinuePAP: () => store.discontinuePAP(),
    fillRx:         () => store.fillRx(),
    shipRx:         () => store.shipRx(),
    deliverRx:      () => store.deliverRx(),
    changeFlow:     (flow: FlowType) => store.changeFlow(flow),
    resetDemo:      () => store.resetDemo(),
  };

  return {
    state,
    events,
    loading: false,  // Zustand is synchronous — never loading
    actions,
  };
}
