import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GenresPage() {
  // لیست ژانرهای اصلی (می‌توانید بیشتر کنید)
  const genres = [
    { id: 28, name: "اکشن" },
    { id: 12, name: "ماجراجویی" },
    { id: 16, name: "انیمیشن" },
    { id: 35, name: "کمدی" },
    { id: 80, name: "جنایی" },
    { id: 99, name: "مستند" },
    { id: 18, name: "درام" },
    { id: 10751, name: "خانوادگی" },
    { id: 14, name: "فانتزی" },
    { id: 36, name: "تاریخی" },
    { id: 27, name: "ترسناک" },
    { id: 10402, name: "موسیقی" },
    { id: 9648, name: "معمایی" },
    { id: 10749, name: "عاشقانه" },
    { id: 878, name: "علمی-تخیلی" },
    { id: 53, name: "هیجان‌انگیز" },
    { id: 10752, name: "جنگی" },
    { id: 37, name: "وسترن" },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">کاوش بر اساس ژانر</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {genres.map((genre) => (
            <Link href={`/genre/${genre.id}`} key={genre.id}>
              <Button size="lg" className="bg-gray-800 hover:bg-blue-600 rounded-full px-6">
                {genre.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}