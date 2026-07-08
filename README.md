🎬 CineFan
The ultimate open-source tracker and social network for movie & TV show fans.

CineFan is a modern, Persian-first platform to track your watched movies and series, get personalized calendars, interact with a community without spoilers, and discover where to watch legally.

Next.jsSupabaseTMDBTailwindCSS

🌟 Features
User Authentication: Secure sign-up and login powered by Supabase Auth, including Google and GitHub OAuth.
Dynamic Landing Page: Hero section, trending movies/shows, and genre browsing with a responsive grid layout.
Personal Dashboard: A TV Time-like interface showing real-time user stats, watchlists, and personalized recommendations.
Rich Title Pages: Bilingual overviews (Persian/English), Cast & Crew photos, YouTube trailers, Seasons & Episodes list, and direct links to IMDb and Rotten Tomatoes.
Anti-Spoiler Commenting System: Comments are blurred if marked as spoilers, protecting users from unwanted plot leaks.
Live Search: Secure API route with 300ms debounce for instant movie/TV show discovery.
Personalized Release Calendar: A comprehensive 7-day calendar showing all upcoming episodes and movie releases sorted chronologically.
Persian-First UI: Fully RTL interface with the beautiful Vazirmatn font.
🛠️ Tech Stack
Frontend: Next.js 16 (App Router), TypeScript, Tailwind CSS
UI Components: Shadcn UI & Lucide React
Backend & Auth: Supabase (PostgreSQL, Row Level Security, OAuth)
Data Source: TMDB API
Hosting: Vercel
🚀 Getting Started
Clone the repository
git clone https://github.com/AmirMotefaker/CineFan.gitcd CineFan
Install dependencies
bash

npm install
Set up environment variables
Create a .env.local file in the root directory and add:
env

TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
Run the development server
bash

npm run dev
📖 Build in Public
This project is being built entirely in public! We believe in open-source and community-driven development.

<div align="center">
Made with ❤️ for Iranians by <a href="https://github.com/AmirMotefaker">Amir Motefaker</a>
</div>
```
