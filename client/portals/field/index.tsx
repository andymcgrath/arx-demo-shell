/**
 * Field Portal — placeholder
 * Replace this file with the actual Field Portal UI when the repo is ready.
 */
import { useDemoState } from "@/hooks/useDemoState";
import { MapPin } from "lucide-react";

export default function FieldPortal() {
  const { state } = useDemoState("Field");

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center pt-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
          <MapPin size={28} className="text-teal-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Field Portal</h1>
        <p className="text-slate-500 mb-6">
          This portal is under construction. Connect the <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">arx-prototype-field</code> repo when ready.
        </p>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-left space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current State</p>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Patient</span>
            <span className="font-medium">Keanu Dixon</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Step</span>
            <span className="font-medium">{state?.workflow_step ?? 1} / 6</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Enrollment</span>
            <span className="font-medium capitalize">{state?.enrollment_status ?? "pending"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">PA Status</span>
            <span className="font-medium capitalize">{state?.pa_status ?? "none"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
