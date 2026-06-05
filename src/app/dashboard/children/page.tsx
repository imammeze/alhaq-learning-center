"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, UsersIcon, CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react";
import { getChildren } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ChildrenPage() {
  const router = useRouter();
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (user?.role !== "orang_tua") {
      router.push("/dashboard");
      return;
    }

    async function fetchData() {
      try {
        const res = await getChildren();
        setChildren(res.data || []);
      } catch (err) {
        // handle err
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const statusIcon = (status: string) => {
    if (status === "approved") return <CheckCircle2Icon className="w-4 h-4 text-green-500" />;
    if (status === "rejected") return <XCircleIcon className="w-4 h-4 text-red-500" />;
    return <ClockIcon className="w-4 h-4 text-amber-500" />;
  };

  const statusLabel = (status: string) => {
    if (status === "approved") return "Disetujui";
    if (status === "rejected") return "Ditolak";
    return "Menunggu";
  };

  const statusColor = (status: string) => {
    if (status === "approved") return "bg-green-50 text-green-700";
    if (status === "rejected") return "bg-red-50 text-red-700";
    return "bg-amber-50 text-amber-700";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Anak</h1>
            <p className="text-gray-500 text-sm mt-1">Kelola dan pantau data anak-anak Anda.</p>
          </div>
        </div>
        <Link 
          href="/dashboard/children/new"
          className="px-4 py-2 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-colors text-sm"
        >
          + Tambah Anak
        </Link>
      </div>

      {children.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <UsersIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Belum Ada Anak Terdaftar</h3>
          <p className="text-gray-500 max-w-sm mb-6">
            Anda belum mendaftarkan anak pada program apapun di Al-Haq Learning Center.
          </p>
          <Link href="/dashboard/children/new" className="px-6 py-3 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-colors">
            Daftarkan Anak Baru
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child: any) => (
            <Link
              key={child.id}
              href={`/dashboard/children/${child.id}`}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                    {child.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-rose-900 transition-colors text-lg">{child.full_name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {child.gender === 'L' ? 'Laki-laki' : child.gender === 'P' ? 'Perempuan' : '-'} • Lhr: {child.birth_date ? new Date(child.birth_date).toLocaleDateString('id-ID') : '-'}
                    </p>
                  </div>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-300 group-hover:text-rose-900 transition-colors" />
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pendaftaran Program</p>
                {(!child.registrations || child.registrations.length === 0) ? (
                   <p className="text-sm text-gray-500 italic">Belum ada pendaftaran</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {child.registrations.map((reg: any) => (
                      <div key={reg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-sm font-medium text-gray-800">{reg.program?.name || "Program"}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusColor(reg.status)}`}>
                          {statusIcon(reg.status)}
                          {statusLabel(reg.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
