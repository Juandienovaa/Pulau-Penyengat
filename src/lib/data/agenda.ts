export interface EventCMS {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  history: string;
  start_date: string; // ISO Date String
  end_date: string;
  registration_link?: string;
  location: string;
  coordinates: { lat: number; lng: number };
  gallery: string[];
  cover_image: string;
  speaker?: string;
  organizer: string;
  ticket_price: string;
  capacity: number;
  status: 'Upcoming' | 'Today' | 'Completed';
  category: 'Festival' | 'Budaya' | 'Religi' | 'UMKM' | 'Pameran' | 'Musik' | 'Kuliner' | 'Parade' | 'Lomba' | 'Seminar' | 'History';
  fun_facts: string[];
  gurindam?: {
    verse: string;
    meaning: string;
    historical_context: string;
  };
  videos?: string[];
}

export const agendaMockData: EventCMS[] = [
  {
    id: "evt-001",
    slug: "festival-pulau-penyengat",
    title: "Festival Pulau Penyengat",
    subtitle: "Puncak Perayaan Warisan Budaya Melayu",
    description: "Festival tahunan terbesar yang merayakan kekayaan sejarah, seni, dan tradisi Kesultanan Riau-Lingga. Berbagai atraksi mulai dari lomba perahu naga, pementasan seni, hingga pameran artefak sejarah akan memeriahkan pulau selama tiga hari berturut-turut.",
    history: "Dimulai pertama kali pada tahun 2001 sebagai inisiatif masyarakat lokal untuk menjaga tradisi Melayu, kini telah berevolusi menjadi salah satu agenda pariwisata nasional terpenting di Kepulauan Riau.",
    start_date: "2026-08-15T08:00:00Z",
    end_date: "2026-08-17T22:00:00Z",
    registration_link: "https://example.com/register/fpp",
    location: "Balai Adat Melayu & Pelabuhan Penyengat",
    coordinates: { lat: 0.9272, lng: 104.4178 },
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601002361730-802521f55a1d?q=80&w=2000&auto=format&fit=crop"
    ],
    cover_image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
    speaker: "Gubernur Kepulauan Riau & Tokoh Budaya Melayu",
    organizer: "Dinas Pariwisata Provinsi Kepri",
    ticket_price: "Gratis",
    capacity: 15000,
    status: 'Upcoming',
    category: 'Festival',
    fun_facts: [
      "Ribuan pengunjung datang dari Malaysia, Singapura, dan Brunei setiap tahunnya.",
      "Lomba Perahu Naga di festival ini menggunakan perahu tradisional yang dibuat oleh pengrajin lokal tanpa paku besi.",
      "Pembukaan selalu diawali dengan pembacaan Gurindam Dua Belas secara massal."
    ],
    gurindam: {
      verse: "Barang siapa tiada memegang agama, Sekali-kali tiada boleh dibilangkan nama.",
      meaning: "Agama adalah fondasi utama bagi seseorang untuk dihargai dan diakui eksistensinya dalam masyarakat.",
      historical_context: "Menekankan pentingnya nilai-nilai religius dalam setiap perayaan budaya Melayu di Pulau Penyengat, sebagai cerminan sejarah kerajaan Islam Riau-Lingga."
    }
  },
  {
    id: "evt-002",
    slug: "kenduri-seni-melayu",
    title: "Kenduri Seni Melayu",
    subtitle: "Malam Puisi, Tari, dan Sastra",
    description: "Sebuah malam keakraban yang mempertemukan seniman, budayawan, dan penyair dari berbagai negara serumpun Melayu untuk menampilkan karya terbaik mereka di bawah taburan bintang.",
    history: "Kenduri Seni Melayu awalnya adalah tradisi berkumpul para pujangga di istana pada abad ke-19, kini dihidupkan kembali sebagai wadah pertukaran budaya.",
    start_date: "2026-07-25T19:00:00Z", // Set to 'Today' relative to current time roughly
    end_date: "2026-07-25T23:30:00Z",
    location: "Plataran Masjid Raya Sultan Riau",
    coordinates: { lat: 0.9275, lng: 104.4172 },
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop"
    ],
    cover_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    organizer: "Dewan Kesenian Kepulauan Riau",
    ticket_price: "Gratis",
    capacity: 2000,
    status: 'Today',
    category: 'Budaya',
    fun_facts: [
      "Setiap penampilan diwajibkan menggunakan alat musik akustik tradisional.",
      "Hidangan selama kenduri disajikan menggunakan talam besar untuk dimakan bersama-sama."
    ]
  },
  {
    id: "evt-003",
    slug: "festival-gurindam-dua-belas",
    title: "Festival Gurindam",
    subtitle: "Menghayati Sastra Karya Raja Ali Haji",
    description: "Perayaan khusus yang didedikasikan untuk mengkaji, melantunkan, dan meresapi makna dari Gurindam Dua Belas. Terdapat lomba cipta puisi, bedah buku, dan pertunjukan teaterikal.",
    history: "Gurindam Dua Belas ditulis oleh Raja Ali Haji pada tahun 1847. Festival ini digagas untuk melestarikan mahakarya tersebut ke generasi muda.",
    start_date: "2026-10-10T09:00:00Z",
    end_date: "2026-10-12T20:00:00Z",
    location: "Kompleks Makam Raja Ali Haji",
    coordinates: { lat: 0.9268, lng: 104.4165 },
    gallery: [
      "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop"
    ],
    cover_image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2000&auto=format&fit=crop",
    organizer: "Balai Bahasa Provinsi Kepri",
    ticket_price: "Gratis",
    capacity: 1000,
    status: 'Upcoming',
    category: 'History',
    fun_facts: [
      "Banyak peserta yang mampu menghafal seluruh 12 pasal Gurindam.",
      "Acara ini juga menerbitkan buku antologi puisi dari para pemenang lomba setiap tahunnya."
    ],
    gurindam: {
      verse: "Jika hendak mengenal orang berbangsa, Lihat kepada budi dan bahasa.",
      meaning: "Kebangsawanan atau kemuliaan seseorang tidak dilihat dari keturunannya, melainkan dari budi pekerti dan tutur katanya yang sopan.",
      historical_context: "Pasal kelima dari Gurindam Dua Belas ini menjadi filosofi dasar pengajaran budi pekerti dalam budaya Melayu."
    }
  },
  {
    id: "evt-004",
    slug: "festival-lampu-cangkok",
    title: "Festival Lampu Cangkok",
    subtitle: "Benderang Malam 27 Likur Ramadhan",
    description: "Tradis menyalakan ribuan pelita (lampu cangkok) yang disusun membentuk berbagai miniatur masjid dan ornamen kaligrafi raksasa di sepanjang jalan pulau pada malam 27 Ramadhan.",
    history: "Tradisi turun-temurun sejak ratusan tahun lalu untuk menyambut malam Lailatul Qadar dan menerangi jalan menuju masjid.",
    start_date: "2026-03-15T18:00:00Z",
    end_date: "2026-03-20T23:59:00Z",
    location: "Seluruh Jalan Utama Pulau Penyengat",
    coordinates: { lat: 0.9270, lng: 104.4170 },
    gallery: [
      "https://images.unsplash.com/photo-1543884811-0309dd0558b2?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2000&auto=format&fit=crop"
    ],
    cover_image: "https://images.unsplash.com/photo-1543884811-0309dd0558b2?q=80&w=2000&auto=format&fit=crop",
    organizer: "Remaja Masjid Raya Sultan Riau",
    ticket_price: "Gratis",
    capacity: 5000,
    status: 'Completed',
    category: 'Religi',
    fun_facts: [
      "Lebih dari 10.000 kaleng bekas dikumpulkan selama setahun untuk dijadikan pelita.",
      "Persiapan kerangka lampu memakan waktu hingga satu bulan penuh oleh warga desa yang bergotong-royong."
    ]
  }
];
