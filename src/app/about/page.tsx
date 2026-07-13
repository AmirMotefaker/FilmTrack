import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-r-4 border-blue-600 pr-3">درباره FilmTrack</h1>
        <div className="space-y-4 text-gray-400 leading-relaxed">
          <p>FilmTrack یک پلتفرم متن‌باز (Open Source) و جامعه‌محور برای عاشقان فیلم و سریال در فارسی‌زبانان است.</p>
          <p>ما با الهام از پلتفرم‌های بزرگی مثل TV Time، Letterboxd و Trakt، تصمیم گرفتیم تجربه‌ای مخصوص فارسی‌زبانان بسازیم؛ جایی که می‌توانید فیلم‌هایت را ردیابی کن، تقویم پخش سریال‌هایت را ببینی، بدون نگرانی از اسپویل شدن نظر بدهی و آمار تماشای خود را بسنجی.</p>
          <p>این پروژه کاملاً به صورت شفاف در گیت‌هاب توسعه می‌یابد و از تکنولوژی‌های روز دنیا مانند Next.js و Supabase استفاده می‌کند.</p>
          <div className="bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl mt-6">
            <p className="text-white font-bold mb-2">سازنده پروژه:</p>
            <p>امیر متفکر</p>
            <Link href="https://github.com/AmirMotefaker" target="_blank" className="text-blue-500 hover:underline text-sm mt-2 block">
              صفحه گیت‌هاب من
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}