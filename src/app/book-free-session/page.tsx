import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Quiz } from "@/components/quiz/Quiz";

export const metadata = {
  title: "Claim Your Free Intro Session",
  description:
    "Free 30-minute intro session with a Westcore coach. Pick your location, your goal, and your time.",
};

export default function BookPage() {
  return (
    <>
      <Nav />
      <main className="container-x py-16 md:py-24 min-h-[70vh]">
        <Suspense fallback={<div className="text-[color:var(--color-fg-muted)]">Loading…</div>}>
          <Quiz />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
