import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { usePatientCase } from "../hooks/usePatientCase";
import { useEnrollPatient } from "../hooks/useEnrollPatient";

const CASE_ID = "demo";

// ─── Tree Node Types ────────────────────────────────────────────────────────

type TreeItem = {
  id: string;
  label: string;
  sublabel?: string;
};

type TreeGroup = {
  id: string;
  label: string;
  expanded?: boolean;
  children?: TreeItem[];
};

const TREE_DATA: TreeGroup[] = [
  { id: "material-items", label: "Material Items" },
  { id: "email", label: "Email" },
  { id: "secure-comms", label: "Secure Communications" },
  {
    id: "consent-comms",
    label: "Consent Communications",
    expanded: true,
    children: [
      { id: "unsuccessful-contact", label: "Unsuccessful Contact", sublabel: "Unsuccessful_Contact" },
      { id: "electronic-consent", label: "Electronic Consent", sublabel: "ElectronicConsent" },
      { id: "consent-revocation", label: "Consent Revocation", sublabel: "Consent_Revocation" },
      { id: "consent-recap-reminder", label: "Consent Re-capture Reminder", sublabel: "Consent_Recap_Reminder" },
      { id: "consent-recap-confirm", label: "Consent Re-capture Confirmation", sublabel: "Consent_Recap_Confirma…" },
    ],
  },
];

// ─── Small reusable components ──────────────────────────────────────────────

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] text-[#706e6b] uppercase tracking-wider font-medium mb-2">
      {children}
    </div>
  );
}

function CheckRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 py-1">
      <CheckCircle2
        size={18}
        className="shrink-0 mt-0.5"
        style={{ color: "#2e844a", fill: "#2e844a", stroke: "white" }}
      />
      <span className="text-[13px] text-[#3e3e3c]">{text}</span>
    </div>
  );
}

// ─── Column 1: Material Catalog ─────────────────────────────────────────────

