"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, Search, User, Settings, LogOut, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function Header() {
  const [language, setLanguage] = useState("az")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      if (typeof window !== "undefined") {
        const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true"
        const storedUserName = localStorage.getItem("userName") || ""
        setIsLoggedIn(isUserLoggedIn)
        setUserName(storedUserName)
      }
    }
    checkLoginStatus()
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("userType")
      localStorage.removeItem("userName")
    }
    setIsLoggedIn(false)
    setUserName("")
    router.push("/")
  }

  return (
    <header className="w-full border-b border-border bg-background">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logo.png?height=60&width=60&text=AZ"
              alt="Azərbaycan Gerbi"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">Azərbaycan Elm Fondu</h1>
              <p className="text-sm text-muted-foreground">Azərbaycan Prezidenti yanında</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 hover:text-primary">Ana səhifə</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* FOND HAQQINDA Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Fond Haqqında</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-6 p-6 w-[800px] bg-popover border border-border">
                    {/* Column 1 */}
                    <div className="space-y-6">
                      {/* RƏSMİ SƏNƏDLƏR */}
                      <div>
                        <h3 className="font-bold text-primary mb-2 flex items-center">
                          <span className="mr-2"></span> RƏSMİ SƏNƏDLƏR
                        </h3>
                        <ul className="space-y-1 pl-6">
                          <li>
                            <Link href="/about/documents" className="text-foreground/70 hover:text-primary text-sm">
                              Rəsmi sənədlər
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/charter" className="text-foreground/70 hover:text-primary text-sm">
                              Fondun Nizamnaməsi
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* FONDUN STRUKTURU */}
                      <div>
                        <h3 className="font-bold text-primary mb-2 flex items-center">
                          <span className="mr-2"></span> FONDUN STRUKTURU
                        </h3>
                        <ul className="space-y-1 pl-6">
                          <li>
                            <Link href="/about/board" className="text-foreground/70 hover:text-primary text-sm">
                              Himayədarlar Şurası
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/executive" className="text-foreground/70 hover:text-primary text-sm">
                              İcraçı direksiya
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                      {/* FONDUN FƏALİYYƏTİ */}
                      <div>
                        <h3 className="font-bold text-primary mb-2 flex items-center">
                          <span className="mr-2"></span> FONDUN FƏALİYYƏTİ
                        </h3>
                        <ul className="space-y-1 pl-6">
                          <li>
                            <Link href="/about/history" className="text-foreground/70 hover:text-primary text-sm">
                              Yaranma tarixi
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/directions" className="text-foreground/70 hover:text-primary text-sm">
                              Fondun fəaliyyətinin əsas istiqamətləri
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/financing" className="text-foreground/70 hover:text-primary text-sm">
                              Fondun maliyyələşməsi
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/international" className="text-foreground/70 hover:text-primary text-sm">
                              Beynəlxalq əlaqələr
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/state-programs" className="text-foreground/70 hover:text-primary text-sm">
                              Dövlət proqramlarında iştirak
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/agreements" className="text-foreground/70 hover:text-primary text-sm">
                              Sazişlər, memorandumlar və protokollar
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about/international-grants"
                              className="text-foreground/70 hover:text-primary text-sm"
                            >
                              Beynəlxalq qrantlar
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/financial-reports" className="text-foreground/70 hover:text-primary text-sm">
                              Maliyyə hesabatları
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/about/scientific-reports"
                              className="text-foreground/70 hover:text-primary text-sm"
                            >
                              Elmi hesabatlar
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* MƏLUMAT BÖLMƏSİ */}
                      <div>
                        <h3 className="font-bold text-primary mb-2 flex items-center">
                          <span className="mr-2"></span> MƏLUMAT BÖLMƏSİ
                        </h3>
                        <ul className="space-y-1 pl-6">
                          <li>
                            <Link href="/about/events" className="text-foreground/70 hover:text-primary text-sm">
                              Fondun tədbirləri
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/seminars" className="text-foreground/70 hover:text-primary text-sm">
                              Məşvərət seminarları
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/media" className="text-foreground/70 hover:text-primary text-sm">
                              Fond KİV-də
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/gallery" className="text-foreground/70 hover:text-primary text-sm">
                              Foto və video qalereya
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/press" className="text-foreground/70 hover:text-primary text-sm">
                              Press-relizlər
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/media-kit" className="text-foreground/70 hover:text-primary text-sm">
                              Media-kit
                            </Link>
                          </li>
                          <li>
                            <Link href="/about/video" className="text-foreground/70 hover:text-primary text-sm">
                              Video çarx
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* QRANT MÜSABİQƏLƏRİ Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Qrant Müsabiqələri</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 gap-6 p-6 w-[900px] bg-popover border border-border">
                    {/* Column 1 */}
                    <div>
                      <h3 className="font-bold text-primary mb-2 flex items-center">
                        <span className="mr-2"></span> MÜSABİQƏLƏR
                      </h3>
                      <ul className="space-y-1 pl-6">
                        <li>
                          <Link href="/grants/current" className="text-foreground/70 hover:text-primary text-sm">
                            Cari qrant müsabiqələri
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/completed" className="text-foreground/70 hover:text-primary text-sm">
                            Bitmiş qrant müsabiqələri
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/joint" className="text-foreground/70 hover:text-primary text-sm">
                            Birgə qrant müsabiqələri
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/international" className="text-foreground/70 hover:text-primary text-sm">
                            Beynəlxalq qrant müsabiqələri
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/statistics" className="text-foreground/70 hover:text-primary text-sm">
                            Statistika
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/results" className="text-foreground/70 hover:text-primary text-sm">
                            Nəticələr və statistika
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/institutions" className="text-foreground/70 hover:text-primary text-sm">
                            Qrant layihələrində təmsil olunmuş qurumlar
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h3 className="font-bold text-primary mb-2 flex items-center">
                        <span className="mr-2"></span> KÖMƏKÇİ MATERİALLAR
                      </h3>
                      <ul className="space-y-1 pl-6">
                        <li>
                          <Link href="/grants/instructions" className="text-foreground/70 hover:text-primary text-sm">
                            Təlimatlar
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/rules" className="text-foreground/70 hover:text-primary text-sm">
                            Müsabiqənin keçirilməsi qaydaları
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/legislation" className="text-foreground/70 hover:text-primary text-sm">
                            Qanunvericilik
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/classification" className="text-foreground/70 hover:text-primary text-sm">
                            Elm sahələri və istiqamətlərinin təsnifatı
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/faq" className="text-foreground/70 hover:text-primary text-sm">
                            Tez-tez verilən suallar və cavablar
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/certificate" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə verilən sertifikat nümunəsi
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <h3 className="font-bold text-primary mb-2 flex items-center">
                        <span className="mr-2"></span> BAŞA ÇATMIŞ LAYİHƏLƏR
                      </h3>
                      <ul className="space-y-1 pl-6">
                        <li>
                          <Link href="/grants/successful" className="text-foreground/70 hover:text-primary text-sm">
                            Uğurlu layihələr
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/results-2010-2021" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə nəticələr və dərc olunmuş məqalələr (2010–2021)
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/results-2022" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə nəticələr və dərc olunmuş məqalələr (2022–)
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/publications" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə nəşrlər
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/websites" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə yaradılmış veb saytlar
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/conferences" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə keçirilmiş konfranslar
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/laboratories" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə yaradılmış laboratoriyalar
                          </Link>
                        </li>
                        <li>
                          <Link href="/grants/dissertations" className="text-foreground/70 hover:text-primary text-sm">
                            Qrantlar üzrə dissertasiya müdafiələri
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* ELM VƏ İNKİŞAF Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Elm və İnkişaf</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-6 p-6 w-[700px] bg-popover border border-border">
                    {/* Column 1 */}
                    <div>
                      <h3 className="font-bold text-primary mb-2 flex items-center">
                        <span className="mr-2"></span> Elmi Resurslar və Potensial
                      </h3>
                      <ul className="space-y-1 pl-6">
                        <li>
                          <Link href="/science/potential" className="text-foreground/70 hover:text-primary text-sm">
                            Azərbaycanın elmi potensialı
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/institutions" className="text-foreground/70 hover:text-primary text-sm">
                            Azərbaycanda elmi qurumlar
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/analytics" className="text-foreground/70 hover:text-primary text-sm">
                            Analitik informasiya
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/news" className="text-foreground/70 hover:text-primary text-sm">
                            Elmi yeniliklər
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/science/upcoming-conferences"
                            className="text-foreground/70 hover:text-primary text-sm"
                          >
                            Baş tutacaq konfranslar
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h3 className="font-bold text-primary mb-2 flex items-center">
                        <span className="mr-2"></span> Elmi Nəşrlər və Maarifləndirmə
                      </h3>
                      <ul className="space-y-1 pl-6">
                        <li>
                          <Link href="/science/journals" className="text-foreground/70 hover:text-primary text-sm">
                            Elmi jurnallar
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/promotion" className="text-foreground/70 hover:text-primary text-sm">
                            Elmin təbliği
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/scientists" className="text-foreground/70 hover:text-primary text-sm">
                            Azərbaycanın dahi alimləri
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/diaspora" className="text-foreground/70 hover:text-primary text-sm">
                            Diasporadakı alimlər
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/links" className="text-foreground/70 hover:text-primary text-sm">
                            Faydalı linklər və keçidlər
                          </Link>
                        </li>
                        <li>
                          <Link href="/science/journal" className="text-foreground/70 hover:text-primary text-sm">
                            Elektron elmi kütləvi jurnal "Elmin nəbzi"
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/news" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 hover:text-primary">Xəbərlər</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 hover:text-primary">Əlaqə</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "az" ? "en" : "az")}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-medium text-foreground/70 hover:border-primary hover:text-primary transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === "az" ? "EN" : "AZ"}
            </button>

            <div className="hidden lg:block w-px h-6 bg-border" />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-foreground">{userName}</p>
                      <p className="text-xs text-muted-foreground">Ekspert</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/expert/dashboard">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Qrant səhifəsi</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Tənzimləmələr</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıxış et</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Giriş
                </Link>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-lg font-medium">
                    Ana səhifə
                  </Link>
                  <div className="text-lg font-medium">Fond Haqqında</div>
                  <div className="text-lg font-medium">Qrant Müsabiqələri</div>
                  <div className="text-lg font-medium">Elm və İnkişaf</div>
                  <Link href="/news" className="text-lg font-medium">
                    Xəbərlər
                  </Link>
                  <Link href="/contact" className="text-lg font-medium">
                    Əlaqə
                  </Link>
                  <div className="pt-2 border-t border-border">
                    <button
                      onClick={() => setLanguage(language === "az" ? "en" : "az")}
                      className="flex items-center gap-2 text-base font-medium text-foreground/70"
                    >
                      <Globe className="h-4 w-4" />
                      {language === "az" ? "English" : "Azərbaycanca"}
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
