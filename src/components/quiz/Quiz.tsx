"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOCATIONS } from "@/lib/locations";
import { trackLead } from "@/lib/analytics";

type State = {
  goals?: string[];
  blocker?: string;
  timing?: string;
  location?: string;
  name?: string;
  email?: string;
  phone?: string;
};

const GOALS = [
  { id: "strong", label: "Feel strong and confident in my body" },
  { id: "fatloss", label: "Lose the weight — and keep it off" },
  { id: "mobility", label: "Move better, fix old injuries" },
  { id: "energy", label: "More energy, better sleep, less stress" },
  { id: "performance", label: "Train for a sport or specific event" },
  { id: "habit", label: "Build a consistent training habit" },
];

const BLOCKERS = [
  { id: "intimidated", label: "Big-box gyms intimidate me" },
  { id: "form", label: "I'm not sure I'm doing it right" },
  { id: "boredom", label: "I get bored and stop showing up" },
  { id: "time", label: "I don't have time for long workouts" },
  { id: "results", label: "I've tried — I just don't see results" },
  { id: "starting", label: "I don't know where to start" },
];

const TIMING = [
  { id: "thisweek", label: "This week — I'm ready" },
  { id: "twoweeks", label: "Within the next 2 weeks" },
  { id: "month", label: "Sometime in the next month" },
  { id: "exploring", label: "Just exploring for now" },
];

const TOTAL_STEPS = 5;

export function Quiz() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>({});

  useEffect(() => {
    const goalParam = params.get("goal");
    const locationParam = params.get("location");
    const next: State = {};
    if (goalParam) {
      const ids = goalParam.split(",").filter((id) => GOALS.some((g) => g.id === id));
      if (ids.length) next.goals = ids;
    }
    if (locationParam && LOCATIONS.some((l) => l.slug === locationParam)) {
      next.location = locationParam;
    }
    if (Object.keys(next).length) setState((s) => ({ ...s, ...next }));
    trackLead("quiz_started", { source: params.get("utm_source") || "direct" });
  }, [params]);

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  const advance = (patch: Partial<State>) => {
    const merged = { ...state, ...patch };
    setState(merged);
    trackLead("quiz_step_completed", {
      step: step + 1,
      ...Object.fromEntries(
        Object.entries(patch).map(([k, v]) => [k, Array.isArray(v) ? v.join(",") : v])
      ),
    });
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async (patch: Partial<State>) => {
    const final = { ...state, ...patch };
    setState(final);
    const payload = {
      ...final,
      goals: final.goals?.join(",") || "",
    };
    trackLead("lead_submitted", payload as Record<string, string>);
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(final),
    }).catch(() => {});
    const qs = new URLSearchParams({
      location: final.location || "",
      goals: final.goals?.join(",") || "",
    }).toString();
    router.push(`/thank-you?${qs}`);
  };

  const toggleGoal = (id: string) => {
    const cur = state.goals || [];
    const next = cur.includes(id) ? cur.filter((g) => g !== id) : [...cur, id];
    setState((s) => ({ ...s, goals: next }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <div className="eyebrow eyebrow-neon">Step {Math.min(step + 1, TOTAL_STEPS)} of {TOTAL_STEPS}</div>
          <div className="text-xs text-muted-dark">{progress}%</div>
        </div>
        <div className="h-1 w-full bg-line-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-neon)] transition-all duration-300"
            style={{ width: `${progress}%`, boxShadow: "0 0 18px var(--color-neon-glow)" }}
          />
        </div>
      </div>

      {step === 0 && (
        <StepBlock
          title="What are your training goals?"
          subtitle="Pick everything that matters. We'll build the program around it."
        >
          {GOALS.map((g) => (
            <MultiOption
              key={g.id}
              selected={(state.goals || []).includes(g.id)}
              onClick={() => toggleGoal(g.id)}
            >
              {g.label}
            </MultiOption>
          ))}
          <NextButton
            disabled={!(state.goals && state.goals.length > 0)}
            onClick={() => advance({ goals: state.goals })}
          />
        </StepBlock>
      )}

      {step === 1 && (
        <StepBlock
          title="What's held you back from getting there?"
          subtitle="Be honest. The right coach starts here."
        >
          {BLOCKERS.map((b) => (
            <OptionButton
              key={b.id}
              selected={state.blocker === b.id}
              onClick={() => advance({ blocker: b.id })}
            >
              {b.label}
            </OptionButton>
          ))}
          <BackButton onClick={back} />
        </StepBlock>
      )}

      {step === 2 && (
        <StepBlock
          title="When do you want to start?"
          subtitle="No pressure — just helps us know how to follow up."
        >
          {TIMING.map((t) => (
            <OptionButton
              key={t.id}
              selected={state.timing === t.id}
              onClick={() => advance({ timing: t.id })}
            >
              {t.label}
            </OptionButton>
          ))}
          <BackButton onClick={back} />
        </StepBlock>
      )}

      {step === 3 && (
        <StepBlock
          title="Which location is closest?"
          subtitle="Pick the studio you'd actually train at."
        >
          {LOCATIONS.filter((l) => l.status === "open").map((l) => (
            <OptionButton
              key={l.slug}
              selected={state.location === l.slug}
              onClick={() => advance({ location: l.slug })}
            >
              <div className="flex justify-between items-center w-full">
                <span>{l.city}</span>
                <span className="text-sm text-muted-dark font-body normal-case tracking-normal">
                  {l.address}
                </span>
              </div>
            </OptionButton>
          ))}
          <OptionButton
            selected={state.location === "kelowna"}
            onClick={() => advance({ location: "kelowna" })}
          >
            <div className="flex justify-between items-center w-full">
              <span>Kelowna</span>
              <span className="text-sm text-neon">Waitlist</span>
            </div>
          </OptionButton>
          <BackButton onClick={back} />
        </StepBlock>
      )}

      {step === 4 && (
        <ContactForm initial={state} onBack={back} onSubmit={submit} />
      )}
    </div>
  );
}

function StepBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="reveal">
      <h1 className="h-display text-3xl md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-dark">{subtitle}</p>}
      <div className="mt-8 grid gap-3">{children}</div>
    </div>
  );
}

