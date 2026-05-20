import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Header from "@patient/components/Header";
import Footer from "@patient/components/Footer";
import EnrollmentShell from "@patient/components/enrollment/EnrollmentShell";

export default function ConfirmDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-arx-background pt-16">
      <Header />

      <main className="flex-grow">
        <EnrollmentShell title="Confirm your details" stepsFilled={1} stepsTotal={3}>
          <div className="space-y-4">
            <FloatingInput label="First name" defaultValue="Alex" />
            <FloatingInput label="Last name" defaultValue="Smith" />
            <FloatingInput label="Birth date" defaultValue="January 13, 1956" />
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate("/consent")}
              className="w-full bg-arx-primary text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-arx-primary-dark transition-colors"
            >
              <span>Confirm</span>
              <Check className="w-5 h-5" />
            </button>
          </div>
        </EnrollmentShell>
      </main>

      <Footer />
    </div>
  );
}

function FloatingInput({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="relative border-b border-arx-borders px-1 pt-5 pb-2">
      <span className="absolute top-2 left-1 text-xs text-arx-body-copy">{label}</span>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full text-base bg-transparent outline-none text-arx-slate"
      />
    </div>
  );
}
