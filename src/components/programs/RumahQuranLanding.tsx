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
  MoonIcon,
  BookMarkedIcon,
  ClockIcon,
  TargetIcon,
} from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda", icon: HomeIcon },
  { label: "Tentang", href: "#tentang", icon: InfoIcon },
  { label: "Keunggulan", href: "#keunggulan", icon: AwardIcon },
  { label: "Program", href: "#program", icon: ListIcon },
  { label: "Hubungi", href: "#kontak", icon: MessageCircleIcon },
];

const keunggulan = [
  {
    icon: BookMarkedIcon,
    title: "Metode Tahsin Berjenjang",
    description:
      "Kurikulum tahsin terstruktur dari dasar hingga mahir, disesuaikan dengan kemampuan masing-masing peserta.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: UsersIcon,
    title: "Komunitas Qurani",
    description:
      "Bergabung dengan komunitas anak muda yang sama-sama bersemangat mempelajari Al-Quran.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: TargetIcon,
    title: "Target Hafalan",
    description:
      "Program hafalan dengan target yang terukur dan pendampingan muroja'ah rutin.",
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    icon: ClockIcon,
    title: "Jadwal Fleksibel",
    description:
      "Waktu belajar yang dirancang agar tidak mengganggu jadwal kuliah atau sekolah.",
    color: "bg-sky-50 text-sky-600",
  },
];

const programBelajar = [
  {
    title: "Tahsin Al-Quran",
    desc: "Perbaikan bacaan Al-Quran dengan kaidah tajwid yang benar.",
  },
  {
    title: "Tahfidz Al-Quran",
    desc: "Program menghafal Al-Quran dengan metode yang mudah dan menyenangkan.",
  },
  {
    title: "Kajian Tafsir",
    desc: "Memahami makna dan kandungan ayat-ayat Al-Quran.",
  },
  {
    title: "Fiqih Ibadah",
    desc: "Belajar hukum-hukum ibadah sehari-hari sesuai tuntunan Rasulullah.",
  },
  {
    title: "Pembinaan Akhlak",
    desc: "Membentuk karakter Islami melalui suri tauladan Nabi.",
  },
  {
    title: "Muroja'ah Bersama",
    desc: "Saling menyimak hafalan bersama teman untuk memperkuat ingatan.",
  },
];

export default function RumahQuranLanding() {
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
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
              <MoonIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800">
                Rumah Quran Baitussalam
              </h1>
              <p className="text-[10px] text-gray-400">Purwokerto</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <a
            href="https://wa.me/628112841212?text=Assalamu'alaikum,%20saya%20ingin%20mendaftar%20program%20Rumah%20Quran%20Baitussalam"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Daftar Sekarang
          </a>
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
                className="flex flex-col items-center gap-0.5 py-1.5 px-3 text-gray-500 hover:text-emerald-600 transition-colors"
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
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-5 lg:px-6 relative z-10">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
                <SparklesIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-600">
                  Pendaftaran Dibuka!
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Rumah Quran{" "}
                <span className="text-emerald-500">Baitussalam</span>{" "}
                Purwokerto
              </h1>

              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-8 max-w-xl">
                Program bimbingan belajar mengaji untuk{" "}
                <strong className="text-gray-700">SMA dan Mahasiswa</strong>.
                Dalami Al-Quran bersama para pengajar berpengalaman dalam
                suasana yang penuh ukhuwah.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/628112841212?text=Assalamu'alaikum,%20saya%20ingin%20mendaftar%20program%20Rumah%20Quran%20Baitussalam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-2xl text-center hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                >
                  Daftar Sekarang
                </a>
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
                <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <div className="text-center text-white p-10">
                    <MoonIcon className="w-20 h-20 mx-auto mb-6 opacity-90" />
                    <h2 className="text-3xl font-bold mb-2">Rumah Quran</h2>
                    <p className="text-emerald-100 text-lg">Baitussalam</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-teal-400 rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
                  <BookOpenIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-400 rounded-2xl -rotate-12 flex items-center justify-center shadow-lg">
                  <StarIcon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= TENTANG SECTION ======= */}
      <section id="tentang" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
              <InfoIcon className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Tentang Program
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apa itu Rumah Quran Baitussalam?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Rumah Quran Baitussalam adalah program bimbingan belajar mengaji
              yang dikhususkan untuk siswa <strong>SMA</strong> dan{" "}
              <strong>Mahasiswa</strong> di wilayah Purwokerto dan sekitarnya.
              Kami hadir untuk membantu generasi muda mengenal, membaca, dan
              mendalami Al-Quran.
            </p>
          </div>

          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:flex-1 mb-8 lg:mb-0">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 lg:p-12 text-white">
                <GraduationCapIcon className="w-12 h-12 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-4">
                  Menumbuhkan Generasi Cinta Al-Quran
                </h3>
                <p className="text-emerald-100 leading-relaxed text-sm lg:text-base">
                  Di usia remaja dan dewasa muda, mempelajari Al-Quran
                  memberikan fondasi spiritual yang kuat. Kami menyediakan
                  lingkungan belajar yang mendukung dengan metode tahsin
                  berjenjang, program tahfidz terstruktur, dan kajian yang
                  memperdalam pemahaman tentang Islam. Bersama Rumah Quran
                  Baitussalam, belajar mengaji menjadi perjalanan yang bermakna.
                </p>
              </div>
            </div>

            <div className="lg:flex-1 space-y-4">
              {[
                {
                  emoji: "🎓",
                  title: "SMA & Mahasiswa",
                  desc: "Dirancang khusus untuk kebutuhan dan gaya belajar remaja dan dewasa muda.",
                },
                {
                  emoji: "🤝",
                  title: "Ukhuwah Islamiyah",
                  desc: "Membangun persaudaraan sesama pemuda Muslim melalui kegiatan bersama.",
                },
                {
                  emoji: "🕌",
                  title: "Berbasis Masjid",
                  desc: "Pembelajaran berlangsung di lingkungan masjid yang kondusif dan nyaman.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-emerald-200 transition-colors"
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

      {/* ======= KEUNGGULAN SECTION ======= */}
      <section id="keunggulan" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-4">
              <AwardIcon className="w-4 h-4 text-teal-500" />
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Keunggulan
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Belajar di Sini?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Kami menghadirkan pengalaman belajar Al-Quran terbaik untuk anak
              muda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {keunggulan.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
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

      {/* ======= PROGRAM BELAJAR SECTION ======= */}
      <section id="program" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
              <ListIcon className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Program Belajar
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apa Saja yang Dipelajari?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Materi yang komprehensif untuk membangun pemahaman Al-Quran secara
              menyeluruh.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {programBelajar.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA / KONTAK SECTION ======= */}
      <section id="kontak" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Bergabunglah Bersama Kami!
              </h2>
              <p className="text-emerald-100 mb-8 max-w-lg mx-auto text-sm lg:text-base">
                Jangan tunda untuk memperdalam ilmu Al-Quran. Daftarkan diri
                Anda sekarang dan mulai perjalanan spiritual Anda bersama Rumah
                Quran Baitussalam.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/628112841212?text=Assalamu'alaikum,%20saya%20ingin%20mendaftar%20program%20Rumah%20Quran%20Baitussalam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  <PhoneIcon className="w-5 h-5" />
                  Hubungi via WhatsApp
                </a>
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

      {/* ======= FOOTER ======= */}
      <footer className="py-8 lg:py-12 border-t border-gray-100 pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <MoonIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Rumah Quran Baitussalam
                </p>
                <p className="text-[10px] text-gray-400">Purwokerto</p>
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
