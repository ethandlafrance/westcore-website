import Link from "next/link";
import { LOCATIONS } from "@/lib/locations";

export function LocationsGrid() {
  return (
    <section id="locations" className="surface-paper section">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="eyebrow text-deep mb-5">Five Locations Across BC</div>
            <h2 className="h-display text-5xl md:text-7xl">
              TRAIN CLOSE<br />TO HOME.
            </h2>
          </div>
          <Link href="/book-free-session" className="btn-ghost-light">
            Find Your Pod →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((l) => {
            const isOpen = l.status === "open";
            return (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="group relative flex flex-col border border-line-light bg-[var(--color-paper-2)] p-7 transition-all hover:border-deep hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(26,61,184,0.5)]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="font-display text-3xl md:text-4xl uppercase">
                    {l.city}
                  </div>
                  {!isOpen && (
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-deep border border-deep px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </div>

                {isOpen ? (
                  <>
                    <div className="text-sm text-muted-light leading-relaxed">
                      {l.address}
                      <br />
                      {l.city}, BC {l.postal}
                    </div>
                    <div className="mt-4 font-display text-xl text-deep tracking-wide">
                      {l.phone}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-light italic leading-relaxed">
                    Opening soon. Join the founder&apos;s list and lock in early-member
                    pricing.
                  </div>
                )}

                <div className="mt-auto pt-8 flex items-center justify-between">
                  <span className="font-display text-sm tracking-widest uppercase text-deep">
                    {isOpen ? "View Location" : "Join Waitlist"}
                  </span>
                  <span className="text-2xl text-deep transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
