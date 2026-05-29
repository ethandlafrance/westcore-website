import { Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThankYouContent } from "@/components/ThankYouContent";

export const metadata = {
  title: "You're In — Free Session Booked",
  description: "Your Westcore intro session is on the way. A coach will text you within 5 minutes.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main className="container-x py-16 md:py-24 min-h-[70vh]">
        <Suspense fallback={null}>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

// Server-side conversion event for GA4/Meta server-side tracking can fire here.
