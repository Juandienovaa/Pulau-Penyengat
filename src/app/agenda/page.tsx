import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { agendaMockData } from "@/lib/data/agenda";
import { AgendaHero } from "@/components/agenda/AgendaHero";
import { QuickCalendar } from "@/components/agenda/QuickCalendar";
import { FeaturedEvent } from "@/components/agenda/FeaturedEvent";
import { EventTimeline } from "@/components/agenda/EventTimeline";
import { GurindamSpotlight } from "@/components/agenda/GurindamSpotlight";
import { EventStats } from "@/components/agenda/EventStats";
import { AgendaTransport } from "@/components/agenda/AgendaTransport";

export const metadata: Metadata = {
  title: "Agenda & Festival | Pulau Penyengat",
  description: "Jelajahi kalender festival dan acara kebudayaan terbesar di Pulau Penyengat.",
};

export default function AgendaPage() {
  const featuredEvents = agendaMockData.slice(0, 3); // Get top 3 for slider
  const featuredSingle = agendaMockData[0]; // Hero feature

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        
        {/* 1. Fullscreen Hero Slider */}
        <AgendaHero featuredEvents={featuredEvents} />

        {/* 2. Horizontal Quick Calendar */}
        <QuickCalendar events={agendaMockData} />

        {/* 3. Event Stats */}
        <EventStats />

        {/* 4. Upcoming Featured Event (Editorial Layout) */}
        {featuredSingle && (
          <FeaturedEvent event={featuredSingle} />
        )}

        {/* 5. Vertical Timeline */}
        <EventTimeline events={agendaMockData} />

        {/* 6. Gurindam Spotlight */}
        <GurindamSpotlight />

        {/* 7. Transport Info */}
        <AgendaTransport />

        {/* CTA Banner */}
        <section className="py-24 bg-navy relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy" />
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
              Jadikan Pulau Penyengat Tujuan Perjalanan Budaya Anda Berikutnya
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/peta" className="px-8 py-4 bg-gold text-navy font-bold rounded-2xl hover:bg-white hover:-translate-y-1 transition-all w-full sm:w-auto shadow-[0_10px_40px_rgba(212,175,55,0.3)]">
                Lihat Peta Interaktif
              </a>
              <a href="/sejarah" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors w-full sm:w-auto">
                Jelajahi Sejarah
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
