"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Users,
  Tag,
  Key,
  Trophy,
  LogOut,
  Menu,
  Lock,
  X,
  Newspaper,
  FileText,
} from "lucide-react"

const sidebarLinks = [
  { href: "/superadmin/users", label: "İstifadəçilər", icon: Users },
  { href: "/superadmin/roles", label: "Rollar", icon: Tag },
  { href: "/superadmin/permissions", label: "Səlahiyyətlər", icon: Key },
  { href: "/superadmin/participants", label: "Müsabiqələrin iştirakçıları", icon: Trophy },
]

const contentLinks = [
  { href: "/superadmin/news", label: "Xəbərlər və Bannerlər", icon: Newspaper },
  { href: "/superadmin/page-content", label: "Səhifə Məzmunu", icon: FileText },
]

const allLinks = [...sidebarLinks, ...contentLinks]

function SidebarContent({
  pathname,
  onLinkClick,
}: {
  pathname: string
  onLinkClick?: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center">
            <Lock className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-wide">ADMİN PANELİ</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">AEF System</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative
                ${
                  isActive
                    ? "bg-slate-700/60 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-red-500 rounded-r-full" />
              )}
              <link.icon className="h-[18px] w-[18px]" />
              {link.label}
            </Link>
          )
        })}

        {/* Separator */}
        <div className="my-3 mx-2 border-t border-slate-700/50" />

        {contentLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative
                ${
                  isActive
                    ? "bg-slate-700/60 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-red-500 rounded-r-full" />
              )}
              <link.icon className="h-[18px] w-[18px]" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: User info */}
      <div className="px-4 py-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-red-600/20 text-red-400 text-xs font-semibold">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-[10px] text-slate-500">Sistem idarəçisi</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthed, setIsAuthed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    const userType = localStorage.getItem("userType")
    if (loggedIn !== "true" || userType !== "Admin") {
      router.replace("/login")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    localStorage.removeItem("userName")
    window.history.replaceState(null, "", "/login")
    router.replace("/login")
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-[#0f172a] border-r border-slate-700/30 fixed inset-y-0 left-0 z-40">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b h-14 flex items-center justify-between px-4 lg:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] p-0 bg-[#0f172a] border-slate-700/30">
                <div className="absolute right-3 top-3 z-10">
                  <button onClick={() => setMobileOpen(false)} className="p-1 rounded-md hover:bg-slate-700 transition-colors">
                    <X className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
                <SidebarContent pathname={pathname} onLinkClick={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>

            <h1 className="text-sm font-semibold text-foreground">
              {allLinks.find((l) => pathname.startsWith(l.href))?.label || "Admin Paneli"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-red-100 text-red-700 text-xs font-semibold">A</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Çıxış</span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
