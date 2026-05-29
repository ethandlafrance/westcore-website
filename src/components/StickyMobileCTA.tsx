import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-line-dark bg-[var(--color-ink)]/95 backdrop-blur px-4 py-3">
      <Link href="/book-free-session" className="btn-neon w-full">
        Claim Free Session
      </Link>
    </div>
  );
}
