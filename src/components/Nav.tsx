import Link from "next/link";
import Image from "next/image";

const TEXT_LINKS = [
  { href: "/#pods", label: "Pods" },
  { href: "/#how", label: "How It Works" },
  { href: "/#locations", label: "Locations" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "linear-gradient(180deg, rgba(6,7,12,0.95), rgba(6,7,12,0.78))",
        borderBottom: "1px solid rgba(0,180,255,0.18)",
      }}
    >
      <div className="container-x flex items-center justify-between gap-4 py-4 md:py-5 flex-wrap">
        <Link href="/" className="flex items-center shrink-0" aria-label="Westcore Training Centre — Home">
          <Image
            src="/logo.avif"
            alt="Westcore Training Centre"
            width={220}
            height={60}
            priority
            className="block h-12 md:h-14 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[12px] sm:text-[13px] font-semibold tracking-wide uppercase">
          {TEXT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="relative nav-link">
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-1">
            <Link href="/book-free-session" className="btn-neon !py-2 !px-3.5 !text-[11px]">
              Claim Free Session
            </Link>
            <Link href="/contact" className="btn-ghost-dark !py-2 !px-3.5 !text-[11px]">
              Contact Us
            </Link>
          </div>
        </nav>
      </div>

      <style>{`
        .nav-link {
          color: #FFFFFF;
          transition: color 180ms ease;
          white-space: nowrap;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 220ms ease;
        }
        .nav-link:hover::after { transform: scaleX(1); }
      `}</style>
    </header>
  );
}
