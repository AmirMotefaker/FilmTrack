"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Button onClick={handleLogout} variant="outline" className="border-gray-700 text-white hover:bg-gray-800 hover:text-white">
      خروج
    </Button>
  )
}