import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeritageHero } from "@/components/heritage/HeritageHero";
import { HeritageGrid } from "@/components/heritage/HeritageGrid";

import { FunFacts } from "@/components/history/FunFacts";
import { GurindamExperience } from "@/components/history/GurindamExperience";
import { MasonryGallery } from "@/components/history/MasonryGallery";
import { CallToAction } from "@/components/history/CallToAction";

export const metadata: Metadata = {
  title: "Cagar Budaya | Pulau Penyengat Digital Museum",
  description: "Eksplorasi mahakarya arsitektur, sejarah, dan warisan budaya Pulau Penyengat melalui peta interaktif dan cerita mendalam.",
};

export default function HeritageExplorerPage() {
  return (
    <>
      <Navbar />
      
      {/* 
        Dynamic Background Rhythm Strategy:
        Hero: Dark Navy (Image)
        Grid: Warm Ivory (#FAF7F0)
        Map: White (#FFFFFF)
        Fun Facts: Royal Gold (Inside component)
        Gurindam: Dark Navy (Inside component)
        Gallery: Stone Gray (#F5F5F5)
        CTA: Dark Navy
      */}

      <main className="flex-1 overflow-x-hidden bg-white">
        
        {/* Section 1: Hero */}
        <HeritageHero />

        {/* Section 2: Explorer Grid */}
        <div className="bg-cream">
          <HeritageGrid />
        </div>

        {/* Section 3: Interactive GIS Map CTA */}
        <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-4">Eksplorasi Langsung</span>
            <h2 className="font-heading font-bold text-5xl text-navy mb-6">Peta GIS & Navigasi Terpadu</h2>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto font-sans text-lg font-medium leading-relaxed">
              Temukan rute terbaik dan pelajari sejarah langsung di lokasi dengan fitur peta interaktif dan navigasi GPS live yang terintegrasi.
            </p>
            <a 
              href="/peta" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-white rounded-2xl font-bold uppercase tracking-wider text-sm shadow-xl hover:bg-gold-dark hover:-translate-y-1 transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              Buka Peta Interaktif
            </a>
          </div>
        </section>

        {/* Section 4: Heritage Gallery */}
        <div className="bg-gray-50 py-24 border-t border-gray-200">
          <div className="container mx-auto px-6 text-center mb-12">
            <h3 className="font-heading font-bold text-4xl text-navy">Galeri Cagar Budaya</h3>
            <p className="text-gray-500 mt-4 font-sans font-medium text-lg">Dokumentasi visual keajaiban arsitektur masa lampau.</p>
          </div>
          <MasonryGallery />
        </div>

      </main>

      <Footer />
    </>
  );
}
