import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) return NextResponse.json([]);

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return NextResponse.json([]);

  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&language=en-US&page=1`);
    const data = await res.json();
    
    // فیلتر کردن نتایج تا فقط فیلم و سریال باشد (نفرات و... حذف شوند)
    const results = (data.results || []).filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
    return NextResponse.json(results.slice(0, 7)); // فقط ۷ نتیجه اول
  } catch {
    return NextResponse.json([]);
  }
}