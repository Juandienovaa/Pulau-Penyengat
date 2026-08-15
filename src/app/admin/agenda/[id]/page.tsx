import { Metadata } from "next";
import { AgendaForm } from "@/components/admin/AgendaForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Agenda | Admin",
};

export default async function EditAgendaPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient();
  
  const { data: agenda, error } = await supabase
    .from("agenda")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !agenda) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/agenda" className="inline-flex items-center gap-2 text-sm font-bold text-navy/50 hover:text-navy transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Agenda
      </Link>
      
      <div>
        <h1 className="text-3xl font-serif font-bold text-navy mb-2">Edit Data Agenda</h1>
        <p className="text-navy/60 font-body">Perbarui informasi untuk {agenda.title}.</p>
      </div>

      <AgendaForm initialData={agenda} />
    </div>
  );
}
