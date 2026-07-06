<div align="center">

# 🎬 CineFan

**The ultimate open-source tracker and social network for movie & TV show fans.**

CineFan is a modern, Persian-first platform to track your watched movies and series, get personalized calendars, interact with a community without spoilers, and discover where to watch legally.

Built with a modern tech stack and powered by the TMDB (The Movie Database) API.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![TMDB](https://img.shields.io/badge/API-TMDB-blue?style=for-the-badge&logo=themoviedatabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-cyan?style=for-the-badge&logo=tailwind-css)

</div>

---

## 📸 Screenshots

### Landing Page
![Landing Page](landing.png)

### Dashboard
![Dashboard](dashboard.png)

---

## 🌟 Features

### Current MVP (v1.0)
- **User Authentication:** Secure sign-up and login powered by Supabase Auth.
- **Dynamic Landing Page:** Hero section, trending movies/shows, and genre browsing.
- **Personal Dashboard:** A TV Time-like interface showing user stats, "Continue Watching" section, and personalized recommendations.
- **Persian-First UI:** Fully RTL interface with the beautiful Vazirmatn font.
- **TMDB Integration:** Real-time fetching of movie data, posters, and ratings.

### Roadmap
- [ ] Check-in & Tracking System (Watched, Watching, Plan to Watch)
- [ ] Personalized Calendar (Tehran Time)
- [ ] Anti-spoiler Comment System per Episode
- [ ] Affiliate Links to Local VODs (Filimo, Namava)
- [ ] Gamification & User Badges

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), TypeScript, [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/)
- **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Data Source:** [TMDB API](https://developer.themoviedb.org/docs)
- **Hosting:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmirMotefaker/CineFan.git
   cd CineFan
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📖 Build in Public

This project is being built entirely in public! You can follow the development progress on our GitHub Project board. We believe in open-source and community-driven development.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ for the Persian-speaking cinema community.
</div>
```

تغییرات دکمه‌ها را ذخیره کنید و فایل README را در گیت‌هاب آپدیت کنید. 
اگر آماده بودید، به من بگویید تا بریم سراغ **مهم‌ترین بخش**: ساخت صفحه اختصاصی هر فیلم (وقتی روی پوستر کلیک می‌کنید، اطلاعات کامل فیلم باز شود)!
