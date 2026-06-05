"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon, MailIcon, PhoneIcon, LogOutIcon } from "lucide-react";
import { getUser, UserData, logout } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola informasi akun Anda.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-rose-900 to-rose-700"></div>
        <div className="px-8 pb-8 relative">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center -mt-12 mb-6">
            <UserIcon className="w-10 h-10 text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-rose-900 font-medium text-sm mb-6 uppercase tracking-wider bg-rose-50 inline-block px-3 py-1 rounded-lg">
            {user.role === "orang_tua" ? "Orang Tua" : "Siswa"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
              <div className="flex items-center gap-2 text-gray-900 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                <MailIcon className="w-4 h-4 text-gray-400" />
                {user.email}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">No. WhatsApp</p>
              <div className="flex items-center gap-2 text-gray-900 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                <PhoneIcon className="w-4 h-4 text-gray-400" />
                {user.whatsapp_number || "-"}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors"
            >
              <LogOutIcon className="w-5 h-5" />
              Keluar dari Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
