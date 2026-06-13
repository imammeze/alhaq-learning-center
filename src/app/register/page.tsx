"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  BuildingIcon, ArrowLeftIcon, CheckCircle2Icon, Loader2Icon,
  Users, User, Mail, Phone, Lock, Eye, EyeOff, Map, CalendarDays,
  MapPin, Activity
} from "lucide-react";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialProgramCode = searchParams.get("program_code") || "alhaq-kids";
  const initialType = searchParams.get("type") as "parent" | "student" | null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<"parent" | "student" | null>(initialType);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api`;

  const [formData, setFormData] = useState({
    parent_name: "",
    email: "",
    password: "",
    whatsapp_number: "",
    student_email: "",
    student_full_name: "",
    student_nickname: "",
    birth_place: "",
    birth_date: "",
    gender: "",
    birth_order: "",
    sibling_count: "",
    address: "",
    medical_history: "",
    program_code: initialProgramCode,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(prev => (prev + 1) as 1 | 2 | 3);
  };

  const handlePrevStep = () => {
    setStep(prev => (prev - 1) as 1 | 2 | 3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "parent" && step === 2) {
      handleNextStep();
      return;
    }

    setLoading(true);
    setErrorMsg("");
    
    const endpoint = role === "parent" ? "/register-parent" : "/register-student";
    
    let payload: any = {};
    if (role === "parent") {
      payload = {
        parent_name: formData.parent_name,
        email: formData.email,
        password: formData.password,
        whatsapp_number: formData.whatsapp_number,
        student_email: formData.student_email,
        student_full_name: formData.student_full_name,
        student_nickname: formData.student_nickname,
        birth_place: formData.birth_place,
        birth_date: formData.birth_date,
        gender: formData.gender,
        birth_order: formData.birth_order ? parseInt(formData.birth_order) : null,
        sibling_count: formData.sibling_count ? parseInt(formData.sibling_count) : null,
        address: formData.address,
        medical_history: formData.medical_history,
        program_code: formData.program_code
      };
    } else {
      payload = {
        name: formData.student_full_name,
        email: formData.email,
        password: formData.password,
        whatsapp_number: formData.whatsapp_number,
        full_name: formData.student_full_name,
        nickname: formData.student_nickname,
        birth_place: formData.birth_place,
        birth_date: formData.birth_date,
        gender: formData.gender,
        birth_order: formData.birth_order ? parseInt(formData.birth_order) : null,
        sibling_count: formData.sibling_count ? parseInt(formData.sibling_count) : null,
        address: formData.address,
        medical_history: formData.medical_history,
        program_code: formData.program_code
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Terjadi kesalahan saat pendaftaran");
      }

      if (data.token && data.user) {
        import("@/lib/auth").then(({ setToken, setUser }) => {
          setToken(data.token);
          setUser(data.user);
        });
      }
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal menghubungi server. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2Icon className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Akun Anda {role === "parent" && "dan anak Anda "}berhasil dibuat. Silakan masuk ke dashboard Anda.
          </p>
          <Link href="/dashboard" className="inline-block w-full py-3.5 bg-rose-900 text-white font-bold rounded-xl hover:bg-rose-950 transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center">
            Masuk ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-900 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-900 rounded-xl flex items-center justify-center shadow-lg shadow-rose-900/20">
                <BuildingIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Pendaftaran Online</h1>
                <p className="text-gray-500">Batamerah Learning Center</p>
              </div>
            </div>
            <Link 
              href="/login"
              className="px-4 py-2 bg-white text-rose-900 text-sm font-bold rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors hidden sm:block"
            >
              Masuk
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">
                Langkah {step} dari {role === "parent" ? 3 : 2}
              </span>
              <span className="text-sm font-medium text-rose-900">
                {step === 1 && "Pilih Peran"}
                {step === 2 && role === "parent" && "Data Orang Tua"}
                {step === 2 && role === "student" && "Data Siswa"}
                {step === 3 && "Data Anak"}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-in-out rounded-full bg-rose-900"
                style={{ width: `${(step / (role === "parent" ? 3 : 2)) * 100}%` }}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {errorMsg}
            </div>
          )}

          {/* Forms Content */}
          <div className="mt-6">
            
            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setRole("parent")}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                      role === "parent"
                        ? "border-rose-900 bg-rose-50/50 shadow-md shadow-rose-900/10"
                        : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${role === "parent" ? "bg-rose-900 text-white" : "bg-gray-100 text-gray-500"}`}>
                      <Users className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">Orang Tua</h3>
                    <p className="text-sm text-gray-500 mt-2">Daftar untuk mendaftarkan dan memantau perkembangan belajar anak Anda.</p>
                    {role === "parent" && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-4 border-white bg-rose-900 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => setRole("student")}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                      role === "student"
                        ? "border-rose-900 bg-rose-50/50 shadow-md shadow-rose-900/10"
                        : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${role === "student" ? "bg-rose-900 text-white" : "bg-gray-100 text-gray-500"}`}>
                      <User className="w-7 h-7" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">Siswa Mandiri</h3>
                    <p className="text-sm text-gray-500 mt-2">Daftar sebagai siswa untuk mengakses modul pembelajaran dan kelas Anda.</p>
                    {role === "student" && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-4 border-white bg-rose-900 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  disabled={!role}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all shadow-sm ${
                    role ? "bg-rose-900 hover:bg-rose-950 hover:shadow-md hover:-translate-y-0.5" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Lanjutkan
                </button>
              </div>
            )}
            
            {/* STEP 2: PARENT FORM OR STUDENT FORM */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Program <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={
                      formData.program_code === "alhaq-kids" ? "Alhaq Kids Center" :
                      formData.program_code === "rumah-quran" ? "Rumah Quran" :
                      formData.program_code === "prestasi-ceria" ? "Prestasi Ceria (English Course)" :
                      ""
                    }
                    readOnly
                    disabled
                    className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-shadow bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Nama Lengkap {role === "parent" ? "(Orang Tua)" : "(Siswa)"} <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name={role === "parent" ? "parent_name" : "student_full_name"}
                      value={role === "parent" ? formData.parent_name : formData.student_full_name}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">No. WhatsApp <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      placeholder="081234567890"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Password Akun <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
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

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-1/3 py-3 px-4 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 py-3 px-4 rounded-xl font-medium text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all bg-rose-900 hover:bg-rose-950 flex justify-center items-center"
                  >
                    {loading ? (
                      <><Loader2Icon className="w-5 h-5 animate-spin mr-2" /> Memproses...</>
                    ) : (
                      role === "parent" ? "Lanjut ke Data Anak" : "Selesaikan Pendaftaran"
                    )}
                  </button>
                </div>
              </form>
            )}
            
            {/* STEP 3: CHILD FORM (For Parent Role Only) */}
            {step === 3 && role === "parent" && (
              <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="p-4 rounded-xl border mb-6 bg-rose-50/50 border-rose-100">
                  <p className="text-sm text-rose-800">
                    Sistem akan membuatkan akun untuk anak Anda. Password akan dikirimkan ke email pendaftar.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Nama Lengkap Anak <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="student_full_name"
                      value={formData.student_full_name}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      placeholder="Masukkan nama lengkap anak"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email Anak <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="student_email"
                      value={formData.student_email}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      placeholder="email.anak@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Nama Panggilan</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="student_nickname"
                        value={formData.student_nickname}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
                    <div className="flex gap-4 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value="L" onChange={handleInputChange} className="w-4 h-4 text-rose-900 focus:ring-rose-900/20" />
                        <span className="text-sm text-gray-700">Laki-laki</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value="P" onChange={handleInputChange} className="w-4 h-4 text-rose-900 focus:ring-rose-900/20" />
                        <span className="text-sm text-gray-700">Perempuan</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Tempat Lahir</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Map className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="birth_place"
                        value={formData.birth_place}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarDays className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Status Anak</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-700">Anak ke-</span>
                    <input
                      type="number"
                      min="1"
                      name="birth_order"
                      value={formData.birth_order}
                      onChange={handleInputChange}
                      className="block w-16 px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-center text-sm text-gray-900"
                    />
                    <span className="text-sm text-gray-700">dari</span>
                    <input
                      type="number"
                      min="1"
                      name="sibling_count"
                      value={formData.sibling_count}
                      onChange={handleInputChange}
                      className="block w-16 px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-center text-sm text-gray-900"
                    />
                    <span className="text-sm text-gray-700">bersaudara</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Riwayat Penyakit <span className="text-gray-400 font-normal">(Opsional)</span></label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <Activity className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      rows={2}
                      name="medical_history"
                      value={formData.medical_history}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-900/20 focus:border-rose-900 outline-none text-sm text-gray-900 transition-shadow resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={loading}
                    className="w-1/3 py-3 px-4 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 py-3 px-4 rounded-xl font-medium text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all bg-rose-900 hover:bg-rose-950 flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <><Loader2Icon className="w-5 h-5 animate-spin" /> Memproses...</>
                    ) : (
                      "Selesaikan Pendaftaran"
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
