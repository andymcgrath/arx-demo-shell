/**
 * useRunEBenefits — CRM bridge hook
 *
 * Drop-in replacement for arx-prototype-crm's useRunEBenefits.ts
 * Calls the shared Zustand store's runBI() + completeBI() actions.
 */
import { useState, useCallback } from "react";
import { useDemoStore } from "@/store/demoStore";

export function useRunEBenefits() {
  const [isPending, setIsPending] = useState(false);
  const runBI = useDemoStore((s) => s.runBI);
  const completeBI = useDemoStore((s) => s.completeBI);

  const mutate = useCallback(
    (_caseId: string, options?: { onSuccess?: () => void; onError?: () => void }) => {
      setIsPending(true);
      runBI();
      // Simulate async BI completion after 2s
      setTimeout(() => {
        completeBI("coverage_found");
        setIsPending(false);
        options?.onSuccess?.();
      }, 2000);
    },
    [runBI, completeBI]
  );

  return {
    mutate,
    isPending,
    isSuccess: false,
    isError: false,
  };
}
