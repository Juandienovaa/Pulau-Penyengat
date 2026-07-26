import { TimelineEvent, HistoricalFigure, GurindamVerse, FunFact, BeforeAfterImage } from "../types";

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    year: "1787",
    title: "Pusat Pertahanan",
    description: "Pulau Penyengat mulai dibangun sebagai pusat pertahanan oleh Raja Haji Fisabilillah untuk menghadapi Belanda.",
    imageUrl: "/images/hero-1.jpg",
  },
  {
    id: "2",
    year: "1803",
    title: "Mahar Kerajaan",
    description: "Pulau ini dijadikan maskawin oleh Sultan Mahmud Syah kepada Engku Putri Raja Hamidah, menjadikannya pusat pemerintahan Yang Dipertuan Muda.",
    imageUrl: "/images/heru-2.jpg",
  },
  {
    id: "3",
    year: "1832",
    title: "Masjid Raya Sultan Riau",
    description: "Masjid ikonik dengan arsitektur perpaduan Melayu, India, dan Timur Tengah ini dibangun secara gotong royong.",
    imageUrl: "/images/hero-3.jpg",
  },
  {
    id: "4",
    year: "1847",
    title: "Lahirnya Gurindam 12",
    description: "Raja Ali Haji menyelesaikan mahakarya sastra Gurindam Dua Belas yang menjadi cikal bakal tata bahasa Melayu dan Indonesia modern.",
    imageUrl: "/images/hero-1.jpg",
  },
  {
    id: "5",
    year: "1900",
    title: "Akhir Kesultanan",
    description: "Kesultanan Riau-Lingga dihapuskan oleh pemerintah kolonial Belanda, namun warisan kebudayaannya tetap abadi.",
    imageUrl: "/images/heru-2.jpg",
  }
];

export const GURINDAM_VERSES: GurindamVerse[] = [
  {
    id: "g1",
    pasal: 1,
    originalRumi: "Barang siapa tiada memegang agama,\nSekali-kali tiada boleh dibilangkan nama.\n\nBarang siapa mengenal yang empat,\nMaka ia itulah orang yang ma'rifat.",
    originalJawi: "بارڠ سياڤ تياد ممݢڠ اݢام،\nسکالي-کالي تياد بوليه دبيلڠکن نام.",
    meaningIndonesian: "Barang siapa yang tidak memiliki agama atau tidak memegang teguh ajaran agamanya, maka ia tidak pantas disebut atau dihormati namanya. Mengenal empat hal (syariat, tarikat, hakikat, dan makrifat) menjadikan seseorang mencapai tingkat makrifat.",
    meaningEnglish: "Whoever does not hold on to religion, their name shall never be counted. Whoever knows the four (stages of spirituality), they are the ones who have reached true enlightenment.",
    explanation: "Pasal pertama ini menegaskan pentingnya fondasi agama dalam kehidupan bermasyarakat dan spiritualitas Melayu.",
  },
  {
    id: "g2",
    pasal: 2,
    originalRumi: "Barang siapa mengenal Allah,\nSuruh dan tegahnya tiada ia menyalah.\n\nBarang siapa mengenal diri,\nMaka telah mengenal akan Tuhan yang bahri.",
    originalJawi: "بارڠ سياڤ مڠنل الله،\nسوروه دان تݢهڽ تياد ي مڽاله.",
    meaningIndonesian: "Barang siapa yang mengenal Allah, ia tidak akan melanggar perintah dan larangan-Nya. Dan barang siapa yang mengenal dirinya sendiri, sesungguhnya ia telah mengenal Tuhannya.",
    meaningEnglish: "Whoever knows God, will not transgress His commands and prohibitions. Whoever knows themselves, has truly known the Eternal God.",
    explanation: "Fokus pada hubungan manusia dengan penciptanya dan pentingnya instropeksi (mengenal diri) untuk mencapai ketaatan.",
  }
];

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: "f1",
    name: "Raja Ali Haji",
    title: "Pahlawan Nasional & Bapak Bahasa",
    biography: "Raja Ali Haji bin Raja Haji Ahmad adalah ulama, sejarawan, dan pujangga abad ke-19 keturunan Bugis dan Melayu. Beliau terkenal sebagai pencatat pertama dasar-dasar tata bahasa Melayu melalui buku Pedoman Bahasa, yang menjadi cikal bakal Bahasa Indonesia standar.",
    contributions: ["Penulis Gurindam Dua Belas", "Penyusun Tata Bahasa Melayu", "Sejarawan Tuhfat al-Nafis"],
    imageUrl: "/images/hero-3.jpg",
    quote: "Barang siapa mengenal diri, maka telah mengenal akan Tuhan yang bahri.",
    relatedPlaces: ["Makam Raja Ali Haji", "Balai Maklumat"]
  },
  {
    id: "f2",
    name: "Engku Putri Raja Hamidah",
    title: "Pemegang Regalia Kerajaan",
    biography: "Permaisuri Sultan Mahmud Syah III yang menerima Pulau Penyengat sebagai maskawin. Beliau memegang peranan penting sebagai penjaga alat-alat kebesaran (Regalia) Kesultanan Riau-Lingga-Johor-Pahang.",
    contributions: ["Penjaga Regalia Kerajaan", "Pusat Pemerintahan Yang Dipertuan Muda"],
    imageUrl: "/images/hero-1.jpg",
    relatedPlaces: ["Kompleks Makam Engku Putri", "Istana Kantor"]
  }
];

export const FUN_FACTS: FunFact[] = [
  {
    id: "ff1",
    icon: "🏛️",
    fact: "Dibangun dengan Putih Telur",
    details: "Masyarakat percaya bahwa Masjid Raya Sultan Riau dibangun menggunakan putih telur sebagai bahan campuran perekat bangunan yang disumbangkan oleh rakyat."
  },
  {
    id: "ff2",
    icon: "📖",
    fact: "Pusat Bahasa Melayu",
    details: "Tata bahasa Melayu dibakukan di pulau ini, yang kemudian diadopsi menjadi Bahasa Indonesia dalam Sumpah Pemuda 1928."
  },
  {
    id: "ff3",
    icon: "🚤",
    fact: "Transportasi Pompong",
    details: "Pulau ini tidak memiliki jembatan penghubung ke Tanjungpinang. Transportasi utamanya adalah perahu kayu bermesin yang disebut 'Pompong'."
  }
];
