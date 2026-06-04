"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  StarIcon,
  UsersIcon,
  HeartIcon,
  SparklesIcon,
  GraduationCapIcon,
  PhoneIcon,
  HomeIcon,
  InfoIcon,
  AwardIcon,
  ListIcon,
  MessageCircleIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
} from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda", icon: HomeIcon },
  { label: "Tentang", href: "#tentang", icon: InfoIcon },
  { label: "Keunggulan", href: "#keunggulan", icon: AwardIcon },
  { label: "Kurikulum", href: "#kurikulum", icon: ListIcon },
  { label: "Hubungi", href: "#kontak", icon: MessageCircleIcon },
];

const keunggulan = [
  {
    icon: SparklesIcon,
    title: "Metode Menyenangkan",
    description:
      "Belajar mengaji dengan pendekatan bermain dan interaktif yang membuat anak semangat belajar.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: UsersIcon,
    title: "Pengajar Berpengalaman",
    description:
      "Dibimbing oleh ustadz/ustadzah yang profesional dan berpengalaman dalam mengajar anak.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: HeartIcon,
    title: "Lingkungan Islami",
    description:
      "Suasana belajar yang nyaman dan Islami, membentuk akhlak mulia sejak dini.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: StarIcon,
    title: "Kelas Kecil",
    description:
      "Jumlah murid terbatas per kelas agar setiap anak mendapat perhatian penuh.",
    color: "bg-amber-50 text-amber-600",
  },
];

const kurikulum = [
  "Pengenalan Huruf Hijaiyah",
  "Belajar Membaca Iqro / Metode Tilawati",
  "Hafalan Surat-Surat Pendek (Juz 30)",
  "Hafalan Doa Harian",
  "Adab dan Akhlak Islami",
  "Kisah-Kisah Nabi & Rasul",
  "Creative Day"
];

export default function AlhaqKidsLanding() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setMobileNavOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800">
                Alhaq Kids Center
              </h1>
              <p className="text-[10px] text-gray-400">
                Masjid Al Haq Bata Merah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/login"
              className="hidden sm:block px-5 py-2.5 text-blue-600 text-sm font-bold hover:bg-blue-50 rounded-xl transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register?program_code=alhaq-kids&type=parent"
              className="px-5 py-2.5 bg-blue-500 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around px-2 py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="flex flex-col items-center gap-0.5 py-1.5 px-3 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-bold">{link.label}</span>
              </button>
            );
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>

      <section
        id="beranda"
        className="relative overflow-hidden pt-20 lg:pt-32 pb-16 lg:pb-24"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-5 lg:px-6 relative z-10">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                <SparklesIcon className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-blue-600">
                  Pendaftaran Dibuka!
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Belajar Mengaji{" "}
                <span className="text-blue-500">Menyenangkan</span> untuk Si
                Kecil
              </h1>

              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-8 max-w-xl">
                Program bimbingan belajar mengaji untuk anak usia{" "}
                <strong className="text-gray-700">4 – 12 tahun</strong> (TK &
                SD) dengan metode yang interaktif dan penuh kasih sayang.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/register?program_id=1&type=parent"
                  className="px-8 py-4 bg-blue-500 text-white font-bold rounded-2xl text-center hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                >
                  Daftar Sekarang
                </Link>
                <button
                  onClick={() => scrollToSection("#tentang")}
                  className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl text-center hover:bg-gray-200 transition-all"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>

            <div className="hidden lg:block lg:flex-1">
              <div className="relative">
                <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <div className="text-center text-white p-10">
                    <BookOpenIcon className="w-20 h-20 mx-auto mb-6 opacity-90" />
                    <h2 className="text-3xl font-bold mb-2">Alhaq Kids</h2>
                    <p className="text-blue-100 text-lg">Center</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400 rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-400 rounded-2xl -rotate-12 flex items-center justify-center shadow-lg">
                  <HeartIcon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <InfoIcon className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Tentang Program
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apa itu Alhaq Kids Center?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Alhaq Kids Center adalah program bimbingan belajar mengaji yang
              diselenggarakan oleh Masjid Al Haq Bata Merah Purwokerto,
              khusus dirancang untuk anak-anak usia <strong>4 – 12 tahun</strong>{" "}
              (TK dan SD kelas awal).
            </p>
          </div>

          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:flex-1 mb-8 lg:mb-0">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white">
                <GraduationCapIcon className="w-12 h-12 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-4">
                  Membentuk Generasi Qurani Sejak Dini
                </h3>
                <p className="text-blue-100 leading-relaxed text-sm lg:text-base">
                  Kami percaya bahwa masa kanak-kanak adalah waktu emas untuk
                  menanamkan kecintaan terhadap Al-Quran. Melalui metode
                  pembelajaran yang menyenangkan, kami membantu anak-anak
                  mengenal huruf hijaiyah, belajar membaca Al-Quran, dan
                  menghafal surat-surat pendek dengan penuh kegembiraan.
                </p>
              </div>
            </div>

            <div className="lg:flex-1 space-y-4">
              {[
                {
                  emoji: "🕐",
                  title: "Jadwal Terstruktur",
                  desc: "Waktu belajar hari selasa, kamis, dan sabtu pukul 16.00-17.00 WIB",
                },
                {
                  emoji: "👧",
                  title: "Usia 4 – 12 Tahun",
                  desc: "Khusus untuk anak TK dan SD kelas awal.",
                },
                {
                  emoji: "🏠",
                  title: "Di Masjid Al Haq",
                  desc: "Bertempat di lingkungan masjid yang aman dan nyaman.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors"
                >
                  <div className="text-2xl">{item.emoji}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="keunggulan" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
              <AwardIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Keunggulan
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Kami berkomitmen memberikan pengalaman belajar terbaik untuk anak
              Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {keunggulan.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="kurikulum" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
              <ListIcon className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Kurikulum
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apa yang Dipelajari?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Materi pembelajaran yang terstruktur dan sesuai untuk usia
              anak-anak.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-3">
              {kurikulum.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="kontak" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Daftarkan Anak Anda Sekarang!
              </h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto text-sm lg:text-base">
                Jangan lewatkan kesempatan emas untuk memperkenalkan anak Anda
                pada keindahan Al-Quran sejak dini. Hubungi kami untuk informasi
                pendaftaran.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/register?program_id=1&type=parent" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Daftar via Formulir
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Kembali ke Beranda
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 lg:py-12 border-t border-gray-100 pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <BookOpenIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Alhaq Kids Center
                </p>
                <p className="text-[10px] text-gray-400">
                  Masjid Al Haq Bata Merah Purwokerto
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Yayasan Bata Merah Purwokerto. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
