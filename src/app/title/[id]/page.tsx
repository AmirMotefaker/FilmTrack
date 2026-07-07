import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ActionButtons from "@/components/ActionButtons";
import CommentsSection from "@/components/CommentsSection";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

// تابع تولید متادیتا برای سئو
export async function generateMetadata({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ type?: string }> }): Promise<Metadata> {
  const { id } = await params;
  const { type: rawType } = await searchParams;
  const type = rawType === 'tv' ? 'tv' : 'movie';
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`);
    const data = await res.json();
    const title = data.title || data.name;
    
    return {
      title: `دانلود و تماشای ${title} | CineFan`,
      description: data.overview?.slice(0, 150) || `اطلاعات کامل، امتیاز و نظرات کاربران درباره ${title} در سینفن.`,
    };
  } catch {
    return { title: "CineFan | فیلم و سریال" };
  }
}

export default async function TitlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  // در Next.js 15+ باید از await استفاده کنیم
  const { id } = await params;
  const { type: rawType } = await searchParams;
  
  // تشخیص اینکه کاربر روی فیلم کلیک کرده یا سریال
  const type = rawType === 'tv' ? 'tv' : 'movie';
  const apiKey = process.env.TMDB_API_KEY;

  let data = null;
  if (apiKey && id) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`);
      if (!res.ok) return notFound();
      data = await res.json();
    } catch (error) {
      console.error("Failed to fetch title data:", error);
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const title = data.title || data.name;
  const releaseYear = data.release_date 
    ? new Date(data.release_date).getFullYear() 
    : data.first_air_date 
    ? new Date(data.first_air_date).getFullYear() 
    : 'N/A';
  const runtime = data.runtime || (data.episode_run_time && data.episode_run_time[0]) || 0;

  // گرفتن نظرات از Supabase
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('title_id', Number(id))
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white relative">
      
      {/* بخش پس‌زمینه (Backdrop) */}
      <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden">
        {data.backdrop_path && (
          <img 
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} 
            alt={title} 
            className="w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent"></div>
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 pt-24 md:pt-32">
        
        {/* دکمه بازگشت */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> بازگشت به خانه
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* پوستر فیلم و دکمه‌ها */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              {data.poster_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* دکمه‌های اکشن هوشمند */}
            <ActionButtons titleId={id} type={type} />
          </div>

          {/* اطلاعات فیلم */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
            
            {/* اطلاعات خلاصه */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm border-b border-gray-800 pb-4">
              <span className="flex items-center gap-1 font-bold text-yellow-500">
                ⭐ {data.vote_average ? data.vote_average.toFixed(1) : 'N/A'}/10
              </span>
              <span>{releaseYear}</span>
              {runtime > 0 && <span>{runtime} دقیقه</span>}
              {type === 'tv' && data.number_of_seasons && <span>{data.number_of_seasons} فصل</span>}
            </div>

            {/* ژانرها */}
            {data.genres && data.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.genres.map((genre: { id: number, name: string }) => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* خلاصه داستان */}
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">خلاصه داستان</h2>
              <p className="text-gray-400 leading-relaxed">{data.overview || "خلاصه‌ای برای این عنوان موجود نیست."}</p>
            </div>

            {/* بخش نظرات (Anti-Spoiler) */}
            <CommentsSection 
              titleId={id} 
              titleType={type} 
              initialComments={comments || []} 
              isLoggedIn={!!session} 
            />

          </div>

        </div>
      </div>
    </div>
  );
}