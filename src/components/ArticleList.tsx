'use client';

import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';

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

interface ArticleListProps {
  programCode: string;
  colorTheme?: 'blue' | 'emerald' | 'amber';
  limit?: number;
}

export default function ArticleList({ programCode, colorTheme = 'blue', limit }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/articles`);
        if (programCode && programCode !== 'all') {
          url.searchParams.append('program_code', programCode);
        }
        const response = await fetch(url.toString());
        const result = await response.json();
        if (result.status === 'success') {
          setArticles(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [programCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-${colorTheme}-500`}></div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
        Belum ada artikel untuk program ini.
      </div>
    );
  }

  const displayedArticles = limit ? articles.slice(0, limit) : articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedArticles.map((article) => (
        <ArticleCard key={article.id} article={article} colorTheme={colorTheme} programCode={programCode} />
      ))}
    </div>
  );
}
