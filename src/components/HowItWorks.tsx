const steps = [
  {
    n: "01",
    title: "Book your free session",
    body: "Tell us your goal and pick your location. 60 seconds. No card. No commitment.",
  },
  {
    n: "02",
    title: "Meet your coach",
    body: "30 minutes. Movement screen, goal-setting, and a walkthrough of how the pods work.",
  },
  {
    n: "03",
    title: "Train. Track. Repeat.",
    body: "Every session loaded on your tablet. Numbers logged. Coach in your corner.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="surface-dark section relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(0,180,255,0.18), transparent 60%)",
        }}
      />
      <div className="container-x">
        <div className="eyebrow eyebrow-neon mb-5">How It Works</div>
        <h2 className="h-display text-5xl md:text-7xl">
          THREE STEPS.<br />
          <span className="neon-glow text-neon">ZERO GUESSWORK.</span>
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-3 relative">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div
                className="h-display absolute -top-6 -left-2 select-none pointer-events-none"
                style={{
                  fontSize: "10rem",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(0,180,255,0.35)",
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div className="relative pt-20">
                <div className="font-display text-2xl md:text-3xl uppercase max-w-[14ch]">
                  {s.title}
                </div>
                <p className="mt-4 text-base text-muted-dark">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
