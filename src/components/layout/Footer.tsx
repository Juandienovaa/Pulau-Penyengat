import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <MapPin className="text-gold w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="font-heading font-bold text-2xl tracking-wide">
                Penyengat
              </span>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              Wonderful Penyengat. Temukan kekayaan sejarah, pesona budaya, arsitektur memukau, dan pengalaman lokal yang autentik.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-xl mb-6 text-gold">Jelajah</h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/peta" className="hover:text-gold transition-colors">Peta Interaktif</Link></li>
              <li><Link href="/sejarah" className="hover:text-gold transition-colors">Sejarah</Link></li>
              <li><Link href="/cagar-budaya" className="hover:text-gold transition-colors">Cagar Budaya</Link></li>
              <li><Link href="/umkm" className="hover:text-gold transition-colors">UMKM & Kuliner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl mb-6 text-gold">Layanan Wisata</h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/tour-guide" className="hover:text-gold transition-colors">Pemandu Wisata</Link></li>
              <li><Link href="/becak" className="hover:text-gold transition-colors">Becak Wisata</Link></li>
              <li><Link href="/planner" className="hover:text-gold transition-colors">Smart Tour Planner</Link></li>
              <li><Link href="/event" className="hover:text-gold transition-colors">Event & Festival</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl mb-6 text-gold">Kontak</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <span>Pulau Penyengat, Tanjungpinang, Kepulauan Riau, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>+62 811-0000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span>info@pulaupenyengat.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Pulau Penyengat Enterprise Tourism Platform. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
