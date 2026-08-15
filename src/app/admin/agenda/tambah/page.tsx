import { Metadata } from "next";
import { AgendaForm } from "@/components/admin/AgendaForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Tambah Agenda | Admin",
};

export default function TambahAgendaPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/admin/agenda" className="inline-flex items-center gap-2 text-sm font-bold text-navy/50 hover:text-navy transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Agenda
      </Link>
      
      <div>
        <h1 className="text-3xl font-serif font-bold text-navy mb-2">Tambah Agenda Baru</h1>
        <p className="text-navy/60 font-body">Masukkan detail event, festival, atau jadwal kegiatan.</p>
      </div>

      <AgendaForm />
    </div>
  );
}
