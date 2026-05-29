import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { PodSection } from "@/components/PodSection";
import { HowItWorks } from "@/components/HowItWorks";
import { LocationsGrid } from "@/components/LocationsGrid";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PodSection />
        <HowItWorks />
        <LocationsGrid />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
