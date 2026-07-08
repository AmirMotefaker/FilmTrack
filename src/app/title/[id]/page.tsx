import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star, Users, PlayCircle, Clapperboard } from "lucide-react";
import ActionButtons from "@/components/ActionButtons";
import CommentsSection from "@/components/CommentsSection";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

export default async function TitlePage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ type?: string }> }) {
  const { id } = await params;
  const { type: rawType } = await searchParams;
  const type = rawType === 'tv' ? 'tv' : 'movie';
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey || !id) return notFound();

  const urls = [
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`,
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=fa-IR`
  ];

  const [enRes, faRes] = await Promise.all(urls.map(u => fetch(u).then(r => r.json()).catch(() => null)));
  if (!enRes) return notFound();

  const data = enRes;
  const faData = faRes || {};
  
  const title = data.title || data.name;
  const faTitle = faData.title || faData.name || title;
  const releaseYear = data.release_date ? new Date(data.release_date).getFullYear() : data.first_air_date ? new Date(data.first_air_date).getFullYear() : 'N/A';
  const runtime = data.runtime || (data.episode_run_time && data.episode_run_time[0]) || 0;

  const trailer = data.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
  const director = data.credits?.crew?.find((c: any) => c.job === 'Director') || data.created_by?.[0];
  const cast = data.credits?.cast?.slice(0, 12) || [];

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const { data: comments } = await supabase.from('comments').select('*').eq('title_id', Number(id)).order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white relative">
      <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden">
        {data.backdrop_path && <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt={title} className="w-full h-full object-cover opacity-20" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 pt-24 md:pt-32">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8"><ChevronLeft className="w-5 h-5" /> بازگشت</Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              {data.poster_path && <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={title} className="w-full h-full object-cover" />}
            </div>
            <ActionButtons titleId={id} type={type} />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold">{faTitle}</h1>
              <h2 className="text-lg text-gray-500 mt-1">{title}</h2>
            </div>

            {/* بخش امتیاز و لینک‌های IMDb و Rotten Tomatoes */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm border-b border-gray-800 pb-4">
              <span className="flex items-center gap-1 font-bold text-yellow-500"><Star className="w-4 h-4 fill-yellow-500" /> {data.vote_average?.toFixed(1)}/10</span>
              <span className="text-gray-500">({data.vote_count?.toLocaleString()} رأی)</span>
              <span>{releaseYear}</span>
              {runtime > 0 && <span>{runtime} دقیقه</span>}
              {type === 'tv' && data.number_of_seasons && <span>{data.number_of_seasons} فصل</span>}
              
              <div className="flex gap-2">
                {data.imdb_id && (
                  <a href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded font-bold text-xs hover:bg-yellow-400 transition-colors">
                    IMDb
                  </a>
                )}
                <a href={`https://www.rottentomatoes.com/search?search=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded font-bold text-xs hover:bg-red-500 transition-colors">
                  Rotten Tomatoes
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.genres?.map((g: any) => <Badge key={g.id} variant="secondary" className="bg-gray-800 text-gray-300">{g.name}</Badge>)}
            </div>

            {trailer && (
              <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 mt-2 font-medium">
                <PlayCircle className="w-5 h-5" /> تماشای تریلر رسمی
              </a>
            )}

            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-lg font-bold mb-1">خلاصه داستان (فارسی)</h3>
                <p className="text-gray-400 leading-relaxed">{faData.overview || "خلاصه فارسی موجود نیست."}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-500">Synopsis (English)</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{data.overview || "No overview available."}</p>
              </div>
            </div>

            {cast.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-blue-500" /> بازیگران و عوامل</h3>
                {director && <p className="text-gray-400 text-sm mb-3">ساخته شده توسط: <span className="text-white font-medium">{director.name}</span></p>}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {cast.map((member: any) => (
                    <div key={member.id} className="flex-shrink-0 w-20 text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 mb-2 border-2 border-gray-700">
                        {member.profile_path && <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name} className="w-full h-full object-cover" />}
                      </div>
                      <p className="text-xs text-white font-medium truncate">{member.name}</p>
                      <p className="text-xs text-gray-500 truncate">{member.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {type === 'tv' && data.seasons && data.seasons.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Clapperboard className="w-5 h-5 text-blue-500" /> قسمت‌ها و فصل‌ها</h3>
                <div className="space-y-3">
                  {data.seasons.filter((s: any) => s.season_number > 0).map((season: any) => (
                    <details key={season.id} className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden group">
                      <summary className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-800 transition-colors list-none">
                        {season.poster_path ? (
                          <img src={`https://image.tmdb.org/t/p/w200${season.poster_path}`} alt={season.name} className="w-12 h-16 rounded object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center flex-shrink-0 text-xs">بدون عکس</div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold text-white">{season.name}</h4>
                          <p className="text-xs text-gray-500">{season.episode_count} قسمت {season.air_date ? `| پخش: ${new Date(season.air_date).getFullYear()}` : ''}</p>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-gray-500 group-open:-rotate-90 transition-transform" />
                      </summary>
                      <div className="p-4 pt-0 text-sm text-gray-400">
                        <p className="mb-4">{season.overview || `شامل ${season.episode_count} قسمت از این فصل.`}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <CommentsSection titleId={id} titleType={type} initialComments={comments || []} isLoggedIn={!!session} />
          </div>
        </div>
      </div>
    </div>
  );
}