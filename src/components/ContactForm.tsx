"use client";

import { useState } from "react";
import { LOCATIONS } from "@/lib/locations";
import { trackLead } from "@/lib/analytics";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const valid =
    name.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    message.trim().length >= 5;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    const payload = { type: "contact", name, email, phone, location, message };
    trackLead("lead_submitted", payload as Record<string, string>);
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-neon bg-[rgba(0,180,255,0.06)] neon-box-glow p-8">
        <div className="eyebrow eyebrow-neon mb-4">★ ★ ★ ★ ★ Sent</div>
        <h3 className="h-display text-3xl md:text-4xl">GOT IT.</h3>
        <p className="mt-3 text-muted-dark">
          We&apos;ll get back to you within minutes — check your phone or email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="cf-input"
            required
            autoComplete="name"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="cf-input"
            required
            autoComplete="email"
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone (optional)">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="cf-input"
            autoComplete="tel"
          />
        </Field>
        <Field label="Closest location (optional)">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="cf-input"
          >
            <option value="">— Pick one —</option>
            {LOCATIONS.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.city}
                {l.status === "comingSoon" ? " (coming soon)" : ""}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Message">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="cf-input"
          required
          placeholder="Tell us what you're looking for…"
        />
      </Field>
      <button
        type="submit"
        disabled={!valid || submitting}
        className="btn-neon mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Send Message →"}
      </button>
      <p className="text-xs text-muted-dark">
        We typically respond within minutes during business hours.
      </p>

      <style>{`
        .cf-input {
          width: 100%;
          background: var(--color-ink-2);
          border: 1px solid var(--color-line-dark);
          border-radius: 8px;
          padding: 0.9rem 1rem;
          color: var(--color-on-dark);
          font-family: var(--font-body);
          font-size: 1rem;
        }
        .cf-input:focus {
          outline: none;
          border-color: var(--color-neon);
          box-shadow: 0 0 0 3px rgba(0,180,255,0.18);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-dark font-medium">
        {label}
      </span>
      {children}
    </label>
  );
}
