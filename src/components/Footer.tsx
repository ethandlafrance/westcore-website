import Link from "next/link";
import Image from "next/image";
import { LOCATIONS } from "@/lib/locations";

export function Footer() {
  return (
    <footer id="contact" className="surface-dark-2 border-t border-line-dark">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/logo.avif"
            alt="Westcore Training Centre"
            width={240}
            height={64}
            className="block h-14 w-auto -ml-2"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="mt-4 text-muted-dark max-w-md">
            Semi-private personal training in private workout pods. Five BC locations.
            One simple promise: real coaching, real results.
          </p>
          <Link href="/book-free-session" className="btn-neon mt-7">
            Claim Free Session
          </Link>
        </div>
        <div>
          <div className="eyebrow eyebrow-neon mb-4">Locations</div>
          <ul className="space-y-2.5 text-sm">
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="hover:text-neon transition-colors">
                  {l.city}
                  {l.status === "comingSoon" && (
                    <span className="ml-2 text-xs text-muted-dark">(soon)</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow eyebrow-neon mb-4">Company</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/#pods" className="hover:text-neon transition-colors">The Pods</Link></li>
            <li><Link href="/#how" className="hover:text-neon transition-colors">How It Works</Link></li>
            <li><Link href="/#faq" className="hover:text-neon transition-colors">FAQ</Link></li>
            <li><Link href="/book-free-session" className="hover:text-neon transition-colors">Free Intro</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark py-5 text-center text-xs text-muted-dark">
        © {new Date().getFullYear()} Westcore Training Centre. All rights reserved.
      </div>
    </footer>
  );
}
