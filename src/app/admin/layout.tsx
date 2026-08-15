"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Store, 
  CalendarDays, 
  LogOut, 
  Menu,
  X,
  User
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "UMKM", href: "/admin/umkm", icon: Store },
    { name: "Agenda", href: "/admin/agenda", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-navy text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-8 flex items-center justify-between border-b border-white/10">
          <div>
            <h1 className="font-serif font-bold text-2xl text-gold">ADMIN</h1>
            <p className="text-xs text-white/50 tracking-widest uppercase mt-1">Penyengat CMS</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white/50 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8">
          <div className="px-6 mb-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Konten</p>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = item.href === '/admin' 
                  ? pathname === '/admin' 
                  : pathname.startsWith(item.href);
                
                return (
                  <Link 
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? "bg-gold text-navy font-bold shadow-lg shadow-gold/20" 
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-navy" : "text-white/50"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-6 border-t border-white/10">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Sistem</p>
          <div className="flex items-center gap-3 mb-6 px-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-white/50" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{userEmail || "Admin"}</p>
              <p className="text-xs text-white/50">Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white h-20 px-6 border-b border-black/5 flex items-center justify-between lg:justify-end shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-black/5 text-navy hover:bg-slate-50"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="text-sm font-body text-navy/60 hidden sm:block">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
