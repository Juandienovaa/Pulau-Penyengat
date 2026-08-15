import { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Store, CalendarDays, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Admin | Pulau Penyengat CMS",
};

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  // Fetch UMKM Stats
  const { count: totalUmkm } = await supabase.from("umkm").select("*", { count: "exact", head: true });
  const { count: activeUmkm } = await supabase.from("umkm").select("*", { count: "exact", head: true }).eq('status', 'published');
  const { count: draftUmkm } = await supabase.from("umkm").select("*", { count: "exact", head: true }).eq('status', 'draft');
  const { count: featuredUmkm } = await supabase.from("umkm").select("*", { count: "exact", head: true }).eq('featured', true);

  // Fetch Agenda Stats
  const { count: totalAgenda } = await supabase.from("agenda").select("*", { count: "exact", head: true });
  const { count: draftAgenda } = await supabase.from("agenda").select("*", { count: "exact", head: true }).eq('status', 'draft');
  
  const now = new Date().toISOString();
  const { count: upcomingAgenda } = await supabase.from("agenda")
    .select("*", { count: "exact", head: true })
    .gte('start_date', now);
    
  const { count: pastAgenda } = await supabase.from("agenda")
    .select("*", { count: "exact", head: true })
    .lt('end_date', now);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-navy mb-2">Dashboard</h1>
        <p className="text-navy/60 font-body">Ikhtisar data konten Pulau Penyengat.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link 
          href="/admin/umkm/tambah"
          className="group p-6 bg-white rounded-2xl shadow-sm border border-black/5 hover:border-gold hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-navy text-lg">Tambah UMKM</h3>
              <p className="text-sm text-navy/50">Daftarkan pelaku lokal baru</p>
            </div>
          </div>
          <Plus className="w-5 h-5 text-navy/30 group-hover:text-gold transition-colors" />
        </Link>
        <Link 
          href="/admin/agenda/tambah"
          className="group p-6 bg-white rounded-2xl shadow-sm border border-black/5 hover:border-gold hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-navy text-lg">Tambah Agenda</h3>
              <p className="text-sm text-navy/50">Buat jadwal acara baru</p>
            </div>
          </div>
          <Plus className="w-5 h-5 text-navy/30 group-hover:text-gold transition-colors" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* UMKM Stats */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-black/5 overflow-hidden">
          <div className="p-8 border-b border-black/5 flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-navy">Statistik UMKM</h2>
            <Link href="/admin/umkm" className="text-sm font-bold text-gold hover:text-navy transition-colors flex items-center gap-1">
              Kelola <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 p-8 gap-8">
            <div>
              <p className="text-sm font-bold text-navy/50 uppercase tracking-wider mb-2">Total UMKM</p>
              <p className="text-4xl font-bold text-navy">{totalUmkm || 0}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-green-600/70 uppercase tracking-wider mb-2">Aktif / Published</p>
              <p className="text-4xl font-bold text-green-600">{activeUmkm || 0}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-navy/50 uppercase tracking-wider mb-2">Draft</p>
              <p className="text-4xl font-bold text-navy/70">{draftUmkm || 0}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gold/70 uppercase tracking-wider mb-2">Featured</p>
              <p className="text-4xl font-bold text-gold">{featuredUmkm || 0}</p>
            </div>
          </div>
        </div>

        {/* Agenda Stats */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-black/5 overflow-hidden">
          <div className="p-8 border-b border-black/5 flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-navy">Statistik Agenda</h2>
            <Link href="/admin/agenda" className="text-sm font-bold text-gold hover:text-navy transition-colors flex items-center gap-1">
              Kelola <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 p-8 gap-8">
            <div>
              <p className="text-sm font-bold text-navy/50 uppercase tracking-wider mb-2">Total Agenda</p>
              <p className="text-4xl font-bold text-navy">{totalAgenda || 0}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-600/70 uppercase tracking-wider mb-2">Mendatang</p>
              <p className="text-4xl font-bold text-blue-600">{upcomingAgenda || 0}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-navy/50 uppercase tracking-wider mb-2">Draft</p>
              <p className="text-4xl font-bold text-navy/70">{draftAgenda || 0}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-navy/50 uppercase tracking-wider mb-2">Selesai</p>
              <p className="text-4xl font-bold text-navy/70">{pastAgenda || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
