"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BuildingIcon, Mail, Lock, Eye, EyeOff, Loader2Icon, ArrowLeftIcon,
} from "lucide-react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { user } = await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal login. Periksa email dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-900 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-900 rounded-xl flex items-center justify-center shadow-lg shadow-rose-900/20">
              <BuildingIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Masuk</h1>
              <p className="text-gray-500">Batamerah Learning Center</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                  placeholder="Masukkan password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2Icon className="w-5 h-5 animate-spin" /> Memproses...</>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Belum punya akun?{" "}
              <Link href="/register" className="text-rose-900 font-semibold hover:underline">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