function OptionButton({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border p-5 transition-all font-display tracking-tight text-lg uppercase cursor-pointer
        ${selected
          ? "border-neon bg-[rgba(0,180,255,0.08)] neon-box-glow"
          : "border-line-dark bg-[var(--color-ink-2)] hover:border-neon"
        }`}
    >
      {children}
    </button>
  );
}

function MultiOption({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border p-5 transition-all font-display tracking-tight text-lg uppercase cursor-pointer flex items-center gap-4
        ${selected
          ? "border-neon bg-[rgba(0,180,255,0.08)] neon-box-glow"
          : "border-line-dark bg-[var(--color-ink-2)] hover:border-neon"
        }`}
    >
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded shrink-0 border transition-colors
          ${selected ? "bg-[var(--color-neon)] border-[var(--color-neon)]" : "border-[var(--color-line-dark)]"}`}
      >
        {selected && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L6 11L12 3" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="flex-1">{children}</span>
    </button>
  );
}

function NextButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-neon mt-4 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Continue →
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 text-sm text-muted-dark hover:text-neon transition-colors cursor-pointer"
    >
      ← Back
    </button>
  );
}

function ContactForm({
  initial,
  onBack,
  onSubmit,
}: {
  initial: State;
  onBack: () => void;
  onSubmit: (patch: Partial<State>) => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState(initial.name || "");
  const [email, setEmail] = useState(initial.email || "");
  const [phone, setPhone] = useState(initial.phone || "");

  const valid =
    name.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    phone.trim().length >= 7;

  return (
    <StepBlock
      title="How can we reach you?"
      subtitle="A coach will text or email within 5 minutes to lock in your session."
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!valid || submitting) return;
          setSubmitting(true);
          await onSubmit({ name, email, phone });
        }}
        className="grid gap-4"
      >
        <Field label="Full name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
            autoComplete="name"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
            autoComplete="email"
          />
        </Field>
        <Field label="Phone (for the 5-min text)">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            required
            autoComplete="tel"
          />
        </Field>
        <button
          type="submit"
          disabled={!valid || submitting}
          className="btn-neon mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? "Booking…" : "Claim My Free Session →"}
        </button>
        <p className="text-xs text-muted-dark mt-1">
          By submitting you agree to be contacted by a Westcore coach about your free session.
        </p>
      </form>
      <BackButton onClick={onBack} />

      <style>{`
        .input {
          width: 100%;
          background: var(--color-ink-2);
          border: 1px solid var(--color-line-dark);
          border-radius: 8px;
          padding: 0.95rem 1rem;
          color: var(--color-on-dark);
          font-family: var(--font-body);
          font-size: 1rem;
        }
        .input:focus { outline: none; border-color: var(--color-neon); box-shadow: 0 0 0 3px rgba(0,180,255,0.18); }
      `}</style>
    </StepBlock>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-dark font-medium">{label}</span>
      {children}
    </label>
  );
}
