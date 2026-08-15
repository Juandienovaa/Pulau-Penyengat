"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Loader2, Upload, AlertCircle, Trash2 } from "lucide-react";
import Image from "next/image";

const agendaSchema = z.object({
  title: z.string().min(2, "Nama event wajib diisi"),
  slug: z.string().min(2, "Slug wajib diisi"),
  category: z.string().min(2, "Kategori wajib diisi"),
  start_date: z.string().min(1, "Waktu mulai wajib diisi"),
  end_date: z.string().min(1, "Waktu selesai wajib diisi"),
  location: z.string().min(2, "Lokasi wajib diisi"),
  organizer: z.string().min(2, "Penyelenggara wajib diisi"),
  description: z.string().min(10, "Deskripsi wajib diisi (min. 10 karakter)"),
  subtitle: z.string().optional(),
  ticket_price: z.string().optional(),
  registration_link: z.string().optional(),
  capacity: z.coerce.number().optional(),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),
}).refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
  message: "Waktu selesai tidak boleh sebelum waktu mulai",
  path: ["end_date"]
});

type AgendaFormValues = z.infer<typeof agendaSchema>;

export function AgendaForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.cover_image || "");

  const form = useForm<AgendaFormValues>({
    resolver: zodResolver(agendaSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "Festival",
      start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0,16) : "",
      end_date: initialData?.end_date ? new Date(initialData.end_date).toISOString().slice(0,16) : "",
      location: initialData?.location || "Pulau Penyengat",
      organizer: initialData?.organizer || "",
      description: initialData?.description || "",
      subtitle: initialData?.subtitle || "",
      ticket_price: initialData?.ticket_price || "Gratis",
      registration_link: initialData?.registration_link || "",
      capacity: initialData?.capacity || 0,
      status: initialData?.status || "draft",
      featured: initialData?.featured || false,
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const generateSlug = () => {
    const title = form.watch("title");
    if (title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      form.setValue("slug", slug);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `agenda/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('public-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('public-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (values: AgendaFormValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      let finalCoverImage = initialData?.cover_image;
      
      if (coverImage) {
        finalCoverImage = await uploadImage(coverImage);
      }

      // Convert local datetime-local to ISO UTC timestamp for Supabase
      const payload = {
        ...values,
        start_date: new Date(values.start_date).toISOString(),
        end_date: new Date(values.end_date).toISOString(),
        cover_image: finalCoverImage,
      };

      if (initialData?.id) {
        // Update
        const { error } = await supabase.from('agenda').update(payload).eq('id', initialData.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('agenda').insert([payload]);
        if (error) throw error;
      }

      router.push('/admin/agenda');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" /> {errorMsg}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Informasi Event</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Nama Event</label>
              <input {...form.register("title")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              {form.formState.errors.title && <p className="text-red-500 text-xs">{form.formState.errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-navy">Slug URL</label>
                  <button type="button" onClick={generateSlug} className="text-xs text-gold font-bold">Generate</button>
                </div>
                <input {...form.register("slug")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
                {form.formState.errors.slug && <p className="text-red-500 text-xs">{form.formState.errors.slug.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Kategori</label>
                <input {...form.register("category")} placeholder="Contoh: Festival, Pameran..." className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
                {form.formState.errors.category && <p className="text-red-500 text-xs">{form.formState.errors.category.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Deskripsi Lengkap</label>
              <textarea {...form.register("description")} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              {form.formState.errors.description && <p className="text-red-500 text-xs">{form.formState.errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Deskripsi Singkat (Subtitle)</label>
              <textarea {...form.register("subtitle")} rows={2} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Jadwal & Logistik</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Waktu Mulai</label>
                <input type="datetime-local" {...form.register("start_date")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
                {form.formState.errors.start_date && <p className="text-red-500 text-xs">{form.formState.errors.start_date.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Waktu Selesai</label>
                <input type="datetime-local" {...form.register("end_date")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
                {form.formState.errors.end_date && <p className="text-red-500 text-xs">{form.formState.errors.end_date.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Lokasi</label>
                <input {...form.register("location")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
                {form.formState.errors.location && <p className="text-red-500 text-xs">{form.formState.errors.location.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Penyelenggara</label>
                <input {...form.register("organizer")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
                {form.formState.errors.organizer && <p className="text-red-500 text-xs">{form.formState.errors.organizer.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Harga Tiket</label>
                <input {...form.register("ticket_price")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" placeholder="Contoh: Gratis, Rp 50K..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Link Daftar</label>
                <input {...form.register("registration_link")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Kapasitas</label>
                <input type="number" {...form.register("capacity")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Publikasi</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Status Publikasi</label>
              <select {...form.register("status")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold">
                <option value="draft">Draft (Sembunyikan)</option>
                <option value="published">Published (Tampilkan)</option>
                <option value="archived">Archived (Arsip)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gold/5 rounded-xl border border-gold/20">
              <input type="checkbox" id="featured" {...form.register("featured")} className="w-5 h-5 rounded text-gold focus:ring-gold" />
              <label htmlFor="featured" className="text-sm font-bold text-navy select-none cursor-pointer">
                Tandai sebagai Featured (Unggulan)
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Poster / Cover</h3>
            
            <div className="space-y-4">
              {coverPreview ? (
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-black/10 group">
                  <Image src={coverPreview} alt="Cover Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => { setCoverPreview(""); setCoverImage(null); }} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center text-navy/40 bg-slate-50">
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider">Unggah Poster</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy/5 file:text-navy hover:file:bg-navy/10" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-navy text-white font-bold rounded-xl hover:bg-navy/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</>
            ) : (
              initialData ? "Simpan Perubahan" : "Tambahkan Agenda"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
