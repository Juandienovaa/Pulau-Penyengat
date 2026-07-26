"use client";

import dynamic from "next/dynamic";

export const HeritageMapWrapper = dynamic(
  () => import("./InteractiveHeritageMap").then((mod) => mod.InteractiveHeritageMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[700px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">
        Memuat Peta Interaktif...
      </div>
    ),
  }
);
