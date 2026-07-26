import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TimelineHistory } from "@/components/home/TimelineHistory";
import { MapTeaser } from "@/components/home/MapTeaser";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TimelineHistory />
        <MapTeaser />
      </main>
      <Footer />
    </>
  );
}
