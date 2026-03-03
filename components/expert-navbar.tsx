"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Home,
  LogOut,
  Globe,
  Menu,
  ChevronDown,
  ClipboardCheck,
} from "lucide-react"

const navLinks = [
  { href: "/expert/dashboard", label: "Təyin edilmiş müsabiqələr", icon: Home },
]

export function ExpertNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguage] = useState<"az" | "en">("az")
  const [mobileOpen, setMobileOpen] = useState(false)

  const userName =
    typeof window !== "undefined"
      ? localStorage.getItem("userName") || "İstifadəçi"
      : "İstifadəçi"

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    localStorage.removeItem("userName")
    window.history.replaceState(null, "", "/login")
    router.replace("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/expert/dashboard" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AEF" width={36} height={36} className="rounded-full" />
              <span className="hidden sm:block text-sm font-bold text-foreground">AEF</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right: User menu */}
          <div className="flex items-center gap-3">
            {/* Language Toggle (desktop) */}
            <button
              onClick={() => setLanguage(language === "az" ? "en" : "az")}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === "az" ? "EN" : "AZ"}
            </button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-warning/10 text-warning text-xs font-semibold">
                      FM
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground leading-none">
                      {userName}
                    </span>
                    <Badge className="mt-0.5 text-[10px] px-1.5 py-0 h-4 bg-warning/10 text-warning border-warning/20 hover:bg-warning/10">
                      Ekspert
                    </Badge>
                  </div>
                  <ChevronDown className="hidden md:block h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 md:hidden">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <Badge className="mt-1 text-[10px] bg-warning/10 text-warning border-warning/20 hover:bg-warning/10">
                    Ekspert
                  </Badge>
                </div>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem
                  onClick={() => setLanguage(language === "az" ? "en" : "az")}
                  className="lg:hidden"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "az" ? "English" : "Azərbaycanca"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıxış
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo.png"
                      alt="AEF"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-bold text-foreground">Azərbaycan Elm Fondu</p>
                      <p className="text-xs text-muted-foreground">Ekspert paneli</p>
                    </div>
                  </div>
                </div>
                <nav className="p-3 flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
