import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { LOCATIONS } from "@/lib/locations";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach Westcore Training Centre. Five BC locations, click-to-call, or send us a message. We respond within minutes.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="surface-dark relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at 70% 20%, rgba(0,180,255,0.30), transparent 55%), linear-gradient(180deg, #06070C, #06070C)",
            }}
          />
          <div className="container-x pt-20 pb-12 md:pt-24 reveal">
            <div className="eyebrow eyebrow-neon mb-5">Reach Us</div>
            <h1 className="h-display text-6xl md:text-8xl">
              GET IN<br />
              <span className="neon-glow text-neon">TOUCH.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-dark">
              Five locations across BC. Pick the one closest to you and we&apos;ll get back
              to you within minutes.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 max-w-3xl">
              <QuickAction
                title="Book A Session"
                sub="Free 30-min intro"
                href="/book-free-session"
                primary
              />
              <QuickAction
                title="DM Us"
                sub="@westcore_training"
                href="https://www.instagram.com/westcore_training/"
                external
              />
              <QuickAction
                title="Find A Location"
                sub="Five across BC"
                href="#locations"
              />
            </div>
          </div>
          <Marquee />
        </section>

        {/* Locations grid */}
        <section id="locations" className="surface-paper section">
          <div className="container-x">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <div>
                <div className="eyebrow text-deep mb-5">Five BC Locations</div>
                <h2 className="h-display text-4xl md:text-6xl">
                  PICK YOUR<br />NEAREST POD.
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {LOCATIONS.map((l) => (
                <article
                  key={l.slug}
                  className="border border-line-light bg-[var(--color-paper-2)] p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-3xl uppercase">{l.city}</h3>
                    {l.status === "comingSoon" && (
                      <span className="text-xs font-semibold tracking-widest uppercase text-deep border border-deep px-2 py-1 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>

                  {l.status === "open" ? (
                    <>
                      <div className="text-sm text-muted-light mb-1">
                        {l.address}
                        <br />
                        {l.city}, BC {l.postal}
                      </div>
                      <a
                        href={l.phoneHref}
                        className="font-display text-2xl text-deep mt-3"
                      >
                        {l.phone}
                      </a>

                      <div className="mt-6 flex flex-wrap gap-2 mt-auto pt-6">
                        <Link
                          href={`/book-free-session?location=${l.slug}`}
                          className="btn-ghost-light !py-2 !px-4 !text-[11px]"
                        >
                          Free Session
                        </Link>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `Westcore Training Centre ${l.address} ${l.city} BC`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost-light !py-2 !px-4 !text-[11px]"
                        >
                          Directions
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-muted-light italic">
                        Opening soon. Join the founder&apos;s list and lock in early-member
                        pricing before the doors open.
                      </div>
                      <div className="mt-6 mt-auto pt-6">
                        <Link
                          href={`/book-free-session?location=${l.slug}`}
                          className="btn-ghost-light !py-2 !px-4 !text-[11px]"
                        >
                          Join Waitlist
                        </Link>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="surface-dark section relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at 20% 80%, rgba(0,180,255,0.22), transparent 60%)",
            }}
          />
          <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="eyebrow eyebrow-neon mb-5">Send A Message</div>
              <h2 className="h-display text-4xl md:text-6xl">
                NOT READY TO BOOK?<br />
                <span className="text-neon">JUST SAY HI.</span>
              </h2>
              <p className="mt-5 text-muted-dark max-w-md">
                Quick question, partnership inquiry, or want to chat before you come in?
                Drop a line — we read every message.
              </p>
              <div className="mt-10 grid gap-3">
                <ContactSummaryRow label="Instagram" value="@westcore_training" />
                <ContactSummaryRow label="Service Area" value="British Columbia · Canada" />
                <ContactSummaryRow label="Response Time" value="Usually within minutes" />
                <ContactSummaryRow label="Best For" value="Inquiries, partnerships, press" />
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function QuickAction({
  title,
  sub,
  href,
  external,
  primary,
}: {
  title: string;
  sub: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}) {
  const className = `block rounded-lg border p-5 transition-colors ${
    primary
      ? "border-neon bg-[rgba(0,180,255,0.10)] hover:bg-[rgba(0,180,255,0.18)]"
      : "border-line-dark bg-[var(--color-ink-2)] hover:border-neon"
  }`;
  const content = (
    <>
      <div className={`font-display text-xl uppercase ${primary ? "text-neon" : ""}`}>
        {title}
      </div>
      <div className="text-sm text-muted-dark mt-1">{sub}</div>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function ContactSummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line-dark pb-2">
      <span className="text-xs uppercase tracking-widest text-muted-dark">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
