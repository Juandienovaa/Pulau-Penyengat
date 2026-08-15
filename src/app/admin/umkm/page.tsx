import { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, MoreVertical, Edit, Eye, Archive, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Kelola UMKM | Pulau Penyengat CMS",
};

export default async function AdminUMKMPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; featured?: string };
}) {
  const supabase = await createServerSupabaseClient();
  const query = searchParams.q || "";
  const statusFilter = searchParams.status || "all";
  const featuredFilter = searchParams.featured === "true";

  let dbQuery = supabase.from("umkm").select("*").order("created_at", { ascending: false });

  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,category.ilike.%${query}%,address.ilike.%${query}%`);
  }
  if (statusFilter !== "all") {
    dbQuery = dbQuery.eq("status", statusFilter);
  }
  if (featuredFilter) {
    dbQuery = dbQuery.eq("featured", true);
  }

  const { data: umkmList, error } = await dbQuery;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-navy mb-2">UMKM Pulau Penyengat</h1>
          <p className="text-navy/60 font-body">Kelola usaha lokal, produk, dan informasi yang tampil kepada pengunjung.</p>
        </div>
        <Link 
          href="/admin/umkm/tambah"
          className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Tambah UMKM
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
              placeholder="Cari nama, kategori, lokasi..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
            {/* Preserve other filters when searching */}
            {statusFilter !== 'all' && <input type="hidden" name="status" value={statusFilter} />}
            {featuredFilter && <input type="hidden" name="featured" value="true" />}
          </form>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {["all", "published", "draft", "archived"].map((s) => (
              <Link 
                key={s}
                href={`/admin/umkm?status=${s}${query ? `&q=${query}` : ''}${featuredFilter ? '&featured=true' : ''}`}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                  statusFilter === s 
                    ? "bg-gold/20 text-navy border border-gold/30" 
                    : "bg-slate-50 text-navy/50 hover:bg-slate-100 border border-black/5"
                }`}
              >
                {s === 'all' ? 'Semua' : s}
              </Link>
            ))}
            <Link 
              href={`/admin/umkm?status=${statusFilter}${query ? `&q=${query}` : ''}${!featuredFilter ? '&featured=true' : ''}`}
              className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 ${
                featuredFilter 
                  ? "bg-gold/20 text-navy border border-gold/30" 
                  : "bg-slate-50 text-navy/50 hover:bg-slate-100 border border-black/5"
              }`}
            >
              ★ Featured
            </Link>
          </div>
        </div>

        {/* Table Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-black/5">
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Foto</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Nama</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Kategori</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Lokasi</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-navy/50 uppercase tracking-widest">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {umkmList?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-navy/50">
                    <div className="flex flex-col items-center justify-center">
                      <Store className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-lg font-serif mb-2">Belum ada UMKM yang tersedia.</p>
                      <p className="text-sm font-body">Tambahkan UMKM pertama untuk mulai mengisi direktori lokal.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                umkmList?.map((umkm) => (
                  <tr key={umkm.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6">
                      <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden relative border border-black/5">
                        {umkm.cover_image ? (
                          <Image src={umkm.cover_image} alt={umkm.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy/20"><Store className="w-6 h-6" /></div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-navy mb-1">{umkm.name}</p>
                      {umkm.featured && <span className="text-[10px] font-bold uppercase tracking-widest text-gold">★ Featured</span>}
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-navy/5 rounded-full text-xs font-bold text-navy">{umkm.category}</span>
                    </td>
                    <td className="p-6 text-sm text-navy/70 max-w-[200px] truncate">{umkm.address || "-"}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        umkm.status === 'published' ? 'bg-green-100 text-green-700' :
                        umkm.status === 'archived' ? 'bg-red-100 text-red-700' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {umkm.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <Link href={`/umkm/${umkm.slug}`} target="_blank" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-slate-200 transition-colors" title="Lihat">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/umkm/${umkm.id}`} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-navy/50 hover:text-navy hover:bg-slate-200 transition-colors" title="Edit">
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
          {umkmList?.length === 0 ? (
            <div className="p-8 text-center text-navy/50">
              <Store className="w-10 h-10 mb-3 mx-auto opacity-20" />
              <p className="font-serif">Belum ada UMKM.</p>
            </div>
          ) : (
            umkmList?.map((umkm) => (
              <div key={umkm.id} className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden relative shrink-0">
                    {umkm.cover_image && <Image src={umkm.cover_image} alt={umkm.name} fill className="object-cover" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy">{umkm.name}</h3>
                    <p className="text-xs text-navy/50 mb-1">{umkm.category}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      umkm.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'
                    }`}>{umkm.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                  <Link href={`/admin/umkm/${umkm.id}`} className="flex-1 py-2 text-center text-sm font-bold text-navy bg-slate-50 rounded-lg">Edit</Link>
                  <Link href={`/umkm/${umkm.slug}`} target="_blank" className="flex-1 py-2 text-center text-sm font-bold text-navy bg-slate-50 rounded-lg">Lihat</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
