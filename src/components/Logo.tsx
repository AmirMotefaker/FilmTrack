import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform overflow-hidden">
        <span className="text-white font-extrabold text-xl tracking-tighter">FT</span>
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-white hidden sm:block">FilmTrack</h1>
    </Link>
  );
}