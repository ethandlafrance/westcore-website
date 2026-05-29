import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LOCATIONS, getLocation } from "@/lib/locations";
import { PodSection } from "@/components/PodSection";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Marquee } from "@/components/Marquee";

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }));
}

type RouteProps = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { city } = await params;
  const l = getLocation(city);
  if (!l) return {};
  return {
    title: `Personal Training in ${l.city}, BC`,
    description: `Semi-private personal training pods in ${l.city}. Coach-led, programmed on a tablet, no crowds. Free intro session.`,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: {
      title: `Westcore Training Centre — ${l.city}`,
      description: `Private workout pods + real coaching in ${l.city}. Free intro session.`,
    },
  };
}

export default async function CityPage({ params }: RouteProps) {
  const { city } = await params;
  const l = getLocation(city);
  if (!l) notFound();

  const isOpen = l.status === "open";

  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: `Westcore Training Centre — ${l.city}`,
    image: "https://westcoretrainingcentre.com/logo.avif",
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: l.city,
      addressRegion: "BC",
      postalCode: l.postal,
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng },
    telephone: l.phone,
    url: `https://westcoretrainingcentre.com/locations/${l.slug}`,
    areaServed: l.city,
  };

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Westcore Training Centre ${l.address} ${l.city} BC`
  )}`;

  return (
    <>
      <Nav />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <section className="surface-dark relative overflow-hidden isolate">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(6,7,12,0.55) 0%, rgba(6,7,12,0.85) 70%, rgba(6,7,12,1) 100%), url('https://images.pexels.com/photos/4587348/pexels-photo-4587348.jpeg?auto=compress&cs=tinysrgb&w=2000')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at top right, rgba(0,180,255,0.30), transparent 55%)" }}
          />
          <div className="container-x relative pt-20 pb-16 md:pt-24 reveal grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            <div>
              <div className="eyebrow eyebrow-neon mb-5">Westcore · {l.city}, BC</div>
              <h1 className="h-display text-5xl md:text-7xl">
                <span className="block whitespace-nowrap">{l.city.toUpperCase()}.</span>
                <span className="block whitespace-nowrap text-neon neon-glow">YOUR POD.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-dark">
                {isOpen
                  ? `Private workout pods, tablet-led programming, and a coach who knows your name — right here at ${l.address}.`
                  : `We're opening soon in ${l.city}. Get on the founder's list and lock in early-member pricing before the doors open.`}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/book-free-session?location=${l.slug}`} className="btn-neon">
                  {isOpen ? "Claim Free Session →" : "Join the Waitlist →"}
                </Link>
                <Link href="/locations" className="btn-ghost-dark">
                  All Locations
                </Link>
              </div>
            </div>

            {/* Single combined contact card (deduplicated) */}
            {isOpen && (
              <aside className="rounded-lg border border-line-dark bg-[rgba(13,15,24,0.85)] backdrop-blur p-1 lg:mt-2">
                <ContactRow label="Address">
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-neon transition-colors"
                  >
                    <div>{l.address}</div>
                    <div className="text-sm text-muted-dark">{l.city}, BC {l.postal}</div>
                    <div className="mt-1 text-xs font-semibold tracking-widest uppercase text-neon">
                      Get directions →
                    </div>
                  </a>
                </ContactRow>
                <Divider />
                <ContactRow label="Call">
                  <a
                    href={l.phoneHref}
                    className="font-display text-2xl text-neon tracking-wide hover:text-[var(--color-neon-2)] transition-colors"
                  >
                    {l.phone}
                  </a>
                </ContactRow>
                <Divider />
                <ContactRow label="Hours">
                  <div className="text-base">By appointment.</div>
                  <a href={l.phoneHref} className="text-sm text-neon hover:text-[var(--color-neon-2)] transition-colors">
                    Call to confirm →
                  </a>
                </ContactRow>
              </aside>
            )}
          </div>
          <Marquee />
        </section>

        <PodSection />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-5">
      <div className="eyebrow eyebrow-neon mb-2">{label}</div>
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--color-line-dark)] mx-5" />;
}
