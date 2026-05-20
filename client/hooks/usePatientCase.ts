/**
 * usePatientCase — CRM bridge hook
 *
 * Drop-in replacement for arx-prototype-crm's usePatientCase.ts
 * Returns the same PatientCase shape but reads from the shared Zustand store.
 */
import { useDemoStore } from "@/store/demoStore";

export interface PatientCase {
  caseId: string;
  patientName: string;
  phone: string;
  email: string;
  consentStatus: "pending" | "captured" | "revoked";
  deliveryAddress: string;
  shippingAddress: string;
  workflowStep: number;
  paPhone: string;
  stage: string;
  // Extended fields used in CRM views
  patientDob: string;
  drugName: string;
  rxNumber: string;
  payer: string;
  npi: string;
  paStatus: string;
  biStatus: string;
  pharmacyStatus: string;
  flowType: string;
}

/** Maps Zustand store consent status to CRM-style consentStatus */
function mapConsent(s: string): PatientCase["consentStatus"] {
  if (s === "confirmed") return "captured";
  if (s === "declined") return "revoked";
  return "pending";
}

/** Maps workflowStep → Salesforce-style stage label */
function mapStage(step: number): string {
  return (
    [
      "",
      "Referral Received",
      "Patient Enrolled",
      "Authorization Pending",
      "Authorization Complete",
      "Rx Processing",
      "Rx Delivered",
    ][step] ?? "Unknown"
  );
}

export function usePatientCase(_caseId?: string) {
  const s = useDemoStore();

  const data: PatientCase = {
    caseId:          s.id,
    patientName:     s.patientName,
    phone:           s.phone,
    email:           s.email,
    consentStatus:   mapConsent(s.consentStatus),
    deliveryAddress: s.deliveryAddress,
    shippingAddress: s.deliveryAddress,
    workflowStep:    s.workflowStep,
    paPhone:         "(407) 885-9999",
    stage:           mapStage(s.workflowStep),
    patientDob:      s.patientDob,
    drugName:        s.drugName,
    rxNumber:        s.rxNumber,
    payer:           s.payer,
    npi:             s.npi,
    paStatus:        s.paStatus,
    biStatus:        s.biStatus,
    pharmacyStatus:  s.pharmacyStatus,
    flowType:        s.flowType,
  };

  return {
    data,
    isLoading: false,
    isError: false,
  };
}
