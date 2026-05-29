const features = [
  {
    n: "01",
    title: "Private",
    body: "Your own training pod. No fighting for equipment. No one watching. No one waiting.",
  },
  {
    n: "02",
    title: "Programmed",
    body: "Every session on a tablet, built for your body, your goal, your schedule. Show up. Train. Done.",
  },
  {
    n: "03",
    title: "Coached",
    body: "A real coach who knows your name, your numbers, and where you were the week before.",
  },
];

export function PodSection() {
  return (
    <section id="pods" className="surface-paper section">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="eyebrow text-deep mb-5">The Pod Difference</div>
            <h2 className="h-display text-5xl md:text-7xl max-w-3xl">
              THIS ISN&apos;T A GYM.<br />
              <span className="text-deep">IT&apos;S YOUR POD.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-base text-muted-light">
            Big-box gyms sell access. We sell results. A semi-private pod gives you
            the focus of 1-on-1 with the accountability of a real program — at a
            price that makes sense.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-[color:var(--color-line-light)] border border-line-light">
          {features.map((f) => (
            <div
              key={f.n}
              className="surface-paper p-8 md:p-12 grid md:grid-cols-[120px_1fr_1.5fr] gap-6 md:gap-12 items-start"
            >
              <div className="font-display text-6xl md:text-7xl text-deep">{f.n}</div>
              <div className="font-display text-3xl md:text-4xl uppercase">{f.title}</div>
              <p className="text-lg text-muted-light">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
