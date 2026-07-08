import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import LiveSearch from "./LiveSearch";
import { ChevronDown, Film, ListVideo, Tv, Flame, TrendingUp, Eye, Wine } from "lucide-react";
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
    <header className="w-full border-b border-gray-900 bg-[#0e0e0e] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-4 md:gap-8">
        
        {/* راست: لوگوی حرفه ای و منوها */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            {/* لوگو اختصاصی CineFan */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
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
                <DropdownMenuItem asChild><Link href="/shows?cat=trending" className="cursor-pointer"><Flame className="w-4 h-4 ml-2" /> پرطرفدار (Trending)</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/shows?cat=added" className="cursor-pointer"><TrendingUp className="w-4 h-4 ml-2" /> بیشترین موارد اضافه شده</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/shows?cat=watched" className="cursor-pointer"><Eye className="w-4 h-4 ml-2" /> پربیننده‌ترین‌ها</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/shows?cat=binged" className="cursor-pointer"><Wine className="w-4 h-4 ml-2" /> پرمصرف‌ترین‌ها (Binged)</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* منوی فیلم‌ها */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white transition-colors">
                <Film className="w-4 h-4" /> فیلم‌ها <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-gray-800 text-white">
                <DropdownMenuItem asChild><Link href="/movies?cat=trending" className="cursor-pointer"><Flame className="w-4 h-4 ml-2" /> پرطرفدار (Trending)</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/movies?cat=added" className="cursor-pointer"><TrendingUp className="w-4 h-4 ml-2" /> بیشترین موارد اضافه شده</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* منوی ژانرها */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white transition-colors">
                <ListVideo className="w-4 h-4" /> ژانرها <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-gray-800 text-white w-48">
                <DropdownMenuItem asChild><Link href="/genres" className="cursor-pointer">تمام ژانرها</Link></DropdownMenuItem>
                <div className="grid grid-cols-2 gap-1 p-2">
                  <DropdownMenuItem asChild><Link href="/genre/28" className="cursor-pointer">اکشن</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/genre/35" className="cursor-pointer">کمدی</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/genre/18" className="cursor-pointer">درام</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/genre/27" className="cursor-pointer">ترسناک</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/genre/10765" className="cursor-pointer">علمی-تخیلی</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/genre/53" className="cursor-pointer">هیجان‌انگیز</Link></DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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