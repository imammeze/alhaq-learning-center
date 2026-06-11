"use client";

import { useState } from "react";
import Link from "next/link";
import {
  StarIcon,
  UsersIcon,
  HeartIcon,
  SparklesIcon,
  PhoneIcon,
  HomeIcon,
  InfoIcon,
  AwardIcon,
  ListIcon,
  MessageCircleIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
  GlobeIcon,
  HeadphonesIcon,
  MessageSquareIcon,
  BookOpenIcon,
  GraduationCapIcon,
} from "lucide-react";
import ArticleList from "../ArticleList";

const navLinks = [
  { label: "Beranda", href: "#beranda", icon: HomeIcon },
  { label: "Tentang", href: "#tentang", icon: InfoIcon },
  { label: "Keunggulan", href: "#keunggulan", icon: AwardIcon },
  { label: "Materi", href: "#materi", icon: ListIcon },
  { label: "Hubungi", href: "#kontak", icon: MessageCircleIcon },
];

const keunggulan = [
  {
    icon: MessageSquareIcon,
    title: "Fokus Speaking",
    description:
      "Penekanan pada kemampuan berbicara agar lebih percaya diri berkomunikasi dalam bahasa Inggris.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: UsersIcon,
    title: "Semua Umur",
    description:
      "Program yang dirancang khusus untuk berbagai jenjang usia, mulai dari anak-anak hingga dewasa.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: GlobeIcon,
    title: "Materi Aplikatif",
    description:
      "Belajar bahasa Inggris dengan materi yang relevan dan dapat langsung dipraktikkan di dunia nyata.",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: StarIcon,
    title: "Tutor Kompeten",
    description:
      "Dibimbing oleh pengajar yang berpengalaman dan interaktif dalam menyampaikan materi.",
    color: "bg-rose-50 text-rose-600",
  },
];

const programBelajar = [
  {
    title: "Speaking Practice",
    desc: "Melatih percakapan sehari-hari dengan pronunciation yang tepat.",
  },
  {
    title: "Listening Comprehension",
    desc: "Memahami percakapan dan audio bahasa Inggris dari penutur asli.",
  },
  {
    title: "Grammar in Use",
    desc: "Mempelajari tata bahasa secara praktis, bukan sekadar teori.",
  },
  {
    title: "Reading & Vocabulary",
    desc: "Memperkaya kosakata baru melalui bacaan-bacaan menarik.",
  },
  {
    title: "Writing Skills",
    desc: "Latihan menulis kalimat dan paragraf dengan struktur yang benar.",
  },
  {
    title: "English Fun Games",
    desc: "Permainan seru berbahasa Inggris untuk meningkatkan semangat belajar.",
  },
];

