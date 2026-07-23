<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</p>

<h1 align="center">🎬 FilmTrack</h1>
<p align="center">
  <strong>The ultimate open-source tracker and social network for movie & TV show fans.</strong>
</p>
<p align="center">
  <em>Persian-first · Modern · Community-driven</em>
</p>

<br />

---

## ✨ About FilmTack

**FilmTrack** is a modern, Persian-first platform designed for movie and TV show enthusiasts. Track your watched content, get personalized release calendars, interact with a vibrant community without spoilers, and discover where to watch legally — all in one place.

Whether you're a casual viewer or a hardcore cinephile, FilmTrack brings your entertainment journey to life.

---

## 🌟 Features

| Feature | Description |
|---------|-------------|
| 🔐 **User Authentication** | Secure sign-up and login powered by Supabase Auth, including Google and GitHub OAuth. |
| 🏠 **Dynamic Landing Page** | Hero section, trending movies/shows, and genre browsing with a responsive grid layout. |
| 📊 **Personal Dashboard** | A TV Time‑like interface showing real‑time user stats, watchlists, and personalized recommendations. |
| 🎞️ **Rich Title Pages** | Bilingual overviews (Persian/English), Cast & Crew photos, YouTube trailers, Seasons & Episodes list, and direct links to IMDb and Rotten Tomatoes. |
| 🚫 **Anti-Spoiler Commenting** | Comments are blurred if marked as spoilers, protecting users from unwanted plot leaks. |
| 🔍 **Live Search** | Secure API route with 300ms debounce for instant movie/TV show discovery. |
| 📅 **Personalized Calendar** | A comprehensive 7‑day calendar showing all upcoming episodes and movie releases sorted chronologically. |
| 🇮🇷 **Persian‑First UI** | Fully RTL interface with the beautiful Vazirmatn font. |

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,ts,tailwind,supabase,vercel" />
</p>

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS  
- **UI Components:** Shadcn UI & Lucide React  
- **Backend & Auth:** Supabase (PostgreSQL, Row Level Security, OAuth)  
- **Data Source:** TMDB API  
- **Hosting:** Vercel  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AmirMotefaker/FilmTrack.gitcd FilmTrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a **.env.local** file in the root directory and add:

```bash
TMDB_API_KEY=your_tmdb_api_key
OMDB_API_KEY=your_omdb_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

## 📖 Build in Public

This project is being built entirely in public! We believe in open-source and community-driven development.



<p align="center"> <strong>Made with ❤️ for Iranians by <a href="https://github.com/AmirMotefaker">Amir Motefaker</a></strong> </p>
