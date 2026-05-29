const archetypes = [
  {
    headline: "NEW TO TRAINING?",
    body: "We start with movement, not max weight. The pod means no one sees you while you learn the basics.",
  },
  {
    headline: "BUSY PROFESSIONAL?",
    body: "45-minute sessions. Booked around your calendar. No wasted reps. Walk in, train, walk out.",
  },
  {
    headline: "COMING BACK FROM AN INJURY?",
    body: "We program around what your body can do now — not what it could do five years ago.",
  },
];

export function AudienceSection() {
  return (
    <section className="section border-t border-[var(--color-line)]">
      <div className="container-x">
        <div className="eyebrow mb-4">Who It&apos;s For</div>
        <h2 className="h-display text-4xl md:text-6xl max-w-3xl">
          THE GYM YOU&apos;VE BEEN WAITING FOR.
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {archetypes.map((a) => (
            <div key={a.headline} className="border-l-2 border-accent pl-6">
              <div className="h-display text-2xl">{a.headline}</div>
              <p className="mt-2 text-[color:var(--color-fg-muted)]">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
