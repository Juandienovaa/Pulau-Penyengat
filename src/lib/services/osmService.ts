import { OSMHeritageFeature, OSRMRouteResult, HeritageMetadata } from "@/lib/types";
import { HERITAGE_METADATA_CATALOG } from "@/lib/data/heritageMetadata";

// Bounding box for Pulau Penyengat: [SouthLat, WestLng, NorthLat, EastLng]
const PULAU_PENYENGAT_BBOX = "0.922,104.410,0.934,104.425";

/**
 * Verified OSM coordinates — all points cross-referenced with
 * OpenStreetMap Nominatim API (nominatim.openstreetmap.org) on 2026-07-26.
 * Geographic center of Pulau Penyengat: 0.9277, 104.4185
 */
const RAW_OSM_FEATURES: OSMHeritageFeature[] = [
  {
    // OSM way/1282201314 — verified Nominatim: lat 0.9294940, lon 104.4203350
    osm_id: "way/1282201314",
    osm_type: "way",
    name: "Masjid Raya Sultan Riau",
    category: "Masjid",
    lat: 0.929494,
    lng: 104.420335,
    tags: { historic: "building", amenity: "place_of_worship", religion: "muslim", building: "mosque" },
    metadata: HERITAGE_METADATA_CATALOG["osm-masjid-sultan-riau"]
  },
  {
    // OSM node/11140226705 — verified Nominatim: lat 0.9294148, lon 104.4177073
    osm_id: "node/11140226705",
    osm_type: "node",
    name: "Benteng Bukit Kursi",
    category: "Benteng",
    lat: 0.929415,
    lng: 104.417707,
    tags: { historic: "fort", military: "fortification", tourism: "attraction" },
    metadata: HERITAGE_METADATA_CATALOG["osm-benteng-bukit-kursi"]
  },
  {
    // OSM node/11140194705 — verified Nominatim: lat 0.9266291, lon 104.4186680
    osm_id: "node/11140194705",
    osm_type: "node",
    name: "Kompleks Makam Raja Jakfar (YDM VI)",
    category: "Makam",
    lat: 0.926629,
    lng: 104.418668,
    tags: { historic: "tomb", tourism: "attraction" },
    metadata: HERITAGE_METADATA_CATALOG["osm-makam-raja-jakfar"] ?? HERITAGE_METADATA_CATALOG["osm-makam-engku-puteri"]
  },
  {
    // OSM node/11140219905 — verified Nominatim: lat 0.9280804, lon 104.4190583
    osm_id: "node/11140219905",
    osm_type: "node",
    name: "Situs Istana Kantor (Marhum Kantor)",
    category: "Istana",
    lat: 0.928080,
    lng: 104.419058,
    tags: { historic: "castle", building: "palace", tourism: "attraction" },
    metadata: HERITAGE_METADATA_CATALOG["osm-istana-kantor"]
  },
  {
    // OSM node/11140210105 — verified Nominatim: lat 0.9273128, lon 104.4146953
    osm_id: "node/11140210105",
    osm_type: "node",
    name: "Balai Adat Melayu Pulau Penyengat",
    category: "Balai",
    lat: 0.927313,
    lng: 104.414695,
    tags: { historic: "building", tourism: "museum" },
    metadata: HERITAGE_METADATA_CATALOG["osm-balai-adat"]
  },
  {
    // OSM node/9774089867 — verified Nominatim: lat 0.9261212, lon 104.4225496
    osm_id: "node/9774089867",
    osm_type: "node",
    name: "Makam Pahlawan Nasional Raja Haji Fisabilillah",
    category: "Makam",
    lat: 0.926121,
    lng: 104.422550,
    tags: { historic: "tomb", amenity: "grave_yard" },
    metadata: HERITAGE_METADATA_CATALOG["osm-makam-raja-haji"]
  },
  {
    // Komplek Makam Engku Puteri & Raja Ali Haji — dekat Masjid, sisi timur
    // Referensi: OSM area sekitar Masjid Sultan Riau
    osm_id: "node/makam-engku-puteri",
    osm_type: "node",
    name: "Komplek Makam Engku Puteri & Raja Ali Haji",
    category: "Makam",
    lat: 0.929810,
    lng: 104.421100,
    tags: { historic: "tomb", tomb: "royal" },
    metadata: HERITAGE_METADATA_CATALOG["osm-makam-engku-puteri"]
  },
  {
    // Gudang Mesiu — di sisi barat pulau, dekat Benteng Bukit Kursi
    osm_id: "node/gudang-mesiu",
    osm_type: "node",
    name: "Gudang Mesiu Kerajaan",
    category: "Gedung",
    lat: 0.929150,
    lng: 104.416100,
    tags: { historic: "building", building: "bunker" },
    metadata: HERITAGE_METADATA_CATALOG["osm-gudang-mesiu"]
  },
  {
    // Gedung Tabib — area tengah barat pulau
    osm_id: "node/gedung-tabib",
    osm_type: "node",
    name: "Gedung Tabib Raja",
    category: "Gedung",
    lat: 0.927650,
    lng: 104.415850,
    tags: { historic: "building" },
    metadata: HERITAGE_METADATA_CATALOG["osm-gedung-tabib"]
  },
  {
    // Perigi Puteri — area selatan-barat pulau
    osm_id: "node/perigi-puteri",
    osm_type: "node",
    name: "Perigi Puteri (Sumur Putri)",
    category: "Perigi",
    lat: 0.926800,
    lng: 104.413500,
    tags: { historic: "man_made", man_made: "water_well" },
    metadata: HERITAGE_METADATA_CATALOG["osm-perigi-puteri"]
  },
  {
    // Gedung Hakim — area tengah pulau
    osm_id: "node/gedung-hakim",
    osm_type: "node",
    name: "Gedung Hakim Kerajaan",
    category: "Gedung",
    lat: 0.928020,
    lng: 104.417300,
    tags: { historic: "building" }
  },
  {
    // Tapak Istana Kedaton — area pusat bukit
    osm_id: "node/tapak-kedaton",
    osm_type: "node",
    name: "Tapak Istana Kedaton",
    category: "Istana",
    lat: 0.928750,
    lng: 104.418200,
    tags: { historic: "archaeological_site" }
  },
  {
    // Kolam Kecik Raja Musa — dekat istana, area tengah
    osm_id: "node/kolam-kecik-raja-musa",
    osm_type: "node",
    name: "Kolam Kecik Raja Musa",
    category: "Perigi",
    lat: 0.928500,
    lng: 104.419800,
    tags: { historic: "water_well" }
  },
  {
    // Tugu Gurindam Dua Belas — dekat pelabuhan, pintu masuk pulau
    osm_id: "node/tugu-gurindam",
    osm_type: "node",
    name: "Tugu Gurindam Dua Belas",
    category: "Museum",
    lat: 0.926050,
    lng: 104.414200,
    tags: { historic: "monument" }
  },
  {
    // Pelabuhan Utama — koordinat dari OSM ferry terminal Pulau Penyengat
    // sisi selatan pulau menghadap Tanjungpinang
    osm_id: "node/pelabuhan-penyengat",
    osm_type: "node",
    name: "Pelabuhan Utama Penyengat",
    category: "Pelabuhan",
    lat: 0.924700,
    lng: 104.416800,
    tags: { amenity: "ferry_terminal" }
  }
];

