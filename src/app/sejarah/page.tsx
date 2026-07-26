import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/history/CinematicHero";
import { IntroStory } from "@/components/history/IntroStory";
import { ImmersiveTimeline } from "@/components/history/ImmersiveTimeline";
import { HistoricalFigures } from "@/components/history/HistoricalFigures";
import { GurindamExperience } from "@/components/history/GurindamExperience";
import { FunFacts } from "@/components/history/FunFacts";
import { BeforeAfterSlider } from "@/components/history/BeforeAfterSlider";
import { MasonryGallery } from "@/components/history/MasonryGallery";
import { MiniHistoryMap } from "@/components/history/MiniHistoryMap";
import { QuoteSection } from "@/components/history/QuoteSection";
import { CallToAction } from "@/components/history/CallToAction";
import { GurindamSplitSection } from "@/components/history/GurindamSplitSection";

export const metadata: Metadata = {
  title: "Sejarah Pulau Penyengat | Digital Museum",
  description: "Jelajahi sejarah panjang Kerajaan Melayu Riau-Lingga melalui pengalaman museum digital yang imersif.",
  openGraph: {
    title: "Sejarah Pulau Penyengat",
    description: "Digital Museum Experience Pulau Penyengat",
    type: "website",
  },
};

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white overflow-x-hidden">
        <CinematicHero />
        <GurindamSplitSection />
        <IntroStory />
        <ImmersiveTimeline />
        <BeforeAfterSlider />
        <GurindamExperience />
        <FunFacts />
        <HistoricalFigures />
        <MiniHistoryMap />
        <MasonryGallery />
        <QuoteSection />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
