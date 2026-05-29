/**
 * One unified event for every conversion. Wire to GA4 + Meta Pixel
 * once Westcore provides the IDs. Until then the events fire to console
 * so we can demo attribution in DevTools during the interview.
 */

type LeadStage =
  | "cta_clicked"
  | "quiz_started"
  | "quiz_step_completed"
  | "lead_submitted";

type LeadPayload = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLead(stage: LeadStage, payload: LeadPayload = {}) {
  if (typeof window === "undefined") return;
  const body = { stage, ts: Date.now(), ...payload };
  console.log("[westcore:lead]", body);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: stage, ...body });
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", stage, body);
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", stage, body);
  }
}
