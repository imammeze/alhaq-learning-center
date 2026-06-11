"use client";

import Link from "next/link";
import {
  BookOpenIcon,
  MoonIcon,
  AwardIcon,
  SparklesIcon,
  UsersIcon,
  HeartIcon,
  GraduationCapIcon,
  ChevronRightIcon,
  BuildingIcon,
  CheckCircle2Icon,
  HomeIcon,
  InfoIcon,
  PhoneIcon,
  LogInIcon
} from "lucide-react";

export default function LearningCenterPortal() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* ======= NAVBAR ======= */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-900 flex items-center justify-center">
              <BuildingIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800">
                Batamerah Learning Center
              </h1>
              <p className="text-[10px] text-gray-500">
                Yayasan Bata Merah Purwokerto
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#program" className="text-sm font-medium text-gray-600 hover:text-rose-900 transition-colors">Program Kami</a>
            <a href="#tentang" className="text-sm font-medium text-gray-600 hover:text-rose-900 transition-colors">Tentang Kami</a>
            <a href="#hubungi" className="text-sm font-medium text-gray-600 hover:text-rose-900 transition-colors">Hubungi</a>
            <Link href="/login" className="px-5 py-2.5 bg-rose-900 text-white text-sm font-bold rounded-xl hover:bg-rose-950 transition-colors">
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      {/* ======= HERO SECTION ======= */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3" />

        <div className="max-w-6xl mx-auto px-5 lg:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full mb-6">
            <SparklesIcon className="w-4 h-4 text-rose-900" />
            <span className="text-xs font-bold text-rose-950">
              Pusat Pendidikan & Bimbingan Belajar
            </span>
          </div>

          <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Membangun Generasi <br className="hidden md:block" />
            <span className="text-rose-800">
              Cerdas & Berakhlak Mulia
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            Pusat bimbingan belajar berkualitas mulai dari usia dini hingga dewasa. 
            Kami memadukan pendidikan umum dengan nilai-nilai spiritual Islam yang kuat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#program"
              className="px-8 py-4 bg-rose-900 text-white font-bold rounded-2xl text-center hover:bg-rose-950 transition-all shadow-xl shadow-rose-900/25 hover:shadow-2xl hover:shadow-rose-900/30 hover:-translate-y-0.5"
            >
              Lihat Program Kami
            </a>
          </div>
        </div>
      </section>

      <section id="program" className="py-16 lg:py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pilih Program yang Tepat
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Berbagai pilihan program edukasi unggulan yang disesuaikan dengan kelompok usia 
              dan kebutuhan pembelajaran Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Alhaq Kids */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <BookOpenIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Alhaq Kids Center</h3>
              <p className="text-blue-600 font-semibold text-sm mb-4">TK & SD Kelas Awal (4-12 Tahun)</p>
              <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                Bimbingan belajar mengaji yang menyenangkan dan interaktif untuk anak. 
                Memperkenalkan Al-Quran dengan penuh kasih sayang.
              </p>
              <ul className="space-y-3 mb-8">
                {["Pengenalan Huruf Hijaiyah", "Hafalan Surat Pendek", "Metode Bermain"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2Icon className="w-4 h-4 text-blue-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/alhaq-kids"
                className="w-full py-4 bg-gray-50 text-gray-900 font-bold rounded-xl text-center hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn mt-auto"
              >
                Lihat Detail
                <ChevronRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 2: Rumah Quran */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-emerald-900/5 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all group flex flex-col h-full md:-translate-y-4">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-bl-2xl rounded-tr-[2rem]">
                POPULER
              </div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MoonIcon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rumah Quran</h3>
              <p className="text-emerald-600 font-semibold text-sm mb-4">SMA & Mahasiswa</p>
              <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                Program perbaikan bacaan (Tahsin) dan hafalan (Tahfidz) Al-Quran 
                yang disesuaikan dengan aktivitas anak muda.
              </p>
              <ul className="space-y-3 mb-8">
                {["Metode Tahsin Berjenjang", "Pendampingan Tahfidz", "Lingkungan Solid"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/rumah-quran"
                className="w-full py-4 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-center hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn mt-auto"
              >
                Lihat Detail
                <ChevronRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 3: Prestasi Ceria */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <AwardIcon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prestasi Ceria</h3>
              <p className="text-amber-600 font-semibold text-sm mb-4">Semua Jenjang Umur</p>
              <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                English course komprehensif yang dirancang untuk meningkatkan 
                kemampuan komunikasi bahasa internasional dengan percaya diri.
              </p>
              <ul className="space-y-3 mb-8">
                {["Fokus Active Speaking", "Materi Aplikatif", "Tutor Berpengalaman"].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2Icon className="w-4 h-4 text-amber-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/prestasi-ceria"
                className="w-full py-4 bg-gray-50 text-gray-900 font-bold rounded-xl text-center hover:bg-amber-500 hover:text-white transition-colors flex items-center justify-center gap-2 group/btn mt-auto"
              >
                Lihat Detail
                <ChevronRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======= TENTANG KAMI ======= */}
      <section id="tentang" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="bg-rose-950 rounded-[3rem] p-8 lg:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 lg:flex lg:items-center gap-16">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                  <GraduationCapIcon className="w-4 h-4 text-rose-300" />
                  <span className="text-xs font-bold text-rose-100">Visi Kami</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                  Kenapa Memilih Batamerah Learning Center?
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Berdiri di bawah naungan Yayasan Masjid Al Haq Bata Merah, 
                  kami mendedikasikan diri untuk mencetak generasi yang tidak 
                  hanya cerdas secara akademis, namun juga memiliki kedalaman 
                  spiritual dan akhlak yang mulia.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: UsersIcon, text: "Fasilitator dan Tutor Profesional" },
                    { icon: HeartIcon, text: "Lingkungan Belajar yang Islami & Nyaman" },
                    { icon: BuildingIcon, text: "Fasilitas Belajar Berbasis Masjid Terpadu" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-rose-300" />
                      </div>
                      <span className="font-medium text-slate-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                {/* Decorative image placeholder */}
                <div className="aspect-[4/5] bg-rose-500/20 rounded-[2rem] border border-white/10 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <BuildingIcon className="w-32 h-32 text-rose-400/50 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Masjid Al-Haq</h3>
                  <p className="text-rose-200">Bata Merah, Purwokerto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer id="hubungi" className="bg-slate-50 pt-16 pb-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-900 flex items-center justify-center">
                <BuildingIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Batamerah Learning Center</h2>
                <p className="text-xs text-gray-500">Yayasan Bata Merah Purwokerto</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/628112841212" 
                target="_blank"
                className="px-6 py-3 bg-rose-50 text-rose-900 font-semibold rounded-xl hover:bg-rose-100 transition-colors"
              >
                Hubungi Admin Kami
              </a>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Yayasan Masjid Al Haq Bata Merah Purwokerto. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ======= BOTTOM NAVBAR (MOBILE) ======= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
        <div className="flex items-center justify-around px-2 py-2">
          <a href="#" className="flex flex-col items-center gap-1 py-1.5 px-3 text-rose-900 transition-colors">
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium">Beranda</span>
          </a>
          <a href="#program" className="flex flex-col items-center gap-1 py-1.5 px-3 text-gray-500 hover:text-rose-900 transition-colors">
            <BookOpenIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium">Program</span>
          </a>
          <a href="#tentang" className="flex flex-col items-center gap-1 py-1.5 px-3 text-gray-500 hover:text-rose-900 transition-colors">
            <InfoIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium">Tentang</span>
          </a>
          <Link href="/login" className="flex flex-col items-center gap-1 py-1.5 px-3 text-gray-500 hover:text-rose-900 transition-colors">
            <LogInIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium">Login</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
