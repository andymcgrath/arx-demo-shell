import { useState } from "react";

import { useDemoStore } from "@/store/demoStore";

type Step = "login" | "pa-questions" | "pa-submitted";

// ── SVG icons ─────────────────────────────────────────────────────────────────

function CheckedCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58171 16 0 12.4183 0 8C0 3.58171 3.58171 0 8 0C12.4183 0 16 3.58171 16 8ZM7.07464 12.2359L13.0101 6.30045C13.2117 6.0989 13.2117 5.7721 13.0101 5.57055L12.2802 4.84064C12.0787 4.63906 11.7519 4.63906 11.5503 4.84064L6.70968 9.68123L4.44971 7.42126C4.24816 7.21971 3.92135 7.21971 3.71977 7.42126L2.98987 8.15116C2.78832 8.35271 2.78832 8.67952 2.98987 8.88106L6.34471 12.2359C6.54629 12.4375 6.87306 12.4375 7.07464 12.2359Z" fill="#007178" />
    </svg>
  );
}

function UncheckedCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 0.75C12.0051 0.75 15.25 3.99486 15.25 8C15.25 12.0051 12.0051 15.25 8 15.25C3.99486 15.25 0.75 12.0051 0.75 8C0.75 3.99486 3.99486 0.75 8 0.75Z" stroke="#6F7276" strokeWidth="1.5" />
    </svg>
  );
}

function RadioCheckedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M0 8C0 3.58125 3.58125 0 8 0C12.4187 0 16 3.58125 16 8C16 12.4187 12.4187 16 8 16C3.58125 16 0 12.4187 0 8ZM8 11C9.65625 11 11 9.65625 11 8C11 6.31563 9.65625 5 8 5C6.31563 5 5 6.31563 5 8C5 9.65625 6.31563 11 8 11Z" fill="#007178" />
    </svg>
  );
}

function RadioUncheckedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8C1.6 11.5346 4.46538 14.4 8 14.4ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#6F7276" />
    </svg>
  );
}

function AssistRxLogo() {
  return (
    <div className="provider-portal-wordmark">
      <span className="provider-portal-wordmark__title">Provider Portal</span>
    </div>
  );
}

// ── Shared sidebar ────────────────────────────────────────────────────────────

function BrandSidebar() {
  return (
    <aside className="provider-sidebar">
      <div className="provider-sidebar__logo">
        <AssistRxLogo />
      </div>
      <div className="provider-sidebar__illustration">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/a4826c434ed1dd6a529572eafddc92418cee2e88?width=928"
          alt="iAssist illustration"
        />
      </div>
      <div className="provider-sidebar__footer">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F4c828a6b97e546bc967a796675ca457e%2Fcfbb35e5585d498f8ae600f5ebdb6767?format=webp&width=800"
          alt="AssistRx"
        />
      </div>
    </aside>
  );
}

// ── PA info summary (shared between step 2 and 3) ─────────────────────────────

const PA_INFO_ITEMS = [
  { label: "MEDICATION",          value: "Jascayd® (nerandomilast) • NDC: 72266-0180-30",   done: true },
  { label: "MEDICATION DETAILS",  value: "18 mg · 30-day supply",                            done: true },
  { label: "PATIENT",             value: "Keanu Dixon • 09/19/1981",                         done: true },
  { label: "PRESCRIBER",          value: "Sarah Chen, MD",                                   done: true },
  { label: "INSURANCE",           value: "BlueCross BlueShield of Florida",                  done: true },
  { label: "PHARMACY",            value: "Accredo Health Group Inc.",                        done: true },
  { label: "PRIOR AUTHORIZATION", value: "Electronic Questions Found",                       done: false },
];

