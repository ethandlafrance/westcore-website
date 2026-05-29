import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="surface-dark section relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,180,255,0.32), transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(26,61,184,0.30), transparent 60%)",
        }}
      />
      <div className="container-x text-center">
        <div className="eyebrow eyebrow-neon mb-6 justify-center">Stop Scrolling</div>
        <h2 className="h-display text-6xl md:text-8xl">
          ENOUGH THINKING.<br />
          <span className="neon-glow text-neon">START TRAINING.</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted-dark max-w-xl mx-auto">
          Free intro session. No card. No pressure. Just 30 minutes and a coach.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/book-free-session" className="btn-neon text-base">
            Claim Your Free Session →
          </Link>
        </div>
      </div>
    </section>
  );
}
