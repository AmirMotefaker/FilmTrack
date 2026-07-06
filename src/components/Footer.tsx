import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] border-t border-gray-900 mt-20">
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-400 text-sm">
        
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Clapperboard className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-white">CineFan</h2>
          </div>
          <p className="text-xs leading-6">بزرگترین جامعه فارسی‌زبان عاشقان سینما و سریال. فیلم‌هایت را ردیابی کن و با دوستانت به اشتراک بگذار.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">کاوش کنید</h3>
          <ul className="space-y-2">
            <li><Link href="/shows" className="hover:text-blue-500">سریال‌های ترند</Link></li>
            <li><Link href="/movies" className="hover:text-blue-500">فیلم‌های ترند</Link></li>
            <li><Link href="/genres" className="hover:text-blue-500">ژانرها</Link></li>
            <li><Link href="/calendar" className="hover:text-blue-500">تقویم پخش</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">جامعه</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-500">قوانین و مقررات</Link></li>
            <li><Link href="#" className="hover:text-blue-500">حریم خصوصی</Link></li>
            <li><Link href="#" className="hover:text-blue-500">تماس با ما</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">ما را دنبال کنید</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-blue-500">توییتر</Link></li>
            <li><Link href="#" className="hover:text-blue-500">اینستاگرام</Link></li>
            <li><Link href="#" className="hover:text-blue-500">تلگرام</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-gray-900 py-6 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} CineFan. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}