function PaSummaryTable() {
  return (
    <div className="pa-summary-table">
      {PA_INFO_ITEMS.map((item) => (
        <div key={item.label} className="pa-summary-row">
          <div className="pa-summary-row__label">
            {item.done ? <CheckedCircleIcon /> : <UncheckedCircleIcon />}
            <span className="pa-summary-label-text">{item.label}</span>
          </div>
          <p className="pa-summary-row__value">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// ── Radio question ────────────────────────────────────────────────────────────

function RadioQuestion({
  question,
  value,
  onChange,
}: {
  question: string;
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="pa-question">
      <p className="pa-question__text">{question}</p>
      <div className="pa-question__options">
        <label className="pa-radio-option">
          <button
            type="button"
            onClick={() => onChange("yes")}
            className="pa-radio-btn"
            aria-pressed={value === "yes"}
          >
            {value === "yes" ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}
          </button>
          <span className="pa-radio-label">Yes</span>
        </label>
        <label className="pa-radio-option">
          <button
            type="button"
            onClick={() => onChange("no")}
            className="pa-radio-btn"
            aria-pressed={value === "no"}
          >
            {value === "no" ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}
          </button>
          <span className="pa-radio-label">No</span>
        </label>
      </div>
    </div>
  );
}

// ── Step 1: Login ─────────────────────────────────────────────────────────────

function LoginStep({ onSubmit }: { onSubmit: () => void }) {
  const [npi, setNpi] = useState("3299879499");
  const [pin, setPin] = useState("05367975");

  const canSubmit = npi.trim().length > 0 && pin.trim().length > 0;

  return (
    <main className="provider-content">
      <p className="pa-eyebrow">PRIOR AUTHORIZATION</p>
      <h1 className="pa-login-heading">Verify<br />&amp; Complete</h1>
      <p className="pa-login-description">
        A request has been made for your office to complete a prior authorization form for one of your patients.
      </p>
      <p className="pa-login-description">
        Please enter your provider NPI and the associated security PIN to access and complete this request
      </p>

      <div className="pa-fields">
        <div className="pa-field">
          <label className="pa-field__label">NPI</label>
          <input
            type="text"
            value={npi}
            onChange={(e) => setNpi(e.target.value)}
            className="pa-field__input"
            placeholder=""
          />
          <div className={`pa-field__underline ${npi ? "pa-field__underline--active" : ""}`} />
        </div>

        <div className="pa-field">
          <label className="pa-field__label">PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="pa-field__input"
            placeholder=""
          />
          <div className={`pa-field__underline ${pin ? "pa-field__underline--active" : ""}`} />
        </div>
      </div>

      <div className="pa-action-row">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="pa-btn-primary"
        >
          Submit
        </button>
      </div>
    </main>
  );
}

// ── Step 2: PA Review (first question) ────────────────────────────────────────

function PaReviewStep({ onNext }: { onNext: () => void }) {
  const [q1, setQ1] = useState<string | null>(null);
  const [comments, setComments] = useState("");

  return (
    <main className="provider-content provider-content--pa">
      <p className="pa-section-title">Electronic Prior Authorization</p>
      <PaSummaryTable />

      <div className="pa-questions-section">
        <RadioQuestion
          question="Does the patient have a confirmed diagnosis of Idiopathic Pulmonary Fibrosis (IPF)?"
          value={q1}
          onChange={setQ1}
        />

        <div className="pa-comments-field">
          <label className="pa-comments-label">Comments:</label>
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="pa-comments-input"
          />
          <div className="pa-field__underline" />
        </div>
      </div>

      <div className="pa-action-row">
        <button onClick={onNext} className="pa-btn-secondary">
          Save
        </button>
      </div>
    </main>
  );
}

// ── Step 3: PA Questions (multi-question with nav) ────────────────────────────

function PaQuestionsStep({ onBack, onCancel, onNext }: { onBack: () => void; onCancel: () => void; onNext: () => void }) {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [comments, setComments] = useState("");
  const submitPA = useDemoStore((s) => s.submitPA);

  function handleNext() {
    submitPA({ source: "provider_portal", comments });
    onNext();
  }

  return (
    <main className="provider-content provider-content--pa">
      <p className="pa-section-title">Electronic Prior Authorization</p>
      <PaSummaryTable />

      <div className="pa-questions-section">
        <RadioQuestion
          question="Does the patient have a confirmed diagnosis of Idiopathic Pulmonary Fibrosis (IPF)?"
          value={q1}
          onChange={setQ1}
        />
        <RadioQuestion
          question="Has the patient tried and failed therapy with other approved IPF treatments (e.g., pirfenidone, nintedanib)?"
          value={q2}
          onChange={setQ2}
        />
        <RadioQuestion
          question="Is the patient's Forced Vital Capacity (FVC) ≥ 45% of predicted at baseline?"
          value={q3}
          onChange={setQ3}
        />

        <div className="pa-comments-field">
          <label className="pa-comments-label">Comments:</label>
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="pa-comments-input"
          />
          <div className="pa-field__underline" />
        </div>

      </div>

      <div className="pa-nav-row">
        <button onClick={onCancel} className="pa-btn-tertiary">Cancel</button>
        <div className="pa-nav-actions">
          <button onClick={onBack} className="pa-btn-secondary">Back</button>
          <button onClick={handleNext} className="pa-btn-primary">Next</button>
        </div>
      </div>
    </main>
  );
}

// ── Step 4: PA Submitted confirmation ───────────────────────────────────────

function PaSubmittedStep({ onDone }: { onDone: () => void }) {
  return (
    <main className="provider-content provider-content--pa">
      <p className="pa-section-title">Electronic Prior Authorization</p>
      <PaSummaryTable />

      <div style={{ textAlign: "center", padding: "40px 0 32px" }}>
        <CheckedCircleIcon className="" />
        <h2 style={{ marginTop: 16, marginBottom: 8, fontSize: 20, fontWeight: 700, color: "#1C1C1C" }}>
          PA Submitted
        </h2>
        <p style={{ color: "#6F7276", fontSize: 14, marginBottom: 32 }}>
          The prior authorization has been submitted successfully. The patient will be notified once a decision is made.
        </p>
        <button onClick={onDone} className="pa-btn-secondary">Done</button>
      </div>
    </main>
  );
}

// ── Provider Portal ───────────────────────────────────────────────────────────

export default function ProviderPortal() {
  const [step, setStep] = useState<Step>("login");

  return (
    <div className="provider-portal">
      <BrandSidebar />
      {step === "login" && <LoginStep onSubmit={() => setStep("pa-questions")} />}
      {step === "pa-questions" && (
        <PaQuestionsStep
          onBack={() => setStep("login")}
          onCancel={() => setStep("login")}
          onNext={() => setStep("pa-submitted")}
        />
      )}
      {step === "pa-submitted" && <PaSubmittedStep onDone={() => setStep("login")} />}
    </div>
  );
}