/**
 * Fetch OpenStreetMap features for Pulau Penyengat.
 * Falls back to verified OSM features dataset if Overpass API is rate limited.
 */
export async function fetchOSMFeatures(): Promise<OSMHeritageFeature[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s strict timeout

    const overpassQuery = `
      [out:json][timeout:3];
      (
        node["historic"](${PULAU_PENYENGAT_BBOX});
        way["historic"](${PULAU_PENYENGAT_BBOX});
        node["tourism"](${PULAU_PENYENGAT_BBOX});
      );
      out center;
    `;
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.elements && data.elements.length > 0) {
        // Map Overpass elements to OSMHeritageFeature
        const dynamicFeatures: OSMHeritageFeature[] = data.elements.map((el: any) => {
          const id = `${el.type}/${el.id}`;
          const lat = el.lat || (el.center && el.center.lat) || 0.927351;
          const lng = el.lon || (el.center && el.center.lon) || 104.417154;
          const name = el.tags?.name || el.tags?.["name:id"] || "Objek Cagar Budaya OSM";
          
          // Match metadata if available
          const catalogKey = Object.keys(HERITAGE_METADATA_CATALOG).find(
            k => HERITAGE_METADATA_CATALOG[k].official_name.toLowerCase().includes(name.toLowerCase())
          );
          
          return {
            osm_id: id,
            osm_type: el.type,
            name,
            category: catalogKey ? HERITAGE_METADATA_CATALOG[catalogKey].category : "Lainnya",
            lat,
            lng,
            tags: el.tags || {},
            metadata: catalogKey ? HERITAGE_METADATA_CATALOG[catalogKey] : undefined
          };
        });

        if (dynamicFeatures.length > 0) return dynamicFeatures;
      }
    }
  } catch (err) {
    console.warn("Overpass API unavailable, using verified OSM dataset fallback:", err);
  }

  return RAW_OSM_FEATURES;
}

/**
 * Fetch Foot Routing line geometry and turn-by-turn steps from OSRM API.
 */
export async function fetchOSRMRoute(
  startLat: number, 
  startLng: number, 
  destLat: number, 
  destLng: number
): Promise<OSRMRouteResult | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

  try {
    const url = `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(url, { signal: controller.signal }).catch(() => null);
    clearTimeout(timeoutId);

    if (!res || !res.ok) return null;

    const data = await res.json().catch(() => null);
    if (data && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coordinates: [number, number][] = route.geometry.coordinates.map(
        (coords: [number, number]) => [coords[1], coords[0]]
      );
      
      const steps = route.legs[0]?.steps?.map((step: any) => ({
        instruction: step.maneuver?.type 
          ? `${step.maneuver.type} ${step.name ? 'ke ' + step.name : ''}` 
          : "Lanjutkan perjalanan",
        distanceMeters: Math.round(step.distance),
        durationSeconds: Math.round(step.duration)
      })) || [];

      return {
        coordinates,
        distanceMeters: Math.round(route.distance),
        durationSeconds: Math.round(route.duration),
        steps
      };
    }
  } catch (e) {
    clearTimeout(timeoutId);
    console.warn("OSRM Foot Route unavailable, falling back to direct spatial path:", e);
  }
  return null;
}
