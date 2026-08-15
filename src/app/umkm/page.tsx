import { UMKMHeroCarousel } from "@/components/umkm/UMKMHero";
import { UMKMCategories } from "@/components/umkm/UMKMCategories";
import { UMKMSearch } from "@/components/umkm/UMKMSearch";
import { UMKMFeatured } from "@/components/umkm/UMKMFeatured";
import { ProductShowcase } from "@/components/umkm/ProductShowcase";
import { UMKMStorySection } from "@/components/umkm/UMKMStory";
import { UMKMMap } from "@/components/umkm/UMKMMap";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function UMKMPage() {
  const supabase = await createServerSupabaseClient();
  const { data: umkmList } = await supabase
    .from("umkm")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1. Cinematic Hero Carousel */}
      <UMKMHeroCarousel />

      {/* 2. Global Search overlaying just below hero */}
      <UMKMSearch />

      {/* 3. Category Storytelling (Rasa, Karya, Cerita) */}
      <UMKMCategories />

      {/* 4. The main UMKM grid/carousel with categories */}
      <UMKMFeatured initialData={umkmList || []} />

      {/* 5. Highlighted Products */}
      <ProductShowcase />

      {/* 6. Deep editorial story section */}
      <UMKMStorySection />

      {/* 7. Map Integration to /peta */}
      <UMKMMap />

      {/* Footer from existing site */}
      <Footer />
    </div>
  );
}
