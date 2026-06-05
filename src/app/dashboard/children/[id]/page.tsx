"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, BookOpenIcon, CalendarIcon, GraduationCapIcon, InfoIcon, FileTextIcon, CheckCircle2Icon, XCircleIcon, ClockIcon, SettingsIcon } from "lucide-react";
import { getChildRegistrations, getChildGrades, getChildSchedules, updateChildAccount } from "@/lib/api";
import { getUser } from "@/lib/auth";

export default function ChildDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;
  const [activeTab, setActiveTab] = useState<"registrations" | "grades" | "schedules" | "account">("registrations");

  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const [accountForm, setAccountForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    parent_password: "",
  });
  const [updatingAccount, setUpdatingAccount] = useState(false);
  const [accountMsg, setAccountMsg] = useState({ type: "", text: "" });

  const handleAccountChange = (e: any) => {
    setAccountForm({ ...accountForm, [e.target.name]: e.target.value });
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccountMsg({ type: "", text: "" });
    setUpdatingAccount(true);

    try {
      const res = await updateChildAccount(studentId, accountForm);
      if (res.errors || res.error || !res.data) {
        throw new Error(res.errors?.parent_password?.[0] || res.errors?.email?.[0] || res.errors?.password?.[0] || res.message || "Terjadi kesalahan");
      }
      setAccountMsg({ type: "success", text: "Akun anak berhasil diperbarui!" });
      setAccountForm({ email: "", password: "", password_confirmation: "", parent_password: "" });
    } catch (err: any) {
      setAccountMsg({ type: "error", text: err.message || "Gagal memperbarui akun." });
    } finally {
      setUpdatingAccount(false);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user?.role !== "orang_tua") {
      router.push("/dashboard");
      return;
    }

    async function loadData() {
      setLoading(true);
      try {
        if (activeTab === "registrations") {
          const res = await getChildRegistrations(studentId);
          setRegistrations(res.data || []);
        } else if (activeTab === "grades") {
          const res = await getChildGrades(studentId);
          setGrades(res.data || []);
          setMessage(res.message || "");
        } else if (activeTab === "schedules") {
          const res = await getChildSchedules(studentId);
          setSchedules(res.data || []);
          setMessage(res.message || "");
        }
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [studentId, activeTab, router]);

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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/children" className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detail Anak</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau informasi lengkap anak Anda.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("registrations")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "registrations" ? "border-rose-900 text-rose-900" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FileTextIcon className="w-4 h-4" /> Status Pendaftaran
          </button>
          <button
            onClick={() => setActiveTab("grades")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "grades" ? "border-rose-900 text-rose-900" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <GraduationCapIcon className="w-4 h-4" /> Nilai Akademik
          </button>
          <button
            onClick={() => setActiveTab("schedules")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "schedules" ? "border-rose-900 text-rose-900" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <CalendarIcon className="w-4 h-4" /> Jadwal Kelas
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "account" ? "border-rose-900 text-rose-900" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <SettingsIcon className="w-4 h-4" /> Pengaturan Akun
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-900 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === "registrations" && (
                <div className="space-y-4">
                  {registrations.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 border border-dashed border-gray-200 rounded-xl">Belum ada data pendaftaran.</div>
                  ) : (
                    registrations.map(reg => (
                      <div key={reg.id} className="p-5 border border-gray-100 rounded-xl bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-gray-900">{reg.program?.name || 'Program'}</p>
                          <p className="text-sm text-gray-500 mt-1">Tanggal Daftar: {new Date(reg.created_at).toLocaleDateString('id-ID')}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusColor(reg.status)}`}>
                          {statusIcon(reg.status)}
                          {statusLabel(reg.status)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "grades" && (
                <div className="space-y-4">
                  {grades.length === 0 ? (
                    <div className="text-center py-16 px-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
                      <GraduationCapIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">{message || "Belum ada data nilai."}</p>
                    </div>
                  ) : (
                    <div>{/* Render grades here when available */}</div>
                  )}
                </div>
              )}

              {activeTab === "schedules" && (
                <div className="space-y-4">
                  {schedules.length === 0 ? (
                     <div className="text-center py-16 px-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
                      <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">{message || "Belum ada data jadwal."}</p>
                    </div>
                  ) : (
                    <div>{/* Render schedules here when available */}</div>
                  )}
                </div>
              )}

              {activeTab === "account" && (
                <div className="max-w-2xl">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Pengaturan Akun Anak</h3>
                    <p className="text-gray-500 text-sm mt-1">Perbarui email atau password login anak Anda. Kosongkan jika tidak ingin mengubah.</p>
                  </div>

                  {accountMsg.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${accountMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {accountMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleAccountSubmit} className="space-y-6">
                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-900">Email Anak (Baru)</label>
                        <input
                          type="email"
                          name="email"
                          value={accountForm.email}
                          onChange={handleAccountChange}
                          placeholder="Masukkan email baru jika ingin diubah"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all bg-white"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-gray-900">Password Baru</label>
                          <input
                            type="password"
                            name="password"
                            value={accountForm.password}
                            onChange={handleAccountChange}
                            placeholder="Minimal 8 karakter"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-gray-900">Konfirmasi Password</label>
                          <input
                            type="password"
                            name="password_confirmation"
                            value={accountForm.password_confirmation}
                            onChange={handleAccountChange}
                            placeholder="Ulangi password baru"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                        <InfoIcon className="w-4 h-4" /> Konfirmasi Keamanan
                      </h4>
                      <p className="text-sm text-gray-500">
                        Untuk menyimpan perubahan, silakan masukkan password akun Anda (Orang Tua).
                      </p>
                      <div className="space-y-1.5">
                        <input
                          type="password"
                          name="parent_password"
                          required
                          value={accountForm.parent_password}
                          onChange={handleAccountChange}
                          placeholder="Password Akun Orang Tua"
                          className="w-full px-4 py-3 rounded-xl border border-rose-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={updatingAccount || (!accountForm.email && !accountForm.password)}
                        className="px-6 py-3 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                      >
                        {updatingAccount ? "Menyimpan..." : "Simpan Perubahan"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
