/**
 * Provider Portal — placeholder
 * Replace this file with the actual Provider Portal UI when the repo is ready.
 */
import { useDemoState } from "@/hooks/useDemoState";
import { Stethoscope } from "lucide-react";

export default function ProviderPortal() {
  const { state } = useDemoState("Provider");

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center pt-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
          <Stethoscope size={28} className="text-violet-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Provider Portal</h1>
        <p className="text-slate-500 mb-6">
          This portal is under construction. Connect the <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">arx-prototype-provider</code> repo when ready.
        </p>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-left space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current State</p>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Step</span>
            <span className="font-medium">{state?.workflow_step ?? 1} / 6</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">PA Status</span>
            <span className="font-medium capitalize">{state?.pa_status ?? "none"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">BI Status</span>
            <span className="font-medium capitalize">{state?.bi_status ?? "none"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
