import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// تعریف تایپ برای داده‌های TMDB
type TMDBResult = {
  id: number;
  poster_path: string | null;
  name?: string;
  title?: string;
};

export default async function Home() {
  const apiKey = process.env.TMDB_API_KEY;
  let trending: TMDBResult[] = [];

    if (apiKey) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`);
      
      // اگر وضعیت پاسخ اوکی نباشد، ارور را چاپ می‌کنیم
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`TMDB Error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      trending = data.results || [];
    } catch (error) {
      // چاپ دقیق خطا در ترمینال VS Code
      console.error("Failed to fetch TMDB data:", error); 
    }
  } else {
    console.error("TMDB_API_KEY is missing in .env.local");
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white p-6 overflow-hidden">
      
      {/* بخش Hero (بالای سایت) */}
      <div className="max-w-4xl text-center space-y-8 z-10 pt-16 md:pt-24 w-full">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          CINEFAN
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
          فیلم‌ها و سریال‌هایت را تماشا کن، ردیابی کن و به اشتراک بگذار.
          <br />
          بزرگترین جامعه فارسی‌زبان عاشقان سینما.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg">
            شروع رایگان
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-gray-700 hover:bg-gray-900 hover:text-white px-10 py-6 text-lg">
            کاوش کنید
          </Button>
        </div>
      </div>

      {/* بخش ویژگی‌ها (Features) */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl text-white">📅 تقویم شخصی</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm text-center">هیچ اپیزودی را از قلم نیندازید. زمان پخش دقیقاً به وقت تهران.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl text-white">🎭 جامعه طرفداران</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm text-center">نظرات بدون اسپویلر و ری‌اکشن‌های ایموجی برای هر قسمت.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-950/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl text-white">📊 آمار تماشای شما</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm text-center">بدانید چقدر از عمرتان را صرف سینما و سریال کرده‌اید.</p>
          </CardContent>
        </Card>
      </div>

      {/* بخش ترندهای روز (Trending Now) */}
      {trending.length > 0 && (
        <div className="mt-24 w-full max-w-6xl pb-16">
          <h2 className="text-2xl font-bold mb-6 pr-2">ترندهای امروز 🔥</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {trending.slice(0, 15).map((item) => (
              <div key={item.id} className="flex-shrink-0 w-36 md:w-44 group cursor-pointer">
                <div className="w-full h-52 md:h-64 bg-gray-800 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                  {item.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                      alt={item.title || item.name || "Poster"}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-gray-400 truncate text-center">
                  {item.title || item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}