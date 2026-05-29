"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getLocation } from "@/lib/locations";

export function ThankYouContent() {
  const params = useSearchParams();
  const location = getLocation(params.get("location") || "");

  return (
    <div className="max-w-2xl mx-auto reveal">
      <div className="eyebrow eyebrow-neon mb-5">★ ★ ★ ★ ★ Confirmed</div>
      <h1 className="h-display text-5xl md:text-7xl">
        YOU&apos;RE IN.<br />
        <span className="neon-glow text-neon">WE&apos;LL TEXT YOU IN 5 MIN.</span>
      </h1>
      <p className="mt-6 text-lg text-muted-dark">
        Your free intro session is locked in. A coach{location ? ` from ${location.city}` : ""} will reach out shortly to confirm your time.
      </p>

      <div className="mt-10 grid gap-4 rounded-lg border border-line-dark bg-[var(--color-ink-2)] p-6">
        <div className="eyebrow eyebrow-neon">What Happens Next</div>
        <ol className="space-y-3">
          <li className="flex gap-3"><span className="font-display text-neon">01.</span>Text from a Westcore coach (within 5 min)</li>
          <li className="flex gap-3"><span className="font-display text-neon">02.</span>60-second back-and-forth to lock the time</li>
          <li className="flex gap-3"><span className="font-display text-neon">03.</span>Show up. Train. No card needed.</li>
        </ol>
      </div>

      {location && location.phone && (
        <div className="mt-10 text-center">
          <div className="text-sm text-muted-dark">Don&apos;t want to wait?</div>
          <a href={location.phoneHref} className="font-display text-3xl text-neon tracking-tight neon-glow">
            Call {location.phone}
          </a>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/" className="btn-ghost-dark">← Back to home</Link>
      </div>
    </div>
  );
}
