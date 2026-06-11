import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenIcon, ChevronLeftIcon } from 'lucide-react';
import ArticleList from '@/components/ArticleList';

export const metadata: Metadata = {
  title: 'Artikel & Berita | Rumah Quran',
  description: 'Kumpulan artikel, berita, dan informasi terbaru dari Rumah Quran.',
};

export default function RumahQuranArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Minimalis */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 lg:px-6 py-4 flex items-center justify-between">
          <Link 
            href="/rumah-quran" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Kembali ke Beranda Program
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <BookOpenIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-800 hidden sm:block">Rumah Quran</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 lg:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
            <BookOpenIcon className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Kabar Terbaru
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Artikel & Berita
          </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Kumpulan tulisan, inspirasi, dan update kegiatan dari Rumah Quran Baitussalam.
            </p>
        </div>
      </section>

      {/* Konten Artikel */}
      <main className="py-16 max-w-6xl mx-auto px-5 lg:px-6">
        <ArticleList programCode="rumah-quran" colorTheme="emerald" />
      </main>

      {/* Footer Minimalis */}
      <footer className="py-8 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Yayasan Bata Merah Purwokerto. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
