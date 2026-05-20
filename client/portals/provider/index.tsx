import { useState } from "react";

type Step = "login" | "pa-review" | "pa-questions";

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

function IAssistLogo() {
  return (
    <svg width="153" height="57" viewBox="0 0 153 57" fill="none">
      <path d="M152.734 11.8702H142.756V21.8132H152.734V11.8702Z" fill="white" />
      <path d="M152.734 11.8702H142.756V21.8479H152.734V11.8702Z" fill="white" />
      <path d="M24.8634 21.8768H27.2768L43.0014 55.8785H40.2524L35.958 46.4274H16.0374L11.7431 55.8785H9.13867L24.8634 21.8768ZM34.8989 44.1587L26.0209 24.6258L17.1023 44.1587H34.8989Z" fill="white" />
      <path d="M44.0547 52.7937L45.4553 50.9128C48.158 52.9847 51.1444 54.1422 54.2812 54.1422C57.6091 54.1422 60.2134 52.3076 60.2134 49.4659V49.3675C60.2134 46.4738 57.1287 45.4146 53.7025 44.4481C49.6975 43.2906 45.2643 42.0868 45.2643 37.6941V37.5957C45.2643 33.6428 48.5921 30.7954 53.3668 30.7954C56.3069 30.7954 59.6347 31.8545 62.0944 33.4981L60.8385 35.4775C58.5698 33.9843 55.8728 33.0178 53.2684 33.0178C49.8943 33.0178 47.6719 34.8524 47.6719 37.3121V37.4105C47.6719 40.1596 50.9997 41.1724 54.5185 42.1852C58.4714 43.2964 62.621 44.7433 62.621 49.0839V49.1823C62.621 53.5692 58.8592 56.3704 54.1308 56.3704C50.5656 56.3646 46.6649 54.9177 44.0547 52.7937Z" fill="white" />
      <path d="M64.9883 52.7937L66.3889 50.9128C69.0916 52.9847 72.078 54.1422 75.2148 54.1422C78.5426 54.1422 81.147 52.3076 81.147 49.4659V49.3675C81.147 46.4738 78.0623 45.4146 74.6361 44.4481C70.6311 43.2906 66.1979 42.0868 66.1979 37.6941V37.5957C66.1979 33.6428 69.5257 30.7954 74.3004 30.7954C77.2405 30.7954 80.5683 31.8545 83.028 33.4981L81.7721 35.4775C79.5034 33.9843 76.8064 33.0178 74.202 33.0178C70.8279 33.0178 68.6055 34.8524 68.6055 37.3121V37.4105C68.6055 40.1596 71.9333 41.1724 75.4521 42.1852C79.405 43.2964 83.5546 44.7433 83.5546 49.0839V49.1823C83.5546 53.5692 79.7927 56.3704 75.0643 56.3704C71.4992 56.3646 67.5927 54.9177 64.9883 52.7937Z" fill="white" />
      <path d="M89.5215 21.6337H92.4615V24.8631H89.5215V21.6337ZM89.8109 31.2815H92.1722V55.8785H89.8109V31.2815Z" fill="white" />
      <path d="M97.752 52.7937L99.1525 50.9128C101.855 52.9847 104.842 54.1422 107.978 54.1422C111.306 54.1422 113.911 52.3076 113.911 49.4659V49.3675C113.911 46.4738 110.826 45.4146 107.4 44.4481C103.395 43.2906 98.9615 42.0868 98.9615 37.6941V37.5957C98.9615 33.6428 102.289 30.7954 107.064 30.7954C110.004 30.7954 113.332 31.8545 115.792 33.4981L114.536 35.4775C112.267 33.9843 109.57 33.0178 106.966 33.0178C103.592 33.0178 101.369 34.8524 101.369 37.3121V37.4105C101.369 40.1596 104.697 41.1724 108.216 42.1852C112.169 43.2964 116.318 44.7433 116.318 49.0839V49.1823C116.318 53.5692 112.556 56.3704 107.828 56.3704C104.263 56.3646 100.356 54.9177 97.752 52.7937Z" fill="white" />
      <path d="M122.1 49.5643V33.4519H118.529V31.2816H122.1V23.4221H124.462V31.2816H133.096V33.4519H124.462V49.3213C124.462 52.8401 126.533 54.096 129.381 54.096C130.585 54.096 131.598 53.8529 132.998 53.2278V55.4445C131.742 56.0232 130.538 56.3126 128.993 56.3126C125.185 56.3126 122.1 54.2407 122.1 49.5643Z" fill="white" />
      <path d="M0 27.265V22.1546H4.93675V27.265H0ZM4.93675 31.4841V55.8843H0V31.4841H4.93675Z" fill="white" />
      <path d="M152.744 5.0294C152.744 7.80741 150.493 10.0587 147.715 10.0587C144.937 10.0587 142.686 7.80741 142.686 5.0294C142.686 2.25139 144.937 0 147.715 0C150.487 0 152.744 2.25139 152.744 5.0294Z" fill="white" />
      <path d="M142.727 21.7205V28C142.756 30.7027 144.989 32.8846 147.739 32.8846C150.488 32.8846 152.727 30.7027 152.751 28V21.7205H142.727ZM152.154 27.8553V28.081C152.131 30.4423 150.152 32.3638 147.75 32.3638C145.343 32.3638 143.369 30.4423 143.346 28.081V27.919V22.4266H152.166V27.8553H152.154Z" fill="white" />
    </svg>
  );
}

