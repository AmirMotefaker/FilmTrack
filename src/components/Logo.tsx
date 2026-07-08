import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform overflow-hidden">
        {/* طراحی یونیک: دایره دوربین با دکمه پخش در وسط */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
          <path d="M10 8L16 12L10 16V8Z" fill="white" />
          {/* نقطه‌های فیلم در گوشه‌ها */}
          <circle cx="4" cy="4" r="1" fill="white" opacity="0.5" />
          <circle cx="20" cy="4" r="1" fill="white" opacity="0.5" />
          <circle cx="4" cy="20" r="1" fill="white" opacity="0.5" />
          <circle cx="20" cy="20" r="1" fill="white" opacity="0.5" />
        </svg>
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-white hidden sm:block">CineFan</h1>
    </Link>
  );
}