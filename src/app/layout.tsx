import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // اضافه شد

export const dynamic = 'force-dynamic'; // این خط را اضافه کنید

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "FilmTrack | ردیاب فیلم و سریال",
  description: "جامعه بزرگ فیلم و سریال فارسی‌زبانان",
  manifest: "/manifest.json", 
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FilmTrack',
  },
};

export const viewport = {
  themeColor: '#0e0e0e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body suppressHydrationWarning className={`${vazirmatn.className} min-h-screen flex flex-col antialiased bg-[#0e0e0e]`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer /> {/* اضافه شد */}
      </body>
    </html>
  );
}