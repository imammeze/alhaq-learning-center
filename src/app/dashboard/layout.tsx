"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  BuildingIcon, LayoutDashboardIcon, UsersIcon, BookOpenIcon,
  UserIcon, LogOutIcon, MenuIcon, XIcon, ClipboardListIcon,
} from "lucide-react";
import { isAuthenticated, getUser, logout, UserData } from "@/lib/auth";

const parentMenuItems = [
  { href: "/dashboard", label: "Beranda", icon: LayoutDashboardIcon },
  { href: "/dashboard/children", label: "Data Anak", icon: UsersIcon },
  { href: "/dashboard/profile", label: "Profil Saya", icon: UserIcon },
];

const studentMenuItems = [
  { href: "/dashboard", label: "Beranda", icon: LayoutDashboardIcon },
  { href: "/dashboard/modules", label: "Modul Pembelajaran", icon: BookOpenIcon },
  { href: "/dashboard/profile", label: "Profil Saya", icon: UserIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    const userData = getUser();
    if (!userData) {
      router.replace("/login");
      return;
    }
    setUser(userData);
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-900 rounded-full animate-spin" />
      </div>
    );
  }

  const menuItems = user?.role === "orang_tua" ? parentMenuItems : studentMenuItems;
  const roleName = user?.role === "orang_tua" ? "Orang Tua" : "Siswa";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-50 flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-900 rounded-xl flex items-center justify-center">
              <BuildingIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Al-Haq</h2>
              <p className="text-xs text-gray-500">Learning Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-rose-50 text-rose-900 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-rose-900" : "text-gray-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-rose-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500">{roleName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOutIcon className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center gap-4">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-900 rounded-lg flex items-center justify-center">
              <BuildingIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Al-Haq</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:block">Halo,</span>
            <span className="font-semibold text-gray-900">{user?.name}</span>
          </div>
        </header>

        <main className="flex-1 p-6 pb-24 lg:p-8 lg:pb-8">
          {children}
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1.5 px-3 transition-colors ${
                  isActive ? "text-rose-900" : "text-gray-500 hover:text-rose-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
