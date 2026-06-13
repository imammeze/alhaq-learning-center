"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, BookOpenIcon, CheckCircle2Icon } from "lucide-react";
import { registerNewChild } from "@/lib/api";

const programs = [
  { code: "alhaq-kids", name: "Al-Haq Kids" },
  { code: "rumah-quran", name: "Rumah Qur'an" },
  { code: "prestasi-ceria", name: "Prestasi Ceria Academy" },
];

export default function NewChildPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    program_code: "",
    student_full_name: "",
    student_nickname: "",
    student_email: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    birth_order: "",
    sibling_count: "",
    address: "",
    medical_history: "",
    notes: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.program_code) {
      setErrorMsg("Silakan pilih program terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerNewChild(formData);
      if (data.errors || data.error || !data.data) {
        throw new Error(data.message || "Terjadi kesalahan saat pendaftaran");
      }
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan yang tidak terduga.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-white rounded-3xl p-8 lg:p-12 text-center shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2Icon className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Pendaftaran Berhasil!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Data anak Anda telah berhasil didaftarkan. Anda dapat memantau status pendaftarannya melalui halaman Data Anak.
          </p>
          <button
            onClick={() => router.push('/dashboard/children')}
            className="inline-block px-8 py-3.5 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Kembali ke Data Anak
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/children" className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftarkan Anak Baru</h1>
          <p className="text-gray-500 text-sm mt-1">Lengkapi formulir di bawah ini untuk mendaftarkan anak Anda ke program Al-Haq.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 lg:p-8">
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpenIcon className="w-5 h-5 text-rose-900" /> Program
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programs.map((prog) => (
                <label
                  key={prog.code}
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.program_code === prog.code
                      ? "border-rose-900 bg-rose-50 ring-1 ring-rose-900"
                      : "border-gray-200 hover:border-rose-300 hover:bg-rose-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="program_code"
                    value={prog.code}
                    checked={formData.program_code === prog.code}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-900 border-gray-300 focus:ring-rose-900"
                  />
                  <span className="ml-3 font-semibold text-gray-900">{prog.name}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Data Pribadi Anak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-900">Nama Lengkap Anak *</label>
                <input
                  type="text"
                  name="student_full_name"
                  required
                  value={formData.student_full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                  placeholder="Masukkan nama lengkap anak"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900">Nama Panggilan</label>
                <input
                  type="text"
                  name="student_nickname"
                  value={formData.student_nickname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                  placeholder="Nama panggilan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900">Email Anak *</label>
                <input
                  type="email"
                  name="student_email"
                  required
                  value={formData.student_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                  placeholder="Email untuk akun anak"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900">Tempat Lahir</label>
                <input
                  type="text"
                  name="birth_place"
                  value={formData.birth_place}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900">Tanggal Lahir</label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900">Jenis Kelamin</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all bg-white"
                >
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-900">Anak Ke-</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="birth_order"
                    min="1"
                    value={formData.birth_order}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                    placeholder="Ke"
                  />
                  <span className="text-gray-500 font-medium">dari</span>
                  <input
                    type="number"
                    name="sibling_count"
                    min="1"
                    value={formData.sibling_count}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all"
                    placeholder="Total bersaudara"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-900">Alamat Lengkap</label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all resize-none"
                  placeholder="Alamat domisili saat ini"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-900">Riwayat Penyakit (Opsional)</label>
                <textarea
                  name="medical_history"
                  rows={2}
                  value={formData.medical_history}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all resize-none"
                  placeholder="Kosongkan jika tidak ada"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-900">Catatan Tambahan (Opsional)</label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-all resize-none"
                  placeholder="Informasi lain yang perlu diketahui"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Mendaftarkan...
                </>
              ) : (
                "Daftarkan Anak Sekarang"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
