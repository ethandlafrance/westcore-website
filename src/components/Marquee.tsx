const ITEMS = [
  "★ 4.7 RATING",
  "5 BC LOCATIONS",
  "PRIVATE TRAINING PODS",
  "TABLET-LED PROGRAMS",
  "REAL COACHES",
  "FREE INTRO SESSION",
  "NO BIG-BOX BS",
];

export function Marquee() {
  const items = [...ITEMS, ...ITEMS]; // double for seamless loop
  return (
    <div className="surface-neon border-y border-line-dark py-3 overflow-hidden">
      <div className="marquee-track font-display text-sm tracking-wider">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            <span>{t}</span>
            <span className="opacity-60">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
