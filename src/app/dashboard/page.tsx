"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UsersIcon,
  ClipboardListIcon,
  BookOpenIcon,
  CalendarIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  PlayCircleIcon,
} from "lucide-react";
import { getUser, UserData } from "@/lib/auth";
import {
  getChildren,
  getStudentProfile,
  getStudentRegistrations,
  getStudentModules,
} from "@/lib/api";
import { VideoModal } from "@/components/VideoModal";

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);

    async function fetchData() {
      try {
        if (userData?.role === "orang_tua") {
          const res = await getChildren();
          setChildren(res.data || []);
        } else if (userData?.role === "siswa_mandiri") {
          const [regRes, modRes] = await Promise.all([
            getStudentRegistrations(),
            getStudentModules(),
          ]);
          setRegistrations(regRes.data || []);
          setModules(modRes.data || []);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statusIcon = (status: string) => {
    if (status === "approved")
      return <CheckCircle2Icon className="w-4 h-4 text-green-500" />;
    if (status === "rejected")
      return <XCircleIcon className="w-4 h-4 text-red-500" />;
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

  if (user?.role === "orang_tua") {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Dashboard Orang Tua
          </h1>
          <p className="text-gray-500 mt-1">
            Pantau perkembangan belajar anak Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {children.length}
                </p>
                <p className="text-sm text-gray-500">Anak Terdaftar</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2Icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {children.reduce(
                    (acc: number, c: any) =>
                      acc +
                      (c.registrations?.filter(
                        (r: any) => r.status === "approved",
                      )?.length || 0),
                    0,
                  )}
                </p>
                <p className="text-sm text-gray-500">Pendaftaran Aktif</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {children.reduce(
                    (acc: number, c: any) =>
                      acc +
                      (c.registrations?.filter(
                        (r: any) => r.status === "pending",
                      )?.length || 0),
                    0,
                  )}
                </p>
                <p className="text-sm text-gray-500">Menunggu Verifikasi</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    new Set(
                      children.flatMap(
                        (c: any) =>
                          c.registrations?.map((r: any) => r.program_id) || [],
                      ),
                    ).size
                  }
                </p>
                <p className="text-sm text-gray-500">Program Diikuti</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Daftar Anak</h2>
            <Link
              href="/dashboard/children"
              className="text-sm text-rose-900 font-medium hover:underline flex items-center gap-1">
              Lihat Semua <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {children.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-500">
              Belum ada data anak yang terdaftar.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {children.map((child: any) => (
                <Link
                  key={child.id}
                  href={`/dashboard/children/${child.id}`}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-rose-900 transition-colors">
                        {child.full_name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {child.nickname || "-"}
                      </p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-300 group-hover:text-rose-900 transition-colors" />
                  </div>
                  {child.registrations && child.registrations.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {child.registrations.map((reg: any) => (
                        <span
                          key={reg.id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColor(reg.status)}`}>
                          {statusIcon(reg.status)}
                          {reg.program?.name || "Program"} —{" "}
                          {statusLabel(reg.status)}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Dashboard Siswa
        </h1>
        <p className="text-gray-500 mt-1">
          Selamat datang kembali, {user?.name}!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <ClipboardListIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {registrations.length}
              </p>
              <p className="text-sm text-gray-500">Pendaftaran</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <BookOpenIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {modules.length}
              </p>
              <p className="text-sm text-gray-500">Modul Tersedia</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">-</p>
              <p className="text-sm text-gray-500">Progress</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Status Pendaftaran
        </h2>
        {registrations.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center text-gray-500">
            Belum ada data pendaftaran.
          </div>
        ) : (
          <div className="space-y-3">
            {registrations.map((reg: any) => (
              <div
                key={reg.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {reg.program?.name || "Program"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Didaftarkan:{" "}
                    {new Date(reg.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusColor(reg.status)}`}>
                  {statusIcon(reg.status)}
                  {statusLabel(reg.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <VideoModal
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Modul Pembelajaran
          </h2>
          {modules.length > 0 && (
            <Link
              href="/dashboard/modules"
              className="text-sm text-rose-900 font-medium hover:underline flex items-center gap-1">
              Lihat Semua <ArrowRightIcon className="w-4 h-4" />
            </Link>
          )}
        </div>

        {modules.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              Modul pembelajaran akan segera tersedia.
            </p>
            <Link
              href="/dashboard/modules"
              className="text-rose-900 font-medium text-sm hover:underline">
              Lihat Modul →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.slice(0, 4).map((mod: any) => (
              <div
                key={mod.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-rose-300 hover:shadow-md transition-all">
                <div className="p-5 grow border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                      {mod.program?.name}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-rose-900 font-semibold mb-3">
                    Pertemuan {mod.meeting_number}
                  </p>
                </div>
                {mod.youtube_url && (
                  <div className="p-4 bg-gray-50">
                    <button
                      onClick={() => setSelectedVideo(mod.youtube_url)}
                      className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-white text-red-600 border border-gray-200 text-sm font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors">
                      <PlayCircleIcon className="w-4 h-4" /> Tonton Video
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
