// TODO: Replace placeholder copy with real Google/Fresha reviews before launch.
const reviews = [
  {
    quote:
      "I joined to lose 20 lbs and ended up loving the training. Having my own pod made all the difference — no waiting, no eyes on me, just work.",
    name: "Member, Victoria",
  },
  {
    quote:
      "My coach actually knows my numbers from week to week. Felt like a real program for the first time in my life.",
    name: "Member, Sidney",
  },
  {
    quote:
      "I tried 3 big-box gyms before this. The semi-private pod model is exactly what I didn't know I needed.",
    name: "Member, Surrey",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="surface-neon section relative overflow-hidden">
      <div className="container-x">
        <div className="font-display text-7xl md:text-9xl leading-none">
          ★★★★★
        </div>
        <h2 className="h-display text-4xl md:text-6xl mt-4 max-w-4xl">
          MEMBERS DON&apos;T JUST SHOW UP.<br />
          THEY KEEP COMING BACK.
        </h2>
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-[var(--color-ink)]/15 border border-[var(--color-ink)]/30 rounded-full px-3 py-1.5">
          <span>Sample layout — swap in real Google / Fresha reviews</span>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className="bg-[var(--color-ink)] text-[var(--color-on-dark)] p-7 rounded-md"
            >
              <div className="font-display text-2xl text-neon">0{i + 1}</div>
              <blockquote className="mt-4 text-lg leading-relaxed">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted-dark">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
