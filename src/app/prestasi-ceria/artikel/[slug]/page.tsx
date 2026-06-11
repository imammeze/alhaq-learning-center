import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarIcon, ChevronLeftIcon, BookOpenIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/articles/${slug}`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    const data = await res.json();
    
    if (data.status === 'success') {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: `${article.title} | ${article.program || 'Alhaq Learning Center'}`,
    description: article.content.substring(0, 160).replace(/<[^>]+>/g, ''), // Strip HTML tags for description
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = 'prestasi-ceria';
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // Menentukan tema warna berdasarkan program
  const colorThemes: Record<string, string> = {
    'alhaq-kids': 'blue',
    'prestasi-ceria': 'emerald',
    'rumah-quran': 'amber',
  };
  
  const theme = colorThemes[program] || 'blue';
  
  const themeStyles: Record<string, any> = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      hoverBg: 'hover:bg-blue-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      hoverBg: 'hover:bg-emerald-100',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      hoverBg: 'hover:bg-amber-100',
    },
  };

  const style = themeStyles[theme] || themeStyles.blue;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Minimalis */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-5 lg:px-6 py-4 flex items-center justify-between">
          <Link 
            href={`/${program}`} 
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${style.text} hover:opacity-80`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Kembali ke Beranda Program
          </Link>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${style.bg}`}>
            <BookOpenIcon className={`w-4 h-4 ${style.text}`} />
          </div>
        </div>
      </nav>

      {/* Konten Artikel */}
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-5 lg:px-6">
        <article>
          {/* Header Artikel */}
          <header className="mb-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 ${style.bg} ${style.border} border`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                {article.program || 'Umum'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
                <span>{article.created_at}</span>
              </div>
            </div>
          </header>

          {/* Thumbnail */}
          {article.thumbnail && (
            <div className="w-full aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden mb-12 shadow-sm border border-gray-100 relative">
              <img 
                src={article.thumbnail} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Isi Konten */}
          <div 
            className="prose prose-lg prose-gray max-w-none 
              prose-headings:font-bold prose-headings:text-gray-900 
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-sm "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </main>
      
      {/* Footer Minimalis */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-5 lg:px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Alhaq Learning Center. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
