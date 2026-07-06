import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // اگر کاربر لاگین نکرده بود، او را به صفحه لاگین بفرست
  if (!session) {
    redirect("/auth");
  }

  // دیتای موقت برای نمایش ظاهر داشبورد (بعداً به دیتابیس وصل می‌شود)
  const mockStats = [
    { label: "سریال‌های دنبال‌شده", value: "۱۲", icon: "📺" },
    { label: "اپیزودهای دیده‌شده", value: "۳۴۵", icon: "🎬" },
    { label: "ساعت تماشا", value: "۲۱۰ ساعت", icon: "⏳" },
  ];

  const mockWatching = [
    { id: 1, title: "Breaking Bad", season: 5, episode: 12, progress: 75, poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
    { id: 2, title: "The Last of Us", season: 1, episode: 4, progress: 40, poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg" },
    { id: 3, title: "Game of Thrones", season: 2, episode: 7, progress: 90, poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row gap-8">
        
        {/* بخش اصلی (وسط) */}
        <main className="flex-1 space-y-12">
          
          {/* بخش ادامه تماشا */}
          <div>
            <h2 className="text-2xl font-bold mb-6 border-r-4 border-blue-600 pr-3">در حال تماشا</h2>
            <div className="space-y-4">
              {mockWatching.map((show) => (
                <div key={show.id} className="flex flex-col sm:flex-row gap-4 bg-gray-950/60 border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition-colors">
                  {/* پوستر سریال */}
                  <div className="w-full sm:w-24 h-36 sm:h-36 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                    <img src={show.poster} alt={show.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* اطلاعات و نوار پیشرفت */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{show.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">فصل {show.season} - قسمت {show.episode}</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>پیشرفت شما</span>
                        <span>{show.progress}%</span>
                      </div>
                      <Progress value={show.progress} className="h-2 bg-gray-800 [&>div]:bg-blue-600" />
                      <div className="mt-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          ✅ تماشا کردم (Check-in)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* بخش لیست‌های پیشنهادی (مثل ترندها) */}
          <div>
            <h2 className="text-2xl font-bold mb-6 border-r-4 border-blue-600 pr-3">پیشنهادها برای شما</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {mockWatching.concat(mockWatching).map((show, index) => (
                <div key={index} className="flex-shrink-0 w-32 md:w-40 group cursor-pointer">
                  <div className="w-full h-48 md:h-56 bg-gray-800 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                    <img src={show.poster} alt={show.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* نوار کناری (آمار و پروفایل) */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-gray-950/60 border border-gray-800 rounded-xl p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
              <Avatar className="w-16 h-16 border-2 border-blue-600">
                <AvatarFallback className="bg-gray-800 text-2xl text-blue-500">
                  {session.user.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-gray-400 text-sm">خوش آمدید،</p>
                <h3 className="font-bold text-lg truncate">{session.user.email}</h3>
              </div>
            </div>
            
            <h4 className="text-sm text-gray-500 mb-4 font-semibold">آمار شما</h4>
            <div className="space-y-4">
              {mockStats.map((stat) => (
                <div key={stat.label} className="flex justify-between items-center bg-gray-900 p-3 rounded-lg">
                  <span className="text-gray-300 text-sm flex items-center gap-2">
                    <span>{stat.icon}</span> {stat.label}
                  </span>
                  <span className="font-bold text-blue-500">{stat.value}</span>
                </div>
              ))}
            </div>

            <Link href="/" className="block mt-6">
              <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                کاوش در فیلم‌ها
              </Button>
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}