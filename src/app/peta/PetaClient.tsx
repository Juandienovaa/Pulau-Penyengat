"use client";

import dynamic from "next/dynamic";

const MapApplication = dynamic(
  () => import("@/components/map/MapApplication").then((mod) => mod.MapApplication),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-navy border-t-gold rounded-full animate-spin mb-4" />
        <p className="text-navy font-bold animate-pulse">Memuat Peta GIS...</p>
      </div>
    ),
  }
);

export function PetaClient() {
  return <MapApplication />;
}
