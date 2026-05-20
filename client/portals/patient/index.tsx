/**
 * Patient Portal — Shell wrapper
 *
 * Wrapped in .portal-patient so CSS variables and font are scoped to the
 * AssistRx design system without bleeding into other portals.
 *
 * StateDrivenNav is the "event harness" for this portal: it watches the
 * shared Zustand demo state and navigates to the correct patient page
 * automatically. The CRM/HUB drives the workflow; this portal reflects it.
 *
 * State → Route mapping:
 *   pharmacy_status delivered  → /medication-delivered
 *   pharmacy_status shipped    → /order-shipped
 *   pharmacy_status processing → /order-tracker
 *   pa_status denied           → /pa-denied
 *   pa_status approved         → /pa-approved
 *   pa_status submitted        → /pa-status
 *   consent_status confirmed   → /enrollment-complete
 *   enrollment_status enrolled → /consent  (awaiting consent signature)
 *   (default)                  → /         (welcome / not yet enrolled)
 */
import { useEffect } from "react";
import { PortalRouter, Routes, Route, useNavigate } from "@/lib/portalRouter";
import { ChatProvider, useChatContext } from "./components/ChatContext";
import ChatModal from "./components/ChatModal";
import { useDemoStore } from "@/store/demoStore";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Index from "./pages/Index";
import ConfirmDetails from "./pages/ConfirmDetails";
import Consent from "./pages/Consent";
import Signature from "./pages/Signature";
import UploadInsurance from "./pages/UploadInsurance";
import EnrollmentComplete from "./pages/EnrollmentComplete";
import PAStatus from "./pages/PAStatus";
import PADenied from "./pages/PADenied";
import PAApproved from "./pages/PAApproved";
import CopayEnroll from "./pages/CopayEnroll";
import DeliveryAddress from "./pages/DeliveryAddress";
import DeliveryDate from "./pages/DeliveryDate";
import DeliveryPayment from "./pages/DeliveryPayment";
import DeliveryConfirmation from "./pages/DeliveryConfirmation";
import OrderTracker from "./pages/OrderTracker";
import OrderShipped from "./pages/OrderShipped";
import MedicationDelivered from "./pages/MedicationDelivered";
import IncomeQualification from "./pages/IncomeQualification";
import PapIncomeVerification from "./pages/PapIncomeVerification";
import PapEnrollmentComplete from "./pages/PapEnrollmentComplete";

/** Maps current demo state to the patient-facing route */
function derivePatientRoute(state: ReturnType<typeof useDemoStore.getState>): string {
  if (state.pharmacyStatus === "delivered") return "/medication-delivered";
  if (state.pharmacyStatus === "shipped")   return "/order-shipped";
  if (state.pharmacyStatus !== "none")      return "/order-tracker";

  if (state.flowType === "Fax_PAP_Audit") {
    if (state.incomeStatus === "verified") return state.welcomeDismissed ? "/" : "/pap-enrollment-complete";
    if (state.consentStatus === "confirmed") return "/pap-income-verification";
    return "/";
  }

  if (state.flowType === "CoA_DTP") {
    if (state.paStatus === "approved")  return "/pa-approved";
    if (state.paStatus === "submitted") return "/pa-status";
    if (state.incomeStatus === "verified") return "/pa-status";
    if (state.consentStatus === "confirmed") return "/income-qualification";
    return "/";
  }

  if (state.paStatus === "denied")          return "/pa-denied";
  if (state.paStatus === "approved")        return "/pa-approved";
  if (state.paStatus === "submitted")       return "/pa-status";
  if (state.consentStatus === "confirmed")  return state.welcomeDismissed ? "/" : "/enrollment-complete";
  return "/";
}

/** Watches Zustand state and navigates the patient portal accordingly */
function StateDrivenNav() {
  const navigate = useNavigate();
  const pharmacyStatus   = useDemoStore((s) => s.pharmacyStatus);
  const paStatus         = useDemoStore((s) => s.paStatus);
  const consentStatus    = useDemoStore((s) => s.consentStatus);
  const enrollmentStatus = useDemoStore((s) => s.enrollmentStatus);
  const incomeStatus     = useDemoStore((s) => s.incomeStatus);
  const flowType         = useDemoStore((s) => s.flowType);
  const welcomeDismissed = useDemoStore((s) => s.welcomeDismissed);

  useEffect(() => {
    const target = derivePatientRoute(useDemoStore.getState());
    navigate(target, { replace: true });
  }, [pharmacyStatus, paStatus, consentStatus, enrollmentStatus, incomeStatus, flowType, welcomeDismissed, navigate]);

  return null;
}

function PatientRoutes() {
  const ctx = useChatContext();
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <StateDrivenNav />
        <Routes>
          <Route path="/"                      element={<Index />} />
          <Route path="/confirm-details"       element={<ConfirmDetails />} />
          <Route path="/consent"               element={<Consent />} />
          <Route path="/signature"             element={<Signature />} />
          <Route path="/upload-insurance"      element={<UploadInsurance />} />
          <Route path="/enrollment-complete"   element={<EnrollmentComplete />} />
          <Route path="/pa-status"             element={<PAStatus />} />
          <Route path="/pa-denied"             element={<PADenied />} />
          <Route path="/pa-approved"           element={<PAApproved />} />
          <Route path="/copay-enroll"          element={<CopayEnroll />} />
          <Route path="/delivery-address"      element={<DeliveryAddress />} />
          <Route path="/delivery-date"         element={<DeliveryDate />} />
          <Route path="/delivery-payment"      element={<DeliveryPayment />} />
          <Route path="/delivery-confirmation" element={<DeliveryConfirmation />} />
          <Route path="/order-tracker"         element={<OrderTracker />} />
          <Route path="/order-shipped"         element={<OrderShipped />} />
          <Route path="/medication-delivered"  element={<MedicationDelivered />} />
          <Route path="/income-qualification"      element={<IncomeQualification />} />
          <Route path="/pap-income-verification"  element={<PapIncomeVerification />} />
          <Route path="/pap-enrollment-complete"  element={<PapEnrollmentComplete />} />
        </Routes>
        <Footer />
        {ctx?.chatOpen && <ChatModal onClose={ctx.closeChat} />}
      </div>
    </div>
  );
}

export default function PatientPortal() {
  return (
    <div className="portal-patient h-full flex flex-col">
      <PortalRouter>
        <ChatProvider>
          <PatientRoutes />
        </ChatProvider>
      </PortalRouter>
    </div>
  );
}
