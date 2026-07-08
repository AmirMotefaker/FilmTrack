import Link from "next/link";

export default async function CalendarPage() {
  const apiKey = process.env.TMDB_API_KEY;
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const todayStr = formatDate(today);
  const nextWeekStr = formatDate(nextWeek);

  // گرفتن فیلم‌ها و سریال‌های ۷ روز آینده
  const [moviesRes, showsRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${todayStr}&primary_release_date.lte=${nextWeekStr}&sort_by=popularity.desc`),
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&air_date.gte=${todayStr}&air_date.lte=${nextWeekStr}&sort_by=popularity.desc`)
  ]);

  const moviesData = await moviesRes.json();
  const showsData = await showsRes.json();

  const upcomingMovies = moviesData.results || [];
  const upcomingShows = showsData.results || [];

  const formatPersianDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fa-IR', { weekday: 'short', day: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-r-4 border-blue-600 pr-3">تقویم هفته آینده 📅</h1>

        <div className="space-y-12">
          
          {/* بخش فیلم‌ها */}
          <div>
            <h2 className="text-2xl font-bold mb-4">آکران فیلم‌ها 🎬</h2>
            {upcomingMovies.length === 0 ? (
              <p className="text-gray-400">فیلمی برای این هفته یافت نشد.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {upcomingMovies.map((movie: any) => (
                  <Link href={`/title/${movie.id}?type=movie`} key={movie.id} className="group">
                    <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="mt-2 text-sm font-medium truncate">{movie.title}</p>
                    <p className="text-xs text-blue-500">{formatPersianDate(movie.release_date)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* بخش سریال‌ها */}
          <div>
            <h2 className="text-2xl font-bold mb-4">قسمت‌های جدید سریال‌ها 📺</h2>
            {upcomingShows.length === 0 ? (
              <p className="text-gray-400">سریالی برای این هفته یافت نشد.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {upcomingShows.map((show: any) => (
                  <Link href={`/title/${show.id}?type=tv`} key={show.id} className="group">
                    <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                      <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="mt-2 text-sm font-medium truncate">{show.name}</p>
                    <p className="text-xs text-blue-500">{formatPersianDate(show.first_air_date)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}