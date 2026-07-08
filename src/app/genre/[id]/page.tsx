import Link from "next/link";

// دیکشنری برای تبدیل آیدی به نام فارسی
const genreNames: { [key: string]: string } = {
  "28": "اکشن",
  "12": "ماجراجویی",
  "16": "انیمیشن",
  "35": "کمدی",
  "80": "جنایی",
  "99": "مستند",
  "18": "درام",
  "10751": "خانوادگی",
  "14": "فانتزی",
  "36": "تاریخی",
  "27": "ترسناک",
  "10402": "موزیکال",
  "9648": "معمایی",
  "10749": "عاشقانه",
  "878": "علمی-تخیلی",
  "53": "هیجان‌انگیز",
  "10752": "جنگی",
  "37": "وسترن",
  "10759": "اکشن و ماجراجویی",
  "10765": "علمی-تخیلی و فانتزی",
};

export default async function GenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apiKey = process.env.TMDB_API_KEY;
  const genreName = genreNames[id] || "ژانر ناشناخته";

  // گرفتن ۳ صفحه از TMDB (هر صفحه ۲۰ فیلم = جمعا ۶۰ فیلم، که ۵۰ تای آن را نمایش می‌دهیم)
  const fetchPages = await Promise.all([
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&sort_by=vote_average.desc&page=1&vote_count.gte=200`),
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&sort_by=vote_average.desc&page=2&vote_count.gte=200`),
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&sort_by=vote_average.desc&page=3&vote_count.gte=200`)
  ]);

  const data = await Promise.all(fetchPages.map(res => res.json()));
  
  // ترکیب نتایج و برش به ۵۰ آیتم
  const allMovies = [...(data[0]?.results || []), ...(data[1]?.results || []), ...(data[2]?.results || [])];
  const top50 = allMovies.slice(0, 50);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-r-4 border-blue-600 pr-3">
          ۵۰ فیلم برتر ژانر {genreName}
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {top50.map((movie: any, index: number) => (
            <Link href={`/title/${movie.id}?type=movie`} key={movie.id} className="group relative">
              <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                {movie.poster_path && (
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover" loading="lazy" />
                )}
                {/* رتبه فیلم */}
                <div className="absolute top-2 right-2 bg-black/80 text-yellow-500 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </div>
                <div className="absolute bottom-0 left-0 bg-black/60 text-white text-xs p-1 rounded-tr-lg">
                  #{index + 1}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-400 truncate group-hover:text-white">{movie.title}</p>
              <p className="text-xs text-gray-600">{movie.release_date ? new Date(movie.release_date).getFullYear() : ''}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}