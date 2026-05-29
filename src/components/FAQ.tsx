"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What happens in the free intro session?",
    a: "Thirty minutes with a coach. We talk about your goal, do a basic movement screen, walk you through how the pods and programming work, and answer every question you have. No pressure, no card on file.",
  },
  {
    q: "How is this different from a regular personal trainer?",
    a: "You get the structure of 1-on-1 programming, but you train in your own private pod with a coach overseeing 2–3 pods at once. Same coaching attention. A fraction of the cost.",
  },
  {
    q: "Do I need to be in shape to start?",
    a: "No. Most members start nervous, untrained, or coming back after years off. The whole point of the pod is that no one is watching while you learn.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on session frequency and location. Your intro session is free — we cover pricing in person so you know exactly what fits.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. We earn you back every month. If we stop, you stop.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="surface-paper section">
      <div className="container-x max-w-4xl">
        <div className="eyebrow text-deep mb-5">Frequently Asked</div>
        <h2 className="h-display text-5xl md:text-7xl">
          QUESTIONS.<br /><span className="text-deep">ANSWERED.</span>
        </h2>
        <div className="mt-12 divide-y divide-[var(--color-line-light)] border-y border-line-light">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={f.q}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full text-left py-3.5 md:py-4 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-display text-lg md:text-xl uppercase pr-4 group-hover:text-deep transition-colors">
                    {f.q}
                  </span>
                  <span
                    className="text-deep text-2xl leading-none shrink-0 transition-transform duration-300 ease-out"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                  >
                    +
                  </span>
                </div>
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="mt-2 text-base md:text-lg text-muted-light max-w-3xl">{f.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
