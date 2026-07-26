import { Metadata } from "next";
import { PetaClient } from "./PetaClient";

export const metadata: Metadata = {
  title: "Peta Interaktif | Pulau Penyengat",
  description: "Jelajahi pulau seribu sejarah dengan peta GIS interaktif kami.",
};

export default function PetaPage() {
  return (
    <main className="h-[100dvh] w-screen overflow-hidden bg-slate-50 relative">
      <PetaClient />
    </main>
  );
}
