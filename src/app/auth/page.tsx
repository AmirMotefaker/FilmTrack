"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

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
    if (error) {
      alert(error.message)
    } else {
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
    } else {
      alert("ثبت‌نام موفقیت‌آمیز بود! لطفاً ایمیل خود را تایید کنید (یا مستقیم وارد شوید).")
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
            CineFan
          </h1>
          <p className="text-gray-400 mt-2">به جامعه فیلم‌بازان وارد شو</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-800">
            <TabsTrigger value="login" className="data-[state=active]:bg-blue-600">ورود</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600">ثبت‌نام</TabsTrigger>
          </TabsList>
          
          {/* تب ورود */}
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">ایمیل</Label>
                <Input id="email-login" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-950 border-gray-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass-login">رمز عبور</Label>
                <Input id="pass-login" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-950 border-gray-800" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                {loading ? "در حال ورود..." : "ورود"}
              </Button>
            </form>
          </TabsContent>

          {/* تب ثبت‌نام */}
          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">ایمیل</Label>
                <Input id="email-signup" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-950 border-gray-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass-signup">رمز عبور (حداقل ۶ کاراکتر)</Label>
                <Input id="pass-signup" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-950 border-gray-800" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                {loading ? "در حال ثبت‌نام..." : "ثبت‌نام رایگان"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

      </div>
    </main>
  )
}