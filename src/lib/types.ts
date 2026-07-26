export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  historicalFigureId?: string;
  relatedHeritageId?: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  title: string;
  biography: string;
  contributions: string[];
  imageUrl: string;
  quote?: string;
  relatedPlaces?: string[];
}

export interface GurindamVerse {
  id: string;
  pasal: number;
  originalJawi?: string;
  originalRumi: string;
  meaningIndonesian: string;
  meaningEnglish: string;
  explanation: string;
  audioUrl?: string;
}

export interface FunFact {
  id: string;
  icon: string;
  fact: string;
  details: string;
}

export interface BeforeAfterImage {
  id: string;
  title: string;
  description: string;
  oldImageUrl: string;
  modernImageUrl: string;
  yearOld: string;
  yearModern: string;
  lat?: number;
  lng?: number;
}

export interface ArchitectureHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
}

export interface HeritageSite {
  id: string;
  name: string;
  category: "Masjid" | "Makam" | "Istana" | "Benteng" | "Gedung" | "Balai" | "Perigi" | "Museum" | "Lainnya";
  officialRegNo?: string;
  constructionYear: string;
  architectureStyle: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  gallery: string[];
  historicalFigures: string[];
  culturalSignificance: string;
  restorationHistory: string;
  lat: number;
  lng: number;
  architectureHotspots?: ArchitectureHotspot[];
  architectureBlueprint?: string;
  funFactId?: string;
  gurindamVerseId?: string;
}

// Metadata Layer attached to OSM features via osm_id or slug
export interface HeritageMetadata {
  osm_id: string;
  slug: string;
  official_name: string;
  category: "Masjid" | "Makam" | "Istana" | "Benteng" | "Gedung" | "Balai" | "Perigi" | "Museum" | "Lainnya";
  officialRegNo?: string;
  wikidata_id?: string;
  verified_source: string;
  constructionYear: string;
  architectureStyle: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  gallery: string[];
  historicalFigures: string[];
  culturalSignificance: string;
  restorationHistory: string;
  opening_hours?: string;
  ticket_price?: string;
  estimated_visit_duration?: string;
  fun_facts: string[];
  gurindamVerseId?: string;
}

export interface OSMHeritageFeature {
  osm_id: string;
  osm_type: "node" | "way" | "relation";
  name: string;
  category: string;
  lat: number;
  lng: number;
  tags: Record<string, string>;
  metadata?: HeritageMetadata;
}

export interface RouteInstructionStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
}

export interface OSRMRouteResult {
  coordinates: [number, number][];
  distanceMeters: number;
  durationSeconds: number;
  steps: RouteInstructionStep[];
}

export interface POI {
  id: string;
  name: string;
  type: "UMKM" | "Coffee" | "Guide" | "Becak" | "Toilet" | "Prayer" | "Emergency" | "Pier";
  lat: number;
  lng: number;
  distance?: number;
  description?: string;
}
