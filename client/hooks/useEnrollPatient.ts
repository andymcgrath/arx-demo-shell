/**
 * useEnrollPatient — CRM bridge hook
 *
 * Drop-in replacement for arx-prototype-crm's useEnrollPatient.ts
 * Calls the shared Zustand store's enrollPatient() action.
 */
import { useState, useCallback } from "react";
import { useDemoStore } from "@/store/demoStore";

interface EnrollPayload {
  caseId: string;
  contactMethod: "phone" | "email";
}

export function useEnrollPatient() {
  const [isPending, setIsPending] = useState(false);
  const sendEnrollmentInvite = useDemoStore((s) => s.sendEnrollmentInvite);

  const mutate = useCallback(
    (payload: EnrollPayload, options?: { onSuccess?: () => void }) => {
      setIsPending(true);
      setTimeout(() => {
        sendEnrollmentInvite();
        setIsPending(false);
        options?.onSuccess?.();
      }, 600);
    },
    [enrollPatient]
  );

  return {
    mutate,
    isPending,
    isSuccess: false,
    isError: false,
  };
}
