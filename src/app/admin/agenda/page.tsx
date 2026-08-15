import { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, CalendarDays, Eye, Edit } from "lucide-react";

export const metadata: Metadata = {
  title: "Kelola Agenda | Pulau Penyengat CMS",
};

export default async function AdminAgendaPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; featured?: string };
}) {
  const supabase = await createServerSupabaseClient();
  const query = searchParams.q || "";
  const statusFilter = searchParams.status || "all";
  const featuredFilter = searchParams.featured === "true";

  let dbQuery = supabase.from("agenda").select("*").order("start_date", { ascending: true });

  if (query) {
    dbQuery = dbQuery.or(`title.ilike.%${query}%,location.ilike.%${query}%,organizer.ilike.%${query}%`);
  }
  if (featuredFilter) {
    dbQuery = dbQuery.eq("featured", true);
  }

  const { data: rawAgendaList, error } = await dbQuery;
  const now = new Date();

  // Process dynamic event status and filter
  let agendaList = (rawAgendaList || []).map(event => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    
    let eventStatus = 'SELESAI';
    if (now < startDate) {
      eventStatus = 'MENDATANG';
    } else if (now >= startDate && now <= endDate) {
      eventStatus = 'BERLANGSUNG';
    }

    return { ...event, eventStatus };
  });

  if (statusFilter !== "all") {
    if (["draft", "archived"].includes(statusFilter)) {
      agendaList = agendaList.filter(e => e.status === statusFilter);
    } else {
      agendaList = agendaList.filter(e => e.eventStatus === statusFilter.toUpperCase() && e.status === 'published');
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-navy mb-2">Agenda Pulau Penyengat</h1>
          <p className="text-navy/60 font-body">Kelola kegiatan, acara budaya, dan event yang berlangsung.</p>
        </div>
        <Link 
          href="/admin/agenda/tambah"
          className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Tambah Agenda
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-black/5 overflow-hidden">
        {/* Filters */}
        <div className="p-6 border-b border-black/5 flex flex-col sm:flex-row gap-4">
          <form className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
            <input 
              name="q"
              defaultValue={query}
              placeholder="Cari nama event, lokasi, penyelenggara..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
            {statusFilter !== 'all' && <input type="hidden" name="status" value={statusFilter} />}
            {featuredFilter && <input type="hidden" name="featured" value="true" />}
          </form>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {[
              { id: "all", label: "Semua" }, 
              { id: "mendatang", label: "Mendatang" }, 
              { id: "berlangsung", label: "Berlangsung" }, 
              { id: "selesai", label: "Selesai" }, 
              { id: "draft", label: "Draft" },
              { id: "archived", label: "Arsip" }
            ].map((s) => (
              <Link 
                key={s.id}
                href={`/admin/agenda?status=${s.id}${query ? `&q=${query}` : ''}${featuredFilter ? '&featured=true' : ''}`}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                  statusFilter === s.id 
                    ? "bg-gold/20 text-navy border border-gold/30" 
                    : "bg-slate-50 text-navy/50 hover:bg-slate-100 border border-black/5"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Table Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-black/5">
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Poster</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Event</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Waktu</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Lokasi</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {agendaList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-navy/50">
                    <div className="flex flex-col items-center justify-center">
                      <CalendarDays className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-lg font-serif mb-2">Belum ada Agenda yang tersedia.</p>
                      <p className="text-sm font-body">Tambahkan event pertama untuk mulai membangun kalender kegiatan.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                agendaList.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6">
                      <div className="w-16 h-20 rounded-xl bg-slate-200 overflow-hidden relative border border-black/5">
                        {event.cover_image ? (
                          <Image src={event.cover_image} alt={event.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy/20"><CalendarDays className="w-6 h-6" /></div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-navy mb-1">{event.title}</p>
                      <p className="text-xs text-navy/50">{event.organizer}</p>
                      {event.featured && <span className="text-[10px] font-bold uppercase tracking-widest text-gold mt-1 block">★ Featured</span>}
                    </td>
                    <td className="p-6">
                      <p className="text-sm text-navy">{new Date(event.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      <p className="text-xs text-navy/50">{new Date(event.start_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="p-6 text-sm text-navy/70 max-w-[200px] truncate">{event.location}</td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1 items-start">
                        {event.status === 'published' ? (
                           <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            event.eventStatus === 'MENDATANG' ? 'bg-blue-100 text-blue-700' :
                            event.eventStatus === 'BERLANGSUNG' ? 'bg-green-100 text-green-700' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {event.eventStatus}
                          </span>
                        ) : (
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            event.status === 'archived' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {event.status}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <Link href={`/agenda#event-${event.id}`} target="_blank" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-slate-200 transition-colors" title="Lihat">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/agenda/${event.id}`} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-slate-200 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-black/5">
          {agendaList.length === 0 ? (
            <div className="p-8 text-center text-navy/50">
              <CalendarDays className="w-10 h-10 mb-3 mx-auto opacity-20" />
              <p className="font-serif">Belum ada Agenda.</p>
            </div>
          ) : (
            agendaList.map((event) => (
              <div key={event.id} className="p-6 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-16 h-20 rounded-xl bg-slate-200 overflow-hidden relative shrink-0">
                    {event.cover_image && <Image src={event.cover_image} alt={event.title} fill className="object-cover" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy leading-tight mb-1">{event.title}</h3>
                    <p className="text-xs text-navy/50 mb-2">{new Date(event.start_date).toLocaleDateString('id-ID')} • {event.location}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      event.status === 'published' ? (event.eventStatus === 'MENDATANG' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700') : 'bg-red-100 text-red-700'
                    }`}>
                      {event.status === 'published' ? event.eventStatus : event.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                  <Link href={`/admin/agenda/${event.id}`} className="flex-1 py-2 text-center text-sm font-bold text-navy bg-slate-50 rounded-lg">Edit</Link>
                  <Link href={`/agenda#event-${event.id}`} target="_blank" className="flex-1 py-2 text-center text-sm font-bold text-navy bg-slate-50 rounded-lg">Lihat</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
