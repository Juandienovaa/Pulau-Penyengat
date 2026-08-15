import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EventCMS } from "@/lib/data/agenda";
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

export default async function AgendaPage() {
  const supabase = await createServerSupabaseClient();
  const { data: rawEvents } = await supabase
    .from("agenda")
    .select("*")
    .eq("status", "published")
    .order("start_date", { ascending: true });

  const now = new Date();
  
  const mappedEvents: EventCMS[] = (rawEvents || []).map(event => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    
    let status: 'Upcoming' | 'Today' | 'Completed' = 'Completed';
    if (now < startDate) {
      status = 'Upcoming';
    } else if (now >= startDate && now <= endDate) {
      status = 'Today';
    }

    return {
      id: event.id,
      slug: event.slug,
      title: event.title,
      subtitle: event.subtitle || "",
      description: event.description,
      history: event.description, // Fallback
      start_date: event.start_date,
      end_date: event.end_date,
      registration_link: event.registration_link,
      location: event.location,
      coordinates: { lat: 0, lng: 0 },
      gallery: event.gallery || [],
      cover_image: event.cover_image || "/images/umkm/deram-deram-cover.jpg",
      organizer: event.organizer,
      ticket_price: event.ticket_price || "Gratis",
      capacity: event.capacity || 0,
      status,
      category: event.category as any,
      fun_facts: [],
    };
  });

  const featuredEvents = mappedEvents.slice(0, 3); // Get top 3 for slider
  const featuredSingle = mappedEvents.find(e => e.status !== 'Completed') || mappedEvents[0]; // Hero feature

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        
        {/* 1. Fullscreen Hero Slider */}
        <AgendaHero featuredEvents={featuredEvents} />

        {/* 2. Horizontal Quick Calendar */}
        <QuickCalendar events={mappedEvents} />

        {/* 3. Event Stats */}
        <EventStats />

        {/* 4. Upcoming Featured Event (Editorial Layout) */}
        {featuredSingle && (
          <FeaturedEvent event={featuredSingle} />
        )}

        {/* 5. Vertical Timeline */}
        <EventTimeline events={mappedEvents} />

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
