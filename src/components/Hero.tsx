import Link from "next/link";
import { Marquee } from "./Marquee";

const POSTER_URL =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=2000&q=80&auto=format";

export function Hero() {
  return (
    <section
      className="surface-dark relative overflow-hidden isolate"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "75% center" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER_URL}
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(6,7,12,0.88) 0%, rgba(6,7,12,0.70) 38%, rgba(6,7,12,0.35) 72%, rgba(6,7,12,0.18) 100%),
            linear-gradient(180deg, rgba(6,7,12,0.0) 0%, rgba(6,7,12,0.06) 35%, rgba(6,7,12,0.32) 60%, rgba(6,7,12,0.72) 85%, rgba(6,7,12,1) 100%),
            radial-gradient(ellipse at 78% 25%, rgba(0,180,255,0.28), transparent 55%)
          `,
        }}
      />

      <div className="container-x relative pt-20 pb-24 md:pt-28 md:pb-36 reveal" style={{ zIndex: 1 }}>
        <div className="eyebrow eyebrow-neon mb-6">★ 4.7 across BC · 5 locations</div>
        <h1 className="h-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block whitespace-nowrap">NOT A GYM.</span>
          <span className="block whitespace-nowrap text-neon neon-glow">A POD.</span>
          <span className="block whitespace-nowrap">A COACH.</span>
          <span className="block whitespace-nowrap">A PLAN.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted-dark">
          Personal training built around <em>your</em> body, your goal, your schedule —
          delivered in a private pod with a coach who actually remembers your numbers.
          No mirror walls. No bro energy. No commitment.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/book-free-session" className="btn-neon">
            Claim Your Free Session →
          </Link>
          <Link href="/contact" className="btn-ghost-dark">
            Contact Us
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-dark">
          <span>No credit card</span>
          <span className="text-neon">/</span>
          <span>30-minute session</span>
          <span className="text-neon">/</span>
          <span>Real coach, real pod</span>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
