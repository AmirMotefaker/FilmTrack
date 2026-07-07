import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  // ۱. گرفتن لیست سریال‌های کاربر از دیتابیس
  const { data: userShows } = await supabase
    .from('user_lists')
    .select('title_id')
    .eq('title_type', 'tv');

  const apiKey = process.env.TMDB_API_KEY;
  const today = new Date().toISOString().split('T')[0]; // تاریخ امروز

  // ۲. تابع گرفتن اطلاعات قسمت بعدی از TMDB
  const fetchUpcomingEpisode = async (showId: number) => {
    if (!apiKey) return null;
    try {
      const res = await fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=en-US`);
      if (!res.ok) return null;
      const data = await res.json();
      
      // پیدا کردن قسمت بعدی که تاریخش از امروز بزرگتر است
      const nextEpisode = data.next_episode_to_air;
      if (nextEpisode && nextEpisode.air_date >= today) {
        return {
          showId: data.id,
          showName: data.name,
          posterPath: data.poster_path,
          episodeNumber: nextEpisode.episode_number,
          seasonNumber: nextEpisode.season_number,
          airDate: nextEpisode.air_date,
          episodeName: nextEpisode.name
        };
      }
      return null;
    } catch {
      return null;
    }
  };

  // ۳. گرفتن اطلاعات همه سریال‌ها به صورت همزمان
  const showIds = userShows?.map(item => item.title_id) || [];
  const episodePromises = showIds.map(id => fetchUpcomingEpisode(id));
  const episodesData = await Promise.all(episodePromises);

  // ۴. فیلتر کردن سریال‌هایی که قسمت جدید ندارند و مرتب‌سازی بر اساس تاریخ
  const upcomingEpisodes = episodesData
    .filter(ep => ep !== null)
    .sort((a, b) => new Date(a!.airDate).getTime() - new Date(b!.airDate).getTime());

  // تابع فرمت کردن تاریخ به فارسی
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">تقویم پخش 📅</h1>
          <Link href="/dashboard">
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              بازگشت به داشبورد
            </Button>
          </Link>
        </div>

        {upcomingEpisodes.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400 mb-4">هیچ قسمت جدیدی برای سریال‌های شما در روزهای آینده برنامه‌ریزی نشده است.</p>
            <p className="text-gray-500 text-sm">شما می‌توانید سریال‌های جدیدی را به لیست خود اضافه کنید تا تقویم شما به‌روز شود.</p>
            <Link href="/">
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">کاوش در سریال‌ها</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEpisodes.map((ep) => (
              <Link href={`/title/${ep!.showId}?type=tv`} key={`${ep!.showId}-${ep!.seasonNumber}-${ep!.episodeNumber}`}>
                <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl hover:border-blue-600 transition-colors cursor-pointer">
                  
                  {/* پوستر سریال */}
                  <div className="w-full sm:w-20 h-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                    {ep!.posterPath && (
                      <img src={`https://image.tmdb.org/t/p/w500${ep!.posterPath}`} alt={ep!.showName} className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  {/* اطلاعات قسمت */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-bold">{ep!.showName}</h3>
                    <p className="text-blue-500 text-sm mt-1">
                      فصل {ep!.seasonNumber} - قسمت {ep!.episodeNumber}
                    </p>
                    {ep!.episodeName && (
                      <p className="text-gray-400 text-sm mt-1 truncate">"{ep!.episodeName}"</p>
                    )}
                  </div>

                  {/* تاریخ پخش */}
                  <div className="flex sm:flex-col items-center sm:justify-center sm:text-left bg-gray-900 px-4 py-2 rounded-lg">
                    <span className="text-xs text-gray-500 mb-1">پخش در:</span>
                    <span className="font-bold text-white text-sm whitespace-nowrap">{formatDate(ep!.airDate)}</span>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}