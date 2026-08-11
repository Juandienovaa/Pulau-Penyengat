export type UMKMCategory =
  | "Kuliner"
  | "Oleh-Oleh"
  | "Kerajinan"
  | "Fashion Melayu"
  | "Kopi & Minuman"
  | "Produk Lokal"
  | "Seni & Budaya"
  | "Homestay"
  | "Experience";

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  priceDisplay?: string;
  size?: string;
  availability: "Tersedia" | "Pre-order" | "Stok Habis" | "Hubungi Penjual";
  ingredients?: string[];
  halal: boolean;
  image: string;
}

export interface UMKM {
  id: string;
  slug: string;
  name: string;
  category: UMKMCategory;
  description: string;
  story?: string;

  coverImage: string;
  gallery: string[];

  address?: string;
  lat?: number;
  lng?: number;

  openingHours?: OpeningHours[];

  whatsapp?: string;
  instagram?: string;
  website?: string;

  halalCertified?: boolean;
  halalCertificateNumber?: string;

  verifiedSource?: string;
  verifiedAt?: string;

  products: Product[];

  heritageRelations?: string[]; // IDs of heritage sites nearby
}

export const UMKM_STATS = {
  halalCertified: "438+",
  halalSource: "Pemerintah Provinsi Kepulauan Riau (Oktober 2025)",
};

export const UMKM_DATA: UMKM[] = [
  {
    id: "umkm-kue-dram-dram",
    slug: "kue-dram-dram",
    name: "Kue Dram-Dram",
    category: "Oleh-Oleh",
    description: "Produsen rumahan pembuat kue Deram-Deram, camilan tradisional ikonis khas Pulau Penyengat.",
    story: "Dibuat dengan tangan. Dibawa pulang sebagai cerita. Kue Deram-Deram dari Jalan Istana Laut merupakan bagian dari sejarah kuliner Melayu yang diwariskan turun-temurun.",
    coverImage: "/images/umkm/deram-deram-cover.jpg",
    gallery: ["/images/umkm/deram-deram-1.jpg", "/images/umkm/deram-deram-2.jpg"],
    address: "Jalan Istana Laut, Pulau Penyengat",
    lat: 0.9287,
    lng: 104.4225, // approximate center
    halalCertified: true,
    verifiedSource: "Daftar Pelaku Ekonomi Kreatif Kepriprov.go.id",
    products: [
      {
        id: "prod-deram-1",
        name: "Kue Deram-Deram Tradisional",
        description: "Kue berbentuk donat kecil dengan rasa manis gurih khas gula aren.",
        priceDisplay: "Harga dapat berubah — hubungi penjual",
        availability: "Tersedia",
        ingredients: ["Tepung Beras", "Gula Merah", "Minyak Nabati"],
        halal: true,
        image: "/images/umkm/deram-deram-prod.jpg",
      },
    ],
    heritageRelations: ["h1"], // Nearby Masjid Raya or Istana
  },
  {
    id: "umkm-cafe-hlaman-nenek",
    slug: "cafe-hlaman-nenek",
    name: "Cafe H'Laman Nenek",
    category: "Kopi & Minuman",
    description: "Kedai kopi santai bernuansa Melayu yang menawarkan Kopi O, teh tarik, dan jajanan ringan khas Tanjungpinang.",
    story: "Tempat berkumpul yang merangkum budaya ngopi orang Melayu, menyatukan percakapan santai dan hangatnya teh tarik.",
    coverImage: "/images/umkm/cafe-nenek-cover.jpg",
    gallery: ["/images/umkm/cafe-nenek-1.jpg"],
    address: "Pulau Penyengat, Tanjungpinang",
    verifiedSource: "Data Pariwisata Kedai Kopi Pulau Penyengat",
    products: [
      {
        id: "prod-kopi-o",
        name: "Kopi O Khas Melayu",
        description: "Kopi hitam pekat dengan aroma khas.",
        availability: "Tersedia",
        halal: true,
        image: "/images/umkm/kopi-o.jpg",
      },
      {
        id: "prod-teh-tarik",
        name: "Teh Tarik",
        description: "Teh dan susu kental manis yang ditarik hingga berbuih.",
        availability: "Tersedia",
        halal: true,
        image: "/images/umkm/teh-tarik.jpg",
      },
    ],
  },
  {
    id: "umkm-nabila-homestay",
    slug: "nabila-homestay",
    name: "Nabila Homestay",
    category: "Homestay",
    description: "Penginapan rumah warga yang menjadi langganan wisatawan, menawarkan kenyamanan dan keramahan khas masyarakat Pulau Penyengat.",
    story: "Menginap di Nabila Homestay bukan sekadar tidur, tapi menyelami kehidupan masyarakat lokal secara langsung, merasakan keramahan tuan rumah, dan bangun dengan udara pulau yang segar.",
    coverImage: "/images/umkm/nabila-cover.jpg",
    gallery: ["/images/umkm/nabila-1.jpg"],
    address: "Pulau Penyengat",
    verifiedSource: "Daftar Homestay Pariwisata Pulau Penyengat",
    products: [
      {
        id: "prod-kamar-standar",
        name: "Kamar Homestay",
        description: "Penginapan harian dengan fasilitas dasar dan keramahan lokal.",
        priceDisplay: "Rp300.000 / malam (Perkiraan)",
        availability: "Hubungi Penjual",
        halal: true,
        image: "/images/umkm/nabila-room.jpg",
      },
    ],
  },
  {
    id: "umkm-pengrajin-batik-bunga-raya",
    slug: "pengrajin-batik-bunga-raya",
    name: "Pengrajin Batik Bunga Raya",
    category: "Kerajinan",
    description: "Karya kerajinan tekstil dan fashion khas Melayu dengan motif Bunga Raya dan warisan sejarah.",
    coverImage: "/images/umkm/batik-cover.jpg",
    gallery: ["/images/umkm/batik-1.jpg"],
    verifiedSource: "Kerajinan Lokal Balai Adat / Pariwisata Kepri",
    products: [
      {
        id: "prod-batik-bunga-raya",
        name: "Kain Batik Motif Bunga Raya",
        description: "Motif batik khas Kepulauan Riau yang diadaptasi dari kekayaan botani lokal.",
        availability: "Hubungi Penjual",
        halal: true,
        image: "/images/umkm/batik-kain.jpg",
      },
    ],
  }
];

export const FUN_FACTS = [
  {
    fact: "Deram-deram telah lama dikaitkan dengan kuliner ikonis warisan Kesultanan yang masih diproduksi oleh UMKM lokal hingga hari ini.",
    source: "Balai Pelestarian Nilai Budaya Kepri"
  },
  {
    fact: "UMKM lokal tidak hanya menjual produk, tetapi membawa identitas Melayu lewat motif kain, anyaman, dan cita rasa rempah.",
    source: "Dinas Pariwisata Provinsi Kepri"
  },
  {
    fact: "Lebih dari 438 produk UMKM Pulau Penyengat telah bersertifikat halal pada Oktober 2025, mendukung ekosistem wisata heritage.",
    source: "Pemprov Kepri"
  }
];
