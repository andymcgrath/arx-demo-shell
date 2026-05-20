import { ChevronRight, ArrowRight } from "lucide-react";
import ProgramLogo from "@/components/brand/ProgramLogo";
import { PROGRAM } from "@/config/branding";

interface Prescription {
  name: string;
  status: string;
}

const prescriptions: Prescription[] = [
  {
    name: PROGRAM.name,
    status: "Prescription received",
  },
];

export default function PrescriptionsSection() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-arx-primary inline-block" />
          <span className="font-bold text-arx-slate text-base">Prescriptions</span>
        </div>
        <button className="flex items-center gap-1 text-sm font-semibold text-arx-primary hover:text-arx-primary-80 transition-colors">
          View all
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Prescription cards */}
      <div className="space-y-2">
        {prescriptions.map((rx) => (
          <button
            key={rx.name}
            className="w-full flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors bg-arx-primary hover:bg-arx-primary-dark"
          >
            {/* White logo on teal background */}
            <ProgramLogo
              variant="white"
              className="h-8 w-auto max-w-[160px] object-contain flex-shrink-0"
            />
            <div className="flex-1 text-left">
              <p className="text-xs text-white/80">{rx.status}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70" />
          </button>
        ))}
      </div>
    </div>
  );
}
