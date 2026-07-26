"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton"; // We will create this

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-2xl" />,
});

export function InteractiveMap() {
  return (
    <section className="py-24 bg-white dark:bg-navy relative z-0">
      <div className="container mx-auto px-6 h-[800px] flex flex-col">
        <div className="mb-12">
          <h2 className="font-heading font-bold text-4xl text-navy dark:text-white">Peta Interaktif</h2>
          <p className="text-navy/60 dark:text-white/60 mt-2 font-sans">Jelajahi titik cagar budaya dan UMKM lokal secara langsung.</p>
        </div>
        <div className="flex-1 relative z-0">
          <Map />
        </div>
      </div>
    </section>
  );
}
