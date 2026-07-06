import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoutButton from "./LogoutButton";
import { Search, Clapperboard, Film, ListVideo, Tv } from "lucide-react";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <header className="w-full border-b border-gray-900 bg-[#0e0e0e] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-8">
        
        {/* راست: لوگو و منوها */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Clapperboard className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              CineFan
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-gray-400 text-sm font-medium">
            <Link href="/shows" className="hover:text-white transition-colors flex items-center gap-1">
              <Tv className="w-4 h-4" /> سریال‌ها
            </Link>
            <Link href="/movies" className="hover:text-white transition-colors flex items-center gap-1">
              <Film className="w-4 h-4" /> فیلم‌ها
            </Link>
            <Link href="/genres" className="hover:text-white transition-colors flex items-center gap-1">
              <ListVideo className="w-4 h-4" /> ژانرها
            </Link>
          </nav>
        </div>

        {/* چپ: سرچ بار و احراز هویت */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block relative w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              placeholder="جستجوی فیلم یا سریال..." 
              className="bg-[#1a1a1a] border-gray-800 text-white placeholder:text-gray-500 pr-10"
            />
          </div>

          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  پنل کاربری
                </Button>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700">
                ورود / ثبت‌نام
              </Button>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}