function MaterialCatalog({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "consent-comms": true,
  });

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col h-full">
      <div className="text-[11px] text-[#706e6b] mb-2 font-medium">
        Available Material Items
      </div>

      <div className="flex flex-col text-[13px]">
        {TREE_DATA.map((group) => {
          const isOpen = expanded[group.id];
          return (
            <div key={group.id}>
              {/* Group row */}
              <div
                className="flex items-center gap-1 py-1 px-1 cursor-pointer hover:bg-[#f3f2f2] rounded select-none"
                onClick={() => group.children && toggle(group.id)}
              >
                {group.children ? (
                  isOpen ? (
                    <ChevronDown size={13} className="text-[#706e6b] shrink-0" />
                  ) : (
                    <ChevronRight size={13} className="text-[#706e6b] shrink-0" />
                  )
                ) : (
                  <ChevronRight size={13} className="text-[#706e6b] shrink-0" />
                )}
                <span className="text-[#3e3e3c]">{group.label}</span>
              </div>

              {/* Children */}
              {isOpen && group.children && (
                <div className="pl-4">
                  {group.children.map((child) => {
                    const isSelected = selectedId === child.id;
                    return (
                      <div
                        key={child.id}
                        className="flex flex-col py-1 px-2 cursor-pointer truncate rounded-sm"
                        style={{
                          borderLeft: isSelected
                            ? "3px solid #0176d3"
                            : "3px solid transparent",
                          background: isSelected ? "#eaf4ff" : undefined,
                          color: isSelected ? "#0176d3" : "#3e3e3c",
                        }}
                        onClick={() => onSelect(child.id)}
                        title={`${child.label} (${child.sublabel})`}
                      >
                        <span
                          className="text-[12px] truncate"
                          style={{ color: isSelected ? "#0176d3" : "#3e3e3c" }}
                        >
                          {child.label}{" "}
                          <span
                            className="text-[11px]"
                            style={{ color: isSelected ? "#0176d3" : "#706e6b" }}
                          >
                            ({child.sublabel})
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Column 2: Item Details ──────────────────────────────────────────────────

function ItemDetails({
  consentStatus,
  onAddToOrder,
  isLoading,
}: {
  consentStatus: string;
  onAddToOrder: () => void;
  isLoading: boolean;
}) {
  const disabled = consentStatus !== "pending";

  return (
    <div className="flex flex-col h-full">
      <PanelLabel>Item Details</PanelLabel>

      <h2 className="text-[16px] font-bold text-[#3e3e3c] mb-0.5">
        Communication Consent
      </h2>
      <div className="text-[12px] text-[#706e6b] mb-0.5">CommunicationConsent</div>
      <div className="text-[12px] text-[#706e6b] mb-3">Communication Consent Capture</div>

      <hr className="border-[#dddbda] mb-3" />

      <CheckRow text="Patient has valid mobile phone number" />
      <CheckRow text="Patient communication consent status is pending capture" />

      <hr className="border-[#dddbda] mt-3 mb-4" />

      <div className="flex justify-center">
        <button
          onClick={onAddToOrder}
          disabled={disabled || isLoading}
          className="flex items-center gap-2 px-5 py-1.5 text-[13px] font-medium rounded text-white transition-opacity"
          style={{
            background: disabled || isLoading ? "#aaabac" : "#0176d3",
            cursor: disabled || isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading && <Loader2 size={13} className="animate-spin" />}
          Add to Order
        </button>
      </div>
    </div>
  );
}

// ─── Column 3: Order Details ─────────────────────────────────────────────────

function OrderDetails() {
  return (
    <div className="flex flex-col h-full">
      <PanelLabel>Order Details</PanelLabel>
    </div>
  );
}

// ─── Column 4: Account Information ───────────────────────────────────────────

function AccountInformation({
  patientName,
  phone,
  email,
  contactMethod,
  onContactMethodChange,
  onSendRequest,
  isSending,
}: {
  patientName: string;
  phone: string;
  email: string;
  contactMethod: "phone" | "email" | null;
  onContactMethodChange: (v: "phone" | "email") => void;
  onSendRequest: () => void;
  isSending: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      <PanelLabel>Account Information</PanelLabel>

      <div className="text-[15px] font-bold text-[#3e3e3c] mb-3">{patientName}</div>

      <div className="text-[12px] text-[#c23934] font-medium mb-1">
        * Contact Method
      </div>

      {/* Radio: Phone */}
      <label className="flex items-center gap-2 py-1.5 cursor-pointer group">
        <input
          type="radio"
          name="contactMethod"
          value="phone"
          checked={contactMethod === "phone"}
          onChange={() => onContactMethodChange("phone")}
          className="accent-[#0176d3] w-3.5 h-3.5 cursor-pointer"
        />
        <span className="text-[13px] text-[#3e3e3c]">{phone}</span>
        <span
          className="text-[11px] px-1.5 py-0.5 rounded"
          style={{ background: "#e8f0fe", color: "#0176d3", fontWeight: 500 }}
        >
          MOBILE
        </span>
      </label>

      {/* Radio: Email */}
      <label className="flex items-center gap-2 py-1.5 cursor-pointer group">
        <input
          type="radio"
          name="contactMethod"
          value="email"
          checked={contactMethod === "email"}
          onChange={() => onContactMethodChange("email")}
          className="accent-[#0176d3] w-3.5 h-3.5 cursor-pointer"
        />
        <span className="text-[13px] text-[#3e3e3c]">{email}</span>
        <span
          className="text-[11px] px-1.5 py-0.5 rounded"
          style={{ background: "#e8f0fe", color: "#0176d3", fontWeight: 500 }}
        >
          EMAIL
        </span>
      </label>

      <div className="mt-3 flex flex-col gap-0.5">
        <a
          href={`mailto:${email}`}
          className="text-[13px] hover:underline"
          style={{ color: "#0176d3" }}
        >
          {email}
        </a>
        <span className="text-[13px]" style={{ color: "#0176d3" }}>
          {phone}
        </span>
      </div>

      <div className="mt-auto pt-4 flex justify-end">
        <button
          onClick={onSendRequest}
          disabled={!contactMethod || isSending}
          className="flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium rounded border transition-colors"
          style={{
            background: !contactMethod || isSending ? "#f3f2f2" : "white",
            color: !contactMethod || isSending ? "#aaabac" : "#3e3e3c",
            borderColor: "#dddbda",
            cursor: !contactMethod || isSending ? "not-allowed" : "pointer",
          }}
        >
          {isSending && <Loader2 size={13} className="animate-spin" />}
          Send Consent Request
        </button>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FulfilmentCenter() {
  const [selectedItem, setSelectedItem] = useState("electronic-consent");
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");

  const { data: patientCase, isLoading: caseLoading } = usePatientCase(CASE_ID);
  const enrollMutation = useEnrollPatient();

  const handleAddToOrder = () => {
    enrollMutation.mutate({ caseId: CASE_ID, contactMethod });
  };

  const handleSendRequest = () => {
    enrollMutation.mutate({ caseId: CASE_ID, contactMethod });
  };

  const consentStatus = patientCase?.consentStatus ?? "pending";

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: 13 }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-center relative border-b border-[#dddbda] py-2 px-4"
        style={{ minHeight: 40 }}
      >
        <Link
          to="/"
          className="absolute left-4 flex items-center gap-1 text-[12px] hover:underline"
          style={{ color: "#0176d3" }}
        >
          <ArrowLeft size={13} />
          Back to Record
        </Link>
        <span className="text-[14px] font-semibold text-[#3e3e3c]">
          Fulfilment Center
        </span>
      </div>

      {/* Sub-header: Material Catalog tab */}
      <div className="border-b border-[#dddbda] px-4 flex items-end" style={{ minHeight: 36 }}>
        <div
          className="text-[13px] font-semibold text-[#0176d3] pb-2 mr-4"
          style={{ borderBottom: "2px solid #0176d3" }}
        >
          Material Catalog
        </div>
      </div>

      {/* 4-column body */}
      <div
        className="flex flex-1"
        style={{ minHeight: 380 }}
      >
        {/* Col 1 — Material Catalog (~21%) */}
        <div
          className="border-r border-[#dddbda] p-3 overflow-y-auto"
          style={{ flexBasis: "21%", minWidth: 180 }}
        >
          <MaterialCatalog
            selectedId={selectedItem}
            onSelect={setSelectedItem}
          />
        </div>

        {/* Col 2 — Item Details (~29%) */}
        <div
          className="border-r border-[#dddbda] p-4 overflow-y-auto"
          style={{ flexBasis: "29%", minWidth: 220 }}
        >
          {caseLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 size={20} className="animate-spin text-[#706e6b]" />
            </div>
          ) : (
            <ItemDetails
              consentStatus={consentStatus}
              onAddToOrder={handleAddToOrder}
              isLoading={enrollMutation.isPending}
            />
          )}
        </div>

        {/* Col 3 — Order Details (~29%) */}
        <div
          className="border-r border-[#dddbda] p-4 overflow-y-auto"
          style={{ flexBasis: "29%", minWidth: 220 }}
        >
          <OrderDetails />
        </div>

        {/* Col 4 — Account Information (~21%) */}
        <div
          className="p-4 overflow-y-auto"
          style={{ flexBasis: "21%", minWidth: 180 }}
        >
          {caseLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 size={20} className="animate-spin text-[#706e6b]" />
            </div>
          ) : (
            <AccountInformation
              patientName={patientCase?.patientName ?? ""}
              phone={patientCase?.phone ?? ""}
              email={patientCase?.email ?? ""}
              contactMethod={contactMethod}
              onContactMethodChange={setContactMethod}
              onSendRequest={handleSendRequest}
              isSending={enrollMutation.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
