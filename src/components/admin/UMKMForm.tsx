"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Loader2, Upload, MapPin, AlertCircle, Trash2 } from "lucide-react";
import Image from "next/image";

const umkmSchema = z.object({
  name: z.string().min(2, "Nama UMKM wajib diisi"),
  slug: z.string().min(2, "Slug wajib diisi"),
  category: z.enum([
    "Kuliner", "Oleh-Oleh", "Kerajinan", "Fashion Melayu", 
    "Kopi & Minuman", "Produk Lokal", "Seni & Budaya", 
    "Homestay", "Experience"
  ]),
  description: z.string().min(10, "Deskripsi wajib diisi (min. 10 karakter)"),
  story: z.string().optional(),
  address: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
});

type UMKMFormValues = z.infer<typeof umkmSchema>;

export function UMKMForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.cover_image || "");

  const form = useForm<UMKMFormValues>({
    resolver: zodResolver(umkmSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "Kuliner",
      description: initialData?.description || "",
      story: initialData?.story || "",
      address: initialData?.address || "",
      whatsapp: initialData?.whatsapp || "",
      instagram: initialData?.instagram || "",
      website: initialData?.website || "",
      status: initialData?.status || "draft",
      featured: initialData?.featured || false,
      lat: initialData?.lat || 0,
      lng: initialData?.lng || 0,
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
    const name = form.watch("name");
    if (name) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      form.setValue("slug", slug);
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `umkm/${fileName}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('public-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('public-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (values: UMKMFormValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      let finalCoverImage = initialData?.cover_image;
      
      if (coverImage) {
        finalCoverImage = await uploadImage(coverImage);
      }

      const payload = {
        ...values,
        cover_image: finalCoverImage,
      };

      if (initialData?.id) {
        // Update
        const { error } = await supabase.from('umkm').update(payload).eq('id', initialData.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('umkm').insert([payload]);
        if (error) throw error;
      }

      router.push('/admin/umkm');
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
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Informasi Utama</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Nama UMKM</label>
              <input {...form.register("name")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-navy">Slug URL</label>
                <button type="button" onClick={generateSlug} className="text-xs text-gold font-bold">Generate dari Nama</button>
              </div>
              <input {...form.register("slug")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              {form.formState.errors.slug && <p className="text-red-500 text-xs">{form.formState.errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Kategori</label>
              <select {...form.register("category")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold">
                <option value="Kuliner">Kuliner</option>
                <option value="Oleh-Oleh">Oleh-Oleh</option>
                <option value="Kerajinan">Kerajinan</option>
                <option value="Fashion Melayu">Fashion Melayu</option>
                <option value="Kopi & Minuman">Kopi & Minuman</option>
                <option value="Produk Lokal">Produk Lokal</option>
                <option value="Seni & Budaya">Seni & Budaya</option>
                <option value="Homestay">Homestay</option>
                <option value="Experience">Experience</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Deskripsi Singkat</label>
              <textarea {...form.register("description")} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              {form.formState.errors.description && <p className="text-red-500 text-xs">{form.formState.errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Cerita / Story (Opsional)</label>
              <textarea {...form.register("story")} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Lokasi & Kontak</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Alamat Fisik</label>
              <div className="flex relative">
                <MapPin className="w-5 h-5 absolute left-3 top-3.5 text-navy/40" />
                <input {...form.register("address")} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Latitude</label>
                <input type="number" step="any" {...form.register("lat")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Longitude</label>
                <input type="number" step="any" {...form.register("lng")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">WhatsApp</label>
                <input {...form.register("whatsapp")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" placeholder="+62..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Instagram</label>
                <input {...form.register("instagram")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" placeholder="@..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">Website</label>
                <input {...form.register("website")} className="w-full px-4 py-3 bg-slate-50 border border-black/10 rounded-xl focus:bg-white focus:outline-none focus:border-gold" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 space-y-4">
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Publikasi</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-navy">Status</label>
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
            <h3 className="font-serif font-bold text-lg text-navy border-b border-black/5 pb-2">Foto Utama</h3>
            
            <div className="space-y-4">
              {coverPreview ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-black/10 group">
                  <Image src={coverPreview} alt="Cover Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => { setCoverPreview(""); setCoverImage(null); }} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center text-navy/40 bg-slate-50">
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider">Unggah Foto</p>
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
              initialData ? "Simpan Perubahan" : "Tambahkan UMKM"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
