"use client";

import { useState, useEffect } from "react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md"
      style={{
        background: "linear-gradient(180deg, rgba(6,7,12,0.95), rgba(6,7,12,0.78))",
        borderBottom: "1px solid rgba(0,180,255,0.18)",
      }}
    >
      <div className="container-x flex items-center justify-between gap-4 py-4 md:py-5">
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

        {/* Desktop nav — 768px and up */}
        <nav className="hidden md:flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[12px] lg:text-[13px] font-semibold tracking-wide uppercase">
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

        {/* Mobile hamburger — below 768px */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex flex-col items-center justify-center w-10 h-10 cursor-pointer"
        >
          <span
            className="block w-6 h-[2px] bg-white origin-center transition-transform duration-300 ease-out"
            style={{ transform: open ? "translateY(1px) rotate(45deg)" : "translateY(-4px) rotate(0)" }}
          />
          <span
            className="block w-6 h-[2px] bg-white origin-center transition-transform duration-300 ease-out"
            style={{ transform: open ? "translateY(-1px) rotate(-45deg)" : "translateY(4px) rotate(0)" }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "var(--color-ink)",
          borderTop: open ? "1px solid var(--color-line-dark)" : "none",
        }}
      >
        <nav className="container-x py-5 flex flex-col">
          {TEXT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3.5 border-b border-line-dark text-base font-semibold tracking-wide uppercase hover:text-neon"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-5 grid gap-3">
            <Link
              href="/book-free-session"
              onClick={() => setOpen(false)}
              className="btn-neon w-full"
            >
              Claim Free Session
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-ghost-dark w-full"
            >
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
