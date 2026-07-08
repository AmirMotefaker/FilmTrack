import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import LiveSearch from "./LiveSearch";
import { ChevronDown, Film, ListVideo, Tv, Flame, TrendingUp, Eye, Wine, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header className="w-full border-b border-gray-800 bg-[#0e0e0e]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-4 md:gap-8">
        
        {/* راست: لوگوی CF و منوها */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            {/* لوگوی اختصاصی CineFan (CF) */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-extrabold text-xl tracking-tighter">CF</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white hidden sm:block">CineFan</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-gray-400 text-sm font-medium">
            
            {/* منوی سریال‌ها */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white transition-colors">
                <Tv className="w-4 h-4" /> سریال‌ها <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-gray-800 text-white">
                <Link href="/shows?cat=trending" className="cursor-pointer block"><DropdownMenuItem><Flame className="w-4 h-4 ml-2" /> پرطرفدار (Trending)</DropdownMenuItem></Link>
                <Link href="/shows?cat=added" className="cursor-pointer block"><DropdownMenuItem><TrendingUp className="w-4 h-4 ml-2" /> بیشترین موارد اضافه شده</DropdownMenuItem></Link>
                <Link href="/shows?cat=watched" className="cursor-pointer block"><DropdownMenuItem><Eye className="w-4 h-4 ml-2" /> پربیننده‌ترین‌ها</DropdownMenuItem></Link>
                <Link href="/shows?cat=binged" className="cursor-pointer block"><DropdownMenuItem><Wine className="w-4 h-4 ml-2" /> پرمصرف‌ترین‌ها (Binged)</DropdownMenuItem></Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* منوی فیلم‌ها */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white transition-colors">
                <Film className="w-4 h-4" /> فیلم‌ها <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-gray-800 text-white">
                <Link href="/movies?cat=trending" className="cursor-pointer block"><DropdownMenuItem><Flame className="w-4 h-4 ml-2" /> پرطرفدار (Trending)</DropdownMenuItem></Link>
                <Link href="/movies?cat=added" className="cursor-pointer block"><DropdownMenuItem><TrendingUp className="w-4 h-4 ml-2" /> بیشترین موارد اضافه شده</DropdownMenuItem></Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* منوی ژانرها */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white transition-colors">
                <ListVideo className="w-4 h-4" /> ژانرها <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-gray-800 text-white w-48">
                <Link href="/genres" className="cursor-pointer block"><DropdownMenuItem>تمام ژانرها</DropdownMenuItem></Link>
                <div className="grid grid-cols-2 gap-1 p-2">
                  <Link href="/genre/28" className="cursor-pointer block"><DropdownMenuItem>اکشن</DropdownMenuItem></Link>
                  <Link href="/genre/35" className="cursor-pointer block"><DropdownMenuItem>کمدی</DropdownMenuItem></Link>
                  <Link href="/genre/18" className="cursor-pointer block"><DropdownMenuItem>درام</DropdownMenuItem></Link>
                  <Link href="/genre/27" className="cursor-pointer block"><DropdownMenuItem>ترسناک</DropdownMenuItem></Link>
                  <Link href="/genre/878" className="cursor-pointer block"><DropdownMenuItem>علمی-تخیلی</DropdownMenuItem></Link>
                  <Link href="/genre/53" className="cursor-pointer block"><DropdownMenuItem>هیجان‌انگیز</DropdownMenuItem></Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* منوی تقویم */}
            <Link href="/calendar" className="flex items-center gap-1 hover:text-white transition-colors">
              <Calendar className="w-4 h-4" /> تقویم
            </Link>

          </nav>
        </div>

        {/* چپ: سرچ و احراز هویت */}
        <div className="flex items-center gap-4">
          <LiveSearch />
          {session ? (
            <>
              <Link href="/dashboard"><Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 hidden md:block">پنل کاربری</Button></Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/auth"><Button className="bg-blue-600 hover:bg-blue-700">ورود</Button></Link>
          )}
        </div>
      </div>
    </header>
  );
}