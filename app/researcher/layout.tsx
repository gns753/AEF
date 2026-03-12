"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ResearcherNavbar } from "@/components/researcher-navbar"

export default function ResearcherLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    const userType = localStorage.getItem("userType")

    if (loggedIn !== "true" || userType !== "İddiaçı") {
      router.replace("/login")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <ResearcherNavbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
