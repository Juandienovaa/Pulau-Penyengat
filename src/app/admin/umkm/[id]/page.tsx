import { Metadata } from "next";
import { UMKMForm } from "@/components/admin/UMKMForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, Store } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit UMKM | Admin",
};

export default async function EditUMKMPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient();
  
  const { data: umkm, error } = await supabase
    .from("umkm")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !umkm) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/umkm" className="inline-flex items-center gap-2 text-sm font-bold text-navy/50 hover:text-navy transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar UMKM
      </Link>
      
      <div>
        <h1 className="text-3xl font-serif font-bold text-navy mb-2">Edit Data UMKM</h1>
        <p className="text-navy/60 font-body">Perbarui informasi untuk {umkm.name}.</p>
      </div>

      <UMKMForm initialData={umkm} />
    </div>
  );
}
