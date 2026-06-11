import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  content: string;
  created_at: string;
  program: string | null;
  program_code: string;
}

interface ArticleCardProps {
  article: Article;
  colorTheme?: 'blue' | 'emerald' | 'amber';
  programCode?: string;
}

export default function ArticleCard({ article, colorTheme = 'blue', programCode = 'umum' }: ArticleCardProps) {
  // Gunakan program_code dari artikel, atau fallback ke programCode prop
  const routeCode = article.program_code || programCode || 'umum';

  const themeStyles = {
    blue: 'hover:border-blue-200 text-blue-600 bg-blue-50',
    emerald: 'hover:border-emerald-200 text-emerald-600 bg-emerald-50',
    amber: 'hover:border-amber-200 text-amber-600 bg-amber-50',
  };

  const badgeColor = themeStyles[colorTheme] || themeStyles.blue;

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col h-full`}>
      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider backdrop-blur-md bg-white/90 ${badgeColor.split(' ')[1]}`}>
            {article.program || 'Umum'}
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{article.created_at}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        {/* Konten dirender text biasa dari HTML (bisa menggunakan dangerouslySetInnerHTML atau truncate) */}
        <div 
          className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-1"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <Link 
          href={routeCode === 'umum' ? `/artikel/${article.slug}` : `/${routeCode}/artikel/${article.slug}`}
          className={`inline-flex items-center gap-1 text-sm font-bold mt-auto transition-colors ${badgeColor.split(' ')[1]}`}
        >
          Baca Selengkapnya
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
