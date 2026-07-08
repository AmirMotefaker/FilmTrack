"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Github, Chrome } from "lucide-react" // آیکون‌های لاگین

export default function AuthPage() {
  const supabase = createClient()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else { router.push("/"); router.refresh() }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else { alert("ثبت‌نام موفقیت‌آمیز بود!"); router.push("/"); router.refresh() }
    setLoading(false)
  }

  // تابع ورود با گوگل یا گیت‌هاب
  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0e0e0e] text-white p-4">
      <div className="w-full max-w-md space-y-6 bg-[#161616] border border-gray-700 p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="inline-block mb-4">
             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
               <span className="text-white font-extrabold text-2xl">CF</span>
             </div>
          </div>
          <h1 className="text-3xl font-extrabold text-white">به CineFan خوش آمدید</h1>
        </div>

        {/* دکمه‌های ورود اجتماعی */}
        <div className="space-y-3">
          <Button onClick={() => handleOAuthLogin('google')} variant="outline" className="w-full bg-white text-black hover:bg-gray-200 border-gray-300 py-6">
            <Chrome className="w-5 h-5 ml-2" /> ورود با گوگل
          </Button>
          <Button onClick={() => handleOAuthLogin('github')} variant="outline" className="w-full bg-[#161616] text-white hover:bg-[#222] border-gray-700 py-6">
            <Github className="w-5 h-5 ml-2" /> ورود با گیت‌هاب
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-700" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#161616] px-2 text-gray-400">یا</span></div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#0e0e0e] border border-gray-700 rounded-lg">
            <TabsTrigger value="login" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md text-gray-400">ورود</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md text-gray-400">ثبت‌نام</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">ایمیل</Label>
                <Input id="email-login" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#0e0e0e] border-gray-600 focus-visible:ring-blue-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass-login">رمز عبور</Label>
                <Input id="pass-login" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#0e0e0e] border-gray-600 focus-visible:ring-blue-600" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">ورود</Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">ایمیل</Label>
                <Input id="email-signup" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#0e0e0e] border-gray-600 focus-visible:ring-blue-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass-signup">رمز عبور (حداقل ۶ کاراکتر)</Label>
                <Input id="pass-signup" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#0e0e0e] border-gray-600 focus-visible:ring-blue-600" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">ثبت‌نام رایگان</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}