// ── Shared sidebar ────────────────────────────────────────────────────────────

function BrandSidebar() {
  return (
    <aside className="provider-sidebar">
      <div className="provider-sidebar__logo">
        <IAssistLogo />
      </div>
      <div className="provider-sidebar__illustration">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/a4826c434ed1dd6a529572eafddc92418cee2e88?width=928"
          alt="iAssist illustration"
        />
      </div>
      <div className="provider-sidebar__footer">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/43a31f0116d6fcfd042b6234bd85d7fff2c5a73b?width=468"
          alt="AssistRx"
        />
      </div>
    </aside>
  );
}

// ── PA info summary (shared between step 2 and 3) ─────────────────────────────

const PA_INFO_ITEMS = [
  { label: "MEDICATION",          value: "Dupixent (Dupilumab) Injection • NDC: 000245918", done: true },
  { label: "MEDICATION DETAILS",  value: "100mg pre filled Pen",                             done: true },
  { label: "PATIENT",             value: "Keanu Dixon • 09/19/1981",                         done: true },
  { label: "PRESCRIBER",         value: "LESLIE PATTERSON, PTA",                            done: true },
  { label: "INSURANCE",          value: "CERT PBM-B",                                       done: true },
  { label: "PHARMACY",           value: "CoAssist Pharmacy • 2400 SAND LAKE RD STE 200 ORLANDO, FL 32809\nPhone (855) 382-2533 • Fax: (833) 596-2174", done: true },
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
  const [npi, setNpi] = useState("");
  const [pin, setPin] = useState("");

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
          question="Does the patient have the diagnosis of Keratosis Follicularis?"
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

function PaQuestionsStep({ onBack, onCancel }: { onBack: () => void; onCancel: () => void }) {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [comments, setComments] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
  }

  return (
    <main className="provider-content provider-content--pa">
      <p className="pa-section-title">Electronic Prior Authorization</p>
      <PaSummaryTable />

      <div className="pa-questions-section">
        <RadioQuestion
          question="Does the patient have the diagnosis of Keratosis Follicularis?"
          value={q1}
          onChange={setQ1}
        />
        <RadioQuestion
          question="Does the patient have the diagnosis of Acne Vulgaris?"
          value={q2}
          onChange={setQ2}
        />
        <RadioQuestion
          question="Has the physician considered using therapies of Salicylic Acid Products (e.g, Clearasil, Stri-Dex) Benzoyl Peroxide products (e.g, Oxy-10, Benzac AC, Triaz) but deemed all of them inappropriate for the patient?"
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

        <div className="pa-save-row">
          <button onClick={handleSave} className={`pa-btn-save ${saved ? "pa-btn-save--saved" : ""}`}>
            {saved ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4.75502 12.2376L0.205017 7.68643C-0.0683389 7.41301 -0.0683389 6.96967 0.205017 6.69622L1.19494 5.706C1.4683 5.43255 1.91154 5.43255 2.1849 5.706L5.25 8.77189L11.8151 2.20507C12.0885 1.93164 12.5317 1.93164 12.8051 2.20507L13.795 3.19529C14.0683 3.46872 14.0683 3.91205 13.795 4.1855L5.74498 12.2377C5.47159 12.5111 5.02838 12.5111 4.75502 12.2376Z" fill="#007178" />
              </svg>
            ) : null}
          </button>
        </div>
      </div>

      <div className="pa-nav-row">
        <button onClick={onCancel} className="pa-btn-tertiary">Cancel</button>
        <div className="pa-nav-actions">
          <button onClick={onBack} className="pa-btn-secondary">Back</button>
          <button className="pa-btn-primary">Next</button>
        </div>
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
      {step === "login" && <LoginStep onSubmit={() => setStep("pa-review")} />}
      {step === "pa-review" && <PaReviewStep onNext={() => setStep("pa-questions")} />}
      {step === "pa-questions" && (
        <PaQuestionsStep
          onBack={() => setStep("pa-review")}
          onCancel={() => setStep("login")}
        />
      )}
    </div>
  );
}