export default function PrestasiCeriaLanding() {
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
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
              <AwardIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-800">
                Prestasi Ceria Academy
              </h1>
              <p className="text-[10px] text-gray-400">English Course</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block px-5 py-2.5 text-amber-600 text-sm font-bold hover:bg-amber-50 rounded-xl transition-colors">
              Masuk
            </Link>
            <Link
              href="/register?program_code=prestasi-ceria&type=student"
              className="px-5 py-2.5 bg-amber-500 text-white text-sm font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20">
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
                className="flex flex-col items-center gap-0.5 py-1.5 px-3 text-gray-500 hover:text-amber-600 transition-colors">
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
        className="relative overflow-hidden pt-20 lg:pt-32 pb-16 lg:pb-24">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-5 lg:px-6 relative z-10">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6">
                <SparklesIcon className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-amber-600">
                  Join Our Class!
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Boost Your <span className="text-amber-500">English</span>{" "}
                Skills With Us
              </h1>

              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-8 max-w-xl">
                Bimbingan Belajar Bahasa Inggris untuk{" "}
                <strong>semua usia</strong>. Kuasai bahasa internasional dengan
                cara yang mudah, menyenangkan, dan interaktif!
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/register?program_code=prestasi-ceria&type=student"
                  className="px-8 py-4 bg-amber-500 text-white font-bold rounded-2xl text-center hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5">
                  Daftar Sekarang
                </Link>
                <button
                  onClick={() => scrollToSection("#tentang")}
                  className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl text-center hover:bg-gray-200 transition-all">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>

            <div className="hidden lg:block lg:flex-1">
              <div className="relative">
                <div className="w-full aspect-square max-w-md mx-auto bg-linear-to-br from-amber-400 via-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/30">
                  <div className="text-center text-white p-10">
                    <GlobeIcon className="w-20 h-20 mx-auto mb-6 opacity-90" />
                    <h2 className="text-3xl font-bold mb-2">
                      Prestasi Ceria Academy
                    </h2>
                    <p className="text-amber-100 text-lg">English Course</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-rose-400 rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
                  <HeadphonesIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-2xl -rotate-12 flex items-center justify-center shadow-lg">
                  <MessageSquareIcon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
              <InfoIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Tentang Program
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apa itu Prestasi Ceria Academy?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Prestasi Ceria Academy adalah program bimbingan belajar Bahasa
              Inggris yang ditujukan untuk <strong>semua jenjang umur</strong>.
              Kami mendedikasikan program ini untuk membekali masyarakat dengan
              keterampilan global.
            </p>
          </div>

          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:flex-1 mb-8 lg:mb-0">
              <div className="bg-linear-to-br from-amber-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white">
                <GraduationCapIcon className="w-12 h-12 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-4">
                  Mengembangkan Potensi, Meraih Prestasi
                </h3>
                <p className="text-amber-100 leading-relaxed text-sm lg:text-base">
                  Kemampuan berbahasa Inggris adalah kunci untuk membuka lebih
                  banyak peluang di masa depan. Kami menawarkan pembelajaran
                  yang holistik, tidak hanya berfokus pada tata bahasa, namun
                  juga pada kepercayaan diri untuk berbicara dan berkomunikasi
                  dalam lingkungan global.
                </p>
              </div>
            </div>

            <div className="lg:flex-1 space-y-4">
              {[
                {
                  emoji: "👶🎓",
                  title: "Anak-Anak hingga Dewasa",
                  desc: "Kelas dikelompokkan sesuai jenjang usia dan kemampuan dasar peserta.",
                },
                {
                  emoji: "🗣️",
                  title: "Active Learning",
                  desc: "Metode belajar yang mengajak peserta aktif berbicara dan berdiskusi.",
                },
                {
                  emoji: "💡",
                  title: "Materi Kontekstual",
                  desc: "Belajar dari situasi dunia nyata yang sering ditemui.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-amber-200 transition-colors">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
              <AwardIcon className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Keunggulan
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Beragam kelebihan yang kami sediakan untuk pengalaman belajar
              Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {keunggulan.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
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

      <section id="materi" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
              <ListIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Materi Belajar
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kompetensi yang Dipelajari
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Materi disusun secara komprehensif untuk meningkatkan 4 skill
              dasar berbahasa.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {programBelajar.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-amber-200 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
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

      <section id="kontak" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="bg-linear-to-br from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Siap Tingkatkan Skill Bahasa Inggrismu?
              </h2>
              <p className="text-amber-100 mb-8 max-w-lg mx-auto text-sm lg:text-base">
                Mari wujudkan impianmu fasih berbahasa Inggris. Daftarkan diri
                Anda atau putra-putri tercinta sekarang juga!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register?program_code=prestasi-ceria&type=student"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-600 font-bold rounded-2xl hover:bg-amber-50 transition-all shadow-xl hover:-translate-y-0.5">
                  <PhoneIcon className="w-5 h-5" />
                  Daftar via Formulir
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20">
                  Kembali ke Beranda
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artikel & Berita Section */}
      <section id="artikel" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
              <BookOpenIcon className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Artikel & Berita
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kabar Terbaru
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Baca artikel menarik dan ikuti update aktivitas dari Prestasi
              Ceria Academy.
            </p>
          </div>

          <ArticleList programCode="prestasi-ceria" colorTheme="amber" />
        </div>
      </section>

      <footer className="py-8 lg:py-12 border-t border-gray-100 pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto px-5 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <AwardIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Prestasi Ceria Academy
                </p>
                <p className="text-[10px] text-gray-400">English Course</p>
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
