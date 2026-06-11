"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, Loader2Icon, ArrowLeftIcon, KeyRoundIcon, CheckCircle2Icon } from "lucide-react";
import { resetPassword } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!token || !email) {
    return (
      <div className="text-center p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100">
        <p className="font-semibold">Tautan Tidak Valid</p>
        <p className="text-sm mt-2">Tautan reset password ini tidak memiliki token atau email yang valid. Silakan periksa kembali email Anda.</p>
        <Link href="/login" className="inline-block mt-4 px-4 py-2 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors border border-red-200">
          Kembali ke Login
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (password !== passwordConfirmation) {
      setErrorMsg("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const res = await resetPassword({ email, token, password, password_confirmation: passwordConfirmation });
      if (res.message && res.message.includes("berhasil")) {
        setSuccessMsg(res.message);
        // Automatically redirect to login after a few seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        throw new Error(res.message || "Gagal mengubah password.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan. Pastikan tautan masih berlaku.");
    } finally {
      setLoading(false);
    }
  };

  if (successMsg) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
        <CheckCircle2Icon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Berhasil!</h3>
        <p className="text-green-700">{successMsg}</p>
        <p className="text-sm text-green-600 mt-2">Mengarahkan ke halaman login...</p>
        <Link href="/login" className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors">
          Login Sekarang
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="p-4 bg-rose-50 text-rose-900 rounded-xl text-sm border border-rose-100 flex flex-col gap-1">
          <span className="font-semibold">Reset Password Untuk:</span>
          <span className="opacity-80 truncate">{email}</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Password Baru</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
              placeholder="Minimal 8 karakter"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              minLength={8}
              className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
              placeholder="Ulangi password baru"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !password || !passwordConfirmation}
          className="w-full py-3.5 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2 mt-4"
        >
          {loading ? (
            <><Loader2Icon className="w-5 h-5 animate-spin" /> Memproses...</>
          ) : (
            "Simpan Password Baru"
          )}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-900 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Batal & Kembali ke Login</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-900 rounded-xl flex items-center justify-center shadow-lg shadow-rose-900/20">
              <KeyRoundIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buat Password</h1>
              <p className="text-gray-500">Perbarui password akun Anda</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <Suspense fallback={<div className="flex justify-center p-8"><Loader2Icon className="w-8 h-8 animate-spin text-rose-900" /></div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
