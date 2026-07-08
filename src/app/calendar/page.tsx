import Link from "next/link";

export default async function CalendarPage() {
  const apiKey = process.env.TMDB_API_KEY;
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const todayStr = formatDate(today);
  const nextWeekStr = formatDate(nextWeek);

  const [moviesRes, showsRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${todayStr}&primary_release_date.lte=${nextWeekStr}&sort_by=popularity.desc`),
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&air_date.gte=${todayStr}&air_date.lte=${nextWeekStr}&sort_by=popularity.desc`)
  ]);

  const moviesData = await moviesRes.json();
  const showsData = await showsRes.json();

  // ترکیب فیلم‌ها و سریال‌ها و مرتب‌سازی دقیق بر اساس تاریخ
  const combinedReleases = [
    ...(moviesData.results || []).map((m: any) => ({ ...m, type: 'movie', date: m.release_date })),
    ...(showsData.results || []).map((s: any) => ({ ...s, type: 'tv', date: s.first_air_date }))
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const formatPersianDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-r-4 border-blue-600 pr-3">تقویم هفته آینده 📅</h1>

        {combinedReleases.length === 0 ? (
          <p className="text-gray-400 text-lg">هیچ فیلم یا سریالی برای هفته آینده یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {combinedReleases.map((item: any) => (
              <Link href={`/title/${item.id}?type=${item.type}`} key={`${item.id}-${item.type}`} className="group">
                <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="mt-2 text-sm font-medium truncate">{item.title || item.name}</p>
                <p className="text-xs text-blue-500">{formatPersianDate(item.date)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}